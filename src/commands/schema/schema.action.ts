import { MY_SCHEMATICS, NAME_PACKAGE } from '../../utils/commands';
import { Runner } from '../../utils/runner';
import { SchemaOptions } from './schema.options';

export class SchemaAction {

  public async handle(options: SchemaOptions) {

    Runner.run(MY_SCHEMATICS, [
      `${NAME_PACKAGE}:schema`,
      `--name=${options.name}`,
      options.collectionName ? `--collectionName=${options.collectionName}`: '',
      '--no-dry'
    ]);
  }

}
