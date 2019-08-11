import invariant from 'tiny-invariant';
import Instruction from './instruction.js';
export default class Call extends Instruction {
    constructor(type, fn, args) {
        super('call', type);
        this.type = type;
        this.fn = fn;
        this.args = args;
        this.flags = [];
        invariant(type.isEqual(fn.signature.returnType), 'Type Error: Function return type and Call return type must be the same');
        invariant(args.length === fn.signature.parameters.length, 'Instruction Error: Function parameters length and Call args length are not the same');
        args.forEach((arg, i) => {
            invariant(arg.type.isEqual(fn.signature.parameters[i]), `Type Error: Argument ${i}'s type of Call does not match Functions parameter type`);
        });
    }
}
