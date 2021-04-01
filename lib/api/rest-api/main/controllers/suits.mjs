import chista from '../../chista.mjs';

import MainSuitsCreate from '../../../../use-cases/main/suits/Create.mjs';
import MainSuitsShow from '../../../../use-cases/main/suits/Show.mjs';
import MainSuitsUpdate from '../../../../use-cases/main/suits/Update.mjs';
import MainSuitsDelete from '../../../../use-cases/main/suits/Delete.mjs';
import MainSuitsList from '../../../../use-cases/main/suits/List.mjs';

export default {
    create : chista.makeUseCaseRunner(MainSuitsCreate, req => req.body),
    show   : chista.makeUseCaseRunner(MainSuitsShow, req  => ({ id: req.params.id })),
    update : chista.makeUseCaseRunner(MainSuitsUpdate, req  => ({ ...req.body, id: req.params.id })),
    delete : chista.makeUseCaseRunner(MainSuitsDelete, req => ({ ...req.body, id: req.params.id })),
    list   : chista.makeUseCaseRunner(MainSuitsList, req => ({ ...req.query, ...req.params }))
};
