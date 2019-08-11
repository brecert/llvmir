import Type from '../types/type.js';
import Value from '../values/value.js';
export default abstract class Instruction extends Value {
    readonly instructionName: string;
    abstract readonly flags: string[];
    readonly terminator: boolean;
    constructor(instructionName: string, type: Type);
    isEqual(to: Value): boolean;
}
