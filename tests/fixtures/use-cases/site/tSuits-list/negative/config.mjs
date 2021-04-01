import SiteTSuitsList from '../../../../../../lib/use-cases/site/tSuits/List.mjs';

export default {
    useCaseClass : SiteTSuitsList,
    before       : async (factory) => {
        await factory.standardSetup();
        const users = await factory.setupUsers();
        const tsuits = await factory.setupTSuits();

        const userId = users[0].id;
        const tSuitId = tsuits[0].id;

        return { userId, tSuitId };
    }
};
