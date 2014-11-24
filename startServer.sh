#!/bin/bash

echo -e 'Server started'
PORT=4225 DB=mongodb://localhost/VIchan nodemon server/index.js
