import Instruction from './instruction.js';
import * as Types from '../types/index.js';
import Value from '../values/value.js';
export declare type ICmpCond = 'eq' | 'ne' | 'ugt' | 'uge' | 'ult' | 'ule' | 'sgt' | 'sge' | 'slt' | 'sle';
export default class ICmp extends Instruction {
    cond: ICmpCond;
    opType: Types.Type;
    op1: Value;
    op2: Value;
    flags: never[];
    constructor(cond: ICmpCond, opType: Types.Type, op1: Value, op2: Value);
}
