#!/bin/sh
#resets test database

cd ~/givechange/www/givechange/www
mysql -u root -p
drop database givechange_test
create database givechange_test
exit
cd ~/givechange/www/givechange/www
rake db:test:prepare
