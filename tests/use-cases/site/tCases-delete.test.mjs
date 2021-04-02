import { getDirName } from '../../../lib/utils/index.mjs';
import Tester         from '../../lib/UseCaseTester.mjs';

const tester = new Tester();

const dirname = getDirName(import.meta.url);

tester.setupTestsWithTransactions(
    `${dirname}/../../fixtures/use-cases/site/tCases-delete/positive`,
    'site/tCases-delete/positive',
    async ({ config: { useCaseClass, before }, expected }) => {
        const { tCaseId } = await before(tester.factory);

        await tester.testUseCasePositive({ useCaseClass, input: { id: tCaseId }, expected });
    }
);

tester.setupTestsWithTransactions(
    `${dirname}/../../fixtures/use-cases/site/tCases-delete/negative`,
    'site/tCases-delete/negative',
    async ({ config: { useCaseClass, before }, input, exception }) => {
        await before(tester.factory);
        await tester.testUseCaseNegative({ useCaseClass, input, exception });
    }
);
