import { Exception as X } from '../../../../packages.mjs';

import Base from '../../Base.mjs';
import { dumpSession } from '../../utils/dumps.mjs';
import Session from '../../../domain-model/Session.mjs';
import DMX from '../../../domain-model/X.mjs';

export default class SiteSessionsCreate extends Base {
    static validationRules = {
        data : [ 'required', { 'nested_object' : {
            token   : [ 'string', { 'max_length': 255 } ],
            status  : [ { 'one_of': [ 'ACTIVE', 'NONE', 'DISABLED' ] } ],
            suiteId : [ 'integer' ]
        } } ]
    };

    async execute({ data }) {
        try {
            const session = await Session.create(data);

            return { data: dumpSession(session) };
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
