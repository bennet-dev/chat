import { For, Show, createSignal } from "solid-js";
import ChatInput from "~/components/chat-input";
import MessageBubble from "~/components/message-bubble";
import { createServerAction$ } from "solid-start/server";
import { addHumanMessage, messages, addAiMessage } from "~/store/store";
import chat from "~/services/chat";

const ChatInterface = () => {
    const [message, setMessage] = createSignal("");

    const [sending, send] = createServerAction$(async (message: string) => await chat(message));

    const handleSendMessage = async (messageText: string) => {
        addHumanMessage(messageText);
        setMessage("");
        const { response } = await send(messageText);
        addAiMessage(response);
    };

    return (
        <div class="flex flex-col h-screen p-6">
            <div class="flex-grow overflow-auto mb-4 p-4">
                <For each={messages()} >
                    {({ text, _getType }) => (
                        <div class={`flex  mb-2 animate-slide-in-${_getType() === "human" ? "right" : "left"}`}>
                            <MessageBubble isHuman={_getType() === "human"} >
                                {text}
                            </MessageBubble>
                        </div>
                    )}
                </For>
                <Show when={sending.pending}>
                    <div>SENDING...</div>
                </Show>
                <Show when={sending.error}>
                    <div>
                        ERROR: {sending.error.message}
                    </div>
                </Show>
            </div>
            <div class="sticky bottom-0 flex mt-4 p-6 ">
                <ChatInput
                    type="text"
                    placeholder="Type your message here"
                    onKeyDown={(e) => e.key === "Enter" && handleSendMessage(message())}
                    value={message()}
                    onInput={(e) => setMessage(e.currentTarget.value)}
                    disabled={sending.pending}
                />
                <button
                    class="py-2 px-4 bg-white text-teal-200 rounded-lg shadow-md bg-opacity-10 t border border-teal-300"
                    onClick={() => handleSendMessage(message())}
                    disabled={sending.pending}
                >
                    {sending.pending ? "Loading..." : "Send"}
                </button>
            </div>
        </div>
        // <div class="flex flex-col h-screen p-6">
        //     <h1 class="text-3xl font-bold mb-4 ">AI Chat</h1>
        //     <div class="flex-grow overflow-auto mb-4 bg-white p-4 rounded-3xl shadow-lg bg-opacity-10 backdrop-blur-md border border-blue-300 border-opacity-60">
        //         <For each={messages()} >
        //             {({ text, _getType }) => (
        //                 <div class={`flex  mb-2 animate-slide-in-${_getType() === "human" ? "right" : "left"}`}>
        //                     <div class={`w-full py-2 px-4 rounded-lg  bg-opacity-80 text-left ${_getType() === "human" ? "bg-blue-500 text-white" : "bg-gray-300 text-black"}`}>
        //                         {text}
        //                     </div>
        //                 </div>
        //             )}
        //         </For>
        //         <Show when={sending.pending}>
        //             <div>SENDING...</div>
        //         </Show>
        //         <Show when={sending.error}>
        //             <div>
        //                 ERROR: {sending.error.message}
        //             </div>
        //         </Show>
        //     </div>
        //     <div class="sticky bottom-0 flex mt-4 p-6 ">
        //         <input
        // type="text"
        // placeholder="Type your message here"
        // onKeyDown={(e) => e.key === "Enter" && handleSendMessage(message())}
        // value={message()}
        // onInput={(e) => setMessage(e.currentTarget.value)}
        // disabled={sending.pending}
        //             class="flex-grow mr-2 py-2 px-4 rounded-lg border border-blue-500 bg-white bg-opacity-10  placeholder-white placeholder-opacity-40"
        //         />
        //         <button
        //             class="py-2 px-4 bg-white text-blue-500 rounded-lg shadow-md bg-opacity-10 t border border-blue-300"
        //             onClick={() => handleSendMessage(message())}
        //             disabled={sending.pending}
        //         >
        //             {sending.pending ? "Loading..." : "Send"}
        //         </button>
        //     </div>
        // </div>
        // <div>
        //     <ChatInput type="text"
        //         placeholder="Type your message here"
        //         onKeyDown={(e) => e.key === "Enter" && handleSendMessage(message())}
        //         value={message()}
        //         onInput={(e) => setMessage(e.currentTarget.value)}
        //         disabled={sending.pending}
        //     />
        //     <MessageBubble isHuman={false} >
        //         Hello, How are you?
        //     </MessageBubble>
        // </div>
    );
};

export default ChatInterface;