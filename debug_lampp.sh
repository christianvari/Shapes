#! /bin/bash

rollup ./src/js/start.js --format iife --name "Start" --file ./src/js/buid/start.js ;
sudo rm -r /opt/lampp/htdocs/* ;
sudo cp -r ./src/* /opt/lampp/htdocs/;

