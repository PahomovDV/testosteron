import { Op } from '../../../../packages.mjs';

import Base from '../../Base.mjs';
import { dumpTSuit } from '../../utils/dumps.mjs';
import TSuit from '../../../domain-model/TSuit.mjs';

export default class SiteTSuitsList extends Base {
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
        const searchFields = [ 'name', 'description', 'createdBy', 'updatedBy' ];
        const findQuery = search
            ? { [Op.or]: searchFields.map(field => ({ [field]: { [Op.like]: `%${ search }%` } })) }
            : {};

        const dbRequest = {
            where : findQuery,
            order : [ [ sortedBy, order ] ],
            limit,
            offset
        };

        const [ tsuits, filteredCount, totalCount ] = await Promise.all([
            TSuit.findAll(dbRequest),
            TSuit.count({ where: findQuery }),
            TSuit.count()
        ]);

        const data = tsuits.map(dumpTSuit);

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
