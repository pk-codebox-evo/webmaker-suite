var commandStrings = require("./commandstrings");

module.exports = {
  'Core components' : {
    'Login' : {
      repo: "https://github.com/mozilla/login.webmaker.org.git",
      env: "cp env.sample .env",
      run: "node app",
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
    }
  },
  'Additional components': {
    "togetherjs": {
      repo: "https://github.com/mozilla/togetherjs.git",
      env: false,
      run: [commandStrings.httpserver + " build -p 8811", "node hub/server.js --port 5916 --log-level 3"]
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
