import invariant from 'tiny-invariant';
import Instruction from './instruction.js';
import * as Types from '../types/index.js';
export default class Ret extends Instruction {
    constructor(type, value) {
        super('ret', type);
        this.value = value;
        this.terminator = true;
        this.flags = [];
        if (type instanceof Types.Void) {
            invariant(value === undefined, 'Instruction Error: when returning void, `ret void` cannot have any values associated with it');
        }
        else {
            invariant(value !== undefined, 'Instruction Error: when returning any type other than void, a value must be associated with it');
        }
    }
}
