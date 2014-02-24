console.log("\n=======================================");
console.log("Resetting all apps in the Webmaker suite");
console.log("=======================================");

/**
 * Runtime argument parsing
 */
function getRunTime() {
  var argv = require("argv");
  return argv.run().options;
}

var fs = require("fs"),
    npm = require("./lib/commandstrings"),
    repos = require("./lib/repos")(npm),
    batchExec = require("./lib/batch").batchExec,
    reset = [];

if(process.argv.indexOf("--fetch")>-1) {
  reset.push("git fetch mozilla");
}
reset.push("git checkout -B master mozilla/master -f");

function updateRepos(repositories) {
  if (repositories.length === 0) {
    console.log("Finished updating all repositories.");
    process.exit(0);
  }
  var appName = repositories.splice(0,1)[0],
      app = repos[appName];
      commands = reset.slice();

  console.log("\n[" + appName + "]");
  process.chdir(appName);
  batchExec(commands, function() {
    process.chdir("..");
    updateRepos(repositories);
  });
}

updateRepos(Object.keys(repos));
