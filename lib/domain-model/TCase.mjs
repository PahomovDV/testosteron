import { DataTypes as DT } from '../../packages.mjs';

import Base                from './Base.mjs';

class TCase extends Base {
    static schema = {
        id             : { type: DT.INTEGER, autoIncrement: true, primaryKey: true, allowNull: false },
        area           : { type: DT.STRING, default: '' },
        description    : { type: DT.INTEGER, default: '' },
        expectedResult : { type: DT.STRING, default: '' },
        notes          : { type: DT.STRING, allowNull: true },
        status         : { type: DT.ENUM('PASSED', 'FILED', 'NOT_TESTED'), defaultValue: 'NOT_TESTED' },
        isDeleted      : { type: DT.INTEGER, length: 1,  allowNull: false, default: 0 },
        createdBy      : { type: DT.STRING },
        updatedBy      : { type: DT.STRING }
    };
}

export default TCase;
