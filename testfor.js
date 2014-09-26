module.exports = function run(commands, next) {
  if (commands.length === 0) { return setTimeout(function() { next(); }, 10); }
  var cmd = commands.splice(0,1)[0];
  var args = cmd.split(" ");
  cmd = args.splice(0,1)[0];
  (function(cmd, args) {
    var child = require("child_process").spawn(cmd, args);
    child.stdout.on('data', function (data) { child.kill('SIGKILL'); });
    child.on('error', function(err) {
      err.cmd = cmd;
      setTimeout(function() { next(err || "error"); }, 10);
    });
    child.on('exit', function (code) {
      setTimeout(function() { run(commands, next); }, 10);
    });
  }(cmd, args));
};
