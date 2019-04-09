import retry from './retry';

describe('retry decorator test suite', () => {
  class TestImpl {
    count: number = 0;
    @retry({ retries: 2 })
    async hello() {
      if (this.count < 2) {
        this.count++;
        throw Error('Error: hello');
      }
      return 'hello world !';
    }

    @retry({ retries: 2 })
    async helloError() {
      throw Error('Error: helloError');
    }
  }

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
