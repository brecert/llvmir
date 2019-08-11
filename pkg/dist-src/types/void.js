import Type from './type.js';
export default class Void extends Type {
    constructor() {
        super('void');
    }
    isEqual(to) {
        return to instanceof Void;
    }
}
