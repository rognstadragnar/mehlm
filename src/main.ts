import { Store } from 'mehdux'
import { h, patch } from 'picodom'

const Mehlm = opts => {
  const {
    mapStateToProps,
    mapActionsToProps,
    state,
    actions,
    view,
    rootElm,
    store,
    preventUpdate = false
  } = opts
  let storeInstance = store
  if (!storeInstance || !(storeInstance instanceof new Store())) {
    storeInstance = new Store(state, actions)
  }

  let node
  const render = (mappedProps, mappedActions) => {
    patch(node, (node = view(mappedProps, mappedActions, store)), rootElm)
  }

  const { dispose } = store.connect(
    mapStateToProps,
    mapActionsToProps,
    !preventUpdate
  )(render)
  return { destroy: () => dispose() }
}

function connect(mapState, mapActions) {
  return component => props => {
    const { store: storeInstance } = props
    const propsFromState = () => ({
      ...storeInstance.getState(mapState),
      ...storeInstance.getActions(mapActions)
    })
    return component({ ...propsFromState(), ...props, lol: 'lol' })
  }
}

export { Mehlm, Mehlm as Render, connect }
