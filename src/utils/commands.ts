import { join } from 'path';

const NODE_MODULES         = join(__dirname, '..', '..', 'node_modules');
const BIN                  = '.bin';

export const NEST_CLI      = join(NODE_MODULES, BIN,'nest');
export const MY_SCHEMATICS = join(NODE_MODULES, BIN, 'schematics');
export const NAME_PACKAGE  = require('../../package.json').name;
