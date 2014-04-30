# Webmaker Suite bootstrap/installation script

## Visual Guides

The screenshot versions of this README.md can be found at http://mozilla.github.io/webmaker-suite, although right now only the windows version (http://mozilla.github.io/webmaker-suite/windows.html) is available.

If you intend to use the screenshot version, at the very least first read through this README. It takes only a few minutes but will save you literally days of installation headaches after those few minutes.

## Preflight

Make sure you have the following prerequisites installed:

* **Windows only** a basic `cygwin` (http://cygwin.com) or `mingw` (http://mingw.org) installation to ensure you have the `rm`, `git` and `curl` commands available.
* node.js - http://nodejs.org (or through your favourite package manager)
* npm - comes with node.js
  * bower - `npm install -g bower` (depends on npm, so install node.js first)
  * grunt - `npm install -g grunt-cli` (depends on npm, so install node.js first)
  * http-server - `npm install -g http-server` (depends on npm, so install node.js first)
* python - http://python.org (or through your favourite package manager), we depend on 2.7
* pip - instructions on http://www.pip-installer.org/en/latest/installing.html
* mongodb - http://www.mongodb.org/downloads (or through your favourite package manager)
* java - http://www.oracle.com/technetwork/java/javase/downloads/index.html (if not already installed)
* elastic search - http://www.elasticsearch.org (or through your favourite package manager)

**Windows and OSX users take note:**

In addition to having special instructions for installing mongodb and elastic search, Windows and OSX need C++ stacks installed for the `sqlite3` library to compile (used in several tools). The instructions on how to do this can be found in the `OS-specific information` section, further down in this readme. Please follow those instructions before moving on to the next step.

## Steps after preflight

**Step 1**: After your preflight check, clone this repo. If you're on Windows or OSX, make sure you have the C++ stack for your OS installed as per the `specific information` section, further down in this readme.

**Step 2**: open a terminal in the repo's directory and run `node install-webmaker`. This will run a brief bootstrap, after which it will ask for your github username, and S3 credentials (you can leave the S3 credentials blank by simply hitting 'enter' when prompted)

The `node install-webmaker` command can take several runtime options:

1) `--username=...`

2) `--s3key=...`

3) `--s3secret=...`

These do the obvious thing. If you do not use these, and do not have an .env file (which initially you won't), they will default to empty strings. Not specifying the username means you will not be given an `origin` remote in each repository, so running the install with a username is generallya good idea.

If you do not provide legal s3 credentials, the tools will fall back to localhost publishing instead.

4) `--skipclone`

5) `--skipnpm`

these will skip the cloning and npm install processes, respectively, in case you need to only run certain parts of the installer.

6) `--core`

7) `--tools`

8) `--extras`

9) `--dev`

These flags determine how much gets installed. `core` only installs the core services upon which all the other tools depend (login, webmaker.org, makeapi), `tools` installs the tool set (thimble, popcorn, goggles, etc), `extras` installs some projects that currently do not fall under the core or tools heading.

Using the `dev` flag will install the entire suite, and is mostly for full-stack development purposes.

10) `--fullclone`

This will do a full clone of all repositories and their submodules for those who desire having that history available, otherwise it performs a shallow clone of all repositories and their submodules.

11) `--fastforward`

If, for some reason, the installation process crashes (due to a missing dependency for instance), or is interrupted (through ctrl-c or the like), the `--fastforward` flag will make the installation resume form the point it was interrupted last time.

**Step 3**: Go make some coffee, this'll run for a while (around 15 minutes, but depending on your machine and internet connection, anywhere between 10 and 20 minutes)

After installation completes, the whole suite can be fired up with `node run` (read the next section before running it, though. There are some details you need to know before you type those two words).

Note that this will pipe all output from everything into the same console, so this is great for not-looking-at-the-terminal testing, but not a good idea for doing single-component terminal debugging.

## running the suite

`node run` will run all apps in the webmaker suite. It can take four runtime options:

1. --noes
2. --cleares
3. --nomongo
4. --exclude=[comma separated list of names]

The `--cleares` flag will clear the elasticsearch index for makes, so webmaker will have no knowledge of any published makes, without wiping the MongoDB with actual make data. To wipe the MongoDB, simply delete the `./mongo` directory (`rm -rf mongo` will do the trick).

The `--exclude` flag takes a comma separated list of app names that should not be started up. If you wish to test only the MakeAPI, for instance, you could issue `node run --exclude=goggles,thimble,popcorn,login,webmaker.org,htmlsanitizer.org`. Note that, for convenience, app names that are of the form "xyz.webmaker.org" can be excluded using only the "xyz" part of the name.

These mostly exist to prevent double-starts for elastic search and mongodb, if you already run these on your machine, since `node run` will try to fire these up for you.

### Check your firewall

If you are running the suite and publishing makes, you will need to make sure your firewall is not blocking certain ports. In order to replicate the same kind of `username.localhost` functionality that you get on webmaker's `username.makes.org`, we use `xip.io` to do subdomain forwarding. As such, when you publish you will get preview links such as `http://webmakerman.127.0.0.1.xip.io:4000/popcorn/1`, which requires port `4000` to not be blocked by your firewall.

### First run on Windows

