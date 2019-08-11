import invariant from 'tiny-invariant'

import { BOOL_WIDTH } from '../constants.js'

import Instruction from './instruction.js'
import * as Types from '../types/index.js'
import Value from '../values/value.js'


export type ICmpCond =
	'eq' | 'ne' | 'ugt' | 'uge' | 'ult' | 'ule' | 'sgt' | 'sge' | 'slt' | 'sle'

export default class ICmp extends Instruction {
	flags = [];

	constructor(public cond: ICmpCond, public opType: Types.Type, public op1: Value, public op2: Value) {
		super('icmp', new Types.Integer(BOOL_WIDTH))

		invariant(opType.isEqual(op1.type), 'Type Error: op1 does not match the expected type')
		invariant(op1.type.isEqual(op2.type), 'Type Error: op1 and op2 must be the same type')
	}
}

// type, opcode, operands
// ${opcode} ${type} ${operands.join(',')}