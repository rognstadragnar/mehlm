import { Store } from 'mehdux'
import { h, patch, VNode } from 'picodom'

import {
  MehlmOptions,
  StoreInstance,
  MapStateToProps,
  MapActionsToProps,
  ComponentProps,
  ConnectProps
} from './types'

const Mehlm = (opts: MehlmOptions) => {
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

  let node: VNode<object> | null = null
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

function connect(mapState?: MapStateToProps, mapActions?: MapActionsToProps) {
  return (component: (props: object) => VNode<ComponentProps>) => (
    props: ConnectProps
  ) => {
    const { store: storeInstance } = props
    const propsFromState = (): object => ({
      ...storeInstance.getState(mapState),
      ...storeInstance.getActions(mapActions)
    })
    return component({ ...propsFromState(), ...props })
  }
}

export { Mehlm, Mehlm as render, connect }
