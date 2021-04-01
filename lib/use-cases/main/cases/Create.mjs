import { Exception as X } from '../../../../packages.mjs';

import Base from '../../Base.mjs';
import { dumpCase } from '../../utils/dumps.mjs';
import Case from '../../../domain-model/Case.mjs';
import DMX from '../../../domain-model/X.mjs';

export default class MainCasesCreate extends Base {
    static validationRules = {
        data : [ 'required', { 'nested_object' : {
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

    async execute({ data }) {
        try {
            const case = await Case.create(data);

            return { data: dumpCase(case) };
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
