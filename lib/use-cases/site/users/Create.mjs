import { Exception as X } from '../../../../packages.mjs';

import Base from '../../Base.mjs';
import { dumpUser } from '../../utils/dumps.mjs';
import User from '../../../domain-model/User.mjs';
import DMX from '../../../domain-model/X.mjs';

export default class SiteUsersCreate extends Base {
    static validationRules = {
        data : [ 'required', { 'nested_object' : {
            email    : [ 'string', { 'max_length': 255 }, 'email' ],
            userName : [ 'string', { 'max_length': 255 } ],
            token    : [ 'string', { 'max_length': 255 } ]
        } } ]
    };

    async execute({ data }) {
        try {
            const user = await User.create(data);

            return { data: dumpUser(user) };
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
