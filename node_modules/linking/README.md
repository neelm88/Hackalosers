# Linking

Alternative Redux bindings for React.

[![build status](https://travis-ci.org/dk00/linking.svg)](https://travis-ci.org/dk00/linking)
[![coverage](https://codecov.io/gh/dk00/linking/branch/master/graph/badge.svg)](https://codecov.io/gh/dk00/linking)
[![npm](https://img.shields.io/npm/v/linking.svg)](https://www.npmjs.com/package/linking)
[![dependencies](https://david-dm.org/dk00/linking/status.svg)](https://david-dm.org/dk00/linking)

## API

### `linkApp({reducers, [preload], component, [env]})`

Create a store and mount the app with it.

Install peer react implementation (`preact` or `react` + `react-dom`) and import corresponding version(`import {linkApp} from 'linking/preact'` or `import {linkApp} from 'linking/react'`) to use.

Coming s∞n: `import linkApp from 'linking/vue'`

#### Arguments

- `reducers` (Object): An object that will be passed to `combineReducers` of Redux. In addition to reducing functions, object values can also be updater maps, and will be converted to reducing functions by `handle-actions`.
- `preload` (Function):  A function that returns preloaded state.
- `component` ((p)React component): The root component of the app.

#### Returns

(Store): Redux store created with specified reducers.

While in development environment, HMR helper functions will also be added to the `store` object. `replaceApp` can be used to replace the root component, and `replaceReducers` also accepts the `reducers` object passed to `linkApp`.

#### Example

```js
import linkApp from 'linking/preact'
import reducers from './reduce'
import preload from './preload'
import main from './main'

const store = linkApp({reducers, preload, component: main})

if (module.hot) {
  module.hot.accept('./reduce', () => store.replaceReducers(reducers))
  module.hot.accept('./main', () => store.replaceApp(main))
}
```

### `composeLink({Component, createClass, [propTypes]})`

Create the `link` function for specified react implementation.

#### Examples

**React**

```js
import createClass from 'create-react-class'
import propTypes from 'prop-types'
import composeLink from 'linking'

const link = composeLink({createClass, propTypes})
```

**preact**

```js
import {Component} from 'preact'
import composeLink from 'linking'

const link = composeLink({Component})
```

### `link(render[, select][, merge])`

Link a render function to a store. Return a linked render function or component.
`props.store` will be used if `store` is passed to the returned function, other components use the store provided by their ancestor.

#### Arguments

- `select(state[, ownProps])`: Select state properties related to the linked component.
  Called when store state changes, re-rendering is skipped if result of this function is shallowly equal to previous.
  Omit this argument to ignore store updates.
  Defaults to `() => undefined`.

- `merge(selectedState, bindAction, [ownProps])`
  Defaults to `selectedProps => selectedProps`.
  Compose the props object to be passed to the linked component.

  `bindAction(action, [options])`
  Creates event handler functions that dispatch passed `action`. It is inversion of control to `dispatch`.

  `action`: object or `createAction(event, [options])`
  `action` can also be a function returns an action, or a promise resolves to an action.

- `render(props)`: accepts a single "props" object argument with data and returns a `React` element.

#### Examples

##### Inject store for child elements

```js
import createClass from 'create-react-class'
import propTypes from 'prop-types'
import composeLink from 'linking'

const link = composeLink({createClass, propTypes})
const root = link(renderRoot)
ReactDOM.render(root({store}), document.querySelector('#root'))
```

##### Inject todos and addTodo

```js
function mapStateToProps(state) {
  return { todos: state.todos }
}

function merge(state, bindAction) {
  return Object.assign({onClick: bindAction({type: 'ADD_TODO'})}, state)
}

export default link(todoApp, mapStateToProps, merge)
```

##### implement `connect` and `Provider` of react-redux

```js
import React from 'react'
import composeLink from 'linking'
const h = React.createElement
const link = composeLink({createClass, propTypes})

function Provider({store, children}) {
  const element = react.Children.only(children)
  function seed() {
    return element
  }
  const container = link(seed)
  return h(container, {store})
}

function defaultDispatch(dispatch) {
  return {dispatch}
}
function defaultMerge(state, actions, props) {
  return Object.assign({}, props, state, actions)
}
function mapDispatch(mapDispatchToProps, dispatch, ownProps) {
  if (typeof mapDispatchToProps == 'function') {
    return mapDispatchToProps(dispatch, ownProps)
  }
  return bindActionCreators(mapDispatchToProps, dispatch)
}

function connect(mapStateToProps,
  mapDispatchToProps=defaultDispatch,
  mergeProps=defaultMerge) {
  function merge(stateProps, {dispatch}, ownProps) {
    const actions = mapDispatch(mapDispatchToProps, dispatch, ownProps)
    return mergeProps(stateProps, actions, ownProps)
  }
  return Component => {
    const render = props => h(Component, props)
    link(render, mapStateToProps, merge)
  }
}

export {Provider, connect}
```

### `handleActions(updaterMap[, defaultState={}]): reduce`

Turn an updater map into a reducing function.

The updater with key equal to type of dispatched action type is used for reduction.
Current state and payload of the action is passed to the updater function, and result of it is shallowly merged into current state, like `setState`.
If the updater returned a falsly value, or there's no updater for the action type, original state is returned instead.

#### Exmaples

```js
const updaters = {
  increment: ({count}, payload) => ({count: count + payload}),
  decrement: ({count}, payload) => ({count: count - payload}),
  reset: (state, action) => ({count: 0})
}
const reduce = handleActions(updaters)
let actual, expected

actual = reduce({count: 1, data: 't'}, {type: 'increment', payload: 2})
expected = {count: 3, data: 't'}
t.deepEqual(actual, expected)

actual = reduce({count: 6}, {type: 'decrement', payload: 1})
expected = {count: 5}
t.deepEqual(actual, expected)
```

### `composeReduce(reducers)`

Turns an object into a single reducing function like `combineReducers`.

#### Arguments

`reducers` (Object): In addition to reducing functions, object values can also be updater maps, and will be converted to reducing functions by `handleActions`.

#### Examples

```js

function todos(state = [], action) {
  switch (action.type) {
    case 'ADD_TODO':
      return state.concat([action.text])
    default:
      return state
  }
}

const counter = {
  INCREMENT: ({counter}, {amount}) => ({counter: counter + amount}),
  DECREMENT: ({counter}, {amount}) => ({counter: counter - amount})
}

const reducer = composeReduce({todos, counter})
const store = createStore(reducer)
```

### `sideEffect :: Component -> handleChange -> Component`

Create a component that, when mounting, updating, unmounting, calls `handleChange` with props of each mounted instance.

#### Examples

Setting document title

```js
import {Component} from 'react'
import {sideEffect} from 'linking'

const arrayLast = list => list[list.length -1]
const setTitle = propsList => {
  const {title=document.title} = arrayLast(propsList)
  document.title = title
}

export default sideEffect(Component)(setTitle)
```
