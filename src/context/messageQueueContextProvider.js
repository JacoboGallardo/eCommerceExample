import React, { createContext, useContext, useState } from "react";
import FloatingMessages from "../components/FloatingMessages";

const MessageQueueContext = createContext();

export function MessageQueueProvider({ children }) {
    const [messages, setMessages] = useState([]);

    const showMessage = (text) => {
        const id = Date.now(); // Unique ID
        setMessages((prev) => [...prev, { id, text }]);

        // Auto-remove message after 2 seconds
        setTimeout(() => {
            setMessages((prev) => prev.filter((msg) => msg.id !== id));
        }, 2000);
    };

    const removeMessage = (id) => {
        setMessages((prev) => prev.filter((msg) => msg.id !== id));
    };

    return (
        <MessageQueueContext.Provider value={{ showMessage }}>
            {children}
            <FloatingMessages messages={messages} removeMessage={removeMessage} />
        </MessageQueueContext.Provider>
    );
}

export function useMessageQueue() {
    const context = useContext(MessageQueueContext);
    if (!context) {
        throw new Error("useMessageQueue must be used within a MessageQueueProvider");
    }
    return context;
}
