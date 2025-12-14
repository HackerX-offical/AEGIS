export class HackerXError extends Error {
  public readonly code: string;
  public readonly isOperational: boolean;

  constructor(
    message: string,
    code: string = "HX_INTERNAL_ERROR",
    isOperational: boolean = true
  ) {
    super(message);
    this.name = this.constructor.name;
    this.code = code;
    this.isOperational = isOperational;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class ValidationError extends HackerXError {
  constructor(message: string) {
    super(message, "HX_VALIDATION_ERROR", true);
  }
}

export class ConfigurationError extends HackerXError {
  constructor(message: string) {
    super(message, "HX_CONFIG_ERROR", true);
  }
}

export class SecurityEngineError extends HackerXError {
  constructor(message: string) {
    super(message, "HX_ENGINE_ERROR", true);
  }
}
