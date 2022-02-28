#!/usr/bin/env sh
[ ! -d  ${PROJECT_DIR} ] && mkdir ${PROJECT_DIR}
cd ${PROJECT_DIR}
npm init --yes
npm i dotenv@latest
if [ ${DJSVER} -eq 12 ]; then
    npm i discord.js@12.5.3
else
    npm i discord.js@latest
fi

if [ ${USEKOMM} -eq 1 ]; then
    npm i discord-kommando.js@latest
fi

if [ ${USEDOK} -eq 1 ]; then
    if [ ${DJSVER} -eq 12 ]; then
        npm i dokdo@djsv12
    else
        npm i dokdo@latest
    fi
fi

if [ ${USEDISBUT} -eq 1 ]; then
    npm i discord-buttons@latest
fi