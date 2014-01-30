# Webmaker Suite Vagrant for AWS Setup Guide

## Specifications
* This is running ubuntu 12.04 precise 64bit, so you will need a 64bit computer to use this image.
* This is using 10gen-mongo, and elasticsearch 0.95.0.
* App files are stored in /home/vagrant/webmaker-suite


* NOTE: This is in alpha, please be patient and submit bugs in bugzilla to webmaker :: devops or by email to jp@mozillafoundation.org

## Preflight

Make sure you have the following prerequisites installed:

* vagrant (http://www.vagrantup.com/downloads.html)
* vagrant AWS plugin.  With vagrant installed, simply run vagrant plugin install vagrant-aws
* You will need an AWS account, your AWS keys/secret keys, and an AWS keypair (ssh)
* You will need to create a security group which allows the following ports:  3000, 3500, 5000, 5050, 7777, 8888, 9200, 12416, and 27017

## Steps after preflight

**Step 1**: Place the Vagrantfile and metadata.json files from this directory in a local directory you want to run your webmaker-suite AWS server from. (for example, /Users/myusername/vagrant/webmaker-suite on MacOSX)

**Step 2**: Edit the Vagrantfile, filling in the appropriate sections, including: aws.access_key_id, aws.secret_access_key, aws.keypair_name.  Additionally, enter the name of your AWS EC2 security group in for aws.security_groups and the location of your ssh keypair for override.ssh.private_key_path

**Step 3**: Inside the directory where both your Vagrantfile and metadata.json file exist, issue the following command:
tar cvzf webmakersuite.box ./Vagrantfile ./metadata.json

**Step 4**: Now, you will need to add this box to vagrant with the following command:
vagrant box add webmakersuite-aws ./webmakersuite.box

**Step 5**: In your terminal.app or cmd.exe window, in the same directory, you can now issue the following command to start a new vagrant AWS instance:
vagrant up --provider=aws

**Step 6**: After the vagrant instance has completed importing and starting, issue the command vagrant ssh into your terminal.app or cmd.exe window

**Step 7**: (Slightly optional) Use the webmaker-suite/add-remote.js to point the github remote repo to a fork in your account and AWS secrets.  To update webmaker-suite (lengthy process) use the update-webmaker.js script

**Step 8**: Issue the command ./start-ebmaker-suite.sh from within the running vagrant instance you have ssh'd into
This will start all relevant processes.  You will be able to access them via the following urls:
  * http://HOST-URL:3000 - login.webmaker.org
  * http://HOST-URL:3500 - thimble.webmaker.org
  * http://HOST-URL:5000 - makeapi
  * http://HOST-URL:5050 - htmlsanitizer.org
  * http://HOST-URL:7777 - webmaker.org
  * http://HOST-URL:8888 - popcorn.webmaker.org
  * http://HOST-URL:12416 - goggles.webmaker.org

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

* http://HOST-URL:3000 - login.webmaker.org
* http://HOST-URL:3500 - thimble.webmaker.org
* http://HOST-URL:5000 - makeapi
* http://HOST-URL:5050 - htmlsanitizer.org
* http://HOST-URL:7777 - webmaker.org
* http://HOST-URL:8888 - popcorn.webmaker.org
* http://HOST-URL:12416 - goggles.webmaker.org

