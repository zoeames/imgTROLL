#!/bin/sh

echo -e "\nhome page"
curl -s localhost:8080

echo -e "\nabout page"
curl -s localhost:8080/about

echo -e "\ncreate priority"
curl -s -X POST -H "Content-Type: application/json" -d '{"name":"high", "color":"#ffcc33", "value":10}' localhost:8080/priorities

echo -e "\nall priorities"
curl -s localhost:8080/priorities

echo -e "\ncreate task"
curl -s -X POST -H "Content-Type: application/json" -d '{"name":"get milk", "dueDate":"3/5/2015", "isComplete":false, "priority": "546abac53dfd24f59c2005d2"}' localhost:8080/tasks

echo -e "\nall tasks"
curl -s localhost:8080/tasks

echo -e "\none task"
curl -s localhost:8080/tasks/546ad38440352068b79e12fa

echo -e "\ndelete task"
curl -s -X DELETE localhost:8080/tasks/546ad982a0e8654abe2f487c

echo -e "\nupdate task"
curl -s -X PUT -H "Content-Type: application/json" -d '{"isComplete":true}' localhost:8080/tasks/546ad38440352068b79e12fa
