'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var invariant = _interopDefault(require('tiny-invariant'));

class Value {
  constructor(type) {
    this.type = type;
  }

}

class Instruction extends Value {
  constructor(instructionName, type) {
    super(type);
    this.instructionName = instructionName;
    this.terminator = false;
  }

  isEqual(to) {
    return this.type.isEqual(to.type);
  }

}

class BinaryOperation extends Instruction {
  // todo: support Vector<Integer>
  constructor(name, type, op1, op2) {
    super(name, type);
    this.op1 = op1;
    this.op2 = op2;
    this.flags = [];
    invariant(op1.type.isEqual(op2.type), `Instuction Error: op1 and op2 must have matching types`);
  }

}

class Type {
  constructor(typeName) {
    this.typeName = typeName;
  }

}

class Integer extends Value {
  constructor(type, value) {
    super(type);
    this.type = type;
    this.value = value;
  }

  isEqual(to) {
    return this === to || this.type.isEqual(to.type);
  }

}

class BasicBlock extends Value {
  constructor(name) {
    super(new Label());
    this.name = name;
    this.instructions = [];
    this.terminated = false;
  }

  push(...instrctions) {
    instrctions.forEach(inst => {
      invariant(!this.terminated, 'block has already been terminated with a terminator instruction!');
      this.instructions.push(inst);

      if (inst.terminator) {
        this.terminated = true;
      }
    });
  }

  isEqual(to) {
    return this === to;
  }

}

class Function extends Value {
  constructor({
    signature,
    name,
    argNames,
    body
  }) {
    super(signature);
    this.blocks = [];
    this.argNames = new Map();
    this.signature = signature;
    this.name = name;
    this.body = body || new BasicBlock();
    invariant(signature.parameters.length === argNames.length, 'Invalid number of names, signature length and name length do not match');
    argNames.forEach((name, i) => {
      invariant(!this.argNames.has(name), `Duplicate argument name: ${name}`);
      this.argNames.set(name, i);
    });
    this.args = signature.parameters.map((param, i) => new FunctionArgument(param, i, argNames[i]));
  }

  addBlock(block) {
    this.blocks.push(block);
    return block;
  }

  isEqual(to) {
    return this === to || this.type.isEqual(to.type);
  }

}

class FunctionArgument extends Value {
  constructor(type, position, name) {
    super(type);
    this.type = type;
    this.position = position;
    this.name = name;
  }

  isEqual(to) {
    return this === to || to instanceof FunctionArgument && this.type.isEqual(to.type);
  }

}



var index = /*#__PURE__*/Object.freeze({
    Value: Value,
    Integer: Integer,
    BasicBlock: BasicBlock,
    Function: Function,
    FunctionArgument: FunctionArgument
});

class Integer$1 extends Type {
  constructor(size) {
    super(`i${size}`);
    this.size = size;
  }

  val(value) {
    return new Integer(this, value);
  }

  isEqual(to) {
    return this === to || to instanceof Integer$1 && this.size === to.size;
  }

}

class Label extends Type {
  constructor(labelName) {
    super('label');
    this.labelName = labelName;
  }

  isEqual(to) {
    return this === to;
  }

}

class Void extends Type {
  constructor() {
    super('void');
  }

  isEqual(to) {
    return to instanceof Void;
  }

}

class FunctionSignature extends Type {
  constructor(returnType, parameters) {
    super(returnType.typeName);
    this.returnType = returnType;
    this.parameters = parameters;
  }

  isEqual(to) {
    return this === to || to instanceof FunctionSignature && this.returnType === to.returnType && this.parameters === to.parameters;
  }

}



var index$1 = /*#__PURE__*/Object.freeze({
    Integer: Integer$1,
    Label: Label,
    Type: Type,
    Void: Void,
    FunctionSignature: FunctionSignature
});

class Ret extends Instruction {
  constructor(type, value) {
    super('ret', type);
    this.value = value;
    this.terminator = true;
    this.flags = [];

    if (type instanceof Void) {
      invariant(value === undefined, 'Instruction Error: when returning void, `ret void` cannot have any values associated with it');
    } else {
      invariant(value !== undefined, 'Instruction Error: when returning any type other than void, a value must be associated with it');
    }
  }

}

const BOOL_WIDTH = 1;

