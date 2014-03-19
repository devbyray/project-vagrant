#!/usr/bin/env bash

apt-get update
apt-get install -y python-software-properties
add-apt-repository -y ppa:chris-lea/nodejs
apt-get update
apt-get install -y nodejs
npm -g install sails