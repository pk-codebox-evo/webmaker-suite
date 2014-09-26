var fs = require("fs-extra");
var clear = function() { process.stdout.write("\u001b[2J\u001b[0;0H"); };
var spawn = require('child_process').spawn;
var exec = require('child_process').exec;
var commands = require("./commandstrings");
var readlineSync = require('readline-sync');

module.exports = function(component, callback) {

  var repo = component.repo,
      st = repo.lastIndexOf('/'),
      ed = repo.lastIndexOf('.git'),
      dir = repo.substring(st+1, ed);

  fs.removeSync(dir);
  var git = spawn("git", ["clone", repo]);

  git.stdout.on('data', function (data) { process.stdout.write(data.toString()); });
  git.stderr.on('data', function (data) { process.stderr.write(data.toString()); });
  git.on('close', function (code) {
    process.chdir(dir);
    exec("git remote rename origin mozilla");
    if(component.env) {
      console.log("- copying environment");
      exec(component.env);
    }
    var npm = spawn(commands.npm, ["install"]);
    console.log("- running npm install");
    npm.stdout.on('data', function (data) { process.stdout.write(data.toString()); });
    npm.stderr.on('data', function (data) { process.stderr.write(data.toString()); });
    npm.on('close', function (code) {
      process.chdir("..");
      callback();
    });
  });

  console.log("installing: " + repo);
};
