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

  process.chdir(dir);

  var git = spawn("git", ["fetch","mozilla"]);
  console.log("- running npm install");
  git.stdout.on('data', function (data) { process.stdout.write(process.stdout.writedata.toString()); });
  git.stderr.on('data', function (data) { process.stderr.write(data.toString()); });
  git.on('close', function (code) {

    exec("git checkout -B master mozilla/master");
    exec("git checkout -B develop mozilla/develop");

    var npm = spawn(commands.npm, ["install"]);
    console.log("- npm install");
    npm.stdout.on('data', function (data) { process.stdout.write(data.toString()); });
    npm.stderr.on('data', function (data) { process.stderr.write(data.toString()); });
    npm.on('close', function (code) {

      npm = spawn(commands.npm, ["update"]);
      console.log("- npm update");
      npm.stdout.on('data', function (data) { process.stdout.write(data.toString()); });
      npm.stderr.on('data', function (data) { process.stderr.write(data.toString()); });
      npm.on('close', function (code) {
        process.chdir("..");
        callback();
      });

    });
  });

  console.log("installing: " + repo);
};
