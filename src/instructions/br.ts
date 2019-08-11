import { BOOL_WIDTH } from '../constants.js'

import invariant from 'tiny-invariant'

import Instruction from './instruction.js'
import * as Types from '../types/index.js'
import * as Values from '../values/index.js'


export default class Br extends Instruction {
	terminator = true;
	flags = [];

	constructor(public readonly cond: Values.Value, public readonly ifTrue: Values.BasicBlock, public readonly ifFalse: Values.BasicBlock) {
		super('br', new Types.Void)

		invariant(cond.type instanceof Types.Integer, `Type Error: cond type must be an Integer`)
		invariant((cond.type as Types.Integer).size === BOOL_WIDTH, `Type Error: Integer size must be '${BOOL_WIDTH}' not ${(cond.type as Types.Integer).size}`)
	}
}