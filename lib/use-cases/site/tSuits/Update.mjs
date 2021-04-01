import { Exception as X } from '../../../../packages.mjs';

import Base from '../../Base.mjs';
import { dumpTSuit } from '../../utils/dumps.mjs';
import TSuit from '../../../domain-model/TSuit.mjs';
import DMX from '../../../domain-model/X.mjs';

export default class SiteTSuitsUpdate extends Base {
    static validationRules = {
        id   : [ 'required', 'integer' ],
        data : [ { 'nested_object' : {
            name        : [ 'string', { 'max_length': 255 } ],
            description : [ 'string', { 'max_length': 255 } ],
            isDeleted   : [ 'integer' ],
            createdBy   : [ 'string', { 'max_length': 255 } ],
            updatedBy   : [ 'string', { 'max_length': 255 } ]
        } } ]
    };

    async execute({ id, data }) {
        try {
            const tSuit = await TSuit.findById(id);

            const result = await tSuit.update(data);

            return { data: dumpTSuit(result) };
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
