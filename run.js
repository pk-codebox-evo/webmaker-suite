// do we have elastic search and mongodb available?
var testFor = require("./testfor");
var commands = ['mongod'];
if (process.platform == "win32") { commands.push("elasticsearch.bat"); }
else { commands.push("elasticsearch -f -D es.config=/usr/local/opt/elasticsearch/config/elasticsearch.yml"); }

// verify we have the hard dependencies installed:
testFor(commands, function(err, result) {
  if(err) { return console.error("Please make sure to install", err.cmd, "before running the webmaker suite."); }
  // we're good - let's start this application manager!
  require("./program").run("main");
});
