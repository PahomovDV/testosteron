import express     from 'express';
import middlewares from '../middlewares.mjs';
import controllers from './controllers/index.mjs';

const router = express.Router();

const checkSession = controllers.sessions.check;
const busboy = middlewares.busboy;

// Actions
router.post('/actions/:id', controllers.actions.submit);

// Sessions
router.post('/sessions', controllers.sessions.create);

// Files
router.post('/files/:type/', checkSession, busboy, controllers.files.create);

export default router;

// Cases
router.post('/cases',       checkSession, controllers.cases.create);
router.get('/cases/:id',    checkSession, controllers.cases.show);
router.put('/cases/:id',    checkSession, controllers.cases.update);
router.delete('/cases/:id', checkSession, controllers.cases.delete);
router.get('/cases',        checkSession, controllers.cases.list);

// Suits
router.post('/suits',       checkSession, controllers.suits.create);
router.get('/suits/:id',    checkSession, controllers.suits.show);
router.put('/suits/:id',    checkSession, controllers.suits.update);
router.delete('/suits/:id', checkSession, controllers.suits.delete);
router.get('/suits',        checkSession, controllers.suits.list);
