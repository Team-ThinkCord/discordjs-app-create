import os from 'os';
import chalk from 'chalk';
import * as child from 'child_process';
import * as path from 'path';
import { djsVersions } from './conf.js';
import shelljs from 'shelljs';
import fs from 'fs';

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

/**
 * @param {Object} options
 * @param {string} options.rootdir
 * @param {string} options.prjdir
 */
export const initProject = (options) => {
    console.log(chalk.cyan.bold('Initializing project...'));
    console.log(chalk.cyan.bold(`Operating System : ${os.platform()}`));
    try {
        child.spawn('npm', ['init', '--yes'], {
            cwd: options.prjdir,
            shell: true,
        });

        console.log(chalk.cyan.bold("Initialized Application\n"));

    } catch (e) {
        console.log(e);
        console.error(chalk.red.bold("Setup failed. \n") + chalk.cyan.bold('Please try again\n') + chalk.cyan.bold('If the problem persists, create an issue on https://github.com/Team-ThinkCord/discordjs-app-create'));
        process.exit(1);
    }
}

export const editPackageJson = (prjdir, prjname) => {
    let packageJson;
    try {
        let pkgjson = fs.readFileSync(`${prjdir}/package.json`, 'utf8');
        packageJson = JSON.parse(pkgjson);
    } catch (e) {
        console.log(e);
        console.error(chalk.red.bold("Setup failed. \n") + chalk.cyan.bold('Please try again\n') + chalk.cyan.bold('If the problem persists, create an issue on https://github.com/Team-ThinkCord/discordjs-app-create'));
        process.exit(1);
    }
    if (prjname === ".") {
        let dir_ = path.basename(prjdir.replace(`${os.platform === 'win32' ? '\\.' : '/.'}`, ''));
        packageJson.name = dir_;
    } else {
        packageJson.name = prjname;
    }
    packageJson.scripts.start = "node .";
    packageJson.main = "src/main.js";

    try {
        fs.writeFileSync(`${prjdir}/package.json`, JSON.stringify(packageJson));
    } catch (e) {
        console.log(e)
        console.error(chalk.red.bold('Failed to edit package.json') + chalk.cyan.bold('Please try again\n') + chalk.cyan.bold('If the problem persists, create an issue on https://github.com/Team-ThinkCord/discordjs-app-create'));
        process.exit(1);
    } finally {
        console.log(chalk.cyan.bold('Edited package.json!\n'));
    }
}

/**
 * @param {Object} options
 * @param {string} options.rootdir
 * @param {string} options.prjdir
 * @param {string} options.djsVersion
 * @param {string} options.prjname
 * @param {boolean} options.useDisbut
 * @param {boolean} options.useDokdo
 * @param {boolean} options.useKommando
 */
export async function installModules(options) {
    let djs;
    let dokdo;
    let kommando;
    let disbut;

    if (options.djsVersion === djsVersions[0]) {
        djs = 'discord.js@12.5.3';
    } else {
        djs = 'discord.js@latest'
    }

    if (options.useKommando) {
        kommando = 'discord-kommando.js@latest';
    }

    if (options.useDokdo) {
        if (options.djsVersion === djsVersions[0]) {
            dokdo = 'dokdo@djsv12';
        } else {
            dokdo = 'dokdo@latest';
        }
    }

    if (options.useDisbut) {
        disbut = 'discord-buttons@4.0.0';
    }

    child.spawn('npm', ['install', 'dotenv', djs, dokdo, kommando, disbut], {
        cwd: options.prjdir,
        shell: true,
    });
}