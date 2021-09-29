type Subscriber = () => void;

export class Notifier {
  private subscribers: Subscriber[] = []

  subscribe(s: Subscriber): () => void {
    this.subscribers.push(s);
    return () => this.unsubscribe(s);
  }

  unsubscribe(_s: Subscriber): void {
    this.subscribers = this.subscribers.filter(s => s !== _s);
  }

  notify(): void {
    this.subscribers.forEach(s => s());
  }
}
