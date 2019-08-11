import Type from '../types/type.js';
export default abstract class Value {
    readonly type: Type;
    constructor(type: Type);
    abstract isEqual(to: Value): boolean;
}
