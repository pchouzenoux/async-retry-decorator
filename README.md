# async-retry-decorator

Typescript decorator base on [`async-retry`](https://github.com/zeit/async-retry#readme)

# Example

```javascript
  class Clazz {
    @retry({
      retries: 5,
      onRetry: (error, attempt) => {
        console.log(`Retry (${attempt}) on error`, error.message);
      },
    })
    public async method(): Promise<void> {
      // [...]
    }
  }
```
