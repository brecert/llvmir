import Value from './value.js';
import Type from '../types/type.js';
export default class FunctionArgument extends Value {
    type: Type;
    position?: number | undefined;
    name?: string | undefined;
    constructor(type: Type, position?: number | undefined, name?: string | undefined);
    isEqual(to: Value): boolean;
}
