import { generateToken } from '../../../../lib/use-cases/utils/jwtUtils.mjs';
import { getDirName }    from '../../../../lib/utils/index.mjs';
import Tester            from '../../../lib/RestAPITester.mjs';

const tester = new Tester();

const dirname = getDirName(import.meta.url);

function requestBuilder(tSuiteId, token) {
    return {
        method  : 'DELETE',
        url     : `/api/v1/site/tSuites/${tSuiteId}`,
        headers : {
            'Authorization' : token
        }
    };
}

tester.setupTestsWithTransactions(
    `${dirname}/../../../fixtures/use-cases/site/tSuites-delete/positive`,
    'site/tSuites-delete/positive',
    async ({ config: { before }, expected }) => {
        const { tSuiteId, userId } = await before(tester.factory);
        const accessToken = generateToken({ id: userId });

        await tester.testUseCasePositive({
            requestBuilder : () => requestBuilder(tSuiteId, accessToken),
            expected
        });
    }
);

tester.setupTestsWithTransactions(
    `${dirname}/../../../fixtures/use-cases/site/tSuites-delete/negative`,
    'site/tSuites-delete/negative',
    async ({ config: { before }, input, exception }) => {
        const { userId } = await before(tester.factory);
        const accessToken = generateToken({ id: userId });

        await tester.testUseCaseNegative({
            requestBuilder : () => requestBuilder(input.id, accessToken),
            exception
        });
    }
);
