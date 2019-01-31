#! /bin/bash

rollup ./src/js/start.js --format iife --name "Start" --file ./src/js/build/start.js ;
rollup ./src/js/credits/startcredits.js --format iife --name "StartCredits" --file ./src/js/build/start_credits.js ;
rollup ./src/js/startPage/background.js --format iife --name "BackgroundLogin" --file ./src/js/build/background_login.js ;
rollup ./src/js/registrationPage/background.js --format iife --name "BackgroundRegister" --file ./src/js/build/background_register.js ;

javascript-obfuscator ./src/js/build/start.js --output ./src/js/build/start.js --compact true
javascript-obfuscator ./src/js/build/start_credits.js --output ./src/js/build/start_credits.js --compact true
javascript-obfuscator ./src/js/build/background_login.js --output ./src/js/build/background_login.js --compact true
javascript-obfuscator ./src/js/build/background_register.js --output ./src/js/build/background_register.js --compact true

#sudo rm -r /opt/lampp/htdocs/* ;
#sudo cp -r ./src/* /opt/lampp/htdocs/;

