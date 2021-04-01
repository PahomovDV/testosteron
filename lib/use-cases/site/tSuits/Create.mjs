import { Exception as X } from '../../../../packages.mjs';

import Base from '../../Base.mjs';
import { dumpTSuit } from '../../utils/dumps.mjs';
import TSuit from '../../../domain-model/TSuit.mjs';
import DMX from '../../../domain-model/X.mjs';

export default class SiteTSuitsCreate extends Base {
    static validationRules = {
        data : [ 'required', { 'nested_object' : {
            name        : [ 'string', { 'max_length': 255 } ],
            description : [ 'string', { 'max_length': 255 } ],
            isDeleted   : [ 'integer' ],
            createdBy   : [ 'string', { 'max_length': 255 } ],
            updatedBy   : [ 'string', { 'max_length': 255 } ]
        } } ]
    };

    async execute({ data }) {
        try {
            const tSuit = await TSuit.create(data);

            return { data: dumpTSuit(tSuit) };
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
