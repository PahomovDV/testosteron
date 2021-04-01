import express     from 'express';
import controllers from './controllers/index.mjs';

const router = express.Router();

const checkSession = controllers.sessions.check;

// Admins
router.post('/admins',                  checkSession, controllers.admins.create);
router.get('/admins/:id/resetPassword', checkSession, controllers.admins.resetPassword);
router.get('/admins/:id',               checkSession, controllers.admins.show);
router.get('/admins',                   checkSession, controllers.admins.list);
router.delete('/admins/:id',            checkSession, controllers.admins.delete);

// Sessions
router.post('/sessions', controllers.sessions.create);

export default router;
