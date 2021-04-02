import nodemailerMock          from 'nodemailer-mock';

import User from '../../lib/domain-model/User.mjs';
import users from '../fixtures/data/users.json';

import TSuite from '../../lib/domain-model/TSuite.mjs';
import tSuites from '../fixtures/data/tSuites.json';

import Session from '../../lib/domain-model/Session.mjs';
import sessions from '../fixtures/data/sessions.json';

import HistoryEvent from '../../lib/domain-model/HistoryEvent.mjs';
import historyEvents from '../fixtures/data/historyEvents.json';

import TCase from '../../lib/domain-model/TCase.mjs';
import tCases from '../fixtures/data/tCases.json';

class TestFactory {
    async setupTCases() {
        const savedTCases = await TCase.bulkCreate(tCases);


        return savedTCases;
    }

    async setupHistoryEvents() {
        const savedHistoryEvents = await HistoryEvent.bulkCreate(historyEvents);


        return savedHistoryEvents;
    }

    async setupSessions() {
        const savedSessions = await Session.bulkCreate(sessions);


        return savedSessions;
    }

    async setupTSuites() {
        const savedTSuites = await TSuite.bulkCreate(tSuites);


        return savedTSuites;
    }

    async setupUsers() {
        const savedUsers = await User.bulkCreate(users);


        return savedUsers;
    }

    async standardSetup() {
        nodemailerMock.mock.reset();
    }
}

export default TestFactory;
