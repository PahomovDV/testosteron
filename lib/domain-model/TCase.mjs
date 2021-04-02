import { DataTypes as DT } from '../../packages.mjs';

import Base                from './Base.mjs';

class TCase extends Base {
    static schema = {
        id             : { type: DT.INTEGER, autoIncrement: true, primaryKey: true, allowNull: false },
        suiteId        : { type: DT.INTEGER, allowNull: false },
        userId         : { type: DT.UUID, defaultValue: DT.UUIDV4, allowNull: false },
        area           : { type: DT.STRING, default: '' },
        description    : { type: DT.INTEGER, default: '' },
        expectedResult : { type: DT.STRING, default: '' },
        notes          : { type: DT.STRING, allowNull: true },
        status         : { type: DT.ENUM('PASSED', 'FILED', 'NOT_TESTED'), defaultValue: 'NOT_TESTED' },
        deletedBy      : { type: DT.DATE, allowNull: false }
    };

    static init(sequelize, options = {}) {
        super.init(sequelize, {
            ...options,
            paranoid : true
        });
    }

    static initRelations(sequelize) {
        const User = sequelize.model('User');
        const TSuite = sequelize.model('TSuite');

        this.hasOne(User);
        this.hasOne(TSuite);
    }
}

export default TCase;
