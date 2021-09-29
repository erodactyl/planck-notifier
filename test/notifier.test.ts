import Notifier from '../src';

describe('Notifier logic', () => {
  it('Calls a subscriber once when notify is called', () => {
    const notifier = new Notifier();
    const subscriber = jest.fn();
    notifier.subscribe(subscriber);
    expect(subscriber).toBeCalledTimes(0);
    notifier.notify();
    expect(subscriber).toBeCalledTimes(1);
  });

  it('Calls multiple subscribers once when notify is called', () => {
    const notifier = new Notifier();
    const subscriber1 = jest.fn();
    const subscriber2 = jest.fn();
    notifier.subscribe(subscriber1);
    notifier.subscribe(subscriber2);
    notifier.notify();
    expect(subscriber1).toBeCalledTimes(1);
    expect(subscriber2).toBeCalledTimes(1);
  });

  it("Doesn't call subscriber once unsubscribed", () => {
    const notifier = new Notifier();
    const sub = jest.fn();
    const unsub = notifier.subscribe(sub);
    unsub();
    notifier.notify();
    expect(sub).toBeCalledTimes(0);
  });

  it('Works correctly when extended', () => {
    class DataNotifier extends Notifier {
      data = 'hello';

      setData(newData: string) {
        this.data = newData;
        this.notify();
      }
    }

    const dataNotifier = new DataNotifier();
    const mock = jest.fn();
    const sub = () => {
      mock(dataNotifier.data);
    };
    dataNotifier.subscribe(sub);

    dataNotifier.setData('bye');
    expect(mock).toBeCalledTimes(1);
    expect(mock).toBeCalledWith('bye');
  });
});
