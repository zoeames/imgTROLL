#!/bin/bash

echo  -e "\nlogin"
curl  -s -X POST -H "Content-Type: application/json" -d '{"email": "bob@aol.com", "password": "1234"}' http://localhost:8080/login

echo  -e "\nregister"
curl  -s -X POST -H "Content-Type: application/json" -d '{"email": "ren@aol.com", "password": "1234"}' http://localhost:8080/register
