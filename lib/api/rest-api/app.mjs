/* eslint import/imports-first:0  import/newline-after-import:0 */
import express       from 'express';
import expressSession from 'express-session';
import exphbs        from 'express-handlebars';
import passport      from 'passport';
import { Strategy }  from 'passport-local';
import cookieParser  from 'cookie-parser';
import flash         from 'connect-flash';
import bcrypt        from 'bcryptjs';
import { promisify } from '../../../packages.mjs';

import logger        from '../logger.mjs';
import middlewares   from './middlewares.mjs';
import mainRouter    from './main/router.mjs';
import siteRouter    from './site/router.mjs';

// Init app
const app = express();
const LocalStrategy = Strategy;

app.use(middlewares.json);
app.use(middlewares.clsMiddleware);
app.use(middlewares.urlencoded);
app.use(middlewares.cors);
app.use(middlewares.include);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(cookieParser());
app.use(expressSession({
    secret            : 't7XWfr2ecOgDnTlfE4yXfgRougxXX9KU',
    resave            : true,
    saveUninitialized : true,
    key               : 'idp.example.org-session-id'
}));
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.use('/api/v1', mainRouter);
app.use('/', siteRouter);

let server = null;

export function start({ appPort }) {
    server = app.listen(appPort, () => {
        const { port, address } = server.address();

        global.REST_API_PORT = port; // For tests. TODO: export app and use it tests
        logger.info(`[RestApiApp] STARTING AT PORT [${port}] ADDRESS [${address}]`);
    });

    server.closeAsync = promisify(server.close);
}

export async function stop() {
    if (!server) return;
    logger.info('[RestApiApp] Closing server');
    await server.closeAsync();
}

passport.use('local-login', new LocalStrategy({
    usernameField : 'email'
}, (idpEmail, password, done) => {
    // do email mapping
    findEmailFromDummyDb(idpEmail, password, (err, user) => {
        if (err) {
            done(null, false, {
                messages : err.toString()
            });
        } else {
            done(null, {
                sysEmail : user.sysEmail
            });
        }
    });
}));

passport.serializeUser((user, done) => {
    done(null, {
        sysEmail : user.sysEmail
    });
});

passport.deserializeUser((user, done) => {
    const epn = {
        'admin@idp.com' : {
            assoHash : '$2a$10$/0lqAmz.r6trTurxW3qMJuFHyicUWsV3GKF94KcgN42eVR8y5c25S'
        }
    };

    if (Object.keys(epn).indexOf(user.sysEmail) != -1) {
        done(null, {
            sysEmail : user.sysEmail
        });
    } else {
        return done(null, false, {
            messages : 'Fail to do deserializeUser'
        });
    }
});

function findEmailFromDummyDb(sysEmail, password, callback) {
    const epn = {
        'admin@idp.com' : {
            assoHash : '$2a$10$/0lqAmz.r6trTurxW3qMJuFHyicUWsV3GKF94KcgN42eVR8y5c25S'
        }
    };

    if (epn[sysEmail]) {
        bcrypt.compare(password, epn[sysEmail].assoHash, (err, res) => {
            if (err || !res) {
                callback(new Error('Authentication failure'));
            } else {
                sysEmail;
            }
        });
    } else {
        callback(new Error('Authentication failure'));
    }
}

export default app;
