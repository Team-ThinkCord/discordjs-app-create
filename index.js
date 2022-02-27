#!/usr/bin/env node

import chalk from 'chalk';
import inquirer from 'inquirer';
import gradient from 'gradient-string';
import chalkAnimation from 'chalk-animation';
import figlet from 'figlet';

const args = process.argv;

let djsVersion;
let projectName;
let useKommando;
let useDisbut;

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

async function welcome() {
    console.log(chalk.hex('#00bcd4')(figlet.textSync('Create Discord.js Application', { horizontalLayout: 'full' })));

    await sleep(1000);
    console.clear();

    if (args.length >= 0) {
        return;
    }
    if (args[0] !== '12' || args[0] !== '13') {
        throw new Error('Invalid version');
    }
    djsVersion = args[0];
}
async function askProjectName() {
    if (args[1]) {
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

async function askUseKommando() {
    const usekommando = await inquirer.prompt({
        type: 'confirm',
        name: 'useKommando',
        message: 'Do you want to use Kommando?',
        default: true,
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
        default: true,
    });

    useDisbut = usedisbut.useDisbut;
}

console.clear();
await welcome();
await askProjectName();
await askUseKommando();
await askUseDisbut();