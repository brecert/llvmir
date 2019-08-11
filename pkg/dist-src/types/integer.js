import Type from './type.js';
import * as Values from '../values/index.js';
export default class Integer extends Type {
    constructor(size) {
        super(`i${size}`);
        this.size = size;
    }
    val(value) {
        return new Values.Integer(this, value);
    }
    isEqual(to) {
        return (this === to ||
            to instanceof Integer &&
                this.size === to.size);
    }
}
