import { createContext, useState, useEffect, useContext } from "react";
import { isAuthTokenContext } from "./AuthContext";
import io from "socket.io-client";

const SocketContext = createContext();
export const useSocketContext = () => {
    return useContext(SocketContext)
}
export const SocketContextProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const { isAuthToken } = useContext(isAuthTokenContext);

    useEffect(() => {
        console.log(isAuthToken);
        if (isAuthToken) {
            const user = JSON.parse(sessionStorage.getItem('user'))

            console.log('us', user._id);

            const newSocket = io('http://localhost:5000', {
                query: {
                    userId: user._id,

                },
            });
            setSocket(newSocket);

            newSocket.on("getOnlineUsers", (users) => {
                setOnlineUsers(users);
                console.log('online', onlineUsers);
            });

            return () => newSocket.close();
        } else {
            if (socket) {
                socket.close();
                setSocket(null);
            }
        }
    }, [isAuthToken]);

    return (
        <SocketContext.Provider value={{ socket, onlineUsers }}>
            {children}
        </SocketContext.Provider>
    );
};
