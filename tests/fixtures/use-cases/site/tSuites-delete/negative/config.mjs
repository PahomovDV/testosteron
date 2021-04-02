import SiteTSuitesDelete from '../../../../../../lib/use-cases/site/tSuites/Delete.mjs';

export default {
    useCaseClass : SiteTSuitesDelete,
    before       : async (factory) => {
        await factory.standardSetup();
        const users = await factory.setupUsers();
        const tsuites = await factory.setupTSuites();

        const userId = users[0].id;
        const tSuiteId = tsuites[0].id;

        return { userId, tSuiteId };
    }
};
