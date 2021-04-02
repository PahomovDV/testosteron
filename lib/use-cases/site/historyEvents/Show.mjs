import { Exception as X } from '../../../../packages.mjs';

import Base from '../../Base.mjs';
import { dumpHistoryEvent } from '../../utils/dumps.mjs';
import HistoryEvent from '../../../domain-model/HistoryEvent.mjs';
import DMX from '../../../domain-model/X.mjs';

export default class SiteHistoryEventsShow extends Base {
    static validationRules = {
        id : [ 'required', 'integer' ]
    };

    async execute({ id }) {
        try {
            const historyEvent = await HistoryEvent.findById(id);

            return { data: dumpHistoryEvent(historyEvent) };
        } catch (x) {
            if (x instanceof DMX.WrongId) {
                throw new X({
                    code   : 'WRONG_ID',
                    fields : { [x.field]: 'WRONG_ID' }
                });
            }

            throw x;
        }
    }
}
