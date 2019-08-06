import { Command, CommanderStatic } from 'commander';
import { SchemaOptions } from './schema.options';
import { SchemaAction } from './schema.action';

export class SchemaCommand {

  constructor(protected action: SchemaAction) {}

  public load(program: CommanderStatic) {
    program
      .command('schema <name>')
      .alias('sc')
      .description('Generate new schema')
      .option('-c, --collection-name <name>','Collection name on database')
      .action( async (name: string, command: Command) => {
        const options: SchemaOptions = {
          name: name,
          collectionName: command.collectionName
        }
        await this.action.handle(options);
      });
  }
}
