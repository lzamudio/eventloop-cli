import chalk from 'chalk';
import { CommanderStatic } from 'commander';
import { NewCommand } from './new/new.command';
import { NewAction } from './new/new.action';
import { SchemaCommand } from './schema/schema.command';
import { SchemaAction } from './schema/schema.action';

export class CommandLoader {

  public static load(program: CommanderStatic): void {
    new NewCommand(new NewAction()).load(program);
    new SchemaCommand(new SchemaAction()).load(program);

    this.handleInvalidCommand(program);
  }

  private static handleInvalidCommand(program: CommanderStatic) {
    program.on('command:*', () => {
      console.error(chalk.red('Invalid command: %s'), program.args.join(' '));
      console.log('See --help for a list of available commands.');
      process.exit(1);
    });
  }
}
