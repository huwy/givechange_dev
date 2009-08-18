#!/bin/sh
#resets database

cd ~/givechange/www/givechange/www
rake db:drop
rake db:create
rake db:migrate
