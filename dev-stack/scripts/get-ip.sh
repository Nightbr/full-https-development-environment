#!/bin/bash

# Get host IP address

if [ "$(uname)" = "Darwin" ];then
    ifconfig en0 | grep "inet "| cut -d ' ' -f 2
else
    ip route get 1.2.3.4 | awk '{print $7}'
fi
