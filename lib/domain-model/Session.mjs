import { DataTypes as DT } from '../../packages.mjs';

import Base                from './Base.mjs';

class Session extends Base {
    static schema = {
        id      : { type: DT.INTEGER, autoIncrement: true, primaryKey: true, allowNull: false },
        suiteId : { type: DT.INTEGER, allowNull: false },
        userId  : { type: DT.UUID, defaultValue: DT.UUIDV4, allowNull: false },
        status  : { type: DT.ENUM('ACTIVE', 'NONE', 'DISABLED'), defaultValue: 'NONE' }
    };

    static initRelations(sequelize) {
        const User = sequelize.model('User');
        const TSuite = sequelize.model('TSuite');

        this.hasOne(User);
        this.hasOne(TSuite);
    }
}

export default Session;
