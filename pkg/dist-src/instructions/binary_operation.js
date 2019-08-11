import invariant from 'tiny-invariant';
import Instruction from './instruction.js';
export default class BinaryOperation extends Instruction {
    // todo: support Vector<Integer>
    constructor(name, type, op1, op2) {
        super(name, type);
        this.op1 = op1;
        this.op2 = op2;
        this.flags = [];
        invariant(op1.type.isEqual(op2.type), `Instuction Error: op1 and op2 must have matching types`);
    }
}
