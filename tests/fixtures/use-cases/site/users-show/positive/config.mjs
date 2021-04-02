import SiteUsersShow from '../../../../../../lib/use-cases/site/users/Show.mjs';

export default {
    useCaseClass : SiteUsersShow,
    before       : async (factory) => {
        await factory.standardSetup();
        const users = await factory.setupUsers();
        const users = await factory.setupUsers();

        const userId = users[0].id;
        const userId = users[0].id;

        return { userId, userId };
    }
};
