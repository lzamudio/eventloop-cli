#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander = require("commander");
const command_loader_1 = require("../commands/command.loader");
const bootstrap = () => {
    const program = commander;
    program.version(require('../../package.json').version);
    command_loader_1.CommandLoader.load(program);
    commander.parse(process.argv);
    if (!program.args.length) {
        program.outputHelp();
    }
};
bootstrap();
//# sourceMappingURL=cli.js.map