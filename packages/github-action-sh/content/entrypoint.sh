#!/bin/sh -l

TAG=${GITHUB_REF##*/}-${GITHUB_RUN_ID}-$(date +"%s")

echo "$USER"
