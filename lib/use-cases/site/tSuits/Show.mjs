import { Exception as X } from '../../../../packages.mjs';

import Base from '../../Base.mjs';
import { dumpTSuit } from '../../utils/dumps.mjs';
import TSuit from '../../../domain-model/TSuit.mjs';
import DMX from '../../../domain-model/X.mjs';

export default class SiteTSuitsShow extends Base {
    static validationRules = {
        id : [ 'required', 'integer' ]
    };

    async execute({ id }) {
        try {
            const tSuit = await TSuit.findById(id);

            return { data: dumpTSuit(tSuit) };
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
