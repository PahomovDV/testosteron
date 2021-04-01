import { Exception as X } from '../../../../packages.mjs';

import Base from '../../Base.mjs';
import { dumpCase } from '../../utils/dumps.mjs';
import Case from '../../../domain-model/Case.mjs';
import DMX from '../../../domain-model/X.mjs';

export default class MainCasesUpdate extends Base {
    static validationRules = {
        id : ["required","integer"],
        data : [ { 'nested_object' : {
            area : ["string",{"max_length":255}],
description : ["integer"],
expected_result : ["string",{"max_length":255}],
notes : ["string",{"max_length":255}],
status : [{"one_of":["PASSED","FILED","NOT_TESTED"]}],
isDeleted : ["any"],
createdBy : ["string",{"max_length":255}],
updatedBy : ["string",{"max_length":255}],
        } } ]
    };

    async execute({ id, data }) {
        try {
            const case = await Case.findById(id);
            
            const result = await case.update(data);

            return { data: dumpCase(result) };
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
