#!/bin/bash

set -e

cd src
npm i
node build

cp -r dist/* /home/user/static-sites/sites/cr.codes
