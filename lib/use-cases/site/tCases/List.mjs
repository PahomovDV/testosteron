import { Op } from '../../../../packages.mjs';

import Base from '../../Base.mjs';
import { dumpTCase } from '../../utils/dumps.mjs';
import TCase from '../../../domain-model/TCase.mjs';

export default class SiteTCasesList extends Base {
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
        const searchFields = [ 'area', 'expectedResult', 'notes', 'createdBy', 'updatedBy' ];
        const findQuery = search
            ? { [Op.or]: searchFields.map(field => ({ [field]: { [Op.like]: `%${ search }%` } })) }
            : {};

        const dbRequest = {
            where : findQuery,
            order : [ [ sortedBy, order ] ],
            limit,
            offset
        };

        const [ tcases, filteredCount, totalCount ] = await Promise.all([
            TCase.findAll(dbRequest),
            TCase.count({ where: findQuery }),
            TCase.count()
        ]);

        const data = tcases.map(dumpTCase);

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
