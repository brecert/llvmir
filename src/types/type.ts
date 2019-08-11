export default abstract class Type {
	constructor(public readonly typeName: string) {
	}

	abstract isEqual(to: Type): boolean
}