#!/usr/bin/env bash

# Install git
apt-get install -y git

# Install pip (for python)
wget -P . http://python-distribute.org/distribute_setup.py
python distribute_setup.py
rm distribute_setup.py
easy_install pip

# Install latest node.js
apt-get update
apt-get install -y python-software-properties python g++ make
add-apt-repository ppa:chris-lea/node.js
apt-get update
apt-get install -y nodejs

# Install and run elastic search
apt-get install openjdk-7-jre-headless -y
wget https://download.elasticsearch.org/elasticsearch/elasticsearch/elasticsearch-0.90.0.deb
dpkg -i elasticsearch-0.90.0.deb
rm elasticsearch-0.90.0.deb
service elasticsearch start

# Install and run mongodb
apt-get install -y mongodb

# Run the webmaker install script
cd /vagrant
node install-webmaker.js

# Fire up the webmaker suite (note that ES and MongoDB are already running now):
# node run --noes --nomongo
