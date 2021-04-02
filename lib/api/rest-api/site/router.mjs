import express      from 'express';
import passport     from 'passport';
import * as samlify from 'samlify';
import controllers  from './controllers/index.mjs';


const router = express.Router();

// TCases
router.post('/tCases',       controllers.tCases.create);
router.get('/tCases/:id',    controllers.tCases.show);
router.put('/tCases/:id',    controllers.tCases.update);
router.delete('/tCases/:id', controllers.tCases.delete);
router.get('/tCases',        controllers.tCases.list);

// HistoryEvents
router.post('/historyEvents',       controllers.historyEvents.create);
router.get('/historyEvents/:id',    controllers.historyEvents.show);
router.put('/historyEvents/:id',    controllers.historyEvents.update);
router.delete('/historyEvents/:id', controllers.historyEvents.delete);
router.get('/historyEvents',        controllers.historyEvents.list);

// TSuites
router.post('/tSuites',       controllers.tSuites.create);
router.get('/tSuites/:id',    controllers.tSuites.show);
router.put('/tSuites/:id',    controllers.tSuites.update);
router.delete('/tSuites/:id', controllers.tSuites.delete);
router.get('/tSuites',        controllers.tSuites.list);

// Users
router.post('/users',       controllers.users.create);
router.get('/users/:id',    controllers.users.show);
router.put('/users/:id',    controllers.users.update);
router.delete('/users/:id', controllers.users.delete);
router.get('/users',        controllers.users.list);

router.get('/', (req, res, next) => {
    if (req.isAuthenticated()) {
        res.render('index', {
            title : 'idp - management console',
            user  : req.user
        });
    } else {
        res.redirect('/login');
    }
});

router.get('/login', (req, res, next) => {
    if (req.isAuthenticated()) {
        res.redirect('/');
    } else {
        res.render('login', {
            title    : 'idp - Login',
            messages : req.flash('info')
        });
    }
});

router.post('/login', (req, res, next) => {
    passport.authenticate('local-login', (err, user, info) => {
        if (err) {
            return next(err);
        }

        if (!user) {
            return res.redirect('/login');
        }

        req.logIn(user, () => {
            const rbm = req.body.method;

            if (err) {
                return next(err);
            }

            if (rbm === 'post') {
                return res.render('actions', JSON.parse(samlify.Utility.base64Decode(req.body.target)));
            } else if (rbm === 'get') {
                return res.redirect(samlify.Utility.base64Decode(req.body.target));
            }


            return res.redirect('/');
        });
    })(req, res, next);
});

export default router;
