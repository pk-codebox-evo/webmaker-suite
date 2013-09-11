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
          npm + " cache clean"
        ];
    return preexisting.concat(commands);
  }

  // installl bower dependecies, because it'll fail on windows atm through node.
  function bower(preexisting) {
    preexisting = preexisting || [];
    var bower = commandStrings.bower,
        commands = [
          bower + " install"
        ];
    return preexisting.concat(commands);
  }

  // install commands for a python application
  function python(preexisting) {
    preexisting = preexisting || [];
    var commands = [
      ( process.platform === "linux" ? "sudo " : '') + "pip install --user -r requirements.txt"
    ];
    return preexisting.concat(commands);
  }

  // towtruck compile
  function towtruck(preexisting) {
    var commands = [commandStrings.grunt + " build --base-url http://localhost:8811 --hub-url http://localhost:5916 --no-hardlink"];
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
      install: node(),
      env: "cp env.dist .env",
      run: "node app",
      process: false
    },
    "thimble.webmaker.org": {
      install: node(),
      env: "cp env.dist .env",
      run: "node app",
      process: false
    },
    "popcorn.webmaker.org": {
      install: node(),
      // We need a special function to write popcorn's local.json
      env: function(app, fs, habitat) {
        console.log("> generating local.json");
        process.chdir(app);
        var content = [
          '{',
          '  "LOGIN_SERVER_URL_WITH_AUTH": "http://testuser:password@localhost:3000",',
          '  "AUDIENCE": "http://localhost:7777",',
          '  "S3_KEY": "' + habitat.get("s3_key") + '",',
          '  "S3_BUCKET": "popcorn",',
          '  "S3_SECRET": "' + habitat.get("s3_secret") + '",',
          '  "MAKE_PRIVATEKEY": "00000000-0000-0000-000000000000",',
          '  "MAKE_PUBLICKEY": "00000000-0000-0000-000000000000"',
          '}'
        ].join("\n");
        fs.writeFileSync("local.json", content);
        process.chdir("..");
      },
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
      install: node(),
      env: "cp env.sample .env",
      run: "node app",
      process: false
    },
    "webmaker.org": {
      install: bower(node()),
      env: "cp env.dist .env",
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
    "towtruck": {
      install: towtruck(node()),
      env: false,
      run: [commandStrings.httpserver + " build -p 8811", "node hub/server.js port=5916"],
      process: false
    }
  };
};
