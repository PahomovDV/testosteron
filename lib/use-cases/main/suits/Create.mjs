import { Exception as X } from '../../../../packages.mjs';

import Base from '../../Base.mjs';
import { dumpSuit } from '../../utils/dumps.mjs';
import Suit from '../../../domain-model/Suit.mjs';
import DMX from '../../../domain-model/X.mjs';

export default class MainSuitsCreate extends Base {
    static validationRules = {
        data : [ 'required', { 'nested_object' : {
            name        : [ 'string', { 'max_length': 255 } ],
            description : [ 'string', { 'max_length': 255 } ],
            isDeleted   : [ 'any' ],
            createdBy   : [ 'string', { 'max_length': 255 } ],
            updatedBy   : [ 'string', { 'max_length': 255 } ]
        } } ]
    };

    async execute({ data }) {
        try {
            const suit = await Suit.create(data);

            return { data: dumpSuit(suit) };
        } catch (x) {
            if (x instanceof DMX.NotUnique) {
                throw new X({
                    code   : 'NOT_UNIQUE',
                    fields : { [x.field]: 'NOT_UNIQUE' }
                });
            }

            throw x;
        }
    }
}
