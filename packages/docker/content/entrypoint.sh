#!/bin/bash

# common hanging, do nothing
tail -f /dev/null

# start node app
pm2-runtime /app/dist/index.js
