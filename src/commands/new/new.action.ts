import { NEST_CLI, MY_SCHEMATICS, NAME_PACKAGE } from '../../utils/commands';
import { Runner } from '../../utils/runner';
import { NewOptions } from './new.options';

export class NewAction {

  public async handle(options: NewOptions) {

    Runner.run(NEST_CLI, ['new', options.name, '-s']);

    Runner.run(MY_SCHEMATICS, [
      `${NAME_PACKAGE}:application`,
       options.name,
       '--no-dry'
     ]);
  }

}
