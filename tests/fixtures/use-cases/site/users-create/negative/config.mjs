import SiteUsersCreate from '../../../../../../lib/use-cases/site/users/Create.mjs';

export default {
    useCaseClass : SiteUsersCreate,
    before       : async (factory) => {
        await factory.standardSetup();
        const users = await factory.setupUsers();
        const users = await factory.setupUsers();

        const userId = users[0].id;
        const userId = users[0].id;

        return { userId, userId };
    }
};
