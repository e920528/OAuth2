#!/bin/bash

echo 'installing ' $1

if [ $1 == 'local' ]; then
  ENV='dev'
  CONFIG_LOCATION='./configs/local.js'
elif [ $1 == 'production' ]; then
  ENV = 'prod'
  CONFIG_LOCATION='./configs/production.js'
fi

cp $CONFIG_LOCATION ./config.js

if [ $ENV == 'dev' ]; then
  npm ci
elif [ $ENV == 'prod' ]; then
  npm ci --production
fi

# winston logs directory
mkdir logs
