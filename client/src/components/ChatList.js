import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadChats } from '../actions/chatLogs';

const ChatList = () => {
  const chatLogs = useSelector(state => state.chatLogs);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadChats());
  }, [dispatch])

  const chatLogLis = chatLogs.map((chat) => {
    return (
      <li key={ chat.id }>
        user says: { chat.content }
      </li>
    )
  })

  return (
    <div>
      <div className='chat-logs'>
        <ul>
        { chatLogLis }
        </ul>
      </div>
    </div>
  )
}

export default ChatList
