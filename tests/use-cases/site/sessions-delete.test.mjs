import { getDirName } from '../../../lib/utils/index.mjs';
import Tester         from '../../lib/UseCaseTester.mjs';

const tester = new Tester();

const dirname = getDirName(import.meta.url);

tester.setupTestsWithTransactions(
    `${dirname}/../../fixtures/use-cases/site/sessions-delete/positive`,
    'site/sessions-delete/positive',
    async ({ config: { useCaseClass, before }, expected }) => {
        const { sessionId } = await before(tester.factory);

        await tester.testUseCasePositive({ useCaseClass, input: { id: sessionId }, expected });
    }
);

tester.setupTestsWithTransactions(
    `${dirname}/../../fixtures/use-cases/site/sessions-delete/negative`,
    'site/sessions-delete/negative',
    async ({ config: { useCaseClass, before }, input, exception }) => {
        await before(tester.factory);
        await tester.testUseCaseNegative({ useCaseClass, input, exception });
    }
);
