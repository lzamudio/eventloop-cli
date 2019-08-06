import { spawnSync, SpawnOptions } from 'child_process';
import chalk from 'chalk';

export class Runner {

  static async run(bin: string, options: any[], cwd: string = process.cwd()) {
    const spawOptions: SpawnOptions = {
      cwd: cwd,
      stdio: 'inherit'
    };

    let child = spawnSync(bin, options, spawOptions);

    if(child.error) {
      console.log(chalk.red(`Failed to execute command: ${bin} ${options.join(' ')}`)),
      process.exit(1);
    }

    return true;
  }
}
