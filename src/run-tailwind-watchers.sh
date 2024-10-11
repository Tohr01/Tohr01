#!/usr/bin/env bash

tailwind_watcher_scripts=("backupschedule/tailwind-watch.sh" "templates/tailwind-watch.sh" "tailwind-watch.sh");
function cleanupScreens() {
    echo "Quitting screens";
    # https://stackoverflow.com/a/12907609
    screen -ls | awk -vFS='\t|[.]' '/tailwind/ {system("screen -S "$2" -X quit")}';
}

cd "$(dirname "$0")";
for script in "${tailwind_watcher_scripts[@]}"; do
    echo "Starting screen with runner script: $script";
    screen -dm -S "tailwind" bash "$script";
done

trap cleanupScreens EXIT
while true; do sleep 86400; done