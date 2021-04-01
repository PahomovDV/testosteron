import { DataTypes as DT } from '../../packages.mjs';

import Base                from './Base.mjs';
import TSuit                from './TSuit.mjs';

class Session extends Base {
    static schema = {
        id      : { type: DT.INTEGER, autoIncrement: true, primaryKey: true, allowNull: false },
        token   : { type: DT.STRING },
        status  : { type: DT.ENUM('ACTIVE', 'NONE', 'DISABLED'), defaultValue: 'NONE' },
        suiteId : { type: DT.INTEGER, allowNull: false }
    };

    static initRelations() {
        Session.TSuit = Session.hasOne(TSuit);
    }
}

export default Session;
