#!/bin/bash

echo -e 'Server started'
PORT=3002 DB=mongodb://localhost/VIchan nodemon server/index.js