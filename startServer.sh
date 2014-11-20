#!/bin/bash

echo -e 'Server started'
PORT=3025 DB=mongodb://localhost/VIchan nodemon server/index.js
