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
      example: 'node update-webmaker --fullclone'
  });
  argv.option({
      name: 'fastforward',
      type: 'string',
      description: 'resume an update from where the update process was interrupted last time (if it was interrupted or crashed)',
      example: 'node update-webmaker --fastforward'
  });
  return argv.run().options;
}

var fs = require("fs"),
    runtime = getRunTime(),
    progressive = require("./lib/progressive")("update"),
    npm = require("./lib/commandstrings"),
    repos = require("./lib/repos")(npm),
    batchExec = require("./lib/batch").batchExec,
    shallowclone = runtime.fullclone ? "" : " --depth 1",
    update = [
      "git fetch mozilla",
      "git checkout -B master mozilla/master",
      "git submodule sync",
      "git submodule update --init --recursive" + shallowclone
    ],
    markrepo = "";

function updateRepos(repositories) {

  if (repositories.length === 0) {
    console.log("Finished updating all repositories.");
    progressive.clear();
    process.exit(0);
  }

  var appName = repositories.pop(),
      app = repos[appName];
      commands = update.slice();

  progressive.mark(appName, "update");

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

var mark = progressive.getCurrent();
if(runtime.fastforward) {
	if(mark) {
		var _ = mark.split(":");
		markrepo = _[0],
		markaction = _[1];
		console.log("\n===================================================================");
		console.log("Fast-forwarding the update to " + markrepo);
		console.log("===================================================================");
	}
}
else if (mark) {
	console.log("\n !!!WARNING!!! \n");
	console.log("A progress file found, but no --fastforward flag was used. Either delete");
	console.log("the .update file, or run [node update-webmaker.js --fastforward] instead");
	console.log("\nExiting...\n\n");
	process.exit(1);
}

var repositories = Object.keys(repos);

if(runtime.fastforward && markrepo) {
	do {
		if(repositories.pop() === markrepo) {
			repositories.push(markrepo);
			break;
		}
	} while (repositories.length > 0);
  markrepo = "";
}

updateRepos(repositories);
