import { io, SocketOptions } from 'socket.io-client';

// "undefined" means the URL will be computed from the `window.location` object
const url = 'http://localhost:5000';

const options: SocketOptions = {
  // Ajoutez ici d'autres options de configuration si nécessaire
};

const socket = io(url, options);

export default socket;