When you call `node run` on Windows for the first time, it is entirely possible that you get Windows Firewall notices for java, python, elastic search, mongodb, and Node.js... You'll want to allow all of these on the private network at least (and probably public too, but that's up to you), but these notices WILL interfere with the first run. After allowing everything and the console stops spewing output, hit `ctrl-c` twice, then run `node run` again. There will be no Windows Firewal requests this time round, and the suite should start up without any problems.

## Updating the suite

`node update-webmaker` will update all repositories to their current `master` branch. It effectively runs the following commands for each repository:

1. `git fetch mozilla`
2. `git checkout -B master mozilla/master`
3. `git submodule sync`
4. `git submodule update --init --recursive`
5. `rm -rf node_modules`
6. `npm install`
7. `npm cache clean`
8. `npm update`
9. `bower install`
10. `bower update`

It can take the following runtime options:

1) `--fullclone`

Which allows the update to pull in all history for each repository and their submodules. If not provided it will do a shallow clone of all repositories and their submodules.

2) `--fastforward`

If, for some reason, the update process crashes (due to a missing dependency for instance), or is interrupted (through ctrl-c or the like), the `--fastforward` flag will make the update resume form the point it was interrupted last time.


## Resetting the suite to `master`

`node reset-webmaker` will reset all repos to the `master` branch indicated by the `mozilla` remote. This will undo any changes you may have locally made. Note that this does not first `git fetch mozill` to ensure an up to date head, since you may not want this in the slightest. If you wish to forward to the most recent master, use the `node update-webmaker` command instead.

## Browser locations

When running the suite, the following locations are available:

* http://localhost:3000 - login.webmaker.org
* http://localhost:3500 - thimble.webmaker.org
* http://localhost:5000 - makeapi
* http://localhost:5050 - htmlsanitizer.org
* http://localhost:7777 - webmaker.org
* http://localhost:8888 - popcorn.webmaker.org
* http://localhost:12416 - goggles.webmaker.org

# OS-specific information

## Webmaker-Suite on Windows

Windows users will need the vc++ redistributable (2010) installed, which you probably already do (if you actually use windows for applications and games, chances that you already have this installed are pretty good, especially if you also play games on windows), but an easy way to check is to fire up a console and try "npm install sqlite3".

If that runs without problems, you don't need anything c++ related (and you can delete the `node_modules` dir that made).

If you got errors when trying to install sqlite3, you'll need to install one of the vc++ redistributable packages (which one depending on whether you're on 32 bit windows, or 64 bit windows):

1. Microsoft Visual C++ 2010 Redistributable Package (x86), http://www.microsoft.com/en-us/download/details.aspx?id=5555
2. Microsoft Visual C++ 2010 Redistributable Package (x64), http://www.microsoft.com/en-us/download/details.aspx?id=14632

In addition to the vc++ redistributable, MongoDB and Elastic Search require some manual installation, which means putting them in their own folders and extending your PATH:

#### MongoDB on Windows

Download mongodb as a zipfile, create a `MongoDB` folder for it in your program files folder, and copy `mongo.exe`, `mongod.exe` etc. into it. Then add the MongoDB folder to your PATH variable (in windows 7, that's control panel -> system -> advanced system settings -> environment variables -> system variables section).

#### Elastic Search on Windows

Download elastic search, create a folder `C:\elasticsearch` (I am not kidding, ES has the worst restrictions), and unpack the .zip package into it (if this creates a dir `elasticsearch-0.9.20` or something, move everything in that dir up one level, so that the `bin` dir is `c:\elasticsearch\bin`). Elastic Search requires Java, so if you don't have that install, grab the most recent JDK and install it. Then symlink the jdk dir as `c:\java`. Again, I am not joking; ES died on spaces anywhere. To do this, open a `cmd` box with administrative rights, to go `C:\` and type:

`C:\> mklink /D java "c:\Program Files (x86)\Java\jdk1.6.0_17"`

Make sure to use the path to your jdk directory here. If you installed Java jdk version 1.6.0_40 to `C:\Program Files\Java` then it would be this, instead:

`C:\> mklink /D java "c:\Program Files\Java\jdk1.6.0_40"`

(to remove that at some later point, simply delete the `C:\java` dir. It will unlink, rather than delete your jdk files)

Also add `C:\elasticsearch\bin` to your PATH variable.


## Webmaker-Suite on OSX

You will need the X-Code command line utilities (You don't need a full XCode, just the command line utilities are enough). These are free through Apple's developer appstore. You will also want `brew`, http://brew.sh, which is a package manager for OSX.

With these, install mongodb and elasticsearch using `brew`, and you should be all set. Convenient!

(If you elect to run these on startup, you will want to make sure to use `node run --noes --nomongo` when you use the suite runner, or `run.js` will try to double-start ES and MongoDB)

### OSX and MongoDB

Mongodb may have told itself to log to a file, instead of to the console. If it has, starting `mongod` will show you a single line of output stating where it's logging to. If this is all you see when you start up Mongo, open its config file by typing the command `vi /usr/local/etc/mongod.conf`, and remove the logging instruction in that file (cursor-navigate to an offending line, then press `d` twice to delete it. To save and quit, type `:`, then `wq`, then hit enter). You should now get normal console output when running `mongod`, which is essential for the webmaker-suite to run.
