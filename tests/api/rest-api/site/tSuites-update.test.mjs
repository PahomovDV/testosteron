import { generateToken } from '../../../../lib/use-cases/utils/jwtUtils.mjs';
import { getDirName }    from '../../../../lib/utils/index.mjs';
import Tester            from '../../../lib/RestAPITester.mjs';

const tester = new Tester();

const dirname = getDirName(import.meta.url);

function requestBuilder(input, tSuiteId, token) {
    return {
        method  : 'PUT',
        url     : `/api/v1/site/tSuites/${tSuiteId}`,
        body    : input,
        headers : {
            'Authorization' : token
        }
    };
}

tester.setupTestsWithTransactions(
    `${dirname}/../../../fixtures/use-cases/site/tSuites-update/positive`,
    'site/tSuites-update/positive',
    async ({ config: { before }, expected, input }) => {
        const { tSuiteId, userId } = await before(tester.factory);
        const accessToken = generateToken({ id: userId });

        await tester.testUseCasePositive({
            requestBuilder : (...args) => requestBuilder(...args, tSuiteId, accessToken),
            input,
            expected
        });
    }
);

tester.setupTestsWithTransactions(
    `${dirname}/../../../fixtures/use-cases/site/tSuites-update/negative`,
    'site/tSuites-update/negative',
    async ({ config: { before }, input, exception }) => {
        const { tSuiteId, userId } = await before(tester.factory);
        const accessToken = generateToken({ id: userId });

        await tester.testUseCaseNegative({
            requestBuilder : (...args) => requestBuilder(...args, input.id || tSuiteId, accessToken),
            input,
            exception
        });
    }
);
