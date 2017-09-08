import {Dispatcher, Store} from './flux';
import * as actions from './flux/actions';

//
// Create a new Dispatcher with a callback function
const controlPanelDispatcher = new Dispatcher();

controlPanelDispatcher.register(action => {
    console.log(`Received action: ${action}`);
});


// Add eventListener to input and fontSize elements on event input and change
// Callback will receive the destructuring target value from the element
//     and the CB will then dispatch an action
document.getElementById('userNameInput').addEventListener('input', ({target}) => {
    const name = target.value;
    console.log("Dispatching: ", name);
    controlPanelDispatcher.dispatch(actions.userNameUpdateAction(name));
});

document.forms.fontSizeForm.fontSize.forEach( radioBtn => {
  radioBtn.addEventListener('change', ({target}) => {
      const fontSize = target.value;
      console.log('Dispatching: ', fontSize);
      controlPanelDispatcher.dispatch(actions.fontSizePreferenceUpdateAction(fontSize));
  });
});



//
// Extended Store class
//
class UserPrefsStore extends Store {

    getInitialState() {
        return {
            userName: '',
            fontSize: 'small'
        };
    }

    __onDispatch(action) {
        switch(action.type) {
            case actions.UPDATE_USERNAME:
                this.__state.userName = action.value;
                this.__emitChange();
                break;
            case actions.UPDATE_FONTSIZE_PREFERENCE:
                this.__state.fontSize = action.value;
                this.__emitChange();
                break;
        }
    }

    getUserPreferences() {
        return this.__state;
    }
}




const userPrefsStore  = new UserPrefsStore(controlPanelDispatcher);
userPrefsStore.addListener((state) => {
    console.log('The current state is: ', state);
    render(state);
});


const render = ({ userName, fontSize }) => {
    document.getElementById('userName').innerText = userName;
    document.getElementsByClassName('container')[0].style.fontSize = fontSize === 'small' ? '16px' : '24px';
    document.forms.fontSizeForm.fontSize.valueOf = fontSize;
};


