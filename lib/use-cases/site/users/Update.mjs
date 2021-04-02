import { Exception as X } from '../../../../packages.mjs';

import Base from '../../Base.mjs';
import { dumpUser } from '../../utils/dumps.mjs';
import User from '../../../domain-model/User.mjs';
import DMX from '../../../domain-model/X.mjs';

export default class SiteUsersUpdate extends Base {
    static validationRules = {
        id   : [ 'required', 'uuid' ],
        data : [ { 'nested_object' : {
            email    : [ 'string', { 'max_length': 255 }, 'email' ],
            userName : [ 'string', { 'max_length': 255 } ],
            token    : [ 'string', { 'max_length': 255 } ]
        } } ]
    };

    async execute({ id, data }) {
        try {
            const user = await User.findById(id);

            const result = await user.update(data);

            return { data: dumpUser(result) };
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
