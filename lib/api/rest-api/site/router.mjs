import express     from 'express';
import controllers from './controllers/index.mjs';

const router = express.Router();

const checkSession = controllers.sessions.check;

export default router;

// Cases
router.post('/cases',       checkSession, controllers.cases.create);
router.get('/cases/:id',    checkSession, controllers.cases.show);
router.put('/cases/:id',    checkSession, controllers.cases.update);
router.delete('/cases/:id', checkSession, controllers.cases.delete);
router.get('/cases',        checkSession, controllers.cases.list);

// TCases
router.post('/tCases',       checkSession, controllers.tCases.create);
router.get('/tCases/:id',    checkSession, controllers.tCases.show);
router.put('/tCases/:id',    checkSession, controllers.tCases.update);
router.delete('/tCases/:id', checkSession, controllers.tCases.delete);
router.get('/tCases',        checkSession, controllers.tCases.list);

// TSuits
router.post('/tSuits',       checkSession, controllers.tSuits.create);
router.get('/tSuits/:id',    checkSession, controllers.tSuits.show);
router.put('/tSuits/:id',    checkSession, controllers.tSuits.update);
router.delete('/tSuits/:id', checkSession, controllers.tSuits.delete);
router.get('/tSuits',        checkSession, controllers.tSuits.list);

// Sessions
router.post('/sessions',       checkSession, controllers.sessions.create);
router.get('/sessions/:id',    checkSession, controllers.sessions.show);
router.put('/sessions/:id',    checkSession, controllers.sessions.update);
router.delete('/sessions/:id', checkSession, controllers.sessions.delete);
router.get('/sessions',        checkSession, controllers.sessions.list);
