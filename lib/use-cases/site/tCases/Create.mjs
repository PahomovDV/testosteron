import { Exception as X } from '../../../../packages.mjs';

import Base from '../../Base.mjs';
import { dumpTCase } from '../../utils/dumps.mjs';
import TCase from '../../../domain-model/TCase.mjs';
import DMX from '../../../domain-model/X.mjs';

export default class SiteTCasesCreate extends Base {
    static validationRules = {
        data : [ 'required', { 'nested_object' : {
            suiteId        : [ 'integer' ],
            userId         : [ 'uuid' ],
            area           : [ 'string', { 'max_length': 255 } ],
            description    : [ 'integer' ],
            expectedResult : [ 'string', { 'max_length': 255 } ],
            notes          : [ 'string', { 'max_length': 255 } ],
            status         : [ { 'one_of': [ 'PASSED', 'FILED', 'NOT_TESTED' ] } ],
            deletedBy      : [ 'iso_date' ]
        } } ]
    };

    async execute({ data }) {
        try {
            const tCase = await TCase.create(data);

            return { data: dumpTCase(tCase) };
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
