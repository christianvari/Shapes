#! /bin/bash

rollup ./src/js/start.js --format iife --name "Start" --file ./src/js/build/start.js ;
#rollup ./src/js/credits/startcredits.js --format iife --name "StartCredits" --file ./src/js/build/start_credits.js ;
#rollup ./src/js/startPage/background.js --format iife --name "BackgroundLogin" --file ./src/js/build/background_login.js ;
#rollup ./src/js/registrationPage/background.js --format iife --name "BackgroundRegister" --file ./src/js/build/background_register.js ;

sudo rm -r /opt/lampp/htdocs/* ;
sudo cp -r ./src/* /opt/lampp/htdocs/;

