console.log("\n=======================================");
console.log("Updating all apps in the Webmaker suite");
console.log("=======================================");

/**
 * Runtime argument parsing
 */
function getRunTime() {
  var argv = require("argv");
  /*
  argv.option({
      name: 'argname',
      type: 'string',
      description: 'Argument description',
      example: "'node update --argname'"
  });
  */
  return argv.run().options;
}

var fs = require("fs"),
    repos = require("./lib/repos")(),
    batchExec = require("./lib/batch").batchExec,
    updates = [
      "git fetch mozilla",
      "git checkout -B master mozilla/master"
    ];

function updateRepos(repositories) {
  if (repositories.length === 0) {
    console.log("Finished updating all repositories.");
    return;
  }
  var appName = repositories.splice(0,1)[0],
      app = repos[appName];
  console.log("\n[" + appName + "]");
  process.chdir(appName);
  batchExec(updates.slice(), function() {
    process.chdir("..");
    updateRepos(repositories);
  });
}

updateRepos(Object.keys(repos));
