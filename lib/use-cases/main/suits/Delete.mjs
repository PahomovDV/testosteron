import { Exception as X } from '../../../../packages.mjs';

import Base from '../../Base.mjs';
import Suit from '../../../domain-model/Suit.mjs';
import DMX from '../../../domain-model/X.mjs';

export default class MainSuitsDelete extends Base {
    static validationRules = {
        id : [ 'required', 'integer' ]
    };

    async execute({ id }) {
        try {
            const suit = await Suit.findById(id);

            await suit.destroy();

            return { };
        } catch (x) {
            if (x instanceof DMX.WrongId) {
                throw new X({
                    code   : 'WRONG_ID',
                    fields : { [x.field]: 'WRONG_ID' }
                });
            }

            throw x;
        }
    }
}
