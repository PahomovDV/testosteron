import { generateToken } from '../../../../lib/use-cases/utils/jwtUtils.mjs';
import { getDirName }    from '../../../../lib/utils/index.mjs';
import Tester            from '../../../lib/RestAPITester.mjs';

const tester = new Tester();

const dirname = getDirName(import.meta.url);

function requestBuilder(input, tCaseId, token) {
    return {
        method  : 'PUT',
        url     : `/api/v1/site/tCases/${tCaseId}`,
        body    : input,
        headers : {
            'Authorization' : token
        }
    };
}

tester.setupTestsWithTransactions(`${dirname}/../../../fixtures/use-cases/site/tCases-update/positive`,
    'site/tCases-update/positive',
    async ({ config: { before }, expected, input }) => {
        const { tCaseId, userId } = await before(tester.factory);
        const accessToken = generateToken({ id: userId });

        await tester.testUseCasePositive({
            requestBuilder : (...args) => requestBuilder(...args, tCaseId, accessToken),
            input,
            expected
        });
    }
);

tester.setupTestsWithTransactions(`${dirname}/../../../fixtures/use-cases/site/tCases-update/negative`,
    'site/tCases-update/negative',
    async ({ config: { before }, input, exception }) => {
        const { tCaseId, userId } = await before(tester.factory);
        const accessToken = generateToken({ id: userId });

        await tester.testUseCaseNegative({
            requestBuilder : (...args) => requestBuilder(...args, input.id || tCaseId, accessToken),
            input,
            exception
        });
    }
);
