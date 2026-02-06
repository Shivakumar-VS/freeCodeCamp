#!/usr/bin/env bash

set -eux

WP_PATH="$1"
echo "\
USER_UID=$(id -u $USER)
WP_PATH=$WP_PATH
" > .devcontainer/.env
