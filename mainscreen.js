var profiles = require("./profile");

module.exports = function(program, requirements, screenName) {
  var list = profiles.getProfiles();
  var menu = program.menu(screenName);

  menu.onLoad = function() {
    menu.reset();

    menu.text('The Mozilla Webmaker Suite Application Manager v1.0');
    menu.spacer();
    menu.text("Dependency status:");
    menu.spacer();
    Object.keys(requirements).forEach(function(req) {
      var yes = requirements[req].found;
      menu.text('('+(yes ? 'x' : ' ')+') ' + req + (yes? '':' not') +' installed'+(yes ? '' : '!'));
    });
    menu.spacer();
    menu.text("Webmaker components:");
    menu.spacer();
    menu.option("Install components", "install");
    menu.option("Synchronise components with Mozilla", "update");

    if(list.length > 0) {
      menu.spacer();
      menu.text('Run from profile:');
      menu.spacer();

      list.forEach(function(profile, idx) {
        var profile = new profiles.Profile(profile);
        if(profile.getName().trim()) {
          var label = (idx+1)+": " + profile.getName();
          menu.option(label, false, function() {
            program.halt();
            require("./runprofile")(profile);
          });
        }
      });
      menu.spacer();
    } else {
      menu.spacer();
      menu.text("No run profiles set up yet..."); 
      menu.spacer();
    }

    menu.option("Create a " + (list.length>0 ? 'new ' : '') + "run profile", "profiles");
    menu.spacer();

    menu.cancel("Exit", function() { program.halt(); process.exit(0); });

    if(list.length > 0) { menu.defaultidx = 2; }
  }

  return menu;
};
