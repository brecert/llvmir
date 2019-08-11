import Type from '../types/type.js';
export default class FunctionSignature extends Type {
    returnType: Type;
    readonly parameters: Type[];
    constructor(returnType: Type, parameters: Type[]);
    isEqual(to: Type): boolean;
}
