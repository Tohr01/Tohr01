#!/usr/bin/env bash
cd "$(dirname "$0")"

npx tailwindcss -i index-src.css -o index-dist.css --watch --minify &
npx tailwindcss -i backupschedule/index-src.css -o backupschedule/index-dist.css --watch --minify &
npx tailwindcss -i templates/navigation-src.css -o  templates/navigation-dist.css --watch --minify

wait