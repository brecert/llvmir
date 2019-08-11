import Instruction from './instruction.js';
import * as Types from '../types/index.js';
import Value from '../values/value.js';
export default class Ret extends Instruction {
    value?: Value | undefined;
    terminator: boolean;
    flags: never[];
    constructor(type: Types.Type, value?: Value | undefined);
}
