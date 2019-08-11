import invariant from 'tiny-invariant'

import Instruction from './instruction.js'
import Type from '../types/type.js'
import Value from '../values/value.js'

export default class BinaryOperation extends Instruction {
	flags = []

	// todo: support Vector<Integer>
	constructor(name: string, type: Type, public op1: Value, public op2: Value) {
		super(name, type)

		invariant(op1.type.isEqual(op2.type), `Instuction Error: op1 and op2 must have matching types`)
	}
}