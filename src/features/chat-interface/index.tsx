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
    );
};

export default ChatInterface;