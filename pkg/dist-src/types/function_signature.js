import Type from '../types/type.js';
export default class FunctionSignature extends Type {
    constructor(returnType, parameters) {
        super(returnType.typeName);
        this.returnType = returnType;
        this.parameters = parameters;
    }
    isEqual(to) {
        return (this === to ||
            to instanceof FunctionSignature &&
                this.returnType === to.returnType &&
                this.parameters === to.parameters);
    }
}
