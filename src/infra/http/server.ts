import 'dotenv/config';

import express from 'express';

import '../container';

const app = express();

app.listen(process.env.PORT, () => {
  console.log(`Server is runing on ${process.env.APP_URL}`);
});
