import { generateImagesURL } from './imagesURLGeneration.mjs';

export function dumpUser(user) {
    const dump = {
        id         : user.id,
        email      : user.email,
        firstName  : user.firstName,
        secondName : user.secondName,
        avatarUrl  : user.avatar ? generateImagesURL(user.avatar) : '',
        lang       : user.lang,
        createdAt  : user.createdAt.toISOString(),
        updatedAt  : user.updatedAt.toISOString()
    };

    return dump;
}

export function dumpSession(session) {
    const dump = {
        id        : session.id,
        token     : session.token,
        status    : session.status,
        suiteId   : session.suiteId,
        createdAt : session.createdAt.toISOString(),
        updatedAt : session.updatedAt.toISOString()
    };

    return dump;
}

export function dumpTCase(tCase) {
    const dump = {
        id             : tCase.id,
        area           : tCase.area,
        description    : tCase.description,
        expectedResult : tCase.expectedResult,
        notes          : tCase.notes,
        status         : tCase.status,
        isDeleted      : tCase.isDeleted,
        createdBy      : tCase.createdBy,
        updatedBy      : tCase.updatedBy,
        createdAt      : tCase.createdAt.toISOString(),
        updatedAt      : tCase.updatedAt.toISOString()
    };

    return dump;
}


export function dumpTSuite(tSuite) {
    const dump = {
        id          : tSuite.id,
        projectId   : tSuite.projectId,
        userId      : tSuite.userId,
        name        : tSuite.name,
        description : tSuite.description,
        createdBy   : tSuite.createdBy,
        updatedBy   : tSuite.updatedBy,
        createdAt   : tSuite.createdAt.toISOString(),
        updatedAt   : tSuite.updatedAt.toISOString()
    };

    return dump;
}

export function dumpHistory(history) {
    const dump = {
        id        : history.id,
        suitId    : history.suitId,
        userId    : history.userId,
        table     : history.table,
        event     : history.event,
        payload   : history.payload,
        createdAt : history.createdAt.toISOString(),
        updatedAt : history.updatedAt.toISOString()
    };

    return dump;
}

export function dumpHistoryEvent(historyEvent) {
    const dump = {
        id        : historyEvent.id,
        suiteId   : historyEvent.suiteId,
        userId    : historyEvent.userId,
        table     : historyEvent.table,
        event     : historyEvent.event,
        payload   : historyEvent.payload,
        createdAt : historyEvent.createdAt.toISOString(),
        updatedAt : historyEvent.updatedAt.toISOString()
    };

    return dump;
}
