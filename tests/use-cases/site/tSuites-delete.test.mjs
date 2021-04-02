import { getDirName } from '../../../lib/utils/index.mjs';
import Tester         from '../../lib/UseCaseTester.mjs';

const tester = new Tester();

const dirname = getDirName(import.meta.url);

tester.setupTestsWithTransactions(
    `${dirname}/../../fixtures/use-cases/site/tSuites-delete/positive`,
    'site/tSuites-delete/positive',
    async ({ config: { useCaseClass, before }, expected }) => {
        const { tSuiteId } = await before(tester.factory);

        await tester.testUseCasePositive({ useCaseClass, input: { id: tSuiteId }, expected });
    }
);

tester.setupTestsWithTransactions(
    `${dirname}/../../fixtures/use-cases/site/tSuites-delete/negative`,
    'site/tSuites-delete/negative',
    async ({ config: { useCaseClass, before }, input, exception }) => {
        await before(tester.factory);
        await tester.testUseCaseNegative({ useCaseClass, input, exception });
    }
);
