import { useEffect, useState } from 'react';
import socket from './socket';
import ChatManager from './ChatManager';
import './style/App.css'

function App() {

  const [message, setMessage] = useState('');
  const [response, setResponse] = useState<string[]>([]);
  const chatManager = new ChatManager(socket);
  
  // Gérer la connexion au serveur
  socket.on('connection', () => {
    console.log('Connected to server');
  });

  useEffect(() => {
    const getResponse = async () => {
      try {
        const lastMessage = await chatManager.getResponse();
        setResponse(prevResponse => [...prevResponse, lastMessage]);
      } catch (error) {
        console.error('Erreur lors de la récupération de la réponse :', error);
      }
    };

    getResponse();

    // Nettoyer l'écouteur d'événement lors du démontage du composant
    return () => {
      socket.off('response');
    };
  }, [response]); // Déclencher l'effet à chaque fois que response change

  const handleSendMessage = async (message: string) => {
    try {
      chatManager.sendMessage(message);
      setMessage('');
    } catch (error) {
      console.error('Erreur lors de l\'envoi du message :', error);
    }
  };

  return (
    <>
      <section className='chat_container'>
        <h1>Chat</h1>
        <div className='chat'>
          <ul className="chat-thread">
            {response.map((value,index) => <li key={ index }>{ value }</li>)}
          </ul>
        </div>
        <div className='send'>
          <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
          <button onClick={() => handleSendMessage(message)}>Send</button>
        </div>
      </section>
      <main>

      </main>
    </>
  );
}

export default App;
