import chista from '../../chista.mjs';

import SiteCasesCreate from '../../../../use-cases/site/cases/Create.mjs';
import SiteCasesShow from '../../../../use-cases/site/cases/Show.mjs';
import SiteCasesUpdate from '../../../../use-cases/site/cases/Update.mjs';
import SiteCasesDelete from '../../../../use-cases/site/cases/Delete.mjs';
import SiteCasesList from '../../../../use-cases/site/cases/List.mjs';

export default {
    create : chista.makeUseCaseRunner(SiteCasesCreate, req => req.body),
    show   : chista.makeUseCaseRunner(SiteCasesShow, req  => ({ id: req.params.id })),
    update : chista.makeUseCaseRunner(SiteCasesUpdate, req  => ({ ...req.body, id: req.params.id })),
    delete : chista.makeUseCaseRunner(SiteCasesDelete, req => ({ ...req.body, id: req.params.id })),
    list   : chista.makeUseCaseRunner(SiteCasesList, req => ({ ...req.query, ...req.params }))
};
