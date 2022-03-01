import chalk from 'chalk';
import fs from 'fs';
import { editPackageJson } from './projectInitializer.js';

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

export async function lastProcess(prjdir, rootdir, prjname) {
    // Setup Dotenv
    const dotenvModule = fs.readFileSync(`${rootdir}/modules/common/.env.example`, 'utf8');
    try {
        fs.writeFileSync(`${prjdir}/.env`, dotenvModule);
    } catch {
        console.error(chalk.hex('#FF0000').bold('Failed to create .env') + chalk.hex('#00bcd4').bold('Please try again\n') + chalk.hex('#00bcd4').bold('If the problem persists, create an issue on https://github.com/KommandNyang/discordjs-app-create'));
        process.exit(1);
    } finally {
        console.log(chalk.hex('#00bcd4').bold('Successfully Created .env\n'));
    }

    // Setup .gitignore
    const gitignoreModule = fs.readFileSync(`${rootdir}/modules/common/.gitignore.example`, 'utf8');
    try {
        fs.writeFileSync(`${prjdir}/.gitignore`, gitignoreModule);
    } catch {
        console.error(chalk.hex('#FF0000').bold('Failed to create .gitignore') + chalk.hex('#00bcd4').bold('Please try again\n') + chalk.hex('#00bcd4').bold('If the problem persists, create an issue on https://github.com/KommandNyang/discordjs-app-create'));
        process.exit(1);
    } finally {
        console.log(chalk.hex('#00bcd4').bold('Successfully Created .gitignore\n'));
    }

    // copy created modules
    try {
        fs.copyFileSync(`${rootdir}/modules/main.js`, `${prjdir}/src/main.js`);
    } catch {
        console.error(chalk.hex('#FF0000').bold('Failed to copy module main.js') + chalk.hex('#00bcd4').bold('Please try again\n') + chalk.hex('#00bcd4').bold('If the problem persists, create an issue on https://github.com/KommandNyang/discordjs-app-create'));
        process.exit(1);
    } finally {
        console.log(chalk.hex('#00bcd4').bold('Successfully Copied module main.js\n'));
    }
    if (fs.existsSync(`${rootdir}/modules/main.js`)) {
        fs.unlinkSync(`${rootdir}/modules/main.js`);
    }

    // Write README.md
    const readmeModule = fs.readFileSync(`${rootdir}/modules/common/README.md.example`, 'utf8')
        .replace(/{PROJECT_NAME}/g, prjdir.split("/").slice().pop());
    try {
        fs.writeFileSync(`${prjdir}/README.md`, readmeModule);
    } catch {
        console.error(chalk.hex('#FF0000').bold('Failed to create README.md') + chalk.hex('#00bcd4').bold('Please try again\n') + chalk.hex('#00bcd4').bold('If the problem persists, create an issue on https://github.com/KommandNyang/discordjs-app-create'));
        process.exit(1);
    } finally {
        console.log(chalk.hex('#00bcd4').bold('Successfully Created README.md\n'));
    }

    // Edit package.json

    // Sleep for 3 seconds In case package.json is missing
    await sleep(3000);
    editPackageJson(prjdir, prjname);
}