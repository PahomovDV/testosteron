import { Exception as X } from '../../../../packages.mjs';

import Base from '../../Base.mjs';
import { dumpHistory } from '../../utils/dumps.mjs';
import History from '../../../domain-model/History.mjs';
import DMX from '../../../domain-model/X.mjs';

export default class SiteHistorysCreate extends Base {
    static validationRules = {
        data : [ 'required', { 'nested_object' : {
            suiteId : [ 'integer' ],
            userId  : [ 'uuid' ],
            table   : [ 'string', { 'max_length': 255 } ],
            event   : [ 'string', { 'max_length': 255 } ],
            payload : [ 'string', { 'max_length': 255 } ]
        } } ]
    };

    async execute({ data }) {
        try {
            const history = await History.create(data);

            return { data: dumpHistory(history) };
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
