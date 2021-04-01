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

export function dumpAdmin(admin) {
    const dump = {
        id        : admin.id,
        email     : admin.email,
        createdAt : admin.createdAt.toISOString(),
        updatedAt : admin.updatedAt.toISOString()
    };

    return dump;
}
export function dumpCase(case) {
const dump = {
id : case.id,
area : case.area,
description : case.description,
expected_result : case.expected_result,
notes : case.notes,
status : case.status,
isDeleted : case.isDeleted,
createdBy : case.createdBy,
updatedBy : case.updatedBy,
createdAt : case.createdAt.toISOString(),
updatedAt : case.updatedAt.toISOString(),
};

return dump;
}
export function dumpSession(session) {
const dump = {
id : session.id,
token : session.token,
status : session.status,
suiteId : session.suiteId,
createdAt : session.createdAt.toISOString(),
updatedAt : session.updatedAt.toISOString(),
};

return dump;
}
export function dumpSuit(suit) {
const dump = {
id : suit.id,
name : suit.name,
description : suit.description,
isDeleted : suit.isDeleted,
createdBy : suit.createdBy,
updatedBy : suit.updatedBy,
createdAt : suit.createdAt.toISOString(),
updatedAt : suit.updatedAt.toISOString(),
};

return dump;
}
export function dumpCaseToSuitMap(caseToSuitMap) {
const dump = {
createdAt : caseToSuitMap.createdAt.toISOString(),
updatedAt : caseToSuitMap.updatedAt.toISOString(),
};

return dump;
}
export function dumpTCase(tCase) {
const dump = {
id : tCase.id,
area : tCase.area,
description : tCase.description,
expectedResult : tCase.expectedResult,
notes : tCase.notes,
status : tCase.status,
isDeleted : tCase.isDeleted,
createdBy : tCase.createdBy,
updatedBy : tCase.updatedBy,
createdAt : tCase.createdAt.toISOString(),
updatedAt : tCase.updatedAt.toISOString(),
};

return dump;
}
export function dumpTSuit(tSuit) {
const dump = {
id : tSuit.id,
name : tSuit.name,
description : tSuit.description,
isDeleted : tSuit.isDeleted,
createdBy : tSuit.createdBy,
updatedBy : tSuit.updatedBy,
createdAt : tSuit.createdAt.toISOString(),
updatedAt : tSuit.updatedAt.toISOString(),
};

return dump;
}
