var requirements = require("./requirements");

var components = {
  'Core components' : {
    'Login' : {
      repo: "https://github.com/mozilla/login.webmaker.org.git",
      env: "cp env.sample .env",
      run: "node app"
    },
    'MakeAPI' : {
      repo: "https://github.com/mozilla/MakeAPI.git",
      env: "cp env.sample .env",
      run: "node server"
    },
    'Webmaker.org' : {
      repo: "https://github.com/mozilla/webmaker.org.git",
      env: "cp env.dist .env",
      run: "node app"
    },
    'make-valet' : {
      repo: "https://github.com/mozilla/make-valet.git",
      env: "cp env.dist .env",
      run: "node server"
    }
  },
  'Tools' : {
    'Appmaker' : {
      repo: "https://github.com/mozilla-appmaker/appmaker.git",
      env: "cp sample.env .env",
      run: "node app",
    },
    'Goggles' : {
      repo: "https://github.com/mozilla/goggles.webmaker.org.git",
      env: "cp env.dist .env",
      run: "node app"
    },
    'Thimble' : {
      repo: "https://github.com/mozilla/thimble.webmaker.org.git",
      env: "cp env.dist .env",
      run: "node app"
    },
    'Popcorn' : {
      repo: "https://github.com/mozilla/popcorn.webmaker.org.git",
      env: false,
      run: "node server",
    },
    'Mobile Webmaker' : {
      repo: "https://github.com/mozillafordevelopment/webmaker-app.git",
      env: false,
      run: "gulp" + (process.platform == "win32" ? ".cmd" : '') +" dev"
    }
  },
  'Additional components': {
    "togetherjs": {
      repo: "https://github.com/mozilla/togetherjs.git",
      env: false,
      run: [
        "http-server" + (process.platform == "win32" ? ".cmd" : '') + " build -p 8811",
        "node hub/server.js --port 5916 --log-level 3"
      ]
    },
    'Events' : {
      repo: "https://github.com/mozilla/webmaker-events-2.git",
      env: "cp .env-dist .env",
      run: false,
    },
    'Webmaker profile' : {
      repo: "https://github.com/mozilla/webmaker-profile-2.git",
      env: "cp env.json.dist env.json",
      run: false,
    },
  }
};

Object.keys(components).forEach(function(cat) {
  Object.keys(components[cat]).forEach(function(key) {
    var component = components[cat][key],
        repo = component.repo,
        st = repo.lastIndexOf('/'),
        ed = repo.lastIndexOf('.git'),
        dir = repo.substring(st+1, ed);
    component.dir = dir;
  });
});

var dep = {}
Object.keys(requirements).forEach(function(req) {
  var entry = requirements[req];
  if (entry.runnable) {
    dep[req] = {
      run: entry.command
    };
  }
});
components.Dependencies = dep;

module.exports = components;
