import chista from '../../chista.mjs';

import SiteTCasesCreate from '../../../../use-cases/site/tCases/Create.mjs';
import SiteTCasesShow from '../../../../use-cases/site/tCases/Show.mjs';
import SiteTCasesUpdate from '../../../../use-cases/site/tCases/Update.mjs';
import SiteTCasesDelete from '../../../../use-cases/site/tCases/Delete.mjs';
import SiteTCasesList from '../../../../use-cases/site/tCases/List.mjs';

export default {
    create : chista.makeUseCaseRunner(SiteTCasesCreate, req => req.body),
    show   : chista.makeUseCaseRunner(SiteTCasesShow, req  => ({ id: req.params.id })),
    update : chista.makeUseCaseRunner(SiteTCasesUpdate, req  => ({ ...req.body, id: req.params.id })),
    delete : chista.makeUseCaseRunner(SiteTCasesDelete, req => ({ ...req.body, id: req.params.id })),
    list   : chista.makeUseCaseRunner(SiteTCasesList, req => ({ ...req.query, ...req.params }))
};
