import express from 'express';
import middleware from './config/middleware.js';
import routes from './config/routes.js';

const app = express();

const port = 8888;

/* Initialize DB */
import initDB from './config/init';
initDB();

middleware(app, express);
routes(app, express);

app.listen(port, () => {
  console.log('Express listening on port', port);
});

export default app;
