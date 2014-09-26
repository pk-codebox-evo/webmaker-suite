var esmongo = require("./esmongo");
var components = require("./components");
var spawn = require('child_process').spawn;

module.exports = function(profile) {
  console.log("running profile " + profile.getName() + "\n");

  var taskrunner = function() {
    var task = profile.struct;
    Object.keys(task).forEach(function(cat) {
      Object.keys(task[cat]).forEach(function(entry) {
        if(task[cat][entry]) {
          var component = components[cat][entry],
              dir = component.dir;

          console.log("Starting component " + entry);
          process.chdir(dir);
          var args = component.run.split(' ');
          var child = spawn(args[0], args.slice(1));
          child.stdout.on('data', function (data) { process.stdout.write(data.toString()); });
          child.stderr.on('data', function (data) { process.stderr.write(data.toString()); });
          child.on('close', function (code) { console.log("closed"); });
          process.chdir("..");
        }
      });
    });
  };

  // why is taskrunner sometimes running twice?
  esmongo.run(function() {
    taskrunner();
    taskrunner = function(){};
  });
};
