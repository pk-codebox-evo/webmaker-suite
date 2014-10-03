module.exports = function(program, reqname, requirement) {
  var menu = program.menu("dependency." + reqname);

  menu.text("Dependency: " + reqname);
  menu.spacer();

  if(!requirement.install) {
    menu.text(reqname + " is not installed, or doesn't have a global alias or PATH entry set up.");
    menu.spacer();
    menu.text("This dependency unfortunately cannot be installed automatically. Please download");
    menu.text("the installer from the following URL and follow the installation instructions:");
    menu.spacer();
    menu.text(requirement.url);
    menu.spacer();
    menu.text("Alternatively, if your operating system or your workspace uses its own package");
    menu.text("manager, you can use that to install this particular dependency.");
    menu.spacer();
    menu.confirm("Okay", "main");
    return menu;
  }

  menu.text("This dependency can be installed automatically.");
  menu.text("Select \"Instal\" to install it, or cancel to go back to the main menu.");
  menu.spacer();

  var args = requirement.install.split(" ");
  var onConfirm = function() {
    program.halt();
    var spawn = require('child_process').spawn;
    var child = spawn(args[0], args.slice(1));
    child.stdout.on('data', function (data) { requirement.found = true; process.stdout.write(data.toString()); });
    child.stderr.on('data', function (data) { process.stderr.write(data.toString()); });
    child.on('close', function (code) { program.run("main"); });
  };

  menu.confirm("Install", false, onConfirm);
  menu.cancel("Cancel", "main");

  return menu;
};
