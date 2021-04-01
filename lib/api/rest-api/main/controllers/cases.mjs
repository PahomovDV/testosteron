import chista from '../../chista.mjs';

import MainCasesCreate from '../../../../use-cases/main/cases/Create.mjs';
import MainCasesShow from '../../../../use-cases/main/cases/Show.mjs';
import MainCasesUpdate from '../../../../use-cases/main/cases/Update.mjs';
import MainCasesDelete from '../../../../use-cases/main/cases/Delete.mjs';
import MainCasesList from '../../../../use-cases/main/cases/List.mjs';

export default {
    create : chista.makeUseCaseRunner(MainCasesCreate, req => req.body),
    show   : chista.makeUseCaseRunner(MainCasesShow, req  => ({ id: req.params.id })),
    update : chista.makeUseCaseRunner(MainCasesUpdate, req  => ({ ...req.body, id: req.params.id })),
    delete : chista.makeUseCaseRunner(MainCasesDelete, req => ({ ...req.body, id: req.params.id })),
    list   : chista.makeUseCaseRunner(MainCasesList, req => ({ ...req.query, ...req.params }))
};
