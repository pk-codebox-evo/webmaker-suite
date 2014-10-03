module.exports = function(program, screenName) {
  var components = require("../components");
  var profiles = require("../lib/profile");
  var menu = program.menu(screenName);

  menu.onLoad = function() {
    var profile = new profiles.Profile();
    menu.reset();

    menu.text('Which components should this profile use?');
    menu.spacer();

    profile.getCategories().forEach(function(cat) {
      menu.text(cat);
      profile.getEntries(cat).forEach(function(entry) {
        menu.check(entry, function(toggle) {
          profile.toggle(cat, entry);
        });
      });
      menu.spacer();
    });

    menu.confirm("Save profile", "main", function(data) { profile.save(); });
    menu.cancel("Cancel", "main", function(data) { profile.discard(); });
  };

  return menu;
};
