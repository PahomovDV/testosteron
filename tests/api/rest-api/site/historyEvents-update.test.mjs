import { generateToken } from '../../../../lib/use-cases/utils/jwtUtils.mjs';
import { getDirName }    from '../../../../lib/utils/index.mjs';
import Tester            from '../../../lib/RestAPITester.mjs';

const tester = new Tester();

const dirname = getDirName(import.meta.url);

function requestBuilder(input, historyEventId, token) {
    return {
        method  : 'PUT',
        url     : `/api/v1/site/historyEvents/${historyEventId}`,
        body    : input,
        headers : {
            'Authorization' : token
        }
    };
}

tester.setupTestsWithTransactions(
    `${dirname}/../../../fixtures/use-cases/site/historyEvents-update/positive`,
    'site/historyEvents-update/positive',
    async ({ config: { before }, expected, input }) => {
        const { historyEventId, userId } = await before(tester.factory);
        const accessToken = generateToken({ id: userId });

        await tester.testUseCasePositive({
            requestBuilder : (...args) => requestBuilder(...args, historyEventId, accessToken),
            input,
            expected
        });
    }
);

tester.setupTestsWithTransactions(
    `${dirname}/../../../fixtures/use-cases/site/historyEvents-update/negative`,
    'site/historyEvents-update/negative',
    async ({ config: { before }, input, exception }) => {
        const { historyEventId, userId } = await before(tester.factory);
        const accessToken = generateToken({ id: userId });

        await tester.testUseCaseNegative({
            requestBuilder : (...args) => requestBuilder(...args, input.id || historyEventId, accessToken),
            input,
            exception
        });
    }
);
