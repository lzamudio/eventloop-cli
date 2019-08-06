import { strings } from '@angular-devkit/core';
import {
  Rule,
  SchematicsException,
  mergeWith,
  apply,
  url,
  template,
  move,
  MergeStrategy,
  Tree,
  SchematicContext,
  forEach,
  FileEntry
} from '@angular-devkit/schematics';
import { ApplicationOptions } from './application.schema';

export function main(options: ApplicationOptions): Rule {
  return (tree: Tree, context: SchematicContext) => {
    if (!options.name) {
      throw new SchematicsException('La opción "nombre" es requerida');
    }
    options.name = strings.dasherize(options.name);

    const templateSource = apply(
      url('./files'),
      [
        template({
          ...strings,
          ...options,
        }),
        move(`${options.name}`),
        forEach((fileEntry: FileEntry) => {
          if (tree.exists(fileEntry.path)) {
            tree.overwrite(fileEntry.path, fileEntry.content);
          }
          return fileEntry;
        })
      ]
    );

    return mergeWith(templateSource, MergeStrategy.Overwrite)(tree,context);
  };
}
