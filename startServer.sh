#!/bin/bash

echo -e 'Server started'
PORT=3220 DB=mongodb://localhost/VIchan nodemon server/index.js
