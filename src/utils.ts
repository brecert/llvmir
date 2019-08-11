import * as Instructions from './instructions/index.js'
import * as Values from './values/index.js'
import * as Types from './types/index.js'

class UtilityFunction extends Values.Function {
	readonly blocks: UtilityBlock[] = []

	createBlock(name?: string) {
		const block = new UtilityBlock(name)
		this.addBlock(block)
		return block
	}

	block(name: string, cb: (block: UtilityBlock) => void | any) {
		const foundBlock = this.blocks.find(b => b.name === name)
		const block = this.blocks.find(b => b.name === name) || new UtilityBlock(name)
		
		cb(block)

		if(foundBlock === undefined) {
			this.addBlock(block)
		}

		return block
	}
}

class UtilityBlock extends Values.BasicBlock {
	binop(name: string, type: Types.Type, op1: Values.Value, op2: Values.Value) {
		const binop = new Instructions.BinaryOperation(name, type, op1, op2)
		this.push(binop)
		return binop
	}
	
	br(cond: Values.Value, ifTrue: Values.BasicBlock, ifFalse: Values.BasicBlock) {
		const br = new Instructions.Br(cond, ifTrue, ifFalse)
		this.push(br)
		return br
	}

	call(type: Types.Type, fn: Values.Function, args: Values.Value[]) {
		const call = new Instructions.Call(type, fn, args)
		this.push(call)
		return call
	}

	icmp(cond: Instructions.ICmpCond, opType: Types.Type, op1: Values.Value, op2: Values.Value) {
		const icmp = new Instructions.ICmp(cond, opType, op1, op2)
		this.push(icmp)
		return icmp
	}

	ret(type: Types.Type, value?: Values.Value) {
		const ret = new Instructions.Ret(type, value)
		this.push(ret)
		return ret
	}
}

export const i = (size: number) => new Types.Integer(size)

export const ret = (value: Values.Value | Types.Void) => 
	value instanceof Types.Void 
		? new Instructions.Ret(value) 
		: new Instructions.Ret(value.type, value)

export const nop = new Types.Void

export const sig = (returnType: Types.Type, parameters: Types.Type[] = []) => new Types.FunctionSignature(returnType, parameters)

export const label = (name: string) => new Types.Label(name)

export function define(signature: Types.FunctionSignature, name: string, cb: (fn: UtilityFunction, args: ReadonlyArray<Values.FunctionArgument>) => void | any) {
	const argNames = signature.parameters.map((v, i) => `${i}`)
	const fn = new UtilityFunction({ signature, name, argNames })
	cb(fn, fn.args)
	return fn
}