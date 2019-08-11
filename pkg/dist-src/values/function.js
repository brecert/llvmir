import { Value, BasicBlock, FunctionArgument } from './index.js';
import invariant from 'tiny-invariant';
export default class Function extends Value {
    constructor({ signature, name, argNames, body }) {
        super(signature);
        this.blocks = [];
        this.argNames = new Map;
        this.signature = signature;
        this.name = name;
        this.body = body || new BasicBlock;
        invariant(signature.parameters.length === argNames.length, 'Invalid number of names, signature length and name length do not match');
        argNames.forEach((name, i) => {
            invariant(!this.argNames.has(name), `Duplicate argument name: ${name}`);
            this.argNames.set(name, i);
        });
        this.args = signature.parameters.map((param, i) => new FunctionArgument(param, i, argNames[i]));
    }
    addBlock(block) {
        this.blocks.push(block);
        return block;
    }
    isEqual(to) {
        return (this === to ||
            this.type.isEqual(to.type));
    }
}
