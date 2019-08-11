import Value from './value.js';
import * as Types from '../types/index.js';
import invariant from 'tiny-invariant';
export default class BasicBlock extends Value {
    constructor(name) {
        super(new Types.Label);
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
        return (this === to);
    }
}
