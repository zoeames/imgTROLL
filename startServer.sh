#!/bin/bash

echo -e 'Server started'
PORT=3224 DB=mongodb://localhost/VIchan nodemon server/index.js
