import { Exception as X } from '../../../../packages.mjs';

import Base from '../../Base.mjs';
import { dumpCase } from '../../utils/dumps.mjs';
import Case from '../../../domain-model/Case.mjs';
import DMX from '../../../domain-model/X.mjs';

export default class MainCasesShow extends Base {
    static validationRules = {
        id : ["required","integer"],
    };

    async execute({ id }) {
        try {
            const case = await Case.findById(id);

            return { data: dumpCase(case) };
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
