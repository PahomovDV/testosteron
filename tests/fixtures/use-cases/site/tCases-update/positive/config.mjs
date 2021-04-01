import SiteTCasesUpdate from '../../../../../../lib/use-cases/site/tCases/Update.mjs';

export default {
    useCaseClass : SiteTCasesUpdate,
    before       : async (factory) => {
        await factory.standardSetup();
        const users = await factory.setupUsers();
        const tcases = await factory.setupTCases();

        const userId = users[0].id;
        const tCaseId = tcases[0].id;

        return { userId, tCaseId };
    }
};
