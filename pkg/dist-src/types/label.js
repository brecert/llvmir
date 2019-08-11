import Type from './type.js';
export default class Label extends Type {
    constructor(labelName) {
        super('label');
        this.labelName = labelName;
    }
    isEqual(to) {
        return (this === to);
    }
}
