import { CommanderStatic } from 'commander';
import { NewOptions } from './new.options';
import { NewAction } from './new.action';

export class NewCommand {

  constructor(protected action: NewAction) {}

  public load(program: CommanderStatic) {
    program
      .command('new <name>')
      .alias('n')
      .description('Generate new application')
      .action( async (name: string) => {
        const options: NewOptions = {
          name: name
        }
        await this.action.handle(options);
      });
  }
}
