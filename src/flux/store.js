import {UserPrefsStore} from '../control-panel';

export class Store {
    constructor(dispatcher) {
       this.__listeners = [];
       this.__state = this.getInitialState();
       this.prototype.name = 'Store';

       // Set "this" always point to the derived Store's __onDispatch
       // dispatcher.register(this.__onDispatch.bind(this));
        console.log(`Instance of Store: ${this instanceof Store}, name(${this.name})`);
       dispatcher.register(this.__onDispatch);
    }

    __onDispatch() {
        throw new Error('Subclasses must override __onDispatch method of a Flux Store');
    }

    getInitialState() {
        console.log('Store: getInitialState()');
        throw new Error('Subclasses must override getInitialState method of a Flux Store');
    }

    addListener(listener) {
        this.__listeners.push(listener);
    }

    __emitChange() {
        this.__listeners.forEach(listener => listener(this.__state));
    }
}
