import { getDirName } from '../../../lib/utils/index.mjs';
import Tester         from '../../lib/UseCaseTester.mjs';

const tester = new Tester();

const dirname = getDirName(import.meta.url);

tester.setupTestsWithTransactions(
    `${dirname}/../../fixtures/use-cases/site/historyEvents-show/positive`,
    'site/historyEvents-show/positive',
    async ({ config: { useCaseClass, before }, expected }) => {
        const { historyEventId } = await before(tester.factory);

        await tester.testUseCasePositive({ useCaseClass, input: { id: historyEventId },  expected });
    }
);

tester.setupTestsWithTransactions(
    `${dirname}/../../fixtures/use-cases/site/historyEvents-show/negative`,
    'site/historyEvents-show/negative',
    async ({ config: { useCaseClass, before }, input, exception }) => {
        await before(tester.factory);
        await tester.testUseCaseNegative({ useCaseClass, input, exception });
    }
);
