/* eslint-disable @typescript-eslint/no-explicit-any */
import ecsFormat from '@elastic/ecs-winston-format';
// import apm from 'elastic-apm-node';
import winston, { LogCallback } from 'winston';
// import ElasticsearchApm from 'winston-elasticsearch-apm';

class Logger {
  private logger: winston.Logger;

  // private apmAgent = apm;

  static apmIntegration = false;

  static init(apmIntegration?: boolean): winston.Logger {
    if (this.prototype.logger !== undefined) {
      return this.prototype.logger;
    }

    // if (apmIntegration) {
    //   this.apmIntegration = apmIntegration;
    //   this.prototype.apmAgent = apm.start({
    //     serviceName: process.env.SERVICE_NAME,
    //     secretToken: process.env.APM_SECRET_TOKEN,
    //     serverUrl: process.env.APM_SERVER,
    //     environment: process.env.ENVIRONMENT,
    //   });

    //   logger = winston.createLogger({
    //     format: ecsFormat({
    //       convertReqRes: true,
    //       serviceName: process.env.SERVICE_NAME,

    //       apmIntegration: !!apmIntegration,
    //     }),
    //     transports: [
    //       new ElasticsearchApm({ apm: this.prototype.apmAgent }),
    //       new winston.transports.Console(),
    //     ],
    //   });
    // } else {
    // }
    const logger = winston.createLogger({
      format: ecsFormat(),
      transports: [new winston.transports.Console()],
    });

    this.prototype.logger = logger;
    return logger;
  }

  // static captureError(err: Error): void {
  //   if (this.apmIntegration) {
  //     this.prototype.apmAgent.captureError(err);
  //   }
  // }

  static info(message: string, callback?: LogCallback): void {
    this.prototype.logger.info(message, callback);
  }

  static error(message: string, ...meta: any[]): void {
    this.prototype.logger.error(message, meta);
  }

  static warn(message: string, ...meta: any[]): void {
    this.prototype.logger.warn(message, meta);
  }
}

export default Logger;
