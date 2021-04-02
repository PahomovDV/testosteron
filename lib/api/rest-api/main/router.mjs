import express     from 'express';
import middlewares from '../middlewares.mjs';
import controllers from './controllers/index.mjs';

const router = express.Router();

const checkSession = controllers.sessions.check;
const busboy = middlewares.busboy;

// Sessions
router.post('/sessions', controllers.sessions.create);

// Files
router.post('/files/:type/', checkSession, busboy, controllers.files.create);

export default router;
