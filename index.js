#!/usr/bin/env node

import chalk from 'chalk';
import inquirer from 'inquirer';
import gradient from 'gradient-string';
import chalkAnimation from 'chalk-animation';
import figlet from 'figlet';

let args = process.argv.slice(2);

let djsVersion;
let projectName;
let useKommando;
let useDisbut;
let useDokdo;

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
    const djsVersions = ['Discord.js v12 (12.5.3 | Recommended)', 'Discord.js v13 (Latest)'];
    const djsver = await inquirer.prompt({
        type: 'list',
        name: 'djsVersion',
        message: 'Please select the Discord.js version you want to use',
        choices: djsVersions,
        default() {
            return djsVersion[0];
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
    if (djsVersion !== '12') {
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

console.clear();
await welcome();
await askProjectName();
await askDjsVersion();
await askUseKommando();
await askUseDokdo();
await askUseDisbut();