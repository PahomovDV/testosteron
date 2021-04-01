import SiteTCasesCreate from '../../../../../../lib/use-cases/site/tCases/Create.mjs';

export default {
    useCaseClass : SiteTCasesCreate,
    before       : async (factory) => {
        await factory.standardSetup();
        const users = await factory.setupUsers();
        const tcases = await factory.setupTCases();

        const userId = users[0].id;
        const tCaseId = tcases[0].id;

        return { userId, tCaseId };
    }
};
