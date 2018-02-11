<div align="center">
  <img src="https://raw.githubusercontent.com/rognstadragnar/mehlm/master/logo.jpg" alt="mehlm">
</div>

# mehlm

> 2kb JS view framework and state management

* Uses Picodom and Mehdux under the hood

## Usage

```Javascript
/** @jsx h */
import { h } from 'picodom';
import { render } from 'mehlm';

function view(state, actions, storeInstance) {
  return <h1>{state.value}</h1>;
}

const App = {
  state: {
    value: 0
  },
  actions: {
    inc: state => value => ({
      ...state,
      value: state.value + value,
    })
  },
  view,
  rootElm: document.querySelector('.app')
};

render(App);
```

#### The app object can have the following properties:

* **store**: An optional instance of a `mehdux` store. If present `state` and `actions` properties gets bypassed
* **state**: The initial state object (default is an empty object)
* **actions**: An object with the stores actions (default is an empty object)
* **view**: The `view`-function that gets passed state, actions and the store instance, returning the view (**required**)
* **rootElm**: The element in which `mehlm` gets rendered (**required**)
* **mapStateToProps**: A function that maps the state tree to props – you might not care about the entire state tree
* **mapActionsToProps**: A function that maps actions to props – you might not care about all the actions
* **preventUpdate**: To make nested connected components work, the store auto-emits updates to the state – this does not force a rerender, don't worry (default is `false`)

### Nested stateful connected components

Mehlm also support components being connect to the main store, with other `mapStateToProps` and `mapActionsToProps` functions.

```Javascript
/** @jsx h */
import { h } from 'picodom';
import { render, connect } from 'mehlm';


const AwesomeButton = ({ state, actions }) => {
  return <button onclick={actions.inc}>{state.value}</button>
}

const ConnectedButton = connect()(AwesomeButton);

// in `viewFn``
function view(state, actions, storeInstance) {
  return (
    <div>
      <ConnectedButton store={storeInstance}>
    </div>
  );
}

// ... render the app
```
