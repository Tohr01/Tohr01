#!/bin/bash
cd "$(dirname "$0")"
cd ..
npx tailwindcss -c backupschedule/tailwind.config.js -i backupschedule/index-src.css -o backupschedule/index-dist.css --watch --minify
