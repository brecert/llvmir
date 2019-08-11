import Type from '../types/type.js'

export default abstract class Value {
	constructor(public readonly type: Type) {}

	abstract isEqual(to: Value): boolean
}