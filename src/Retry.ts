import asyncRetry, { Options as RetryOptions } from 'async-retry';

export { Options as RetryOptions } from 'async-retry';

export function retry(options?: RetryOptions) {
  return (
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    target: any,
    propertyKey: string,
    descriptor: TypedPropertyDescriptor<(...args: any[]) => Promise<any>>,
  ): any => {
    const method = descriptor.value;
    /* istanbul ignore if */
    if (!method) {
      throw Error('Assigned method is undefined');
    }
    // eslint-disable-next-line no-param-reassign
    descriptor.value = function wrapper(...args: any[]): any {
      return asyncRetry(async () => {
        return method.apply(this, args);
      }, options || {}).then((result) => {
        return result;
      });
    };
    return descriptor;
  };
}
