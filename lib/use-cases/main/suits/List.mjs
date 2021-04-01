import { Op } from '../../../../packages.mjs';

import Base from '../../Base.mjs';
import { dumpSuit } from '../../utils/dumps.mjs';
import Suit from '../../../domain-model/Suit.mjs';

export default class MainSuitsList extends Base {
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

        const [ suits, filteredCount, totalCount ] = await Promise.all([
            Suit.findAll(dbRequest),
            Suit.count({ where: findQuery }),
            Suit.count()
        ]);

        const data = suits.map(dumpSuit);

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
