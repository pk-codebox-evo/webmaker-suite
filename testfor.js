function run(requirements, entries, next) {
  if (entries.length === 0) { return setTimeout(function() { next(false, requirements); }, 10); }
  var entry = requirements[entries.splice(0,1)[0]];
  var cmd = entry.command;
  var args = cmd.split(" ");
  cmd = args.splice(0,1)[0];
  (function(cmd, args) {
    entry.found = true;
    var child = require("child_process").spawn(cmd, args);
    child.stdout.on('data', function (data) {
      child.kill('SIGKILL');
    });
    var iterate = function() {
      setTimeout(function() {
        run(requirements, entries, next);
      }, 10);
    };
    child.on('error', function(err) {
      entry.found = false;
      iterate();
    });
    child.on('exit', function (code) {
      iterate();
    });
  }(cmd, args));
};

module.exports = function(requirements, next) {
  var entries = Object.keys(requirements);
  run(requirements, entries, next);
};
