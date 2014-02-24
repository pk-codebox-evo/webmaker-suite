console.log("\n=======================================");
console.log("Updating all apps in the Webmaker suite");
console.log("=======================================");

/**
 * Runtime argument parsing
 */
function getRunTime() {
  var argv = require("argv");
  argv.option({
      name: 'fullclone',
      type: 'string',
      description: 'Perform a clone with full commit history, rather than a shallow (i.e. latest-commits-only) clone',
      example: 'node install --fullclone'
  });
  return argv.run().options;
}

var fs = require("fs"),
    runtime = getRunTime(),
    npm = require("./lib/commandstrings"),
    repos = require("./lib/repos")(npm),
    batchExec = require("./lib/batch").batchExec,
    shallowclone = runtime.fullclone ? "" : " --depth 1",
    update = [
      "git fetch mozilla",
      "git checkout -B master mozilla/master",
      "git submodule sync",
      "git submodule update --init --recursive" + shallowclone
    ];

function updateRepos(repositories) {
  if (repositories.length === 0) {
    console.log("Finished updating all repositories.");
    process.exit(0);
  }
  var appName = repositories.splice(0,1)[0],
      app = repos[appName];
      commands = update.slice();

  if(app.install) {
    commands = commands.concat(app.install);
  }

  console.log("\n[" + appName + "]");
  process.chdir(appName);
  batchExec(commands, function() {
    process.chdir("..");
    updateRepos(repositories);
  });
}

updateRepos(Object.keys(repos));
