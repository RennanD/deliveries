import 'dotenv/config';
import 'reflect-metadata';

import express from 'express';

import '../container';
import { routes } from './routes';

const app = express();

app.use(express.json());
app.use(routes);

app.listen(process.env.PORT, () => {
  console.log(`Server is runing on ${process.env.APP_URL}`);
});
