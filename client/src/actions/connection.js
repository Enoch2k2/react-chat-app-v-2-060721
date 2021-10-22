import { SET_CHAT_SUBSCRIPTION } from "./actionTypes"

export const setChatSubscription = (subscription) => {
  return {
    type: SET_CHAT_SUBSCRIPTION,
    payload: subscription
  }
}