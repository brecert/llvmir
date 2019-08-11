import Type from './type.js'
import * as Values from '../values/index.js'

export default class Integer extends Type {
	constructor(public size: number) {
		super(`i${size}`)
	}

	val(value: number) {
		return new Values.Integer(this, value)
	}

	isEqual(to: Type): boolean {
		return (
			this === to ||
			to instanceof Integer &&
			this.size === to.size
		)
	}
}