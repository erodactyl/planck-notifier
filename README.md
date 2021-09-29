# Pure notifier implementation

A Notifier is an object that has a notify property. It can have subscribers that listen for that notify call and react to it. It's like an event emitter that only emits one type of event.

It can be either used directly:

```js
  import Notifier from '@plancky/notifier';

  const notifier = new Notifier();

  const subscriber = () => {
    console.log('Something happened!');
  }

  notifier.subscribe(subscriber);

  notifier.notify(); // Logs "Something happened"
```

Or extended by another class:

```js
  import Notifier from '@plancky/notifier';

  class DataNotifier extends Notifier {
    data = "hello"

    setData = (newData) => {
      this.data = newData;
      this.notify();
    }
  }

  const dataNotifier = new DataNotifier();
  dataNotifier.subscribe(() => {
    console.log(`The data changed! It is now ${dataNotifier.data}`);
  });

  dataNotifier.setData('bye'); // Logs "The data changed! It is now bye"
```
