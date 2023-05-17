import { MessageInstance } from 'antd/es/message/interface';
import useMessage from 'antd/es/message/useMessage';
import React, { createContext } from 'react';

export const MessageContext = createContext(null as unknown as { msgAPI: MessageInstance });

function MessageProvider({ children }: { children: React.ReactNode }) {
    const [msgAPI, messageContext] = useMessage();

    return (
        <MessageContext.Provider value={{ msgAPI }}>
            {messageContext}
            {children}
        </MessageContext.Provider>
    );
}

export default MessageProvider;