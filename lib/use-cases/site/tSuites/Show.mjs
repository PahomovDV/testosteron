import { Exception as X } from '../../../../packages.mjs';

import Base from '../../Base.mjs';
import { dumpTSuite } from '../../utils/dumps.mjs';
import TSuite from '../../../domain-model/TSuite.mjs';
import DMX from '../../../domain-model/X.mjs';

export default class SiteTSuitesShow extends Base {
    static validationRules = {
        id : [ 'required', 'integer' ]
    };

    async execute({ id }) {
        try {
            const tSuite = await TSuite.findById(id);

            return { data: dumpTSuite(tSuite) };
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
