var builder = require("terminal-menu-program"),
    program = new builder.Program("Webmaker Suite"),
    componentWork = require("./componentwork");

require("./mainscreen")(program, "main");

require("./componentscreen")(program, "install", "Install components", function onConfirm(data) {
  program.halt();
  componentWork(data, require("./install"), function() {
    program.run("main");
  });
});

require("./componentscreen")(program, "update", "Sync components to Mozilla's master/develop branches", function onConfirm(data) {
  program.halt();
  componentWork(data, require("./update"), function() {
    program.run("main");
  });
});

require("./profilescreen")(program, "profiles");

// export program
module.exports = program;
