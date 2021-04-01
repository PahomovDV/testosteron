## SCRIPTS
* `nodemon` - runs app with nodemon
* `docker:dev:up` - starts app and infrastructure using docker-compose
* `docker:dev:down` - stops docker-compose from "docker:dev:up"
* `docker:up` - starts infrastructure (db, smtp-server, imageproxy, adminer, s3-server) using docker-compose
* `docker:down` - stops docker-compose from "docker:up"
* `start` - runs app with node (NODE_ENV=production)
* `test:lint` - runs eslint for: lib/, tests/, app.mjs
* `test:ava` - runs tests with [ava](https://github.com/avajs/ava)
* `test:coverage` - runs coverage test with [c8](https://github.com/bcoe/c8)
* `test:audit` - runs npm audit
* `test` - runs all tests: lint, audit, ava, coverage
* `create:admin` - creates new admin: npm run create:admin -- --email=your@email.com --password=password
* `migration:db` - runs sequelize migration with `--env db` parameter
* `migration:test` - runs sequelize migration with `--env test-db` parameter
* `generate` - generates folders/files from Sequelize Model