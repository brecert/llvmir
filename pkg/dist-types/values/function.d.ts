import { Value, BasicBlock, FunctionArgument } from './index.js';
import * as Types from '../types/index.js';
export declare type DefineArgs = ReadonlyArray<string>;
export interface DefineParams {
    readonly signature: Types.FunctionSignature;
    readonly name: string;
    readonly argNames: DefineArgs;
    readonly body?: BasicBlock;
}
export default class Function extends Value {
    readonly signature: Types.FunctionSignature;
    readonly name: string;
    readonly body: BasicBlock;
    readonly blocks: BasicBlock[];
    readonly argNames: Map<string, number>;
    readonly args: ReadonlyArray<FunctionArgument>;
    constructor({ signature, name, argNames, body }: DefineParams);
    addBlock(block: BasicBlock): BasicBlock;
    isEqual(to: Value): boolean;
}
