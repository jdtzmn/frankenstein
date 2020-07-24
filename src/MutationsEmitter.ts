import { EventEmitter } from 'events';

const MutationsObserverOptions: MutationObserverInit = {
  childList: true,
  subtree: true,
  attributes: true,
  characterData: true,
};

declare interface MutationsEmitter {
  on (event: 'mutation', listener: (mutations: MutationRecord[]) => void): this
  on (event: string, listener: () => void): this
}

class MutationsEmitter extends EventEmitter {
  private observer: MutationObserver;

  constructor(element: HTMLElement) {
    super();

    if (MutationObserver) {
      this.observer = new MutationObserver((mutations) => this.handleMutations(mutations));
      this.observer.observe(element, MutationsObserverOptions);
    } else {
      throw new Error('Mutation Observer is not supported on this browser.');
    }
  }

  private handleMutations(mutations: MutationRecord[]) {
    this.emit('mutation', mutations);
  }
}

export default MutationsEmitter;
