var batchExec = require("./batch").batchExec,
    fs = require('fs-extra'),
    spawn = require('child_process').spawn;

/**
 * Mongo
 */
function spawnMongo(callback) {

  // ensure we have a data directory for mongo
  if(!fs.existsSync("./mongo")) { fs.mkdirSync("mongo"); }

  // clean any lock files that might exist, and set up database
  batchExec(["rm mongo/mongod.lock"], function() {
    var mongo = spawn("mongod", ["--dbpath","./mongo/", "-v"]),
        appName = "mongodb";
    mongo.stdout.on('data', function (data) {
      process.stdout.write("[" + appName + "] " + data);
      // don't start the Webmaker Suite until ES and Mongo have started up.
      if(data.toString().indexOf("waiting for connections")>-1) {
        setTimeout(callback, 1000);
      }
    });

    mongo.stderr.on('data', function (data) { process.stderr.write("[" + appName + "] " + data); });
    mongo.on('error', function () { console.log("[" + appName + "] ERROR", arguments); mongo.kill(); });
    mongo.on('close', function (code) { console.log(appName + ' process exited with code ' + code); });
  });
};


/**
 * Elastic Search
 */
function spawnElasticSearch(callback, cleares) {

  var appName = "elasticsearch",
      es;
  if (process.platform == "win32") {
    es = spawn("elasticsearch.bat");
  } else {
    es = spawn("elasticsearch", ["-f", "-D", "es.config=/usr/local/opt/elasticsearch/config/elasticsearch.yml"]);
  }

  es.stdout.on('data', function (data) {
    process.stdout.write("[" + appName + "] " + data);
    // don't start Mongo until ES has started up.
    if(data.toString().indexOf("started")>-1) {
      setTimeout(function() {
        if(cleares) {
          // clear ES index to prevent pollution:
          batchExec([
            "curl -X DELETE http://127.0.0.1:9200/makes"
          ], function () {
            console.log();
            setTimeout(function() {
              spawnMongo(callback)
            }, 1000);
          });
        }
        else { spawnMongo(callback); }
      }, 1000);
    }
  });
  es.stderr.on('data', function (data) { process.stderr.write("[" + appName + "] " + data); });
  es.on('error', function () { console.log("[" + appName + "] ERROR", arguments); es.kill(); });
  es.on('close', function (code) { console.log(appName + ' process exited with code ' + code); });
};

module.exports = {
  run: function(callback, cleares) {
    cleares = cleares || false;
    spawnElasticSearch(callback, cleares);
  }
}
