console.log("\n=======================================");
console.log("Starting all apps in the Webmaker suite");
console.log("=======================================");

/**
 * Runtime argument parsing
 */
function getRunTime() {
  var argv = require("argv");
  argv.option({
      name: 'nomongo',
      type: 'string',
      description: 'Do not start mongodb (useful for when you already run mongo)',
      example: "'node run --nomongo'"
  });
  argv.option({
      name: 'noes',
      type: 'string',
      description: 'Do not start elastic searc (useful for when you already run es)',
      example: "'node run --noes'"
  });
  return argv.run().options;
}


var fs = require("fs"),
    repos = require("./lib/repos")(),
    runtime = getRunTime(),
    spawn = require("child_process").spawn;

function run() {
  Object.keys(repos).forEach(function (appName) {
    var app = repos[appName];
    if (app.run) {
      var args = app.run.split(' ');
      cmd = args.splice(0,1)[0];
      console.log("> "+app.run + " ("+appName+")");
      process.chdir(appName);
      var sp = spawn(cmd, args);
      process.chdir("..");
      app.process = sp;
      sp.stdout.on('data', function (data) { process.stdout.write("[" + appName + "] " + data); });
      sp.stderr.on('data', function (data) { process.stderr.write("[" + appName + "] " + data); });
      sp.on('error', function () {
        console.log("[" + appName + "]" + error, arguments);
        sp.kill();
        app.process = false;
      });
      sp.on('close', function (code) {
        console.log('child process exited with code ' + code);
        sp.kill()
        app.process = false;
      });
    }
  });
}

/**
 * Mongo DB
 */
function spawnMongo() {
  // bypass?
  if(runtime.nomongo) {
    return run();
  }

  // ensure we have a data directory for mongo
  if(!fs.existsSync("./mongo")) { fs.mkdirSync("mongo"); }

  // set up database
  var mongo = spawn("mongod", ["--dbpath","./mongo/", "-v"]),
      appName = "mongodb";
  mongo.stdout.on('data', function (data) {
    process.stdout.write("[" + appName + "] " + data);
    if(process.platform==="win32") {
      // don't start the Webmaker Suite until ES and Mongo have started up.
      if(data.toString().indexOf("waiting for connections")>-1) {
        setTimeout(run, 1000);
      }
    }
  });
  mongo.stderr.on('data', function (data) { process.stderr.write("[" + appName + "] " + data); });
  mongo.on('error', function () { console.log("[" + appName + "] ERROR", arguments); mongo.kill(); });
  mongo.on('close', function (code) { console.log(appName + ' process exited with code ' + code); });
  if(process.platform !== "win32") {
    setTimeout(run, 1000);
  }
};

/**
 * Elastic Search
 */
(function spawnElasticSearch() {
  // bypass?
  if(runtime.noes) {
    return spawnMongo();
  }

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
    if(data.toString().indexOf(": started")>-1) {
      setTimeout(spawnMongo, 1000);
    }
  });
  es.stderr.on('data', function (data) { process.stderr.write("[" + appName + "] " + data); });
  es.on('error', function () { console.log("[" + appName + "] ERROR", arguments); es.kill(); });
  es.on('close', function (code) { console.log(appName + ' process exited with code ' + code); });
}());
