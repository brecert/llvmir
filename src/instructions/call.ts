import invariant from 'tiny-invariant'

import Instruction from './instruction.js'
import * as Types from '../types/index.js'
import * as Values from '../values/index.js'

export default class Call extends Instruction {
	flags = [];

	constructor(public type: Types.Type, public fn: Values.Function, public args: Values.Value[]) {
		super('call', type)

		invariant(type.isEqual(fn.signature.returnType), 'Type Error: Function return type and Call return type must be the same')
		invariant(args.length === fn.signature.parameters.length, 'Instruction Error: Function parameters length and Call args length are not the same')

		args.forEach((arg, i) => {
			invariant(arg.type.isEqual(fn.signature.parameters[i]), `Type Error: Argument ${i}'s type of Call does not match Functions parameter type`)
		})
	}
}