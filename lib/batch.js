/**
 * Installation script requirements
 */
var exec = require("child_process").exec,
    spawn = require("child_process").spawn;

/**
 * exec() error handler
 */
function checkError(error, stdout, stderr) {
  if(error) {
    console.log("ERROR");
    console.log(stdout);
    console.log(stderr);
    throw error;
  }
}

/**
 * Run multiple commands in the same dir
 */
function batchExec(commands, next) {
  if (commands.length === 0) {
    return setTimeout(next, 10);
  }
  var cmd = commands.splice(0,1)[0];
  console.log("> " + cmd);

  var args = cmd.split(" ");
  cmd = args.splice(0,1)[0];
  (function(cmd, args) {
    var child = spawn(cmd, args);
    child.stdout.on('data', function (data) {
      process.stdout.write(data);
    });
    child.stderr.on('data', function (data) {
      process.stderr.write(data);
    });
    child.on('error', function() { console.log("An error occured:"); console.log(arguments); });
    child.on('exit', function (code) { setTimeout(function() { batchExec(commands, next); }, 10); });
  }(cmd, args));
}

module.exports = {
  checkError: checkError,
  batchExec: batchExec
};
