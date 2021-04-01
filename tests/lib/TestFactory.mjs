import nodemailerMock          from 'nodemailer-mock';
import StoredTriggerableAction from '../../lib/domain-model/StoredTriggerableAction.mjs';

import Admin from '../../lib/domain-model/Admin.mjs';
import admins from '../fixtures/data/admins.json';

import TCase from '../../lib/domain-model/TCase.mjs';
import tCases from '../fixtures/data/tCases.json';

import TSuit from '../../lib/domain-model/TSuit.mjs';
import tSuits from '../fixtures/data/tSuits.json';

import Session from '../../lib/domain-model/Session.mjs';
import sessions from '../fixtures/data/sessions.json';

class TestFactory {
    async setupSessions() {
        const savedSessions = await Session.bulkCreate(sessions);


        return savedSessions;
    }

    async setupTSuits() {
        const savedTSuits = await TSuit.bulkCreate(tSuits);


        return savedTSuits;
    }

    async setupTCases() {
        const savedTCases = await TCase.bulkCreate(tCases);


        return savedTCases;
    }

    async setupAdmins() {
        const savedAdmins = await Admin.bulkCreate(admins);

        return savedAdmins;
    }

    async setupActions(userId, adminId) {
        const actions = [
            {
                type    : 'ACTIVATE_USER',
                payload : { userId }
            },
            {
                type    : 'RESET_USER_PASSWORD',
                payload : { userId }
            },
            {
                type    : 'RESET_ADMIN_PASSWORD',
                payload : { adminId }
            }
        ];
        const savedActions = await StoredTriggerableAction.bulkCreate(actions);

        return savedActions;
    }

    async standardSetup() {
        nodemailerMock.mock.reset();
    }
}

export default TestFactory;
