import { Op } from '../../../../packages.mjs';

import Base from '../../Base.mjs';
import { dumpCase } from '../../utils/dumps.mjs';
import Case from '../../../domain-model/Case.mjs';

export default class MainCasesList extends Base {
    static validationRules = {
        search   : [ { 'min_length': 2 } ],
        limit    : [ 'positive_integer' ],
        offset   : [ 'integer', { 'min_number': 0 } ],
        sortedBy : [ { 'one_of': [ 'id', 'createdAt', 'updatedAt' ] } ],
        order    : [ { 'one_of': [ 'ASC', 'DESC' ] } ]
    };

    async execute({
        limit    = 20,
        offset   = 0,
        search   = '',
        sortedBy = 'createdAt',
        order    = 'DESC'
    }) {
        const searchFields = [ 'area', 'expected_result', 'notes', 'createdBy', 'updatedBy' ];
        const findQuery = search
            ? { [Op.or]: searchFields.map(field => ({ [field]: { [Op.like]: `%${ search }%` } })) }
            : {};

        const dbRequest = {
            where : findQuery,
            order : [ [ sortedBy, order ] ],
            limit,
            offset
        };

        const [ cases, filteredCount, totalCount ] = await Promise.all([
            Case.findAll(dbRequest),
            Case.count({ where: findQuery }),
            Case.count()
        ]);

        const data = cases.map(dumpCase);

        return {
            data,
            meta : {
                totalCount,
                filteredCount,
                limit,
                offset
            }
        };
    }
}
