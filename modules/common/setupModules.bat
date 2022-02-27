cd %PROJECT_DIR%

npm init --yes

IF %DJSVER%==12 (
    npm i discord.js@12
) ELSE (
    npm i discord.js@13
)

IF %USEKOMM%==1 (
    npm i discord-kommando.js
)

IF %USEDOK% (
    IF %DJSVER%==12 (
        npm i dokdo@0.4
    ELSE (
        npm i dokdo@0.5
    )
)

IF %USEDISBUT%==1 (
    npm i discord-buttons
)