#!/bin/bash
cd "$(dirname "$0")"
cd ..
npx tailwindcss -c templates/tailwind.config.js -i templates/navigation-src.css -o templates/navigation-dist.css --watch --minify
