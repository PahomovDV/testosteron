import { Exception as X } from '../../../../packages.mjs';

import Base from '../../Base.mjs';
import { dumpTSuite } from '../../utils/dumps.mjs';
import TSuite from '../../../domain-model/TSuite.mjs';
import DMX from '../../../domain-model/X.mjs';

export default class SiteTSuitesUpdate extends Base {
    static validationRules = {
        id   : [ 'required', 'integer' ],
        data : [ { 'nested_object' : {
            projectId   : [ 'integer' ],
            userId      : [ 'uuid' ],
            name        : [ 'string', { 'max_length': 255 } ],
            description : [ 'string', { 'max_length': 255 } ],
            deletedBy   : [ 'iso_date' ]
        } } ]
    };

    async execute({ id, data }) {
        try {
            const tSuite = await TSuite.findById(id);

            const result = await tSuite.update(data);

            return { data: dumpTSuite(result) };
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
