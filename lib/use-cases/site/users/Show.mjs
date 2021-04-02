import { Exception as X } from '../../../../packages.mjs';

import Base from '../../Base.mjs';
import { dumpUser } from '../../utils/dumps.mjs';
import User from '../../../domain-model/User.mjs';
import DMX from '../../../domain-model/X.mjs';

export default class SiteUsersShow extends Base {
    static validationRules = {
        id : [ 'required', 'uuid' ]
    };

    async execute({ id }) {
        try {
            const user = await User.findById(id);

            return { data: dumpUser(user) };
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
