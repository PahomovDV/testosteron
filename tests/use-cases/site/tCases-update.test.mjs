import { getDirName } from '../../../lib/utils/index.mjs';
import Tester         from '../../lib/UseCaseTester.mjs';

const tester = new Tester();

const dirname = getDirName(import.meta.url);

tester.setupTestsWithTransactions(`${dirname}/../../fixtures/use-cases/site/tCases-update/positive`,
    'site/tCases-update/positive',
    async ({ config: { useCaseClass, before }, expected, input }) => {
        const { tCaseId } = await before(tester.factory);

        await tester.testUseCasePositive({
            useCaseClass,
            input : { ...input, id: tCaseId },
            expected
        });
    }
);

tester.setupTestsWithTransactions(`${dirname}/../../fixtures/use-cases/site/tCases-update/negative`,
    'site/tCases-update/negative',
    async ({ config: { useCaseClass, before }, input, exception }) => {
        const { tCaseId } = await before(tester.factory);

        await tester.testUseCaseNegative({
            useCaseClass,
            input : { ...input, id: input.id || tCaseId },
            exception
        });
    }
);
