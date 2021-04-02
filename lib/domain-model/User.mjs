import { DataTypes as DT } from '../../packages.mjs';

import Base                from './Base.mjs';

class User extends Base {
    static schema = {
        id       : { type: DT.UUID, defaultValue: DT.UUIDV4, primaryKey: true },
        email    : { type: DT.STRING, allowNull: false, unique: true },
        userName : { type: DT.STRING, require: true, unique: true },
        token    : { type: DT.STRING, require: true }
    };

    static initRelations() {}
}

export default User;
