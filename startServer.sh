#!/bin/bash

echo -e 'Server started'
PORT=3005 DB=mongodb://localhost/VIchan nodemon server/index.js
