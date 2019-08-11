import Value from './value.js'
import * as Instructions from '../instructions/index.js'
import * as Types from '../types/index.js'

import invariant from 'tiny-invariant'

export default class BasicBlock extends Value {
	readonly instructions: Instructions.Instruction[] = [];
	terminated = false;

	constructor(public name?: string) {
		super(new Types.Label)
	}

	push(...instrctions: Instructions.Instruction[]) {
		instrctions.forEach(inst => {
			invariant(!this.terminated, 'block has already been terminated with a terminator instruction!')
				
			this.instructions.push(inst)

			if(inst.terminator) {
				this.terminated = true
			}
		})
	}

	isEqual(to: Value): boolean {
		return (
			this === to
		)
	}
}