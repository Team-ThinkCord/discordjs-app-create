import * as fs from 'fs';
import * as onmsg from './onMessages.js';
import chalk from 'chalk';
import { djsVersions } from './conf.js';

/**
 * @param {string} module
 * @param {string} djsVersion
 * @param {boolean} useKommando
 * @param {boolean} useDisbut
 * @param {boolean} useDokdo
 * @param {string} botPrefix
 * @param {string} prjdir
 * @param {string} rootdir
 */
export function createSampleModule(module, djsVersion, useKommando, useDisbut, useDokdo, botPrefix, prjdir, rootdir) {
    const onMessage = `${djsVersion === djsVersions[0] ? onmsg.v12OnMessage : onmsg.latestOnMessage}`;

    const code =

        `${module}\n\n` +
        `${useKommando ? `const kommando = require('discord-kommando.js');\n` : ''}` +
        `${useDisbut ? `const Disbut = require('discord-buttons');\n` : ''}` +
        `${useDokdo ? `const Dokdo = require('dokdo');\n` : ''}` +
        `${useKommando || useDokdo ? `const prefix = '${botPrefix}';\n\n` : ''}` +
        `${useKommando ? `const options = {}; // Kommando Options \n\n` + `// Setup Kommando \nkommando.setupKommando('src/commands', prefix, options);\n\n` : ''}` +
        `${useDokdo ? `// Setup Dokdo \nconst DokdoHandler = new Dokdo(client, { aliases: ['dokdo', 'dok'], prefix: prefix });\n\n` : ''}` +
        `${useDisbut ? `// Setup Disbut \ndisbut(client);\n\n` : ''}` +
        `client.on('ready', () => {\n` +
        `\tconsole.log(\`Logged in as \${client.user.tag}!\`);\n` +
        `});\n\n` +
        `${onMessage}\n` +
        `${useKommando ? `\t// Handle Kommando \n\t kommando.CommandHandler(message);\n\n` : ''}` +
        `${useDokdo ? `\t// Handle Dokdo \n\tDokdoHandler.handle(message);\n` : ''}` +
        `});\n\n` +
        `client.login(process.env.TOKEN);`


    try {
        fs.writeFileSync(`${rootdir}/modules/main.js`, code);
    } catch {
        console.error(chalk.red('Error While Creating main.js') + chalk.cyan('Please try again\n') + chalk.cyan('If the problem persists, create an issue on https://github.com/KommandNyang/discordjs-app-create'));
        process.exit(1);
    } finally {
        console.log(chalk.hex('#00bcd4').bold('Created Sample Module: main.js!\n'));
        console.log(chalk.hex('#00bcd4').bold('Edited Sample Module: main.js!\n'));
    }
}