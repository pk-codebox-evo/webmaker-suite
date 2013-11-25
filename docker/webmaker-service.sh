#!/bin/bash
nohup /usr/share/elasticsearch/bin/elasticsearch -f &
nohup /usr/bin/mongod --smallfiles &
cd /webmaker-suite
sudo -u webmaker node run --noes --nomongo