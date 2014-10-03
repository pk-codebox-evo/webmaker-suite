var builder = require("terminal-menu-program"),
    program = new builder.Program("Webmaker Suite"),
    componentWork = require("./lib/componentwork"),
    requirements = require("./requirements"),
    screens = require("./screens");

Object.keys(requirements).forEach(function(req) {
  screens.dependency(program, req, requirements[req]);
});

screens.main(program, requirements, "main");

screens.component(program, "install", "Install components", function onConfirm(data) {
  program.halt();
  componentWork(data, require("./install"), function() {
    program.run("main");
  });
});

screens.component(program, "update", "Sync components to Mozilla's master/develop branches", function onConfirm(data) {
  program.halt();
  componentWork(data, require("./update"), function() {
    program.run("main");
  });
});

screens.profiles(program, "profiles");

// export program
module.exports = program;
