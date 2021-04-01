import chista from '../../chista.mjs';

import SiteSessionsCreate from '../../../../use-cases/site/sessions/Create.mjs';
import SiteSessionsShow from '../../../../use-cases/site/sessions/Show.mjs';
import SiteSessionsUpdate from '../../../../use-cases/site/sessions/Update.mjs';
import SiteSessionsDelete from '../../../../use-cases/site/sessions/Delete.mjs';
import SiteSessionsList from '../../../../use-cases/site/sessions/List.mjs';

export default {
    create : chista.makeUseCaseRunner(SiteSessionsCreate, req => req.body),
    show   : chista.makeUseCaseRunner(SiteSessionsShow, req  => ({ id: req.params.id })),
    update : chista.makeUseCaseRunner(SiteSessionsUpdate, req  => ({ ...req.body, id: req.params.id })),
    delete : chista.makeUseCaseRunner(SiteSessionsDelete, req => ({ ...req.body, id: req.params.id })),
    list   : chista.makeUseCaseRunner(SiteSessionsList, req => ({ ...req.query, ...req.params }))
};
