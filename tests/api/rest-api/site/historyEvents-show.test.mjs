import { generateToken } from '../../../../lib/use-cases/utils/jwtUtils.mjs';
import { getDirName }    from '../../../../lib/utils/index.mjs';
import Tester            from '../../../lib/RestAPITester.mjs';

const tester = new Tester();

const dirname = getDirName(import.meta.url);

function requestBuilder(historyEventId, token) {
    return {
        method  : 'GET',
        url     : `/api/v1/site/historyEvents/${historyEventId}`,
        headers : {
            'Authorization' : token
        }
    };
}

tester.setupTestsWithTransactions(
    `${dirname}/../../../fixtures/use-cases/site/historyEvents-show/positive`,
    'site/historyEvents-show/positive',
    async ({ config: { before }, expected }) => {
        const { historyEventId, userId } = await before(tester.factory);
        const accessToken = generateToken({ id: userId });

        await tester.testUseCasePositive({
            requestBuilder : () => requestBuilder(historyEventId, accessToken),
            expected
        });
    }
);

tester.setupTestsWithTransactions(
    `${dirname}/../../../fixtures/use-cases/site/historyEvents-show/negative`,
    'site/historyEvents-show/negative',
    async ({ config: { before }, input, exception }) => {
        const { userId } = await before(tester.factory);
        const accessToken = generateToken({ id: userId });

        await tester.testUseCaseNegative({
            requestBuilder : () => requestBuilder(input.id, accessToken),
            input,
            exception
        });
    }
);
