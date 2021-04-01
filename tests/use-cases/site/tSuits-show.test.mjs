import { getDirName } from '../../../lib/utils/index.mjs';
import Tester         from '../../lib/UseCaseTester.mjs';

const tester = new Tester();

const dirname = getDirName(import.meta.url);

tester.setupTestsWithTransactions(
    `${dirname}/../../fixtures/use-cases/site/tSuits-show/positive`,
    'site/tSuits-show/positive',
    async ({ config: { useCaseClass, before }, expected }) => {
        const { tSuitId } = await before(tester.factory);

        await tester.testUseCasePositive({ useCaseClass, input: { id: tSuitId },  expected });
    }
);

tester.setupTestsWithTransactions(
    `${dirname}/../../fixtures/use-cases/site/tSuits-show/negative`,
    'site/tSuits-show/negative',
    async ({ config: { useCaseClass, before }, input, exception }) => {
        await before(tester.factory);
        await tester.testUseCaseNegative({ useCaseClass, input, exception });
    }
);
