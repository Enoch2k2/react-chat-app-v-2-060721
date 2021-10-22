import { SET_CHAT_SUBSCRIPTION } from "../actions/actionTypes";

const initialState = {
  subscriptions: {}
}

const connectionReducer =  (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_CHAT_SUBSCRIPTION:
      return {
        ...state,
        subscriptions: {
          ...state.subscriptions,
          chats: payload
        }
      }
    default:
      return state
  }
}

export default connectionReducer;