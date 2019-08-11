import * as Instructions from './instructions/index.js';
import * as Values from './values/index.js';
import * as Types from './types/index.js';
declare class UtilityFunction extends Values.Function {
    readonly blocks: UtilityBlock[];
    createBlock(name?: string): UtilityBlock;
    block(name: string, cb: (block: UtilityBlock) => void | any): UtilityBlock;
}
declare class UtilityBlock extends Values.BasicBlock {
    binop(name: string, type: Types.Type, op1: Values.Value, op2: Values.Value): Instructions.BinaryOperation;
    br(cond: Values.Value, ifTrue: Values.BasicBlock, ifFalse: Values.BasicBlock): Instructions.Br;
    call(type: Types.Type, fn: Values.Function, args: Values.Value[]): Instructions.Call;
    icmp(cond: Instructions.ICmpCond, opType: Types.Type, op1: Values.Value, op2: Values.Value): Instructions.ICmp;
    ret(type: Types.Type, value?: Values.Value): Instructions.Ret;
}
export declare const i: (size: number) => Types.Integer;
export declare const ret: (value: Values.Value | Types.Void) => Instructions.Ret;
export declare const nop: Types.Void;
export declare const sig: (returnType: Types.Type, parameters?: Types.Type[]) => Types.FunctionSignature;
export declare const label: (name: string) => Types.Label;
export declare function define(signature: Types.FunctionSignature, name: string, cb: (fn: UtilityFunction, args: ReadonlyArray<Values.FunctionArgument>) => void | any): UtilityFunction;
export {};
