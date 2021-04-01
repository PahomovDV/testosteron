import chista from '../../chista.mjs';

import SiteTSuitsCreate from '../../../../use-cases/site/tSuits/Create.mjs';
import SiteTSuitsShow from '../../../../use-cases/site/tSuits/Show.mjs';
import SiteTSuitsUpdate from '../../../../use-cases/site/tSuits/Update.mjs';
import SiteTSuitsDelete from '../../../../use-cases/site/tSuits/Delete.mjs';
import SiteTSuitsList from '../../../../use-cases/site/tSuits/List.mjs';

export default {
    create : chista.makeUseCaseRunner(SiteTSuitsCreate, req => req.body),
    show   : chista.makeUseCaseRunner(SiteTSuitsShow, req  => ({ id: req.params.id })),
    update : chista.makeUseCaseRunner(SiteTSuitsUpdate, req  => ({ ...req.body, id: req.params.id })),
    delete : chista.makeUseCaseRunner(SiteTSuitsDelete, req => ({ ...req.body, id: req.params.id })),
    list   : chista.makeUseCaseRunner(SiteTSuitsList, req => ({ ...req.query, ...req.params }))
};
