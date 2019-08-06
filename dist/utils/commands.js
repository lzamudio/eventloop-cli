"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const NODE_MODULES = path_1.join(__dirname, '..', '..', 'node_modules');
const BIN = '.bin';
exports.NEST_CLI = path_1.join(NODE_MODULES, BIN, 'nest');
exports.MY_SCHEMATICS = path_1.join(NODE_MODULES, BIN, 'schematics');
exports.NAME_PACKAGE = require('../../package.json').name;
//# sourceMappingURL=commands.js.map