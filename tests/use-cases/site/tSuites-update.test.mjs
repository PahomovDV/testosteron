import { getDirName } from '../../../lib/utils/index.mjs';
import Tester         from '../../lib/UseCaseTester.mjs';

const tester = new Tester();

const dirname = getDirName(import.meta.url);

tester.setupTestsWithTransactions(
    `${dirname}/../../fixtures/use-cases/site/tSuites-update/positive`,
    'site/tSuites-update/positive',
    async ({ config: { useCaseClass, before }, expected, input }) => {
        const { tSuiteId } = await before(tester.factory);

        await tester.testUseCasePositive({
            useCaseClass,
            input : { ...input, id: tSuiteId },
            expected
        });
    }
);

tester.setupTestsWithTransactions(
    `${dirname}/../../fixtures/use-cases/site/tSuites-update/negative`,
    'site/tSuites-update/negative',
    async ({ config: { useCaseClass, before }, input, exception }) => {
        const { tSuiteId } = await before(tester.factory);

        await tester.testUseCaseNegative({
            useCaseClass,
            input : { ...input, id: input.id || tSuiteId },
            exception
        });
    }
);
