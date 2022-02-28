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
 * @param {string} options.djsVersion
 * @param {string} options.prjname
 * @param {boolean} options.useDisbut
 * @param {boolean} options.useDokdo
 * @param {boolean} options.useKommando
 */
export const initProject = (options) => {
    console.log(chalk.cyan.bold('Initializing project...'));
    console.log(chalk.cyan.bold(`Operating System : ${os.platform()}`));
    if (os.platform() === "win32") {
        console.log(chalk.cyan.bold('Running setupModules.cmd'));
        try {
            let chp = child.execSync(`start ${options.rootdir}\\modules\\common\\setupModules.cmd`, {
                env: {
                    PROJECT_DIR: path.isAbsolute(options.prjdir) ? options.prjdir : process.cwd() + "\\" + options.prjdir,
                    DJSVER: options.djsVersion === djsVersions[0] ? 12 : 13,
                    USEKOMM: options.useKommando ? 1 : 0,
                    USEDOK: options.useDokdo ? 1 : 0,
                    USEDISBUT: options.useDisbut ? 1 : 0
                }
            });
        } catch (e) {
            console.log(e);
            console.error(chalk.red.bold("Setup failed. \n") + chalk.cyan.bold('Please try again\n') + chalk.cyan.bold('If the problem persists, create an issue on https://github.com/KommandNyang/discordjs-app-create'));
            process.exit(1);
        } finally {
            editPackageJson(options.prjdir, options.prjname);
            console.log(chalk.cyan.bold("Module setup succeeded.\n"));
        }
    } else {
        try {
            child.spawn('npm', ['init', '-y'], {
                cwd: options.prjdir,
                shell: true,
            });

            child.spawn('npm', ['install', 'dotenv'], {
                cwd: options.prjdir,
                shell: true,
            });

            if (options.useKommando) {
                child.spawn('npm', ['install', 'discord-kommando.js@latest'], {
                    cwd: options.prjdir,
                    shell: true,
                });
            }

            if (options.useDokdo) {
                if (options.djsVersion === djsVersions[0]) {
                    child.spawn('npm', ['install', 'dokdo@djsv12'], {
                        cwd: options.prjdir,
                        shell: true,
                    });
                } else {
                    child.spawn('npm', ['install', 'dokdo@latest'], {
                        cwd: options.prjdir,
                        shell: true,
                    });
                }
            }

            if (options.useDisbut) {
                child.spawn('npm', ['install', 'discord-disbut.js@latest'], {
                    cwd: options.prjdir,
                    shell: true,
                });
            }

            if (options.djsVersion === djsVersions[0]) {
                child.spawn('npm', ['install', 'discord.js@12.5.3'], {
                    cwd: options.prjdir,
                    shell: true,
                });
            } else {
                child.spawn('npm', ['install', 'discord.js@latest'], {
                    cwd: options.prjdir,
                    shell: true,
                });
            }

            console.log(chalk.cyan.bold('Running setupModules.sh'));

            console.log(chalk.cyan.bold("Module setup succeeded.\n"));

            sleep(3000);
            editPackageJson(options.prjdir, options.prjname);
        } catch (e) {
            console.log(e);
            console.error(chalk.red.bold("Setup failed. \n") + chalk.cyan.bold('Please try again\n') + chalk.cyan.bold('If the problem persists, create an issue on https://github.com/KommandNyang/discordjs-app-create'));
            process.exit(1);
        }
    }
}

export const editPackageJson = (prjdir, prjname) => {
    let packageJson;
    try {
        let pkgjson = fs.readFileSync(`${prjdir}/package.json`, 'utf8');
        packageJson = JSON.parse(pkgjson);
    } catch (e) {
        console.log(e);
        console.error(chalk.red.bold("Setup failed. \n") + chalk.cyan.bold('Please try again\n') + chalk.cyan.bold('If the problem persists, create an issue on https://github.com/KommandNyang/discordjs-app-create'));
        process.exit(1);
    }
    packageJson.name = prjname;
    packageJson.scripts.start = "node .";
    packageJson.main = "src/main.js";

    try {
        fs.writeFileSync(`${prjdir}/package.json`, JSON.stringify(packageJson));
    } catch (e) {
        console.log(e)
        console.error(chalk.red.bold('Failed to edit package.json') + chalk.cyan.bold('Please try again\n') + chalk.cyan.bold('If the problem persists, create an issue on https://github.com/KommandNyang/discordjs-app-create'));
        process.exit(1);
    } finally {
        console.log(chalk.cyan.bold('Edited package.json!\n'));
    }
}