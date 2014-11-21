#!/bin/bash

echo -e 'Server started'
PORT=4222 DB=mongodb://localhost/VIchan nodemon server/index.js
