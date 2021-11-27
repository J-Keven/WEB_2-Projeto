#!/bin/bash
yarn start:dev &

/docker-entrypoint.sh

nginx -g "daemon off;"
