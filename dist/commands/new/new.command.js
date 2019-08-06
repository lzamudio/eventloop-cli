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
class NewCommand {
    constructor(action) {
        this.action = action;
    }
    load(program) {
        program
            .command('new <name>')
            .alias('n')
            .description('Generate new application')
            .action((name) => __awaiter(this, void 0, void 0, function* () {
            const options = {
                name: name
            };
            yield this.action.handle(options);
        }));
    }
}
exports.NewCommand = NewCommand;
//# sourceMappingURL=new.command.js.map