export default abstract class Type {
    readonly typeName: string;
    constructor(typeName: string);
    abstract isEqual(to: Type): boolean;
}
