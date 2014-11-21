#!/bin/bash

echo -e 'Server started'
PORT=3221 DB=mongodb://localhost/VIchan nodemon server/index.js
