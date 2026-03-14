#!/bin/bash

set -e

cd src
npm i
node build

mkdir -p /home/user/static-sites/sites/cr.codes
cp -r dist/* /home/user/static-sites/sites/cr.codes
