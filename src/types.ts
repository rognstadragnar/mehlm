import { VNode } from 'picodom'
export interface MehlmOptions {
  mapStateToProps: MapStateToProps
  mapActionsToProps: MapActionsToProps
  state: State
  actions: Actions
  view: View
  rootElm: HTMLElement
  store: StoreInstance
  preventUpdate: Boolean
}
export interface MehlmReturn {
  destroy: () => void
}

export type View = (
  props: State,
  actions: ParsedActions,
  store: StoreInstance
) => VNode<{ props; actions; store }>

export interface State {}
export type Action = (
  state: State,
  dispatch: Dispatch
) => (...args: Array<any>) => State

export interface Actions {
  [propName: string]: Action
}
export type MapStateToProps = (state: State) => State | undefined
export type MapActionsToProps = (
  actions: ParsedActions
) => ParsedActions | undefined

export type ParsedAction = (...args: Array<any>) => void
export interface ParsedActions {
  [propName: string]: ParsedAction
}

export type Dispatch = (actionName: string, ...args: Array<any>) => void
export type Store = (state?: State, actions?: Actions) => StoreInstance

export type GetState = (mapState?: MapStateToProps) => State
export interface StoreInstance {
  connect: Connect
  getState: GetState
  getActions: (MapActionsToProps?) => ParsedActions
}

export type Connect = (
  s?: MapStateToProps,
  a?: MapActionsToProps,
  force?: boolean
) => (Function) => { dispose: () => void }

export interface ComponentProps {}
export interface ConnectProps {
  store: StoreInstance
}
