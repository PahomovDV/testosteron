import { generateToken } from '../../../../lib/use-cases/utils/jwtUtils.mjs';
import { getDirName }    from '../../../../lib/utils/index.mjs';
import Tester            from '../../../lib/RestAPITester.mjs';

const tester = new Tester();

const dirname = getDirName(import.meta.url);

function requestBuilder(input, tSuitId, token) {
    return {
        method  : 'PUT',
        url     : `/api/v1/site/tSuits/${tSuitId}`,
        body    : input,
        headers : {
            'Authorization' : token
        }
    };
}

tester.setupTestsWithTransactions(
    `${dirname}/../../../fixtures/use-cases/site/tSuits-update/positive`,
    'site/tSuits-update/positive',
    async ({ config: { before }, expected, input }) => {
        const { tSuitId, userId } = await before(tester.factory);
        const accessToken = generateToken({ id: userId });

        await tester.testUseCasePositive({
            requestBuilder : (...args) => requestBuilder(...args, tSuitId, accessToken),
            input,
            expected
        });
    }
);

tester.setupTestsWithTransactions(
    `${dirname}/../../../fixtures/use-cases/site/tSuits-update/negative`,
    'site/tSuits-update/negative',
    async ({ config: { before }, input, exception }) => {
        const { tSuitId, userId } = await before(tester.factory);
        const accessToken = generateToken({ id: userId });

        await tester.testUseCaseNegative({
            requestBuilder : (...args) => requestBuilder(...args, input.id || tSuitId, accessToken),
            input,
            exception
        });
    }
);
