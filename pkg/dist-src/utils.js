import * as Instructions from './instructions/index.js';
import * as Values from './values/index.js';
import * as Types from './types/index.js';
class UtilityFunction extends Values.Function {
    constructor() {
        super(...arguments);
        this.blocks = [];
    }
    createBlock(name) {
        const block = new UtilityBlock(name);
        this.addBlock(block);
        return block;
    }
    block(name, cb) {
        const foundBlock = this.blocks.find(b => b.name === name);
        const block = this.blocks.find(b => b.name === name) || new UtilityBlock(name);
        cb(block);
        if (foundBlock === undefined) {
            this.addBlock(block);
        }
        return block;
    }
}
class UtilityBlock extends Values.BasicBlock {
    binop(name, type, op1, op2) {
        const binop = new Instructions.BinaryOperation(name, type, op1, op2);
        this.push(binop);
        return binop;
    }
    br(cond, ifTrue, ifFalse) {
        const br = new Instructions.Br(cond, ifTrue, ifFalse);
        this.push(br);
        return br;
    }
    call(type, fn, args) {
        const call = new Instructions.Call(type, fn, args);
        this.push(call);
        return call;
    }
    icmp(cond, opType, op1, op2) {
        const icmp = new Instructions.ICmp(cond, opType, op1, op2);
        this.push(icmp);
        return icmp;
    }
    ret(type, value) {
        const ret = new Instructions.Ret(type, value);
        this.push(ret);
        return ret;
    }
}
export const i = (size) => new Types.Integer(size);
export const ret = (value) => value instanceof Types.Void
    ? new Instructions.Ret(value)
    : new Instructions.Ret(value.type, value);
export const nop = new Types.Void;
export const sig = (returnType, parameters = []) => new Types.FunctionSignature(returnType, parameters);
export const label = (name) => new Types.Label(name);
export function define(signature, name, cb) {
    const argNames = signature.parameters.map((v, i) => `${i}`);
    const fn = new UtilityFunction({ signature, name, argNames });
    cb(fn, fn.args);
    return fn;
}
