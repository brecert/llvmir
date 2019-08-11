import * as Instructions from './instructions/index.js'
import * as Values from './values/index.js'
import * as Types from './types/index.js'
import Serializer from './serializer.js';
import * as utils from './utils.js'

export { Instructions, Values, Types, Serializer, utils }

export class Module {
	public functions: Values.Function[] = []

	addFunction(fn: Values.Function) {
		this.functions.push(fn)
	}

	build(values: Values.Value[] = this.functions) {
		const s = new Serializer;
		const io: string[] = []

		values.forEach(inst => {
			if(inst instanceof Values.Function) {
				io.push(s.function(inst))
			}

			if(inst instanceof Instructions.Instruction) {
				io.push(s.instruction(inst))
			}
		})

		return io;
	}
}


// const f = define('fib', [{ n: i(32) }], {
// 	main(self) {
// 		self.icmp('slt', i(32), n, i(32).val(2))
// 		self.br(icmp, ifThen, ifElse)
// 	}
// }, i(32))
// // todo: add getArg(name: string)
// const n = f.args.find(arg => arg.name === 'n')!

// let ret = new Instructions.Ret(i(32), i(32).val(3))

// let ifThen = f.addBlock(new Values.BasicBlock('if.then'))
// ifThen.push(new Instructions.Ret(n.type, n))

// let ifElse = f.addBlock(new Values.BasicBlock('if.else'))
// let n1 = new Instructions.BinaryOperation('add', n.type, n, i(32).val(-1))
// let res1 = new Instructions.Call(f.signature.returnType, f, [ n1 ])
// let n2 = new Instructions.BinaryOperation('add', n.type, n, i(32).val(-2))
// let res2 = new Instructions.Call(f.signature.returnType, f, [ n2 ])
// let n3 = new Instructions.BinaryOperation('add', n1.type, n1, n2)
// let retElse = new Instructions.Ret(n3.type, n3)

// ifElse.push(n1, res1, n2, res2, n3, retElse)

// let icmp = new Instructions.ICmp('slt', i(32), n, i(32).val(2))
// let br = new Instructions.Br(icmp, ifThen, ifElse)

// f.body.push(icmp, br)

// m.functions.push(f)

// console.log(s.block(b))