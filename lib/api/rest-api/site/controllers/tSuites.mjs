import chista from '../../chista.mjs';

import SiteTSuitesCreate from '../../../../use-cases/site/tSuites/Create.mjs';
import SiteTSuitesShow from '../../../../use-cases/site/tSuites/Show.mjs';
import SiteTSuitesUpdate from '../../../../use-cases/site/tSuites/Update.mjs';
import SiteTSuitesDelete from '../../../../use-cases/site/tSuites/Delete.mjs';
import SiteTSuitesList from '../../../../use-cases/site/tSuites/List.mjs';

export default {
    create : chista.makeUseCaseRunner(SiteTSuitesCreate, req => req.body),
    show   : chista.makeUseCaseRunner(SiteTSuitesShow, req  => ({ id: req.params.id })),
    update : chista.makeUseCaseRunner(SiteTSuitesUpdate, req  => ({ ...req.body, id: req.params.id })),
    delete : chista.makeUseCaseRunner(SiteTSuitesDelete, req => ({ ...req.body, id: req.params.id })),
    list   : chista.makeUseCaseRunner(SiteTSuitesList, req => ({ ...req.query, ...req.params }))
};
