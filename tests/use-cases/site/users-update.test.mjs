import { getDirName } from '../../../lib/utils/index.mjs';
import Tester         from '../../lib/UseCaseTester.mjs';

const tester = new Tester();

const dirname = getDirName(import.meta.url);

tester.setupTestsWithTransactions(
    `${dirname}/../../fixtures/use-cases/site/users-update/positive`,
    'site/users-update/positive',
    async ({ config: { useCaseClass, before }, expected, input }) => {
        const { userId } = await before(tester.factory);

        await tester.testUseCasePositive({
            useCaseClass,
            input : { ...input, id: userId },
            expected
        });
    }
);

tester.setupTestsWithTransactions(
    `${dirname}/../../fixtures/use-cases/site/users-update/negative`,
    'site/users-update/negative',
    async ({ config: { useCaseClass, before }, input, exception }) => {
        const { userId } = await before(tester.factory);

        await tester.testUseCaseNegative({
            useCaseClass,
            input : { ...input, id: input.id || userId },
            exception
        });
    }
);
