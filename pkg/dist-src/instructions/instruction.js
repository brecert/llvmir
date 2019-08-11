import Value from '../values/value.js';
export default class Instruction extends Value {
    constructor(instructionName, type) {
        super(type);
        this.instructionName = instructionName;
        this.terminator = false;
    }
    isEqual(to) {
        return this.type.isEqual(to.type);
    }
}
