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

  var child = exec(cmd, function(error, stdout, stderr) {
    checkError(error, stdout, stderr);
    child.kill();
    setTimeout(function() {
      batchExec(commands, next);
    }, 10);
  });

/*
  var child = spawn(cmd, args);
  child.stdout.on('data', function (data) { console.log(data.toString()); });
  child.stderr.on('data', function (data) { console.log(data.toString()); });
  child.on('error', function() { console.log(arguments); });
  child.on('exit', function (code) {
    setTimeout(function() {
      batchExec(commands, next);
    }, 10);
  });
*/
}

module.exports = {
  checkError: checkError,
  batchExec: batchExec
};
