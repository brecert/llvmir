import Instruction from './instruction.js';
import * as Types from '../types/index.js';
import * as Values from '../values/index.js';
export default class Call extends Instruction {
    type: Types.Type;
    fn: Values.Function;
    args: Values.Value[];
    flags: never[];
    constructor(type: Types.Type, fn: Values.Function, args: Values.Value[]);
}