class ICmp extends Instruction {
  constructor(cond, opType, op1, op2) {
    super('icmp', new Integer$1(BOOL_WIDTH));
    this.cond = cond;
    this.opType = opType;
    this.op1 = op1;
    this.op2 = op2;
    this.flags = [];
    invariant(opType.isEqual(op1.type), 'Type Error: op1 does not match the expected type');
    invariant(op1.type.isEqual(op2.type), 'Type Error: op1 and op2 must be the same type');
  }

} // type, opcode, operands
// ${opcode} ${type} ${operands.join(',')}

class Br extends Instruction {
  constructor(cond, ifTrue, ifFalse) {
    super('br', new Void());
    this.cond = cond;
    this.ifTrue = ifTrue;
    this.ifFalse = ifFalse;
    this.terminator = true;
    this.flags = [];
    invariant(cond.type instanceof Integer$1, `Type Error: cond type must be an Integer`);
    invariant(cond.type.size === BOOL_WIDTH, `Type Error: Integer size must be '${BOOL_WIDTH}' not ${cond.type.size}`);
  }

}

class Call extends Instruction {
  constructor(type, fn, args) {
    super('call', type);
    this.type = type;
    this.fn = fn;
    this.args = args;
    this.flags = [];
    invariant(type.isEqual(fn.signature.returnType), 'Type Error: Function return type and Call return type must be the same');
    invariant(args.length === fn.signature.parameters.length, 'Instruction Error: Function parameters length and Call args length are not the same');
    args.forEach((arg, i) => {
      invariant(arg.type.isEqual(fn.signature.parameters[i]), `Type Error: Argument ${i}'s type of Call does not match Functions parameter type`);
    });
  }

}



var index$2 = /*#__PURE__*/Object.freeze({
    Instruction: Instruction,
    BinaryOperation: BinaryOperation,
    Ret: Ret,
    ICmp: ICmp,
    Br: Br,
    Call: Call
});

class Serializer {
  constructor() {
    this.id = 0;
    this.identifiers = new Map();
    this.globals = new Set();
    this.block_id = 0;
    this.blocks = new Map();
    this.reset();
  }

  reset() {
    this.id = 0;
    this.identifiers = new Map();
    this.block_id = 0;
    this.blocks = new Map();
  }

  newIdentifier(inst) {
    const id = this.id;
    this.identifiers.set(inst, id);
    this.id += 1;
    return id;
  }

  newGlobal(name) {
    invariant(!this.globals.has(name), `Invalid name: name '${name}' has already been defined`);
    this.globals.add(name);
    return name;
  }

  newBlock(block, name) {
    this.blocks.set(block, name ? name : `bb${this.block_id += 1}`);
    return this.blocks.get(block);
  }

  block(block, blockName) {
    if (block instanceof BasicBlock) {
      blockName = blockName || this.newBlock(block, block.name);
      invariant(block.terminated, `Unterminated Block: '${blockName}'`); // (NAME|bb\d+):\n

      let io = '';
      io += `${blockName}:\n`;
      block.instructions.forEach(inst => {
        io += `\t${this.instruction(inst)}\n`;
      });
      return io;
    }
  }

  functionSignature(sig) {
    return `${sig.returnType.typeName}`;
  }

  functionArgument(arg) {
    let io = `${arg.type.typeName}`;
    this.newIdentifier(arg.name || `$__${this.id}__`);
    return io;
  }

  function(fn) {
    this.reset();
    /*
        define ${signature} @${name} (${args.join(',')}) {
            ${body}
            ${blocks.join('\n')}
        }
    */

    let io = `define ${this.functionSignature(fn.signature)} @${this.newGlobal(fn.name)} (${fn.args.map(arg => this.functionArgument(arg))}) {\n`;
    let bodyName;

    if (fn.body.instructions.length > 0) {
      bodyName = this.newBlock(fn.body, fn.body.name);
    }

    let blockNames = fn.blocks.map(b => this.newBlock(b, b.name));
    let body;

    if (fn.body.instructions.length > 0) {
      body = this.block(fn.body, bodyName);
    }

    let blocks = fn.blocks.map((b, i) => this.block(b, blockNames[i]));

    if (fn.body.instructions.length > 0) {
      io += `${body}\n`;
    }

    io += `${blocks.join('\n')}}`;
    return io;
  }

