import { Exception as X } from '../../../../packages.mjs';

import Base from '../../Base.mjs';
import { dumpHistoryEvent } from '../../utils/dumps.mjs';
import HistoryEvent from '../../../domain-model/HistoryEvent.mjs';
import DMX from '../../../domain-model/X.mjs';

export default class SiteHistoryEventsUpdate extends Base {
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
            const historyEvent = await HistoryEvent.findById(id);

            const result = await historyEvent.update(data);

            return { data: dumpHistoryEvent(result) };
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
