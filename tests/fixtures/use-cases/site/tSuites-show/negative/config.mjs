import SiteTSuitesShow from '../../../../../../lib/use-cases/site/tSuites/Show.mjs';

export default {
    useCaseClass : SiteTSuitesShow,
    before       : async (factory) => {
        await factory.standardSetup();
        const users = await factory.setupUsers();
        const tsuites = await factory.setupTSuites();

        const userId = users[0].id;
        const tSuiteId = tsuites[0].id;

        return { userId, tSuiteId };
    }
};
