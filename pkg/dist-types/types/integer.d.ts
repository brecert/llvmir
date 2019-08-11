import Type from './type.js';
import * as Values from '../values/index.js';
export default class Integer extends Type {
    size: number;
    constructor(size: number);
    val(value: number): Values.Integer;
    isEqual(to: Type): boolean;
}
