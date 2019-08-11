import Type from './type.js';
export default class Label extends Type {
    labelName?: string | undefined;
    constructor(labelName?: string | undefined);
    isEqual(to: Type): boolean;
}
