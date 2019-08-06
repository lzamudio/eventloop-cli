"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular-devkit/core");
const schematics_1 = require("@angular-devkit/schematics");
function main(options) {
    return (tree, context) => {
        if (!options.name) {
            throw new schematics_1.SchematicsException('La opción "nombre" es requerida');
        }
        options.name = core_1.strings.dasherize(options.name);
        const templateSource = schematics_1.apply(schematics_1.url('./files'), [
            schematics_1.template(Object.assign({}, core_1.strings, options)),
            schematics_1.move(`${options.name}`),
            schematics_1.forEach((fileEntry) => {
                if (tree.exists(fileEntry.path)) {
                    tree.overwrite(fileEntry.path, fileEntry.content);
                }
                return fileEntry;
            })
        ]);
        return schematics_1.mergeWith(templateSource, schematics_1.MergeStrategy.Overwrite)(tree, context);
    };
}
exports.main = main;
//# sourceMappingURL=application.factory.js.map