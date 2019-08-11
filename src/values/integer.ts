import Value from './value.js'
import * as Types from '../types/index.js'

export default class Integer extends Value {
	constructor(public type: Types.Integer, public value: number) {
		super(type);
	}

	isEqual(to: Value): boolean {
		return (
			this === to ||
			this.type.isEqual(to.type)
		)
	}
}