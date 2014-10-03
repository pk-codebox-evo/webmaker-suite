/**
 * webmaker repository settings
 */
module.exports = function(commandStrings) {

  // installl commands for a node application
  function node(preexisting) {
    preexisting = preexisting || [];
    var npm = commandStrings.npm,
        commands = [
          "rm -rf node_modules",
          npm + " cache clear",
          npm + " install --no-bin-links",
          npm + " update",
          npm + " cache clean"
        ];
    return preexisting.concat(commands);
  }

  // installl bower dependecies, because it'll fail on windows atm through node.
  function bower(preexisting) {
    preexisting = preexisting || [];
    var bwr = commandStrings.bower,
        commands = [
          bwr + " install",
          bwr + " update"
        ];
    return preexisting.concat(commands);
  }

  // install commands for a python application
  function python(preexisting) {
    preexisting = preexisting || [];
    var commands = [
      ( process.platform === "linux" ? ( 'VIRTUAL_ENV' in process.env ? '' : 'sudo ' ) : '') + "pip install --user -r requirements.txt"
    ];
    return preexisting.concat(commands);
  }

  // togetherjs compile
  function togetherjs(preexisting) {
    preexisting = preexisting || [];
    var commands = node().concat([
      commandStrings.grunt + " build --base-url http://localhost:8811 --hub-url http://localhost:5916 --no-hardlink"
    ]);
    return preexisting.concat(commands);
  }

  // projects, nested in categories
  var repoStructure = {

    "core": {
      "login.webmaker.org": {
        install: bower(node()),
        env: "cp env.sample .env",
        run: "node app",
        process: false
      },
      "webmaker.org": {
        install: bower(node()),
        env: "cp env.dist .env",
        aws: ".env",
        run: "node app",
        process: false
      },
      "MakeAPI": {
        install: node(),
        env: "cp env.sample .env",
        run: "node server",
        process: false
      }
    },

    "tools": {
      "htmlsanitizer.org": {
        install: python(),
        env: false,
        run: "python app.py",
        process: false
      },
      "goggles.webmaker.org": {
        install: bower(node()),
        env: "cp env.dist .env",
        aws: ".env",
        run: "node app",
        process: false
      },
      "thimble.webmaker.org": {
        install: bower(node()),
        env: "cp env.dist .env",
        aws: ".env",
        run: "node app",
        process: false
      },
      "popcorn.webmaker.org": {
        install: bower(node()),
        env: false,  // popcorn's default.config is already used as fallback
        run: "node server",
        process: false
      },
      "togetherjs": {
        install: togetherjs(),
        env: false,
        run: [commandStrings.httpserver + " build -p 8811", "node hub/server.js --port 5916 --log-level 3"],
        process: false
      },
      "make-valet": {
        install: bower(node()),
        env: "cp env.dist .env",
        run: "node server",
        process: false
      },
      "webmaker-events-2": {
        install: bower(node()),
        env: "cp .env-dist .env",
        run: false, //"node server/server",
        process: false
      },
      "webmaker-events-service": {
        install: node(),
        env: "cp .env-dist .env",
        run: false,
        process: false
      },
      "webmaker-profile-2": {
        install: bower(node()),
        env: "cp env.json.dist env.json",
        run: false, //"node app",
        process: false
      }
    },

    "extras": {
      "webmaker-profile": {
        install: bower(node()),
        env: false, //"cp env.json.dist env.json",
        run: false
      },
      "webmaker-profile-service": {
        install: bower(node()),
        env: "cp env.dist .env",
        run: false, //"node app",
        process: false
      },
      "nav-global": {
        install: node(),
        env: false,
        run: false,
        process: false
      },
      "node-hubble": {
        install: node(),
        env: false,
        run: false, //"node server",
        process: false
      },

      // lumberyard
      "lumberyard": {
        install: node(),
        env: false,
        run: false, //"node processor",
        process: false
      },
      "park-warden": {
        install: node(),
        env: false,
        run: false, //"node server",
        process: false
      },
      "sawmill": {
        install: node(),
        env: "cp env.dist .env",
        run: false, //"node processor",
        process: false
      },
      "bucheron": {
        install: node(),
        env: false,
        run: false,
        process: false
      },

      "csp-logger": {
        install: node(),
        env: "cp env.json.dist env.json",
        run: false, //"node app",
        process: false
      },
      "MakeAPI-Gallery": {
        install: bower(node()),
        env: false,
        run: false,
        process: false
      },
      "makerstrap": {
        install: bower(node()),
        env: false,
        run: false, //"node server/server",
        process: false
      },
      "webmaker-kits": {
        install: bower(node()),
        env: false,
        run: false,
        process: false
      }
    },

    "dev": {
      "node-webmaker-loginapi": {
        install: node(),
        env: false,
        run: false,
        process: false
      },
      "makeapi-client": {
        install: node(),
        env: false,
        run: false,
        process: false
      },
      "node-webmaker-i18n": {
        install: node(),
        env: false,
        run: false,
        process: false
      },
      "node-webmaker-postalservice": {
        install: node(),
        env: false,
        run: false,
        process: false
      },
      "webmaker-auth": {
        install: node(),
        env: false,
        run: false,
        process: false
      },
      "webmaker-auth-client": {
        install: [],
        env: false,
        run: false,
        process: false
      },
      "node-rtltr": {
        install: node(),
        env: false,
        run: false,
        process: false
      },
      "web-literacy-client": {
        install: bower(node()),
        env: false,
        run: false,
        process: false
      },
      "webmaker-analytics": {
        install: bower(node()),
        env: false,
        run: false,
        process: false
      },
      "webmaker-download-locales": {
        install: node(),
        env: false,
        run: false,
        process: false
      },
      "webmaker-language-picker": {
        install: bower(node()),
        env: false,
        run: false,
        process: false
      },
      "webmaker-translation-stats": {
        install: node(),
        env: false,
        run: false,
        process: false
      },
      "webmaker-ui": {
        install: bower(node()),
        env: false,
        run: false,
        process: false
      },
      "webmaker-user-client": {
        install: node(),
        env: false,
        run: false,
        process: false
      }
    }

  };

  return function getRepos(options) {
    var repos = {};
    var port = function(o1, o2) {
      Object.keys(o1).forEach(function(key) {
        o2[key] = o1[key];
      });
    };
    if(!options.core && !options.tools && !options.extras) { options.dev = true; }
    if(options.dev || options.core)   { port(repoStructure.core,   repos); }
    if(options.dev || options.tools)  { port(repoStructure.tools,  repos); }
    if(options.dev || options.extras) { port(repoStructure.extras, repos); }
    return repos;
  };

};
