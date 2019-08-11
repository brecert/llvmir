import { Value, BasicBlock, FunctionArgument } from './index.js'
import * as Types from '../types/index.js'

import invariant from 'tiny-invariant'

// todo: create type
export type DefineArgs = ReadonlyArray<string>

export interface DefineParams {
	readonly signature: Types.FunctionSignature,
	readonly name: string,
	readonly argNames: DefineArgs,
	readonly body?: BasicBlock
}

export default class Function extends Value {
	readonly signature: Types.FunctionSignature
	readonly name: string
	readonly body: BasicBlock
	readonly blocks: BasicBlock[] = []

	readonly argNames: Map<string, number> = new Map
	readonly args: ReadonlyArray<FunctionArgument>

	constructor({ signature, name, argNames, body }: DefineParams) {
		super(signature);

		this.signature = signature
		this.name = name
		this.body = body || new BasicBlock

		invariant(signature.parameters.length === argNames.length, 'Invalid number of names, signature length and name length do not match')

		argNames.forEach((name, i) => {
			invariant(!this.argNames.has(name), `Duplicate argument name: ${name}`)

			this.argNames.set(name, i)
		})

		this.args = signature.parameters.map((param, i) => new FunctionArgument(param, i, argNames[i]))
	}

	addBlock(block: BasicBlock) {
		this.blocks.push(block)
		return block
	}

	isEqual(to: Value): boolean {
		return (
			this === to ||
			this.type.isEqual(to.type)
		)
	}
}