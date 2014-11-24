#!/bin/bash

echo -e 'Server started'
PORT=4227 DB=mongodb://localhost/VIchan nodemon server/index.js
