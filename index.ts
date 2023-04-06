import { Command } from 'commander';
import packageJson from './package.json';
import chalk from 'chalk';
import { mkdir, unlink } from 'fs/promises';
import tar from 'tar';
import { join } from 'path';
import { tmpdir } from 'os';
import { pipeline } from 'stream/promises';
import got from 'got';
import { createWriteStream } from 'fs';
import prompts from 'prompts';

async function downloadTar(url: string) {
  const tempFile = join(tmpdir(), `create-web3-frontend.temp-${Date.now()}`);
  await pipeline(got.stream(url), createWriteStream(tempFile));
  return tempFile;
}

async function getUserInput() {
  const response = await prompts({
    type: 'text',
    name: 'input',
    message: 'Project name:',
  });

  return response.input;
}

const main = async () => {
  let projectPath = '';
  const program = new Command(packageJson.name)
    .version(packageJson.version)
    .arguments('<project-directory>')
    .usage(`${chalk.green('<project-directory>')} [options]`)
    .action((name) => {
      projectPath = name;
    })
    .parse(process.argv);

  if (!projectPath) {
    projectPath = await getUserInput();
  }

  await mkdir(projectPath);
  const tempFile = await downloadTar(
    `https://codeload.github.com/Dhaiwat10/cw3f-new-template/tar.gz/main`
  );
  await tar.x({
    file: tempFile,
    strip: 1,
    cwd: join(process.cwd(), projectPath),
  });
  await unlink(tempFile);

  console.log();
  console.log();
  console.log(
    chalk.green('⚡️ Success! Created a web3 frontend at ' + projectPath)
  );
  console.log();
  console.log();
  console.log('To get started:');
  console.log();
  console.log(`- cd into the project directory: cd ${projectPath}`);
  console.log('- Install dependencies by running `npm install`');
  console.log('- Run the dev server by running `npm run dev`');
  console.log();
  console.log();
};

main().catch((err) => {
  console.error(err);
});
