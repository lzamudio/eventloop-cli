"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = require("chalk");
const new_command_1 = require("./new/new.command");
const new_action_1 = require("./new/new.action");
const schema_command_1 = require("./schema/schema.command");
const schema_action_1 = require("./schema/schema.action");
class CommandLoader {
    static load(program) {
        new new_command_1.NewCommand(new new_action_1.NewAction()).load(program);
        new schema_command_1.SchemaCommand(new schema_action_1.SchemaAction()).load(program);
        this.handleInvalidCommand(program);
    }
    static handleInvalidCommand(program) {
        program.on('command:*', () => {
            console.error(chalk_1.default.red('Invalid command: %s'), program.args.join(' '));
            console.log('See --help for a list of available commands.');
            process.exit(1);
        });
    }
}
exports.CommandLoader = CommandLoader;
//# sourceMappingURL=command.loader.js.map