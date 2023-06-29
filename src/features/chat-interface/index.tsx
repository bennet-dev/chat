import { For, createSignal } from "solid-js";
import { addHumanMessage, messages, addAiMessage } from "~/store/store";
import chat from "~/services/chat";

const ChatInterface = () => {
    const [loading, setLoading] = createSignal(false);
    const [message, setMessage] = createSignal("");

    const handleMessage = async () => {
        setLoading(true);
        addHumanMessage(message());
        setMessage("");
        const response = await chat();
        addAiMessage(response.text);
        setLoading(false);
    };

    return (
        <div class="flex flex-col h-screen p-6">
            <h1 class="text-6xl font-bold mb-4 ">AI Chat</h1>
            <div class="flex-grow overflow-auto mb-4 bg-white p-4 rounded-3xl shadow-lg bg-opacity-10 backdrop-blur-md border border-blue-300 border-opacity-60">
                <For each={messages()} >
                    {({ id, message, isHuman }) => (
                        <div class={`flex  mb-2 animate-slide-in-${isHuman ? "right" : "left"}`}>
                            <div class={`w-full py-2 px-4 rounded-lg ${isHuman ? "bg-blue-500 text-white" : "bg-gray-300 text-black"} bg-opacity-80 text-left`}>
                                {message}
                            </div>
                        </div>
                    )}
                </For>
            </div>
            <div class="sticky bottom-0 flex mt-4 p-6 ">
                <input type="text" class="flex-grow mr-2 py-2 px-4 rounded-lg border border-blue-500 bg-white bg-opacity-10  placeholder-white placeholder-opacity-40" placeholder="Type your message here" value={message()} onInput={(e) => setMessage(e.currentTarget.value)} disabled={loading()} />
                <button class="py-2 px-4 bg-white text-blue-500 rounded-lg shadow-md bg-opacity-10 t border border-blue-300" onClick={handleMessage} disabled={loading()}>
                    {loading() ? "Loading..." : "Send"}
                </button>
            </div>
        </div>
    );
};

export default ChatInterface;