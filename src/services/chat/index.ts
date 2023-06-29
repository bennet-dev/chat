import { ChatOpenAI } from "langchain/chat_models/openai";
import { HumanChatMessage, SystemChatMessage, AIChatMessage } from "langchain/schema";
import { messages } from "~/store/store";

interface AIResponse {
    text: string;
}

const chat = async (): Promise<AIResponse> => {
    const api_key = import.meta.env.VITE_OPENAI_API_KEY

    const seed_message = new SystemChatMessage("You are a grizled detective interogating me for a crime.");
    const chat_log = messages().map(m => m.isHuman ? new HumanChatMessage(m.message) : new AIChatMessage(m.message))

    const chat = new ChatOpenAI({ openAIApiKey: api_key, temperature: 0 });

    return await chat.call([seed_message, ...chat_log]);
};

export default chat