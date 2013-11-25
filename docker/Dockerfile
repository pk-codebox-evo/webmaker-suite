from ubuntu:12.04

ENV DEBIAN_FRONTEND noninteractive

# Add repos for base packages
RUN echo "deb http://us-east-1.ec2.archive.ubuntu.com/ubuntu/ precise main" >> /etc/apt/sources.list
RUN echo "deb-src http://us-east-1.ec2.archive.ubuntu.com/ubuntu/ precise main" >> /etc/apt/sources.list
RUN echo "deb http://us-east-1.ec2.archive.ubuntu.com/ubuntu/ precise-updates main" >> /etc/apt/sources.list
RUN echo "deb-src http://us-east-1.ec2.archive.ubuntu.com/ubuntu/ precise-updates main" >> /etc/apt/sources.list
RUN echo "deb http://us-east-1.ec2.archive.ubuntu.com/ubuntu/ precise universe" >> /etc/apt/sources.list
RUN echo "deb-src http://us-east-1.ec2.archive.ubuntu.com/ubuntu/ precise universe" >> /etc/apt/sources.list

# Add repos for 10gen
RUN apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10
RUN echo 'deb http://downloads-distro.mongodb.org/repo/ubuntu-upstart dist 10gen' | tee /etc/apt/sources.list.d/10gen.list

# Add repo for nodejs
RUN apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv C7917B12
RUN echo 'deb http://ppa.launchpad.net/chris-lea/node.js/ubuntu precise main' | tee /etc/apt/sources.list.d/chrislea.list

# Upstart hack for mongo
RUN dpkg-divert --local --rename --add /sbin/initctl
RUN ln -s /bin/true /sbin/initctl

# Lets have a place to put data
RUN mkdir -p /data/db

# Update and install all of the things
RUN apt-get update
RUN apt-get install -y mongodb-10gen  g++ software-properties-common make python python-pip nodejs git curl wget g++ wget make sudo wget openjdk-7-jre-headless

# Get ES installed
RUN wget https://download.elasticsearch.org/elasticsearch/elasticsearch/elasticsearch-0.90.5.deb
RUN dpkg -i elasticsearch-0.90.5.deb

# We want to run as webmaker, make that user
RUN adduser --system --disabled-password --no-create-home --shell /bin/bash webmaker && adduser webmaker root && adduser webmaker sudo

# As root, git clone into /webmaker-suite
RUN git clone https://github.com/mozilla/webmaker-suite.git

# Install some packages, use allow-root for bower
RUN cd /webmaker-suite && npm install -g bower grunt-cli http-server

# Install the actual webmaker suite and chown
RUN cd /webmaker-suite && /usr/bin/node /webmaker-suite/install-webmaker.js --username=jdotpz --s3key=lol --s3secret=keyboardcat

RUN chown -R webmaker /webmaker-suite

# Settings for starting up
EXPOSE 27017
EXPOSE 3000
EXPOSE 3500
EXPOSE 5000
EXPOSE 5050
EXPOSE 7777
EXPOSE 8888
EXPOSE 9200
EXPOSE 12416
ADD webmaker-service.sh /tmp/webmaker-service.sh
RUN chmod 755 /tmp/webmaker-service.sh
CMD /tmp/webmaker-service.sh