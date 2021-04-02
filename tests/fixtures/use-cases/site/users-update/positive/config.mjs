import SiteUsersUpdate from '../../../../../../lib/use-cases/site/users/Update.mjs';

export default {
    useCaseClass : SiteUsersUpdate,
    before       : async (factory) => {
        await factory.standardSetup();
        const users = await factory.setupUsers();
        const users = await factory.setupUsers();

        const userId = users[0].id;
        const userId = users[0].id;

        return { userId, userId };
    }
};
