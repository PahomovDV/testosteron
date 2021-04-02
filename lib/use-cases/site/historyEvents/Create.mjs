import { Exception as X } from '../../../../packages.mjs';

import Base from '../../Base.mjs';
import { dumpHistoryEvent } from '../../utils/dumps.mjs';
import HistoryEvent from '../../../domain-model/HistoryEvent.mjs';
import DMX from '../../../domain-model/X.mjs';

export default class SiteHistoryEventsCreate extends Base {
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
            const historyEvent = await HistoryEvent.create(data);

            return { data: dumpHistoryEvent(historyEvent) };
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
