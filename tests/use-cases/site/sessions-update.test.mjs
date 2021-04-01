import { getDirName } from '../../../lib/utils/index.mjs';
import Tester         from '../../lib/UseCaseTester.mjs';

const tester = new Tester();

const dirname = getDirName(import.meta.url);

tester.setupTestsWithTransactions(
    `${dirname}/../../fixtures/use-cases/site/sessions-update/positive`,
    'site/sessions-update/positive',
    async ({ config: { useCaseClass, before }, expected, input }) => {
        const { sessionId } = await before(tester.factory);

        await tester.testUseCasePositive({
            useCaseClass,
            input : { ...input, id: sessionId },
            expected
        });
    }
);

tester.setupTestsWithTransactions(
    `${dirname}/../../fixtures/use-cases/site/sessions-update/negative`,
    'site/sessions-update/negative',
    async ({ config: { useCaseClass, before }, input, exception }) => {
        const { sessionId } = await before(tester.factory);

        await tester.testUseCaseNegative({
            useCaseClass,
            input : { ...input, id: input.id || sessionId },
            exception
        });
    }
);
