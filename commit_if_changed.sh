#!/bin/bash
cd ~/Dropbox/Code/personal-projects/bolao 
if [ "$(git status -s)" ] ; then
   echo "Changes detected. Commiting."
   git add .
   git commit -m "update tabelaB.json"
else
   echo "No changes detected. Commit canceled."
fi