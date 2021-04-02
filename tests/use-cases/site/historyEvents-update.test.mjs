import { getDirName } from '../../../lib/utils/index.mjs';
import Tester         from '../../lib/UseCaseTester.mjs';

const tester = new Tester();

const dirname = getDirName(import.meta.url);

tester.setupTestsWithTransactions(
    `${dirname}/../../fixtures/use-cases/site/historyEvents-update/positive`,
    'site/historyEvents-update/positive',
    async ({ config: { useCaseClass, before }, expected, input }) => {
        const { historyEventId } = await before(tester.factory);

        await tester.testUseCasePositive({
            useCaseClass,
            input : { ...input, id: historyEventId },
            expected
        });
    }
);

tester.setupTestsWithTransactions(
    `${dirname}/../../fixtures/use-cases/site/historyEvents-update/negative`,
    'site/historyEvents-update/negative',
    async ({ config: { useCaseClass, before }, input, exception }) => {
        const { historyEventId } = await before(tester.factory);

        await tester.testUseCaseNegative({
            useCaseClass,
            input : { ...input, id: input.id || historyEventId },
            exception
        });
    }
);
