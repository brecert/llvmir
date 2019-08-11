import Value from './value.js';
export default class Integer extends Value {
    constructor(type, value) {
        super(type);
        this.type = type;
        this.value = value;
    }
    isEqual(to) {
        return (this === to ||
            this.type.isEqual(to.type));
    }
}
