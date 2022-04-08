import 'dotenv/config';
import 'reflect-metadata';

import 'express-async-errors';

import express from 'express';

import '../container';
import { routes } from './routes';
import { handleException } from './middlewares/exception.middleware';

const app = express();

app.use(express.json());
app.use(routes);

app.use(handleException);

app.listen(process.env.PORT, () => {
  console.log(`Server is runing on ${process.env.APP_URL}`);
});
