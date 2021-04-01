import SiteSessionsShow from '../../../../../../lib/use-cases/site/sessions/Show.mjs';

export default {
    useCaseClass : SiteSessionsShow,
    before       : async (factory) => {
        await factory.standardSetup();
        const users = await factory.setupUsers();
        const sessions = await factory.setupSessions();

        const userId = users[0].id;
        const sessionId = sessions[0].id;

        return { userId, sessionId };
    }
};
