import Value from './value.js';
import * as Types from '../types/index.js';
export default class Integer extends Value {
    type: Types.Integer;
    value: number;
    constructor(type: Types.Integer, value: number);
    isEqual(to: Value): boolean;
}
