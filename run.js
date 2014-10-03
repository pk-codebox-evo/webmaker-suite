var requirements = require("./src/requirements");
var testFor = require("./src/lib/testfor");

console.log("Verifying all dependencies are met...");
testFor(requirements, function(err, result) {
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
  require("./src/program").run("main");
});
