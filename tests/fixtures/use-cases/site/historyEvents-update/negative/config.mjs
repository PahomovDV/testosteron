import SiteHistoryEventsUpdate from '../../../../../../lib/use-cases/site/historyEvents/Update.mjs';

export default {
    useCaseClass : SiteHistoryEventsUpdate,
    before       : async (factory) => {
        await factory.standardSetup();
        const users = await factory.setupUsers();
        const historyevents = await factory.setupHistoryEvents();

        const userId = users[0].id;
        const historyEventId = historyevents[0].id;

        return { userId, historyEventId };
    }
};
