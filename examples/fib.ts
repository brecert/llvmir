import * as LLVM from '@brecert/llvmir'

const { Instructions, Types, Values ,Module, utils } = LLVM
const { i, sig, define, nop } = utils

const module = new Module

const fibSig = sig(i(32), [ i(32) ])

const fib = define(fibSig, 'fib', (fn, [ n ]) => {
	let start = fn.createBlock('start')

	let ifThen = fn.block('if.then', t => {
		t.ret(n.type, n)
	})

	let ifElse = fn.block('if.else', e => {
		let sub_left = e.binop('add', n.type, n, i(32).val(-1))
		let left = e.call(fn.signature.returnType, fn, [ sub_left ])

		let sub_right = e.binop('add', n.type, n, i(32).val(-2))
		let right = e.call(fn.signature.returnType, fn, [ sub_right ])

		let added = e.binop('add', left.type, left, right)
		e.ret(added.type, added)
	})

	fn.block('start', start => {
		let lt = start.icmp('slt', i(32), n, i(32).val(2))
		start.br(lt, ifThen, ifElse)
	})
})

const mainSig = sig(nop)
const main = define(mainSig, 'main', main => {
	main.block('start', start => {
		start.call(fib.signature.returnType, fib, [ i(32).val(10) ])
		start.ret(nop)
	})
})

module.addFunction(fib)
module.addFunction(main)

const built = module.build()
		.join('\n')
		.replace(/\t/g, '  ')

console.log(built)