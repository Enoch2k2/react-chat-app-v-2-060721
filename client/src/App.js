import React, { useState, useEffect } from 'react';
import Cable from 'actioncable';

const App = () => {
  const [currentChatMessage, setCurrentChatMessage] = useState('')
  const [connection, setConnection ] = useState(false);
  const [chats, setChats] = useState({});
  const [chatLogs, setChatLogs] = useState([])

  const loadChats = () => {
    fetch('http://localhost:3001/chat_messages')
      .then(resp => resp.json())
      .then(data => setChatLogs(data))
  }

  useEffect(() => {
    if(!connection) {
      createSocket();
      loadChats();
    }
  }, [connection])

  const updateCurrentChatMessage = (event) => {
    setCurrentChatMessage(event.target.value);
  }

  const handleSendEvent = (event) => {
    event.preventDefault();
    chats.create( currentChatMessage );
    setCurrentChatMessage('');
  }

  const createSocket = () => {
    let cable = Cable.createConsumer('ws://localhost:3001/cable');
    const chatConnection = cable.subscriptions.create({
      channel: 'ChatChannel'
    }, {
      connected: () => {},
      received: async (data) => {
        const resp = await JSON.parse(data);
        setChatLogs(resp.chat_messages)
        // setChatLogs(chatLogCopy);
      },
      create: (chatContent) => {
        chatConnection.perform('create', {
          content: chatContent
        });
      }
    });

    setChats(chatConnection)
    setConnection(true);
  }

  const chatLogLis = chatLogs.map((chat) => {
    return (
      <li key={ chat.id }>
        user says: { chat.content }
      </li>
    )
  })
  return (
    <div className='App'>
      <div className='stage'>
        <h1>Chat</h1>
        <div className='chat-logs'>
          <ul>
          { chatLogLis }
          </ul>
        </div>
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
    </div>
  );
}

export default App;
