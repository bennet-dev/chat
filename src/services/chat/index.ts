import { ChatOpenAI } from "langchain/chat_models/openai";
import { BufferMemory } from "langchain/memory";
import { ConversationChain } from "langchain/chains";
import {
    SystemMessagePromptTemplate,
    HumanMessagePromptTemplate,
    ChatPromptTemplate,
    MessagesPlaceholder,
} from "langchain/prompts";


export const chat = async (message: string): Promise<any> => {
    const api_key = import.meta.env.VITE_OPENAI_API_KEY;
    const chat = new ChatOpenAI({ openAIApiKey: api_key, temperature: 0 });

    const chatPrompt = ChatPromptTemplate.fromPromptMessages([
        SystemMessagePromptTemplate.fromTemplate(
            "The following is a tense hostage negotiation between the hostage taker (AI) and the FBI (human). The Hostages: puppies. The AI will be concise in its responses."
        ),
        new MessagesPlaceholder("history"),
        HumanMessagePromptTemplate.fromTemplate("{input}"),
    ]);

    const chain = new ConversationChain({
        memory: new BufferMemory({ returnMessages: true, memoryKey: "history" }),
        prompt: chatPrompt,
        llm: chat,
    });

    const res = await chain.call({ input: message });
    // console.log("res", res)
    return res

}

export default chat