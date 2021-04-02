import { Exception as X } from '../../../../packages.mjs';

import Base from '../../Base.mjs';
import { dumpHistory } from '../../utils/dumps.mjs';
import History from '../../../domain-model/History.mjs';
import DMX from '../../../domain-model/X.mjs';

export default class SiteHistorysUpdate extends Base {
    static validationRules = {
        id   : [ 'required', 'integer' ],
        data : [ { 'nested_object' : {
            suiteId : [ 'integer' ],
            userId  : [ 'uuid' ],
            table   : [ 'string', { 'max_length': 255 } ],
            event   : [ 'string', { 'max_length': 255 } ],
            payload : [ 'string', { 'max_length': 255 } ]
        } } ]
    };

    async execute({ id, data }) {
        try {
            const history = await History.findById(id);

            const result = await history.update(data);

            return { data: dumpHistory(result) };
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
