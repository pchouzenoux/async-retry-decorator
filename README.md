# async-retry-decorator

Typescript decorator base on [`async-retry`](https://github.com/zeit/async-retry#readme)

# How to install

```sh
$ yarn add async-retry-decorator
$ npm install --save async-retry-decorator
```

# Example

```typescript
  class Clazz {
    @retry({
      retries: 5,
      onRetry: (error, attempt) => {
        console.log(`Retry (${attempt}) on error`, error.message);
      },
    })
    public async method(): Promise<any> {
      // [...]
    }
  }
```

> You can use all options available in [`async-retry`](https://github.com/zeit/async-retry#readme) directly in the decorator options
