import Instruction from './instruction.js';
import * as Values from '../values/index.js';
export default class Br extends Instruction {
    readonly cond: Values.Value;
    readonly ifTrue: Values.BasicBlock;
    readonly ifFalse: Values.BasicBlock;
    terminator: boolean;
    flags: never[];
    constructor(cond: Values.Value, ifTrue: Values.BasicBlock, ifFalse: Values.BasicBlock);
}
