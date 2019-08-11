import { Module, Instructions, Values, Types, utils } from '@brecert/llvmir'

const module = new Module

// utils provides shorthands to a lot of instructions or functionality
const { i, sig } = utils

// create the type signature for the functions
// for more info please look at https://llvm.org/docs/LangRef.html#function-type
const fnMainSig = sig(i(32), [])
const fnMain = new Values.Function({
	name: 'main',
	signature: fnMainSig,
	argNames: []
})

// there's a lot of writing involved when writing instructions
// it's pretty easy to make a shorthand for a lot of them if utils doesn't already have one
const add = (left: Values.Integer, right: Values.Integer) => new Instructions.BinaryOperation('add', left.type, left, right)


// add the values 3 and 6 together
const sum = add(i(32).val(3), i(32).val(6))

// the block must have a terminator, so we will return the sum
// for more info please look at https://llvm.org/docs/LangRef.html#terminators
const ret = new Instructions.Ret(sum.type, sum)

// we will push the instructions the the functions main block
fnMain.body.push(sum, ret)

// we add the function to module
module.addFunction(fnMain)

// we build the module
// by default the module returns an array of the functions, so we join it here
module.build().join('\n')