  instruction(inst) {
    let io = '';

    if (!inst.terminator) {
      io += `%${this.newIdentifier(inst)} = `;
    }

    io += `${inst.instructionName} `;

    if (inst instanceof BinaryOperation) {
      io += `${inst.type.typeName} ${this.arg(inst, inst.op1)}, ${this.arg(inst, inst.op2)}`;
    }

    if (inst instanceof ICmp) {
      io += `${inst.cond} ${inst.opType.typeName} ${this.arg(inst, inst.op1)}, ${this.arg(inst, inst.op2)}`;
    }

    if (inst instanceof Ret) {
      io += `${inst.type.typeName}`;

      if (!(inst.type instanceof Void)) {
        io += ` ${this.arg(inst, inst.value)}`;
      }
    }

    if (inst instanceof Call) {
      invariant(this.globals.has(inst.fn.name), 'Invalid Name: Call name has not been declared yet');
      io += `${inst.type.typeName} @${inst.fn.name} (${inst.args.map(v => `${v.type.typeName} ${this.arg(inst, v)}`).join(', ')})`;
    }

    if (inst instanceof Br) {
      io += `i1 ${this.arg(inst, inst.cond)}, ${this.arg(inst, inst.ifTrue)}, ${this.arg(inst, inst.ifFalse)}`;
    }

    return io;
  }

  arg(inst, value) {
    if (value instanceof Integer) {
      return `${value.value}`;
    }

    if (value instanceof Instruction) {
      return `%${this.identifiers.get(value)}`;
    }

    if (value instanceof BasicBlock) {
      invariant(this.blocks.has(value), `basic block ${value.name} has not been declared yet!`);
      return `label %${this.blocks.get(value)}`;
    }

    if (value instanceof FunctionArgument) {
      invariant(value.name, `name doesn't exist for functionargument`);
      return `%${this.identifiers.get(value.name)}`;
    }

    throw `Unimplemented arg: unimplemented arg value: ${value.constructor.name}`;
  }

}

class UtilityFunction extends Function {
  constructor() {
    super(...arguments);
    this.blocks = [];
  }

  createBlock(name) {
    const block = new UtilityBlock(name);
    this.addBlock(block);
    return block;
  }

  block(name, cb) {
    const foundBlock = this.blocks.find(b => b.name === name);
    const block = this.blocks.find(b => b.name === name) || new UtilityBlock(name);
    cb(block);

    if (foundBlock === undefined) {
      this.addBlock(block);
    }

    return block;
  }

}

class UtilityBlock extends BasicBlock {
  binop(name, type, op1, op2) {
    const binop = new BinaryOperation(name, type, op1, op2);
    this.push(binop);
    return binop;
  }

  br(cond, ifTrue, ifFalse) {
    const br = new Br(cond, ifTrue, ifFalse);
    this.push(br);
    return br;
  }

  call(type, fn, args) {
    const call = new Call(type, fn, args);
    this.push(call);
    return call;
  }

  icmp(cond, opType, op1, op2) {
    const icmp = new ICmp(cond, opType, op1, op2);
    this.push(icmp);
    return icmp;
  }

  ret(type, value) {
    const ret = new Ret(type, value);
    this.push(ret);
    return ret;
  }

}

const i = size => new Integer$1(size);
const ret = value => value instanceof Void ? new Ret(value) : new Ret(value.type, value);
const nop = new Void();
const sig = (returnType, parameters = []) => new FunctionSignature(returnType, parameters);
const label = name => new Label(name);
function define(signature, name, cb) {
  const argNames = signature.parameters.map((v, i) => `${i}`);
  const fn = new UtilityFunction({
    signature,
    name,
    argNames
  });
  cb(fn, fn.args);
  return fn;
}

var utils = /*#__PURE__*/Object.freeze({
    i: i,
    ret: ret,
    nop: nop,
    sig: sig,
    label: label,
    define: define
});

class Module {
  constructor() {
    this.functions = [];
  }

  addFunction(fn) {
    this.functions.push(fn);
  }

  build(values = this.functions) {
    const s = new Serializer();
    const io = [];
    values.forEach(inst => {
      if (inst instanceof Function) {
        io.push(s.function(inst));
      }

      if (inst instanceof Instruction) {
        io.push(s.instruction(inst));
      }
    });
    return io;
  }

} // const f = define('fib', [{ n: i(32) }], {
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

exports.Instructions = index$2;
exports.Module = Module;
exports.Serializer = Serializer;
exports.Types = index$1;
exports.Values = index;
exports.utils = utils;
//# sourceMappingURL=index.js.map
