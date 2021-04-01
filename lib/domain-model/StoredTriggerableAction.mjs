/* eslint-disable more/no-hardcoded-password */
import { DataTypes as DT } from '../../packages.mjs';

import logger from './logger.mjs';
import Base   from './Base.mjs';
import Admin  from './Admin.mjs';
import X      from './X.mjs';

export const TYPES = {
    'ACTIVATE_USER'        : 'ACTIVATE_USER',
    'RESET_USER_PASSWORD'  : 'RESET_USER_PASSWORD',
    'RESET_ADMIN_PASSWORD' : 'RESET_ADMIN_PASSWORD'
};

const ACTIONS_BY_TYPE = {
    [TYPES.RESET_ADMIN_PASSWORD] : {
        async validatePayload(payload) {
            await Admin.findById(payload.adminId);
        },
        async run({ password }, payload) {
            const admin = await Admin.findById(payload.adminId);

            return admin.resetPassword({ password });
        }
    }
};

class StoredTriggerableAction extends Base {
    static schema = {
        id      : { type: DT.UUID, defaultValue: DT.UUIDV4, primaryKey: true },
        type    : { type: DT.ENUM(Object.values(TYPES)), allowNull: false },
        payload : { type: DT.JSON, allowNull: false, defaultValue: {} }
    };

    static initHooks() {}

    async save(...args) {
        await this.#validatePayloadByType(this.type, this.payload);

        return super.save(...args);
    }

    #validatePayloadByType = async (type, payload) => {
        const actionLogic = ACTIONS_BY_TYPE[type];

        if (!actionLogic) {
            throw new X.WrongParameterValue({
                message : `Type "${type}" is not supported`,
                field   : 'type'
            });
        }

        await actionLogic.validatePayload(payload);
    }

    async run(params) {
        const actionLogic = ACTIONS_BY_TYPE[this.type];

        logger.info({
            action : 'StoredTriggerableAction RUN method is called',
            type   : this.type,
            params
        });

        return actionLogic.run(params, this.payload);
    }

    async runAndDelete(params) {
        const result = await this.run(params);

        await this.destroy();

        return result;
    }
}

export default StoredTriggerableAction;
