import SiteSessionsCreate from '../../../../../../lib/use-cases/site/sessions/Create.mjs';

export default {
    useCaseClass : SiteSessionsCreate,
    before       : async (factory) => {
        await factory.standardSetup();
        const users = await factory.setupUsers();
        const sessions = await factory.setupSessions();

        const userId = users[0].id;
        const sessionId = sessions[0].id;

        return { userId, sessionId };
    }
};
