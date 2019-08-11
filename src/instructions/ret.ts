import invariant from 'tiny-invariant'

import Instruction from './instruction.js'
import * as Types from '../types/index.js'
import Value from '../values/value.js'

export default class Ret extends Instruction {
	terminator = true;
	flags = [];

	constructor(type: Types.Type, public value?: Value) {
		super('ret', type)

		if(type instanceof Types.Void) {
			invariant(value === undefined, 'Instruction Error: when returning void, `ret void` cannot have any values associated with it')
		} else {
			invariant(value !== undefined, 'Instruction Error: when returning any type other than void, a value must be associated with it')
		}
	}
}