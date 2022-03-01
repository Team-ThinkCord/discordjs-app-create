#!/usr/bin/env node

import chalk from 'chalk';
import inquirer from 'inquirer';
import gradient from 'gradient-string';
import chalkAnimation from 'chalk-animation';
import figlet from 'figlet';
import * as fs from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import * as createModule from './utils/createModule.js';
import * as createPackage from './utils/projectInitializer.js';
import * as createKommando from './utils/setupKommando.js';
import * as lastProcess from './utils/last.js';
import { djsVersions } from './utils/conf.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

let args = process.argv.slice(2);

let djsVersion;
let projectName;
let useKommando;
let useDisbut;
let useDokdo;
let botPrefix;

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

async function welcome() {
    console.log(chalk.hex('#00bcd4')(figlet.textSync('Create Discord.js Application', { horizontalLayout: 'full' })));

    await sleep(1000);
    console.clear();
}

async function askProjectName() {
    if (args[0]) {
        projectName = args[0];
        return;
    }
    const prj = await inquirer.prompt({
        type: 'input',
        name: 'projectName',
        message: 'What is the name of your project?',
        default() {
            return 'my-project';
        },
    });
    projectName = prj.projectName;
}

async function askDjsVersion() {
    const djsver = await inquirer.prompt({
        type: 'list',
        name: 'djsVersion',
        message: 'Please select the Discord.js version you want to use (use arrow keys for select)',
        choices: djsVersions,
        default() {
            return djsVersions[0];
        },
    });
    djsVersion = djsver.djsVersion;
}

async function askUseKommando() {
    const usekommando = await inquirer.prompt({
        type: 'confirm',
        name: 'useKommando',
        message: 'Do you want to use Discord-Kommando.js?',
        default() {
            return true;
        },
    });

    useKommando = usekommando.useKommando;
}

async function askUseDisbut() {
    if (djsVersion !== djsVersions[0]) {
        return
    }
    const usedisbut = await inquirer.prompt({
        type: 'confirm',
        name: 'useDisbut',
        message: 'Do you want to use Disbut?',
        default() {
            return true;
        },
    });

    useDisbut = usedisbut.useDisbut;
}

async function askPrefix() {
    const prefix = await inquirer.prompt({
        type: 'input',
        name: 'prefix',
        message: 'What is the prefix of your bot?',
        default() {
            return '!';
        },
    });
    botPrefix = prefix.prefix;
}

async function askUseDokdo() {
    const usedokdo = await inquirer.prompt({
        type: 'confirm',
        name: 'useDokdo',
        message: 'Do you want to use Dokdo?',
        default() {
            return true;
        },
    });

    useDokdo = usedokdo.useDokdo;
}

function fileExists(dir, file) {
    let prjdir = `${process.cwd()}/${projectName}`
    if (dir.startsWith('/')) {
        dir.slice(1);
    }
    if (dir.endsWith('/')) {
        dir.slice(0, -1);
    }
    return fs.existsSync(`${prjdir}/${dir}/${file}`);
}


async function createProject() {
    console.clear();
    console.log(chalk.hex('#00bcd4').bold('Attempting to Create project...\n'));

    let dir = `${process.cwd()}/${projectName}`

    if (!fs.existsSync(dir)) {
        fs.mkdir(dir, (err) => {
            if (err) throw err;
            console.log(chalk.hex('#00bcd4').bold('Successfully Created project directory!\n'));
        });
        
        await sleep(500);
    }

    fs.readdirSync(dir).forEach((file) => {
        if (file === 'package.json') {
            console.log(chalk.hex('#FF0000').bold('It seems that the NodeJS project already exists in that folder'));
            process.exit();
        }
    });

    if (!fs.existsSync(`${dir}/src`)) {
        console.log(chalk.hex('#00bcd4').bold('Attempting to Make Directory...\n'));

        fs.mkdir(`${dir}/src`, (err) => {
            if (err) throw err;
            console.log(chalk.hex('#00bcd4').bold(`Successfully Created ${dir}/src/ !\n`));
        });
        
        await sleep(500);
    }

    console.log(chalk.hex('#00bcd4').bold('Attempting to Create src/main.js...\n'));

    // Check is src/main.js exists
    if (fileExists('src', 'main.js')) {
        console.log(chalk.hex('#FF0000').bold('It seems that the src/main.js already exists in that folder'));
        process.exit();
    }

    const module = fs.readFileSync(`${__dirname}/modules/${djsVersion === djsVersions[0] ? 'v12' : 'latest'}/main.js`, 'utf8');
    createModule.createSampleModule(module, djsVersion, useKommando, useDisbut, useDokdo, botPrefix, dir, __dirname);
    createPackage.initProject({
        djsVersion: `${djsVersion === djsVersions[0] ? '12' : '13'}`,
        prjdir: dir,
        rootdir: __dirname,
        useDisbut: useDisbut,
        useDokdo: useDokdo,
        useKommando: useKommando,
        prjname: projectName,
    });

    await sleep(3000);
    await createPackage.installModules({
        rootdir: __dirname,
        prjdir: dir,
        djsVersion: djsVersion,
        prjname: projectName,
        useDisbut: useDisbut,
        useDokdo: useDokdo,
        useKommando: useKommando,
    });

    // Make cli app to wait for modules to install
    await sleep(15000);

    createKommando.kommandoSetup(dir, __dirname);
    await lastProcess.lastProcess(dir, __dirname, projectName);

    await sleep(3000);
}

async function finish() {
    console.clear();
    console.log(chalk.hex('#00bcd4').bold("Successfully created Discord.js application!\n\n"));

    console.log(chalk.hex('#00bcd4').bold('_________________________________________________________________________'));
    console.log(chalk.hex('#00bcd4').bold("'npm run start' or 'node .' to run application!\n\n"));
    console.log(chalk.hex('#00bcd4').bold("Thanks for using our CLI App!"));
    console.log(chalk.hex('#00bcd4').bold('(If this process doesn\'t finish automatically, that means modules are not installed yet, then please wait for it)'));
    console.log(chalk.hex('#00bcd4').bold('-------------------------------------------------------------------------'));
}

process.on('exit', () => {
    const exists = fs.existsSync(`${__dirname}/modules/main.js`);
    if (exists) {
        fs.unlinkSync(`${__dirname}/modules/main.js`);
    }
});

console.clear();
await welcome();
await askProjectName();
await askDjsVersion();
await askUseKommando();
await askPrefix();
await askUseDokdo();
await askUseDisbut();
await createProject();
await finish();