import chalk from 'chalk';
import fs from 'fs';

export function kommandoSetup(prjdir, rootdir) {
  if (!fs.existsSync(`${prjdir}/src/commands`)) {
    fs.mkdirSync(`${prjdir}/src/commands`);
  }

  const module = fs.readFileSync(`${rootdir}/modules/common/kommando/test.js`, 'utf8');

  fs.writeFileSync(`${prjdir}/src/commands/test.js`, module);
  console.log(chalk.hex('#00bcd4').bold('Successfully Created src/commands/test.js\n'));
}