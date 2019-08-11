import * as Instructions from './instructions/index.js';
import * as Values from './values/index.js';
import * as Types from './types/index.js';
import Serializer from './serializer.js';
import * as utils from './utils.js';
export { Instructions, Values, Types, Serializer, utils };
export declare class Module {
    functions: Values.Function[];
    addFunction(fn: Values.Function): void;
    build(values?: Values.Value[]): string[];
}
