import { useReducer } from 'react'

interface ReducerAction {
  type: string
  [x: string | number | symbol]: unknown
}

export default (reducers: any = {}, initState = {}) => {
  let [state, dispatch] = useReducer((state: any, action: ReducerAction) => {
    const { type, ...params } = action
    if (typeof reducers[type] === 'function') {
      return reducers[type](state, params) || state
    } else {
      throw new Error(`Unknown action type: ${type}`)
    }
  }, initState)

  const _dispatch = (type: any, params: any = {}) => {
    return dispatch({ type, ...params })
  }

  return [state, _dispatch]
}
