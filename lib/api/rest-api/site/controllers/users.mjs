import chista from '../../chista.mjs';

import SiteUsersCreate from '../../../../use-cases/site/users/Create.mjs';
import SiteUsersShow from '../../../../use-cases/site/users/Show.mjs';
import SiteUsersUpdate from '../../../../use-cases/site/users/Update.mjs';
import SiteUsersDelete from '../../../../use-cases/site/users/Delete.mjs';
import SiteUsersList from '../../../../use-cases/site/users/List.mjs';

export default {
    create : chista.makeUseCaseRunner(SiteUsersCreate, req => req.body),
    show   : chista.makeUseCaseRunner(SiteUsersShow, req  => ({ id: req.params.id })),
    update : chista.makeUseCaseRunner(SiteUsersUpdate, req  => ({ ...req.body, id: req.params.id })),
    delete : chista.makeUseCaseRunner(SiteUsersDelete, req => ({ ...req.body, id: req.params.id })),
    list   : chista.makeUseCaseRunner(SiteUsersList, req => ({ ...req.query, ...req.params }))
};
