import { DataTypes as DT } from '../../packages.mjs';

import Base                from './Base.mjs';

class TSuite extends Base {
    static schema = {
        id          : { type: DT.INTEGER, autoIncrement: true, primaryKey: true, allowNull: false },
        projectId   : { type: DT.INTEGER, allowNull: false },
        userId      : { type: DT.UUID, defaultValue: DT.UUIDV4, allowNull: false },
        name        : { type: DT.STRING, default: '' },
        description : { type: DT.STRING, default: '' },
        deletedBy   : { type: DT.DATE, allowNull: false }
    };

    static init(sequelize, options = {}) {
        super.init(sequelize, {
            ...options,
            paranoid : true
        });
    }

    static initRelations(sequelize) {
        const User = sequelize.model('User');

        this.hasOne(User);
    }
}

export default TSuite;
