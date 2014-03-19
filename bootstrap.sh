#!/usr/bin/env bash

apt-get update
apt-get install -y python-software-properties
add-apt-repository -y ppa:chris-lea/node.js
apt-get update
apt-get install -y nodejs
npm install -g sails
apt-get install -y build-essential
npm install -g bcrypt
sudo apt-get install ruby
sudo apt-get install rubygems
