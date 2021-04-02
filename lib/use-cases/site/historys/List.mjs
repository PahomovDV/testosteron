import { Op } from '../../../../packages.mjs';

import Base from '../../Base.mjs';
import { dumpHistory } from '../../utils/dumps.mjs';
import History from '../../../domain-model/History.mjs';

export default class SiteHistorysList extends Base {
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
        const searchFields = [ 'table', 'event', 'payload' ];
        const findQuery = search
            ? { [Op.or]: searchFields.map(field => ({ [field]: { [Op.like]: `%${ search }%` } })) }
            : {};

        const dbRequest = {
            where : findQuery,
            order : [ [ sortedBy, order ] ],
            limit,
            offset
        };

        const [ historys, filteredCount, totalCount ] = await Promise.all([
            History.findAll(dbRequest),
            History.count({ where: findQuery }),
            History.count()
        ]);

        const data = historys.map(dumpHistory);

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
