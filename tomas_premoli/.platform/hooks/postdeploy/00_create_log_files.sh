#!/bin/bash


DJANGO_LOG_FILE_PATH="/var/log/django.log"
DJANGO_LOG_FILE_DIR=$(dirname "$DJANGO_LOG_FILE_PATH")

# Check if the directory exists
if [ ! -d "$DJANGO_LOG_FILE_DIR" ]; then
    mkdir -p "$DJANGO_LOG_FILE_DIR"
    chown webapp:webapp "$DJANGO_LOG_FILE_DIR"
fi

# Check if the file exists
if [ -f "$DJANGO_LOG_FILE_PATH" ]; then
    echo "$DJANGO_LOG_FILE_PATH exists"
else
    # create log file
    touch "$DJANGO_LOG_FILE_PATH"
fi

# set log file owner (we are currently "root", but the app runs as "webapp")
chown webapp:webapp "$DJANGO_LOG_FILE_PATH"
sudo chmod 755 "$DJANGO_LOG_FILE_DIR"
