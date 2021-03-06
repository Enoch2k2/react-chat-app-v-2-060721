import React, { useState } from 'react'
import { useSelector } from 'react-redux';

const ChatForm = () => {
  const [currentChatMessage, setCurrentChatMessage] = useState('');
  const chats = useSelector(state => state.connection.subscriptions.chats);

  const updateCurrentChatMessage = (event) => {
    setCurrentChatMessage(event.target.value);
  }

  const handleSendEvent = (event) => {
    event.preventDefault();
    chats.create( currentChatMessage );
    setCurrentChatMessage('');
  }

  return (
    <div>
      <input
        type='text'
        placeholder='Enter your message...'
        className='chat-input'
        value={ currentChatMessage }
        onChange={ updateCurrentChatMessage }
      />
      <button
        className='send'
        onClick={ handleSendEvent }
      >
        Send
      </button>
    </div>
  )
}

export default ChatForm
