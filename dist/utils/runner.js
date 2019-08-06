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
const child_process_1 = require("child_process");
const chalk_1 = require("chalk");
class Runner {
    static run(bin, options, cwd = process.cwd()) {
        return __awaiter(this, void 0, void 0, function* () {
            const spawOptions = {
                cwd: cwd,
                stdio: 'inherit'
            };
            let child = child_process_1.spawnSync(bin, options, spawOptions);
            if (child.error) {
                console.log(chalk_1.default.red(`Failed to execute command: ${bin} ${options.join(' ')}`)),
                    process.exit(1);
            }
            return true;
        });
    }
}
exports.Runner = Runner;
//# sourceMappingURL=runner.js.map