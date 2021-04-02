import chista from '../../chista.mjs';

import SiteHistoryEventsCreate from '../../../../use-cases/site/historyEvents/Create.mjs';
import SiteHistoryEventsShow from '../../../../use-cases/site/historyEvents/Show.mjs';
import SiteHistoryEventsUpdate from '../../../../use-cases/site/historyEvents/Update.mjs';
import SiteHistoryEventsDelete from '../../../../use-cases/site/historyEvents/Delete.mjs';
import SiteHistoryEventsList from '../../../../use-cases/site/historyEvents/List.mjs';

export default {
    create : chista.makeUseCaseRunner(SiteHistoryEventsCreate, req => req.body),
    show   : chista.makeUseCaseRunner(SiteHistoryEventsShow, req  => ({ id: req.params.id })),
    update : chista.makeUseCaseRunner(SiteHistoryEventsUpdate, req  => ({ ...req.body, id: req.params.id })),
    delete : chista.makeUseCaseRunner(SiteHistoryEventsDelete, req => ({ ...req.body, id: req.params.id })),
    list   : chista.makeUseCaseRunner(SiteHistoryEventsList, req => ({ ...req.query, ...req.params }))
};
