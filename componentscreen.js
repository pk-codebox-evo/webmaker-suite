var components = require("./components");
var fs = require("fs-extra");

module.exports = function(program, screenName, label, onconfirm) {
  var menu = program.menu(screenName);

  menu.text(label);
  menu.spacer();

  Object.keys(components).forEach(function(c) {
    if (c === "Dependencies") return;
    menu.text(c);
    Object.keys(components[c]).forEach(function(k) {
      var exists = fs.existsSync(components[c][k].dir);
      menu.check(k, exists);
    });
    menu.spacer();
  });

  menu.confirm(screenName + " selected components", false, onconfirm);
  menu.cancel("Cancel","main");

  return menu;
};
