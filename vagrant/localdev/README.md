# Webmaker Suite Vagrant Setup Guide

## Specifications
* This is running ubuntu 12.04 precise 64bit, so you will need a 64bit computer to use this image.
* This is using 10gen-mongo, and elasticsearch 0.95.0.
* App files are stored in /home/vagrant/webmaker-suite

* NOTE: This is in alpha, please be patient and submit bugs in bugzilla to webmaker :: devops or by email to jp@mozillafoundation.org

## Preflight

Make sure you have the following prerequisites installed:

* VirtualBox (https://www.virtualbox.org/wiki/Downloads)
* vagrant (http://www.vagrantup.com/downloads.html)

## Steps after preflight

**Step 1**: Place this Vagrantfile in a directory you want to run your webmaker-suite dev server from. (for example, /Users/myusername/vagrant/webmaker-suite on MacOSX)

**Step 2**: In your terminal.app or cmd.exe window, cd to the directory you placed the Vagrantfile in (/Users/myusername/vagrant/webmaker-suite on MacOSX in the example above) and run the command `vagrant up`  (Note: this may download a file ~1.7gb, so this may take some time.)

**Step 3**: After the vagrant instance has completed importing and starting, issue the command `vagrant ssh` into your terminal.app or cmd.exe window

**Step 4**: (Slightly optional) Use the webmaker-suite/add-remote.js to point the github remote repo to a fork in your account and AWS secrets.  To update webmaker-suite (lengthy process) use the update-webmaker.js script

**Step 5**: Issue the command ./start-webmaker.sh from within the running vagrant instance you have ssh'd into
This will start all relevant processes.  You will be able to access them via the following urls:
  * http://localhost:3000 - login.webmaker.org
  * http://localhost:3500 - thimble.webmaker.org
  * http://localhost:5000 - makeapi
  * http://localhost:5050 - htmlsanitizer.org
  * http://localhost:7777 - webmaker.org
  * http://localhost:8888 - popcorn.webmaker.org
  * http://localhost:12416 - goggles.webmaker.org

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

