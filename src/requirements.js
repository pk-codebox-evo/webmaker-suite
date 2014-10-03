var requirements = {
  "Java" : {
    url: "https://www.java.com/en/download/index.jsp",
    command: "java"
  },
  "Elasticsearch" : {
    url: "http://www.elasticsearch.org/overview/elkdownloads",
    command: "elasticsearch -f -D es.config=/usr/local/opt/elasticsearch/config/elasticsearch.yml",
    runnable: true
  },
  "Mongo" : {
    url: "http://www.mongodb.org/downloads",
    command: "mongod",
    runnable: true
  },
  "Gulp" : {
    install: "npm install -g gulp",
    command: "gulp"
  },
  "Grunt" : {
    install: "npm install -g grunt-cli",
    command: "grunt"
  }
};

if (process.platform == "win32") {
  requirements.Elasticsearch.command = "elasticsearch.bat";

  Object.keys(requirements).forEach(function(key) {
    var req = requirements[key];
    if(req.install) {
      ["npm"].forEach(function(cmd) {
        req.install = req.install.replace(new RegExp("^"+cmd), cmd + ".cmd");
      })
    }
  })

  requirements.Gulp.command += ".cmd";
  requirements.Grunt.command += ".cmd";
}

module.exports = requirements;
