import Type from '../types/type.js'

export default class FunctionSignature extends Type {
	public readonly parameters: Type[]

	constructor(public returnType: Type, parameters: Type[]) {
		super(returnType.typeName);

		this.parameters = parameters
	}

	isEqual(to: Type): boolean {
		return (
			this === to ||
			to instanceof FunctionSignature &&
			this.returnType === to.returnType &&
			this.parameters === to.parameters
		)
	}
}