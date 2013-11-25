# Webmaker Suite bootstrap/installation script

## Building your Vagrant image
* First, be sure vagrant is installed
* Place the contents of Vagrantfile into /path/to/Vagrantfile
* cd /path/to
* vagrant up
This will pull down the docker base image, running Ubuntu 12.04 with Docker preinstalled and all mods made to allow ulimit correctly for MongoDB
* vagrant ssh

## Using Docker to install webmaker-suite after vagrant ssh'd in
* Place the contents of Dockerfile in this directory in your home directory
* Place the contents of webmaker-service.sh in this directory in your home directory
* Run the following command:  sudo docker build -t webmakersuite .
* Grab a coffee, this will take a while.  Toward the end, you should see:
Step 36 : RUN chmod 755 /tmp/webmaker-service.sh
 ---> Running in 3715a4b435ab
 ---> 2e0d0a75c1f6
Step 37 : CMD /tmp/webmaker-service.sh
 ---> Running in 6faefe6efed4
 ---> df0f1aaf76a2
Successfully built df0f1aaf76a2

## Running your newly created Docker instance
* chmod 755 ./start-webmaker-suite.sh
* ./start-webmaker-suite.sh


