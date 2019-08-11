import Value from './value.js'
import Type from '../types/type.js'

export default class FunctionArgument extends Value {
	constructor(public type: Type,  public position?: number, public name?: string) {
		super(type);
	}

	isEqual(to: Value): boolean {
		return (
			this === to ||
			to instanceof FunctionArgument &&
			this.type.isEqual(to.type)
		)
	}
}