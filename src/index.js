#!/usr/bin/env node

import chalk from 'chalk';
import inquirer from 'inquirer';
import gradient from 'gradient-string';
import chalkAnimation from 'chalk-animation';
import figlet from 'figlet';
import { createSpinner } from 'nanospinner';

const args = process.argv;

let djsVersion;
let projectName;
let useKommando;
let useDisbut;

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

async function welcome() {
    if (args.length >= 0) {
        return;
    }
    if (args[0] !== '12' || args[0] !== '13') {
        throw new Error('Invalid version');
    }
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
    if (djsVersion === '12') {
        return
    }
    const usedisbut = await inquirer.prompt({
        type: 'confirm',
        name: 'useDisbut',
        message: 'Do you want to use Disbut?',
        default: true,
    });

}