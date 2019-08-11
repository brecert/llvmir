import Type from './type.js'

export default class Void extends Type {
	constructor() {
		super('void')
	}

	isEqual(to: Type) {
		return to instanceof Void
	}
}