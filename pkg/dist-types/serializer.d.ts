import * as Instructions from './instructions/index.js';
import * as Values from './values/index.js';
import * as Types from './types/index.js';
export default class Serializer {
    private id;
    private identifiers;
    private globals;
    private block_id;
    private blocks;
    private reset;
    private newIdentifier;
    private newGlobal;
    private newBlock;
    constructor();
    block(block: Values.BasicBlock, blockName?: string): string | undefined;
    functionSignature(sig: Types.FunctionSignature): string;
    functionArgument(arg: Values.FunctionArgument): string;
    function(fn: Values.Function): string;
    instruction(inst: Instructions.Instruction): string;
    arg(inst: Instructions.Instruction, value: Values.Value): string;
}
