import invariant from 'tiny-invariant';
import { BOOL_WIDTH } from '../constants.js';
import Instruction from './instruction.js';
import * as Types from '../types/index.js';
export default class ICmp extends Instruction {
    constructor(cond, opType, op1, op2) {
        super('icmp', new Types.Integer(BOOL_WIDTH));
        this.cond = cond;
        this.opType = opType;
        this.op1 = op1;
        this.op2 = op2;
        this.flags = [];
        invariant(opType.isEqual(op1.type), 'Type Error: op1 does not match the expected type');
        invariant(op1.type.isEqual(op2.type), 'Type Error: op1 and op2 must be the same type');
    }
}
// type, opcode, operands
// ${opcode} ${type} ${operands.join(',')}
