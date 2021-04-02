import { generateToken } from '../../../../lib/use-cases/utils/jwtUtils.mjs';
import { getDirName }    from '../../../../lib/utils/index.mjs';
import Tester            from '../../../lib/RestAPITester.mjs';

const tester = new Tester();

const dirname = getDirName(import.meta.url);

function requestBuilder(input, token) {
    return {
        method  : 'POST',
        url     : '/api/v1/site/tSuites',
        body    : input,
        headers : {
            'Authorization' : token
        }
    };
}

tester.setupTestsWithTransactions(
    `${dirname}/../../../fixtures/use-cases/site/tSuites-create/positive`,
    'site/tSuites-create/positive',
    async ({ config: { before }, input, expected }) => {
        const { userId } = await before(tester.factory);
        const accessToken = generateToken({ id: userId });

        await tester.testUseCasePositive({
            requestBuilder : (...args) => requestBuilder(...args, accessToken),
            input,
            expected
        });
    }
);

tester.setupTestsWithTransactions(
    `${dirname}/../../../fixtures/use-cases/site/tSuites-create/negative`,
    'site/tSuites-create/negative',
    async ({ config: { before }, input, exception }) => {
        const { userId } = await before(tester.factory);
        const accessToken = generateToken({ id: userId });

        await tester.testUseCaseNegative({
            requestBuilder : (...args) => requestBuilder(...args, accessToken),
            input,
            exception
        });
    }
);
