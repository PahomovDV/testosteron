import { Exception as X } from '../../../../packages.mjs';

import Base from '../../Base.mjs';
import { dumpHistory } from '../../utils/dumps.mjs';
import History from '../../../domain-model/History.mjs';
import DMX from '../../../domain-model/X.mjs';

export default class SiteHistorysShow extends Base {
    static validationRules = {
        id : [ 'required', 'integer' ]
    };

    async execute({ id }) {
        try {
            const history = await History.findById(id);

            return { data: dumpHistory(history) };
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
