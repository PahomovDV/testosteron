import SiteHistoryEventsDelete from '../../../../../../lib/use-cases/site/historyEvents/Delete.mjs';

export default {
    useCaseClass : SiteHistoryEventsDelete,
    before       : async (factory) => {
        await factory.standardSetup();
        const users = await factory.setupUsers();
        const historyevents = await factory.setupHistoryEvents();

        const userId = users[0].id;
        const historyEventId = historyevents[0].id;

        return { userId, historyEventId };
    }
};
