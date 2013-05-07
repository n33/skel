#!/bin/sh

BASEDIR='/var/www/production/skeljs.org/htdocs'

# Clear existing
rm -rf $BASEDIR/*

# index.html
php index.php > $BASEDIR/index.html

# Directories
cp -RL assets $BASEDIR/
cp -RL example $BASEDIR/
cp -RL files $BASEDIR/

# Example zip
zip -q -r -9 $BASEDIR/files/example.zip example/
