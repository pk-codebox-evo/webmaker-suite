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
          npm + " cache clean",
        ];
    return preexisting.concat(commands);
  }

  // installl bower dependecies, because it'll fail on windows atm through node.
  function bower(preexisting) {
    preexisting = preexisting || [];
    var bower = commandStrings.bower,
        commands = [
          bower + " install",
          bower + " update"
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

  return {
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
    "node-webmaker-loginapi": {
      install: node(),
      env: false,
      run: false,
      process: false
    },
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
    "makeapi-client": {
      install: node(),
      env: false,
      run: false,
      process: false
    },
    "MakeAPI": {
      install: node(),
      env: "cp env.sample .env",
      run: "node server",
      process: false
    },
    "togetherjs": {
      install: togetherjs(),
      env: false,
      run: [commandStrings.httpserver + " build -p 8811", "node hub/server.js --port 5916 --log-level 3"],
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
    "make-valet": {
      install: bower(node()),
      env: "cp env.dist .env",
      run: "node server",
      process: false
    },
    "webmaker-profile": {
      install: bower(node()),
      env: "cp env.json.dist env.json",
      run: false
    },
    "webmaker-profile-service": {
      install: bower(node()),
      env: "cp env.dist .env",
      run: "node app",
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
    }
  };
};
