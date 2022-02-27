if not exist %PROJECT_DIR% (
    mkdir %PROJECT_DIR%
)

cd %PROJECT_DIR%

npm init --yes

if %DJSVER%==12 (
    npm i discord.js@12
) else (
    npm i discord.js@13
)

if %USEKOMM%==1 (
    npm i discord-kommando.js
)

if %USEDOK% (
    if %DJSVER%==12 (
        npm i dokdo@0.4
    else (
        npm i dokdo@0.5
    )
)

if %USEDISBUT%==1 (
    npm i discord-buttons
)