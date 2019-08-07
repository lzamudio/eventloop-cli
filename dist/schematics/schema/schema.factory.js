"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular-devkit/core");
const schematics_1 = require("@angular-devkit/schematics");
const schema_utils_1 = require("./schema.utils");
function main(options) {
    return (tree, context) => {
        if (!options.name) {
            throw new schematics_1.SchematicsException('La opción "name" es requerida');
        }
        if (!options.collectionName) {
            throw new schematics_1.SchematicsException('La opción "collectionName" es requerida');
        }
        return schematics_1.branchAndMerge(schematics_1.chain([
            generate(options),
            _addDeclarationToConst(options)
        ]))(tree, context);
    };
}
exports.main = main;
function _addDeclarationToConst(options) {
    return (tree, _) => {
        const content = tree.read('src/constants/schemas.const.ts').toString();
        const constantName = core_1.strings.underscore(options.name).toUpperCase();
        const constantValue = options.collectionName;
        const newContent = schema_utils_1.addDeclarationToConst(content, constantName, constantValue);
        tree.overwrite('src/constants/schemas.const.ts', newContent);
        return tree;
    };
}
function generate(options) {
    return (tree, context) => {
        options.name = core_1.strings.dasherize(options.name);
        const templateSource = schematics_1.apply(schematics_1.url('./files'), [
            schematics_1.template(Object.assign({}, core_1.strings, options))
        ]);
        return schematics_1.branchAndMerge(schematics_1.mergeWith(templateSource))(tree, context);
    };
}
//# sourceMappingURL=schema.factory.js.map