"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const commands_1 = require("../../utils/commands");
const runner_1 = require("../../utils/runner");
class SchemaAction {
    handle(options) {
        return __awaiter(this, void 0, void 0, function* () {
            runner_1.Runner.run(commands_1.MY_SCHEMATICS, [
                `${commands_1.NAME_PACKAGE}:schema`,
                `--name=${options.name}`,
                options.collectionName ? `--collectionName=${options.collectionName}` : '',
                '--no-dry'
            ]);
        });
    }
}
exports.SchemaAction = SchemaAction;
//# sourceMappingURL=schema.action.js.map