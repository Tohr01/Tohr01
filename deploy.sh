#!/bin/bash
set -e

DEPLOY_DIR="/home/user/static-sites/sites/cr.codes"
STAGING_DIR_NAME="_staging"

echo "Pulling latest changes from git..."
git pull

cd src
echo "Installing dependencies and building the project..."
npm i && node build

echo "Preparing staging directory..."
rm -rf "$STAGING_DIR_NAME"
mkdir -p "$STAGING_DIR_NAME"

echo "Copying built files to staging directory..."
cp -r dist/. "$STAGING_DIR_NAME"

echo "Removing old files from deployment directory..."
rm -rf "$DEPLOY_DIR"

echo "Moving new files to deployment directory..."
mv "$STAGING_DIR_NAME" "$DEPLOY_DIR"

echo "Cleaning up dist directory..."
rm -rf dist

echo "Deployment complete!"
