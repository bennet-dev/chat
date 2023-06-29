import { createSignal } from "solid-js";

type ChatMessage = {
    id: number;
    message: string;
    isHuman: boolean;
};

const [messages, setMessages] = createSignal<ChatMessage[]>([]);

const addHumanMessage = (message: string) => {
    const newMessage: ChatMessage = {
        id: messages().length,
        message,
        isHuman: true,
    };

    setMessages([...messages(), newMessage]);
}

const addAiMessage = (message: string) => {
    const newMessage: ChatMessage = {
        id: messages().length,
        message,
        isHuman: false,
    };

    setMessages([...messages(), newMessage]);
}

export { messages, addHumanMessage, addAiMessage };