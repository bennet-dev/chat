import { createSignal } from "solid-js";
import type { ChatMessage } from "~/services/chat";
import { HumanChatMessage, AIChatMessage } from "langchain/schema";

const [messages, setMessages] = createSignal<ChatMessage[]>([]);

const addHumanMessage = (message: string) => {
    setMessages([...messages(), new HumanChatMessage(message)]);
}

const addAiMessage = (message: string) => {
    setMessages([...messages(), new AIChatMessage(message)]);
}

export { messages, addHumanMessage, addAiMessage };