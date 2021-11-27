/* eslint-disable @typescript-eslint/no-unused-vars */
// import APM from "@lib/APM";
import { IError } from '@lib/errors';
import { NextFunction, Request, Response } from 'express';
import winston from 'winston';

import Logger from './logger';

type IExpressReqResLoggerParams = { logger: winston.Logger };

type IExpressRequestLoggerResponse = (
  req: Request,
  res: Response,
  next: NextFunction,
) => void;

type IExpressErrorLogger = (
  rr: IError,
  req: Request,
  _res: Response,
  _: NextFunction,
) => Response;

type IHttpLogger = {
  req_logger: (
    param: IExpressReqResLoggerParams,
  ) => IExpressRequestLoggerResponse;
  err_logger: (param: IExpressReqResLoggerParams) => IExpressErrorLogger;
};

function expressRequestLogger(
  opts: IExpressReqResLoggerParams,
): IExpressRequestLoggerResponse {
  const { logger } = opts;

  return (req: Request, res: Response, next: NextFunction): void => {
    function onResDone(err: Error) {
      res.removeListener('finish', onResDone);
      res.removeListener('error', onResDone);
    }
    logger.info(
      `handled ${req.method} ${req.path}. body ${JSON.stringify(req.body)}`,
    );
    res.on('finish', onResDone);
    res.on('error', onResDone);
    next();
  };
}

function expressErrorLogger(
  opts: IExpressReqResLoggerParams,
): IExpressErrorLogger {
  const { logger } = opts;

  return (
    err: IError,
    req: Request,
    _res: Response,
    _: NextFunction,
  ): Response => {
    Logger.error(err.message);
    console.log(err);
    return _res.status(err?.status || 500).json({
      error: {
        errorType: err.type,
        message: err.message,
      },
    });
  };
}

const httpLogger = {
  err_logger: expressErrorLogger,
  req_logger: expressRequestLogger,
} as IHttpLogger;

export default httpLogger;
