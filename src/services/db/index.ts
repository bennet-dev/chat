
import { createLocalStore } from "~/utils/local-db"

type ChatMessage = {
    id?: number;
    message: string;
    isHuman: boolean;
};

const db = () => {
    // const [chatLog, setChatLog] = createLocalStore<ChatMessage[]>("chatLog", [])

    // const getChatMessages = async () => {
    //     setTimeout(() => {
    //         console.log("getChatMessages", chatLog)
    //         return chatLog
    //     }, 1000)
    // }

    // const addChatMessage = async (message: ChatMessage) => {
    //     setTimeout(() => {
    //         setChatLog([...chatLog, { id: chatLog.length, ...message }])
    //     }, 1000)
    // };


    // return {
    //     getChatMessages,
    //     addChatMessage
    // };
};

export { db }