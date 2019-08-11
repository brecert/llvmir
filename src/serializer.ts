import * as Instructions from './instructions/index.js'
import * as Values from './values/index.js'
import * as Types from './types/index.js'

import invariant from 'tiny-invariant'

export default class Serializer {
	private id = 0;
	private identifiers: Map<Instructions.Instruction | string, number> = new Map;
	private globals: Set<string> = new Set()
	private block_id = 0;
	private blocks: Map<Values.BasicBlock, string> = new Map;

	private reset() {
		this.id = 0;
		this.identifiers = new Map
		this.block_id = 0;
		this.blocks = new Map
	}

	private newIdentifier(inst: Instructions.Instruction | string) {
		const id = this.id

		this.identifiers.set(inst, id)
		
		this.id += 1
		
		return id
	}

	private newGlobal(name: string) {
		invariant(!this.globals.has(name), `Invalid name: name '${name}' has already been defined`)
		this.globals.add(name)
		return name
	}

	private newBlock(block: Values.BasicBlock, name?: string) {
		this.blocks.set(block, name ? name : `bb${this.block_id += 1}`)
		return this.blocks.get(block)
	}

	constructor() {
		this.reset()
	}

	block(block: Values.BasicBlock, blockName?: string) {
		if(block instanceof Values.BasicBlock) {

			blockName = blockName || this.newBlock(block, block.name)

			invariant(block.terminated, `Unterminated Block: '${blockName}'`)

			// (NAME|bb\d+):\n
			let io = '';

			io += `${blockName}:\n`

			block.instructions.forEach(inst => {
				io += `\t${this.instruction(inst)}\n`
			})

			return io
		}
	}

	functionSignature(sig: Types.FunctionSignature) {
		return `${sig.returnType.typeName}`
	}

	functionArgument(arg: Values.FunctionArgument) {
		let io = `${arg.type.typeName}`

		this.newIdentifier(arg.name || `$__${this.id}__`)

		return io
	}

	function(fn: Values.Function) {
		this.reset()

		/*
			define ${signature} @${name} (${args.join(',')}) {
				${body}
				${blocks.join('\n')}
			}
		*/


		let io = `define ${this.functionSignature(fn.signature)} @${
				this.newGlobal(fn.name)
			} (${
				fn.args.map(arg => this.functionArgument(arg))
			}) {\n`

		let bodyName
		if(fn.body.instructions.length > 0) { bodyName = this.newBlock(fn.body, fn.body.name) }
		let blockNames = fn.blocks.map(b => this.newBlock(b, b.name))

		let body
		if(fn.body.instructions.length > 0) { body = this.block(fn.body, bodyName) }

		let blocks = fn.blocks.map((b, i) => this.block(b, blockNames[i]))

		if(fn.body.instructions.length > 0) { io += `${body}\n` }
		io += `${blocks.join('\n')}}`;

		return io
	}

	instruction(inst: Instructions.Instruction) {
		let io = '';

		if(!inst.terminator) {
			io += `%${this.newIdentifier(inst)} = `
		}

		io += `${inst.instructionName} `

		if(inst instanceof Instructions.BinaryOperation) {
			io += `${inst.type.typeName} ${this.arg(inst, inst.op1)}, ${this.arg(inst, inst.op2)}`
		}

		if(inst instanceof Instructions.ICmp) {
			io += `${inst.cond} ${inst.opType.typeName} ${this.arg(inst, inst.op1)}, ${this.arg(inst, inst.op2)}`
		}

		if(inst instanceof Instructions.Ret) {
			io += `${inst.type.typeName}`
			
			if(!(inst.type instanceof Types.Void)) {
				io += ` ${this.arg(inst, inst.value!)}`
			}
		}

		if(inst instanceof Instructions.Call) {
			invariant(this.globals.has(inst.fn.name), 'Invalid Name: Call name has not been declared yet')
			io += `${inst.type.typeName} @${inst.fn.name} (${inst.args.map(v => `${v.type.typeName} ${this.arg(inst, v)}`).join(', ')})`	
		}

		if(inst instanceof Instructions.Br) {
			io += `i1 ${this.arg(inst, inst.cond)}, ${this.arg(inst, inst.ifTrue)}, ${this.arg(inst, inst.ifFalse)}`
		}

		return io
	}

	arg(inst: Instructions.Instruction, value: Values.Value) {
		if(value instanceof Values.Integer) {
			return `${value.value}`
		}

		if(value instanceof Instructions.Instruction) {
			return `%${this.identifiers.get(value)}`
		}

		if(value instanceof Values.BasicBlock) {
			invariant(this.blocks.has(value), `basic block ${value.name} has not been declared yet!`)

			return `label %${this.blocks.get(value)}`
		}

		if(value instanceof Values.FunctionArgument) {
			invariant(value.name, `name doesn't exist for functionargument`)

			return `%${this.identifiers.get(value.name!)}`
		}

		throw `Unimplemented arg: unimplemented arg value: ${value.constructor.name}`
	}
}