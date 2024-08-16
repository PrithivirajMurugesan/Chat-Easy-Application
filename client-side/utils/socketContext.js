import { createContext, useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';

const SocketContext = createContext();

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socketIo = io('http://localhost:4000', {
      transports: ['websocket'],
    });

    socketIo.on('connect', () => {
      console.log('Connected');
    });

    setSocket(socketIo);

    // Clean up when the component unmounts
    return () => {
      socketIo.off('connect');
      socketIo.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};
