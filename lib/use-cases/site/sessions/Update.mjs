import { Exception as X } from '../../../../packages.mjs';

import Base from '../../Base.mjs';
import { dumpSession } from '../../utils/dumps.mjs';
import Session from '../../../domain-model/Session.mjs';
import DMX from '../../../domain-model/X.mjs';

export default class SiteSessionsUpdate extends Base {
    static validationRules = {
        id   : [ 'required', 'integer' ],
        data : [ { 'nested_object' : {
            token   : [ 'string', { 'max_length': 255 } ],
            status  : [ { 'one_of': [ 'ACTIVE', 'NONE', 'DISABLED' ] } ],
            suiteId : [ 'integer' ]
        } } ]
    };

    async execute({ id, data }) {
        try {
            const session = await Session.findById(id);

            const result = await session.update(data);

            return { data: dumpSession(result) };
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
