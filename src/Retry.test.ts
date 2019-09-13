import retry from './Retry';

describe('retry decorator test suite', () => {
  class TestImpl {
    public count: number = 0;

    @retry()
    async default() {
      return 'hello world !';
    }

    @retry({ retries: 2, factor: 0.1 })
    async hello() {
      if (this.count < 2) {
        this.count++;
        throw Error('Error: hello');
      }
      return 'hello world !';
    }

    @retry({ retries: 2, factor: 0.1 })
    async helloError() {
      throw Error('Error: helloError');
    }
  }

  it('should retry with default configuration', async () => {
    const testClass = new TestImpl();

    const result = await testClass.default();

    expect(result).toEqual('hello world !');
  });

  it('should retry two time before success', async () => {
    const testClass = new TestImpl();

    const result = await testClass.hello();

    expect(testClass.count).toEqual(2);
    expect(result).toEqual('hello world !');
  });

  it('should retry and fail after two times', async () => {
    const testClass = new TestImpl();

    await expect(testClass.helloError()).rejects.toEqual(
      Error('Error: helloError'),
    );
  });
});
