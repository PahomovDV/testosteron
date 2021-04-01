import { getDirName } from '../../../lib/utils/index.mjs';
import Tester         from '../../lib/UseCaseTester.mjs';

const tester = new Tester();

const dirname = getDirName(import.meta.url);

tester.setupTestsWithTransactions(
    `${dirname}/../../fixtures/use-cases/site/tSuits-update/positive`,
    'site/tSuits-update/positive',
    async ({ config: { useCaseClass, before }, expected, input }) => {
        const { tSuitId } = await before(tester.factory);

        await tester.testUseCasePositive({
            useCaseClass,
            input : { ...input, id: tSuitId },
            expected
        });
    }
);

tester.setupTestsWithTransactions(
    `${dirname}/../../fixtures/use-cases/site/tSuits-update/negative`,
    'site/tSuits-update/negative',
    async ({ config: { useCaseClass, before }, input, exception }) => {
        const { tSuitId } = await before(tester.factory);

        await tester.testUseCaseNegative({
            useCaseClass,
            input : { ...input, id: input.id || tSuitId },
            exception
        });
    }
);
