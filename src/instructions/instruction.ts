import Type from '../types/type.js'
import Value from '../values/value.js'

export default abstract class Instruction extends Value {
	public abstract readonly flags: string[]
	public readonly terminator: boolean = false;

	constructor(
		public readonly instructionName: string,
		type: Type
	) {
		super(type)
	}

	isEqual(to: Value): boolean {
		return this.type.isEqual(to.type)
	}
}