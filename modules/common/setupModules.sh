#!/usr/bin/env sh

[ ! -d ${PROJECT_DIR} ] && mkdir ${PROJECT_DIR}

cd ${PROJECT_DIR}

npm init --yes

if [ ${DJSVER} -eq 12 ]; then
    npm i discord.js@12
else
    npm i discord.js@13
fi

if [ ${USEKOMM} -eq 1 ]; then
    npm i discord-kommando.js
fi

if [ ${USEDOK} -eq 1 ]; then
    if [ ${DJSVER} -eq 12 ]; then
        npm i dokdo@0.4
    else
        npm i dokdo@0.5
    fi
fi

if [ ${USEDISBUT} -eq 1 ]; then
    npm i discord-buttons
fi