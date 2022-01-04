import React, { useState } from 'react';
import Cookies from 'universal-cookie';

import { ChannelContainer, ChannelListContainer, Auth, ChatContainer} from './components';

import './App.css';
import 'stream-chat-react/dist/css/index.css';

const cookies = new Cookies();
const authToken = cookies.get('token')

const client = ""

if(authToken){
    client.connectUser({
          id: cookies.get('userId'),
          name: cookies.get('username'),
          fullName: cookies.get('fullName'),
          image: cookies.get('avatarURL'),
          hashedPassword: cookies.get('hashedPassword'),
          email: cookies.get('email'),
    }, authToken) 
}

const App = () => {
  const [createType, setCreateType] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  if(!authToken) return <Auth />

  return (
    <div className='app__wrapper'>
        <ChatContainer client={client} theme='team light'>
            <ChannelListContainer
                isCreating={isCreating}
                setIsCreating={setIsCreating}
                setCreateType={setCreateType}
                setIsEditing={setIsEditing}
            />
            <ChannelContainer
                isCreating={isCreating}
                setIsCreating={setIsCreating}
                isEditing={isEditing}
                setIsEditing={setIsEditing}
                createType={createType}
            />
        </ChatContainer>
    </div>
  );
}

export default App;
