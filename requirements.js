var requirements = {
  "java" : {
    url: "https://www.java.com/en/download/index.jsp",
    command: "java"
  },
  "elasticsearch" : {
    url: "http://www.elasticsearch.org/overview/elkdownloads",
    command: "elasticsearch -f -D es.config=/usr/local/opt/elasticsearch/config/elasticsearch.yml"
  },
  "mongo" : {
    url: "http://www.mongodb.org/downloads",
    command: "mongod"
  }
};
if (process.platform == "win32") {
  requirements.elasticsearch.command = "elasticsearch.bat";
}

var commands = []
Object.keys(requirements).forEach(function(key) {
  commands.push(requirements[key].command);
});

module.exports = {
  commands: commands
};
