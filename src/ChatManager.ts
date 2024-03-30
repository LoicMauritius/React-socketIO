import { Socket } from 'socket.io-client';

class ChatManager {
  private socket: Socket;

  constructor(socket: Socket) {
    this.socket = socket;
  }

  public sendMessage(message: string): void {
    console.log('Envoi de message :', message);
    this.socket.emit('on-message', message);
  }

  public getResponse(): Promise<string> {
    return new Promise((resolve) => {
      this.socket.on('response', (messages: string[]) => {
        const lastMessage = messages[messages.length - 1];
        console.log('Dernier message reçu :', lastMessage);
        resolve(lastMessage);
      });
    });
  }
}

export default ChatManager;