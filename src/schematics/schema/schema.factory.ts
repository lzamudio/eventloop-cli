import { strings } from '@angular-devkit/core';
import {
  Rule,
  SchematicsException,
  mergeWith,
  apply,
  url,
  template,
  Tree,
  SchematicContext,
  chain,
  branchAndMerge
} from '@angular-devkit/schematics';
import { SchemaOptions } from './schema.schema';
import { addDeclarationToConst } from './schema.utils';

export function main(options: SchemaOptions): Rule {
  return (tree: Tree, context: SchematicContext) => {
    if (!options.name) {
      throw new SchematicsException('La opción "name" es requerida');
    }

    if (!options.collectionName) {
      throw new SchematicsException('La opción "collectionName" es requerida');
    }

    return branchAndMerge(
      chain([
        generate(options),
        _addDeclarationToConst(options)
      ]),
    )(tree, context);
  };
}


function _addDeclarationToConst( options : SchemaOptions) {
  return (tree: Tree, _ : SchematicContext) => {
    const content = tree.read('src/constants/schemas.const.ts')!.toString();
    const constantName = strings.underscore(options.name).toUpperCase();
    const constantValue = options.collectionName;
    const newContent = addDeclarationToConst(content, constantName, constantValue);

    tree.overwrite('src/constants/schemas.const.ts', newContent);
    return tree;
  }
}

function generate(options: SchemaOptions): Rule {
  return (tree: Tree, context: SchematicContext) => {
    options.name = strings.dasherize(options.name);

    const templateSource = apply(
      url('./files'),
      [
        template({
          ...strings,
          ...options,
        })
      ]
    );
    return branchAndMerge(mergeWith(templateSource))(tree,context);
  }
}
