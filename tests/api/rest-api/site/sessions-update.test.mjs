import { generateToken } from '../../../../lib/use-cases/utils/jwtUtils.mjs';
import { getDirName }    from '../../../../lib/utils/index.mjs';
import Tester            from '../../../lib/RestAPITester.mjs';

const tester = new Tester();

const dirname = getDirName(import.meta.url);

function requestBuilder(input, sessionId, token) {
    return {
        method  : 'PUT',
        url     : `/api/v1/site/sessions/${sessionId}`,
        body    : input,
        headers : {
            'Authorization' : token
        }
    };
}

tester.setupTestsWithTransactions(
    `${dirname}/../../../fixtures/use-cases/site/sessions-update/positive`,
    'site/sessions-update/positive',
    async ({ config: { before }, expected, input }) => {
        const { sessionId, userId } = await before(tester.factory);
        const accessToken = generateToken({ id: userId });

        await tester.testUseCasePositive({
            requestBuilder : (...args) => requestBuilder(...args, sessionId, accessToken),
            input,
            expected
        });
    }
);

tester.setupTestsWithTransactions(
    `${dirname}/../../../fixtures/use-cases/site/sessions-update/negative`,
    'site/sessions-update/negative',
    async ({ config: { before }, input, exception }) => {
        const { sessionId, userId } = await before(tester.factory);
        const accessToken = generateToken({ id: userId });

        await tester.testUseCaseNegative({
            requestBuilder : (...args) => requestBuilder(...args, input.id || sessionId, accessToken),
            input,
            exception
        });
    }
);
