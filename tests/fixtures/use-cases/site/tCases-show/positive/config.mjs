import SiteTCasesShow from '../../../../../../lib/use-cases/site/tCases/Show.mjs';

export default {
    useCaseClass : SiteTCasesShow,
    before       : async (factory) => {
        await factory.standardSetup();
        const users = await factory.setupUsers();
        const tcases = await factory.setupTCases();

        const userId = users[0].id;
        const tCaseId = tcases[0].id;

        return { userId, tCaseId };
    }
};
