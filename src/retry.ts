import asyncRetry, { Options as RetryOptions } from 'async-retry';

export type Options = RetryOptions;

export default function retry(options?: Options) {
  return function(
    target: Object,
    propertyKey: string,
    descriptor: TypedPropertyDescriptor<(...args: any[]) => Promise<any>>,
  ) {
    const method = descriptor.value;
    if (!method) {
      throw Error('Assigned method is undefined');
    }
    descriptor.value = function(...args: any[]) {
      return asyncRetry(async () => {
        return await method.apply(this, args);
      }, options || {}).then(result => {
        return result;
      });
    };
    return descriptor;
  };
}
