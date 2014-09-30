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
    command: "gulp"
  }
};

if (process.platform == "win32") {
  requirements.Elasticsearch.command = "elasticsearch.bat";
  requirements.Gulp.command += ".cmd";
}

module.exports = requirements;
