import { Exception as X } from '../../../../packages.mjs';

import Base from '../../Base.mjs';
import { dumpTCase } from '../../utils/dumps.mjs';
import TCase from '../../../domain-model/TCase.mjs';
import DMX from '../../../domain-model/X.mjs';

export default class SiteTCasesShow extends Base {
    static validationRules = {
        id : [ 'required', 'integer' ]
    };

    async execute({ id }) {
        try {
            const tCase = await TCase.findById(id);

            return { data: dumpTCase(tCase) };
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
