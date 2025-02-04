import { useState, useEffect } from 'react';
const WS_URL = "ws://localhost:8080";
export const useSocket = () => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const ws = new WebSocket(WS_URL);
    ws.onopen = () => {
        setSocket(ws);
      console.log("Connected to server");
    };

    ws.onclose = () => {
      console.log("Disconnected from server");
      setSocket(null);
    };

    return () => ws.close();
  }, []);

  return socket;
};