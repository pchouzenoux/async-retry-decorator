import asyncRetry, { Options } from 'async-retry';

export { Options } from 'async-retry';

export default function retry(options?: Options) {
  return (
    target: any,
    propertyKey: string,
    descriptor: TypedPropertyDescriptor<(...args: any[]) => Promise<any>>,
  ): TypedPropertyDescriptor<(...args: any[]) => Promise<any>> => {
    const method = descriptor.value;
    /* istanbul ignore if */
    if (!method) {
      throw Error('Assigned method is undefined');
    }
    descriptor.value = function wrapper(...args: any[]): Promise<any> {
      return asyncRetry(async () => {
        return method.apply(this, args);
      }, options || {}).then(result => {
        return result;
      });
    };
    return descriptor;
  };
}
