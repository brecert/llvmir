import Type from './type.js'

export default class Label extends Type {
	constructor(public labelName?: string) {
		super('label')
	}

	isEqual(to: Type): boolean {
		return (
			this === to
		)
	}
}