var requirements = require("./requirements");
var testFor = require("./testfor");

console.log("Verifying all dependencies are met...");
testFor(requirements.commands, function(err, result) {
  if(err) {
    // unmet dependency. The user will have to install these first.
    return console.error("Please make sure to install", err.cmd, "before running the webmaker suite.");
  }

  // we're good - let's start this application manager!
  var call = process.argv.join(' ');
  var matched = call.match(/node .*run (\d+)/);
  if(matched) {
    var profiles = require("./profile");
    var profileidx = parseInt(matched[1],10) - 1;
    var profile = profiles.getRunProfile(profileidx);
    if(profile) {
      return require("./runprofile")(profile);
    }
  }
  require("./program").run("main");
});
