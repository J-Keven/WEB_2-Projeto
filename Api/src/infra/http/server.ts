import express from 'express';
import 'dotenv/config';
import 'reflect-metadata';
import '../database';
import 'express-async-errors';
import cors from 'cors';
import { errors } from 'celebrate';
import { resolve } from 'path';
import { Logger, httpLogger } from '@lib/logger';
import routes from './routes';
import '@lib/container';

const app = express();

const logger = Logger.init();

app.use(express.json());
app.use(cors());
app.use(httpLogger.req_logger({ logger }));

app.use(routes);

app.use('/files', express.static('../../temp/uploads/'));

app.use(
  errors({
    statusCode: 422,
  }),
);

app.use(httpLogger.err_logger({ logger }));

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
  console.log(`🚀 server started in http://localhost:${PORT}`);
});
