console.log("\n===============================================");
console.log("Adding remotes to  all apps in the Webmaker suite");
console.log("=================================================");

var fs = require("fs"),
    npm = require("./lib/commandstrings").npm,
    repos = require("./lib/repos")(npm),
    batchExec = require("./lib/batch").batchExec,
    users = require("./lib/contributors"),
    creds ="";

if(process.argv[2]) {
  var a = process.argv[2],
      b = process.argv[3];
  if(a.indexOf("--username=")>-1) {
    a = a.replace("--username=",'');
    b = b.replace("--password=",'');
  }
  creds = a + ":" + b + "@";
}

function addRemotes(repositories) {
  if (repositories.length === 0) {
    console.log("Finished adding remotes to all repositories.");
    process.exit(0);
  }

  var appName = repositories.splice(0,1)[0],
      app = repos[appName];
      commands = [];
      users.forEach(function(username) {
        commands.push("git remote add " + username + " https://" + creds + "github.com/" + username + "/" + appName + ".git");
        commands.push("git fetch " + username);
      });

  console.log("\n[" + appName + "]");
  process.chdir(appName);
  batchExec(commands, function() {
    process.chdir("..");
    addRemotes(repositories);
  });
}

addRemotes(Object.keys(repos));
