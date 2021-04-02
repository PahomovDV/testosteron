import { Op } from '../../../../packages.mjs';

import Base from '../../Base.mjs';
import { dumpTSuite } from '../../utils/dumps.mjs';
import TSuite from '../../../domain-model/TSuite.mjs';

export default class SiteTSuitesList extends Base {
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
        const searchFields = [ 'name', 'description' ];
        const findQuery = search
            ? { [Op.or]: searchFields.map(field => ({ [field]: { [Op.like]: `%${ search }%` } })) }
            : {};

        const dbRequest = {
            where : findQuery,
            order : [ [ sortedBy, order ] ],
            limit,
            offset
        };

        const [ tsuites, filteredCount, totalCount ] = await Promise.all([
            TSuite.findAll(dbRequest),
            TSuite.count({ where: findQuery }),
            TSuite.count()
        ]);

        const data = tsuites.map(dumpTSuite);

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
