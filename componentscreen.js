module.exports = function(program, screenName, label, onconfirm) {
  var components = require("./components");

  var menu = program.addMenu(screenName);

  menu.addText(label);
  menu.addSpacer();

  Object.keys(components).forEach(function(c) {
    menu.addText(c);
    Object.keys(components[c]).forEach(function(k) {
      menu.addCheckedOption(k);
    });
    menu.addSpacer();
  });

  menu.setConfirm(screenName + " selected components", false, onconfirm);
  menu.setCancel("Cancel","main");

  return menu;
};
