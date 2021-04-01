import { DataTypes as DT } from '../../packages.mjs';

import Base                from './Base.mjs';

class TSuit extends Base {
    static schema = {
        id          : { type: DT.INTEGER, autoIncrement: true, primaryKey: true, allowNull: false },
        name        : { type: DT.STRING, default: '' },
        description : { type: DT.STRING, default: '' },
        isDeleted   : { type: DT.INTEGER, length: 1,  allowNull: false, default: 0 },
        createdBy   : { type: DT.STRING },
        updatedBy   : { type: DT.STRING }
    };
}

export default TSuit;
