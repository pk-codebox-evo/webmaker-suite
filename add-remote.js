console.log("\n================================================");
console.log("Adding remote to  all apps in the Webmaker suite");
console.log("================================================");

var fs = require("fs"),
    npm = require("./lib/commandstrings").npm,
    repos = require("./lib/repos")(npm),
    batchExec = require("./lib/batch").batchExec,
    username = process.argv[2],
    remotename = process.argv.indexOf("--no-origin") > -1 ? username : "origin";

function addRemote(repositories) {
  if (repositories.length === 0) {
    console.log("Finished adding remote to all repositories.");
    process.exit(0);
  }

  var appName = repositories.splice(0,1)[0],
      app = repos[appName];
      commands = [];

  commands.push("git remote add " + remotename + " https://github.com/" + username + "/" + appName + ".git");
  commands.push("git fetch " + username + " --unshallow");
  commands.push("git fetch " + username);

  console.log("\n[" + appName + "]");
  process.chdir(appName);
  batchExec(commands, function() {
    process.chdir("..");
    addRemote(repositories);
  });
}

addRemote(Object.keys(repos));
