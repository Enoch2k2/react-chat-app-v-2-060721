import React, { useState, useEffect } from 'react';
import Cable from 'actioncable';
import ChatList from './components/ChatList';
import ChatForm from './components/ChatForm';
import { useDispatch } from 'react-redux';
import { setChatSubscription } from './actions/connection';
import { setChats } from './actions/chatLogs';

const App = () => {
  const [connection, setConnection ] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const createSocket = () => {
      let cable = Cable.createConsumer('ws://localhost:3001/cable');
      const chatConnection = cable.subscriptions.create({
        channel: 'ChatChannel'
      }, {
        connected: () => {},
        received: async (resp) => {
          const data = await JSON.parse(resp);
          dispatch(setChats(data.chat_messages))
        },
        create: (chatContent) => {
          chatConnection.perform('create', {
            content: chatContent
          });
        }
      });
  
      dispatch(setChatSubscription(chatConnection));
      setConnection(true);
    }

    if(!connection) {
      createSocket();
    }
  }, [connection, dispatch])


  return (
    <div className='App'>
      <div className='stage'>
        <h1>Chat</h1>
        <ChatList />
        <ChatForm />
      </div>
    </div>
  );
}

export default App;
