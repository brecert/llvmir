import Value from './value.js';
import * as Instructions from '../instructions/index.js';
export default class BasicBlock extends Value {
    name?: string | undefined;
    readonly instructions: Instructions.Instruction[];
    terminated: boolean;
    constructor(name?: string | undefined);
    push(...instrctions: Instructions.Instruction[]): void;
    isEqual(to: Value): boolean;
}
