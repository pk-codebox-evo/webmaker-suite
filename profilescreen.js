module.exports = function(program, screenName) {
  var components = require("./components");
  var profiles = require("./profile");
  var menu = program.addMenu(screenName);

  menu.onLoad = function() {
    var profile = new profiles.Profile();
    menu.reset();

    menu.addText('Which components should this profile use?');
    menu.addSpacer();

    profile.getCategories().forEach(function(cat) {
      menu.addText(cat);
      profile.getEntries(cat).forEach(function(entry) {
        menu.addCheckedOption(entry, function(toggle) {
          profile.toggle(cat, entry);
        });
      });
      menu.addSpacer();
    });

    menu.setConfirm("Save profile", "main", function(data) { profile.save(); });
    menu.setCancel("Cancel", "main", function(data) { profile.discard(); });
  };

  return menu;
};
