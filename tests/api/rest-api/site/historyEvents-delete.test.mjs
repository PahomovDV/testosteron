import { generateToken } from '../../../../lib/use-cases/utils/jwtUtils.mjs';
import { getDirName }    from '../../../../lib/utils/index.mjs';
import Tester            from '../../../lib/RestAPITester.mjs';

const tester = new Tester();

const dirname = getDirName(import.meta.url);

function requestBuilder(historyEventId, token) {
    return {
        method  : 'DELETE',
        url     : `/api/v1/site/historyEvents/${historyEventId}`,
        headers : {
            'Authorization' : token
        }
    };
}

tester.setupTestsWithTransactions(
    `${dirname}/../../../fixtures/use-cases/site/historyEvents-delete/positive`,
    'site/historyEvents-delete/positive',
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
    `${dirname}/../../../fixtures/use-cases/site/historyEvents-delete/negative`,
    'site/historyEvents-delete/negative',
    async ({ config: { before }, input, exception }) => {
        const { userId } = await before(tester.factory);
        const accessToken = generateToken({ id: userId });

        await tester.testUseCaseNegative({
            requestBuilder : () => requestBuilder(input.id, accessToken),
            exception
        });
    }
);
