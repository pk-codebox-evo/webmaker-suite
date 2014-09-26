var esmongo = require("./esmongo");
var profiles = require("./profile");
var components = require("./components");
var spawn = require('child_process').spawn;

module.exports = function(program, screenName) {
  var list = profiles.getProfiles();
  var menu = program.addMenu(screenName);

  menu.onLoad = function() {
    menu.reset();

    menu.addText('The Mozilla Webmaker Suite Application Manager v1.0');
    menu.addSpacer();

    menu.addOption("Install components", "install");
    menu.addOption("Synchronise components with Mozilla", "update");

    if(list.length > 0) {
      menu.addSpacer();
      menu.addText('Run from profile:');
      menu.addSpacer();

      list.forEach(function(profile, idx) {
        var profile = new profiles.Profile(profile);
        if(profile.getName().trim()) {
          var label = (idx+1)+": " + profile.getName();
          menu.addOption(label, false, function() {
            program.halt();

            console.log("running profile " + label + "\n");

            var taskrunner = function() {
              var task = profile.struct;
              Object.keys(task).forEach(function(cat) {
                Object.keys(task[cat]).forEach(function(entry) {
                  if(task[cat][entry]) {
                    var component = components[cat][entry],
                        repo = component.repo,
                        st = repo.lastIndexOf('/'),
                        ed = repo.lastIndexOf('.git'),
                        dir = repo.substring(st+1, ed);

                    console.log("Starting component " + entry);
                    process.chdir(dir);
                    var args = component.run.split(' ');
                    var child = spawn(args[0], args.slice(1));
                    child.stdout.on('data', function (data) { process.stdout.write(data.toString()); });
                    child.stderr.on('data', function (data) { process.stderr.write(data.toString()); });
                    process.chdir("..");
                  }
                });
              });
            };

            esmongo.run(function() {
              // why is taskrunner sometimes running twice?
              taskrunner();
              taskrunner = function(){};
            });

          });
        }
      });
      menu.addSpacer();
    }

    menu.addOption("Create a " + (list.length>0 ? 'new ' : '') + "run profile", "profiles");
    menu.setCancel("Exit", function() { program.halt(); process.exit(0); });
  }

  return menu;
};
