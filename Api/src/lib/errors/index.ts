// eslint-disable-next-line max-classes-per-file
interface IError extends Error {
  type: string;
  status: number;
  message: string;
}

class NotFoundError extends Error {
  public type: string;

  public status: number;

  constructor(message: string) {
    super(message);

    this.name = 'NotFoundError';
    this.type = 'NOT_FOUND';
    this.status = 404;
  }
}

class BadRequestError extends Error {
  public type: string;

  public status: number;

  constructor(message: string) {
    super(message);

    this.name = 'BadRequestError';
    this.type = 'BAD_REQUEST';
    this.status = 400;
  }
}

class ResourceNotFoundError extends Error {
  public type: string;

  public status: number;

  constructor(message: string) {
    super(message);

    this.name = 'NotFoundError';
    this.type = 'RESOURCE_NOT_FOUND';
    this.status = 404;
  }
}

class AlreadyExist extends Error {
  public type: string;

  public status: number;

  constructor(message: string) {
    super(message);

    this.name = 'UserAlreadyExist';
    this.type = 'ALREADY_EXIST';
    this.status = 409;
  }
}

class ValidationError extends Error {
  public type: string;

  public status: number;

  constructor(message: string) {
    super(message);

    this.status = 400;
    this.name = 'ValidationError';
    this.type = 'VALIDATION';
  }
}

class AuthorizationError extends Error {
  public type: string;

  public status: number;

  constructor() {
    super('Requires authentication');

    this.name = 'AuthorizationError';
    this.type = 'UNAUTHORIZED';
    this.status = 401;
  }
}

class AuthenticateError extends Error {
  public type: string;

  public status: number;

  constructor(message: string) {
    super(message);

    this.name = 'AuthenticateError';
    this.type = 'INVALID_CREDENTIAL';
    this.status = 401;
  }
}

class InvalidTokenError extends Error {
  public type: string;

  public status: number;

  constructor(message: string) {
    super(message);

    this.name = 'InvalidTokenError';
    this.type = 'INVALID_TOKEN';
    this.status = 401;
  }
}

class WithoutPermissionError extends Error {
  public type: string;

  public status: number;

  constructor(message: string) {
    super(message);

    this.name = 'WithoutPermissionError';
    this.type = 'WITHOUT_PERMISSION';
    this.status = 401;
  }
}

class InternalServerError extends Error {
  public type: string;

  constructor(message: string) {
    super(message);

    this.name = 'InternalServerError';
    this.type = 'INTERNAL';
  }
}

class UploadError extends Error {
  public type: string;

  constructor(message: string) {
    super(message);

    this.name = 'UploadError';
    this.type = 'UPLOAD_ERROR';
  }
}

export {
  NotFoundError,
  ValidationError,
  AuthorizationError,
  InternalServerError,
  IError,
  ResourceNotFoundError,
  AuthenticateError,
  AlreadyExist,
  WithoutPermissionError,
  InvalidTokenError,
  UploadError,
  BadRequestError,
};
