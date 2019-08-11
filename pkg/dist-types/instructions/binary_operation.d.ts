import Instruction from './instruction.js';
import Type from '../types/type.js';
import Value from '../values/value.js';
export default class BinaryOperation extends Instruction {
    op1: Value;
    op2: Value;
    flags: never[];
    constructor(name: string, type: Type, op1: Value, op2: Value);
}
