import { Exception as X } from '../../../../packages.mjs';

import Base from '../../Base.mjs';
import { dumpSuit } from '../../utils/dumps.mjs';
import Suit from '../../../domain-model/Suit.mjs';
import DMX from '../../../domain-model/X.mjs';

export default class MainSuitsUpdate extends Base {
    static validationRules = {
        id   : [ 'required', 'integer' ],
        data : [ { 'nested_object' : {
            name        : [ 'string', { 'max_length': 255 } ],
            description : [ 'string', { 'max_length': 255 } ],
            isDeleted   : [ 'any' ],
            createdBy   : [ 'string', { 'max_length': 255 } ],
            updatedBy   : [ 'string', { 'max_length': 255 } ]
        } } ]
    };

    async execute({ id, data }) {
        try {
            const suit = await Suit.findById(id);

            const result = await suit.update(data);

            return { data: dumpSuit(result) };
        } catch (x) {
            if (x instanceof DMX.WrongId) {
                throw new X({
                    code   : 'WRONG_ID',
                    fields : { [x.field]: 'WRONG_ID' }
                });
            }

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
