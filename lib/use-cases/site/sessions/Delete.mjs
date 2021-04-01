import { Exception as X } from '../../../../packages.mjs';

import Base from '../../Base.mjs';
import Session from '../../../domain-model/Session.mjs';
import DMX from '../../../domain-model/X.mjs';

export default class SiteSessionsDelete extends Base {
    static validationRules = {
        id : [ 'required', 'integer' ]
    };

    async execute({ id }) {
        try {
            const session = await Session.findById(id);

            await session.destroy();

            return { };
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
