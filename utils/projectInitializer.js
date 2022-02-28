import os from 'os';
import chalk from 'chalk';
import * as child from 'child_process';
import * as path from 'path';

/*
   TODO : 
   - run setupModules.bat or setupModules.sh
   - edit projectName in package.json
   - add .env file
   - add .gitignore file
 */
const initProject = (options) => {
    if (os.platform() === "win32") {
        try {
            let chp = child.execSync(`start ${__dirname}\\..\\modules\\common\\setupModules.bat`, {
                env: {
                    PROJECT_DIR: path.isAbsolute(options.prjdir) ? options.prjdir : process.cwd() + "\\" + options.prjdir,
                    DJSVER: options.djsVersion,
                    USEKOMM: options.useKommando,
                    USEDOK: options.useDokdo,
                    USEDISBUT: options.useDisbut
                }
            });

            console.log(chalk.cyan("Module setup succeeded."));
        } catch {
            console.error(chalk.red("Setup failed. \n") + child.cyan("Create an issue on https://github.com/KommandNyang/discordjs-app-create"));
        }
    } else {
        try {
            let chp = child.execSync(`sh ${__dirname}/../modules/common/setupModules.bat`, {
                env: {
                    PROJECT_DIR: path.isAbsolute(options.prjdir) ? options.prjdir : process.cwd() + "\\" + options.prjdir,
                    DJSVER: options.djsVersion,
                    USEKOMM: options.useKommando,
                    USEDOK: options.useDokdo,
                    USEDISBUT: options.useDisbut
                }
            });

            console.log(chalk.cyan("Module setup succeeded."));
        } catch {
            console.error(chalk.red("Setup failed. \n") + child.cyan("Create an issue on https://github.com/KommandNyang/discordjs-app-create"));
        }
    }
}

module.exports = initProject;
