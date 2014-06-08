#!/usr/bin/env bash

cd "`dirname "$0"`"
git pull
bundle exec middleman build
