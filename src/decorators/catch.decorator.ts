type HandlerFunction = (error: Error, ctx: any) => void;

export const Catch = (errorType: any, handler: HandlerFunction): any => {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    const method = descriptor.value;
    descriptor.value = function (...args: any[]) {
      try {
        const result = method.apply(this, args);
        if (result && result instanceof Promise) {
          return result.catch((error: Error) => {
            _handlerError(this, errorType, handler, error);
          });
        }
        return result;
      } catch (error: any) {
        _handlerError(this, errorType, handler, error);
      }

      return descriptor;
    };
  };
};

export const CatchAll = (handler: HandlerFunction): any =>
  Catch(Error, handler);

function _handlerError(
  ctx: any,
  errorType: any,
  handler: HandlerFunction,
  error: Error
) {

  if (typeof handler === "function" && error instanceof errorType) {
    handler.call(null, error, ctx);
  } else {
    throw error;
  }
}
