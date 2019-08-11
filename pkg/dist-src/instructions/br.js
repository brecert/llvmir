import { BOOL_WIDTH } from '../constants.js';
import invariant from 'tiny-invariant';
import Instruction from './instruction.js';
import * as Types from '../types/index.js';
export default class Br extends Instruction {
    constructor(cond, ifTrue, ifFalse) {
        super('br', new Types.Void);
        this.cond = cond;
        this.ifTrue = ifTrue;
        this.ifFalse = ifFalse;
        this.terminator = true;
        this.flags = [];
        invariant(cond.type instanceof Types.Integer, `Type Error: cond type must be an Integer`);
        invariant(cond.type.size === BOOL_WIDTH, `Type Error: Integer size must be '${BOOL_WIDTH}' not ${cond.type.size}`);
    }
}
