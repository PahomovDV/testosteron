import { Exception as X } from '../../../../packages.mjs';

import Base from '../../Base.mjs';
import { dumpTSuite } from '../../utils/dumps.mjs';
import TSuite from '../../../domain-model/TSuite.mjs';
import DMX from '../../../domain-model/X.mjs';

export default class SiteTSuitesCreate extends Base {
    static validationRules = {
        data : [ 'required', { 'nested_object' : {
            projectId   : [ 'integer' ],
            userId      : [ 'uuid' ],
            name        : [ 'string', { 'max_length': 255 } ],
            description : [ 'string', { 'max_length': 255 } ],
            deletedBy   : [ 'iso_date' ]
        } } ]
    };

    async execute({ data }) {
        try {
            const tSuite = await TSuite.create(data);

            return { data: dumpTSuite(tSuite) };
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
