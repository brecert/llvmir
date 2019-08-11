import Value from './value.js';
export default class FunctionArgument extends Value {
    constructor(type, position, name) {
        super(type);
        this.type = type;
        this.position = position;
        this.name = name;
    }
    isEqual(to) {
        return (this === to ||
            to instanceof FunctionArgument &&
                this.type.isEqual(to.type));
    }
}
