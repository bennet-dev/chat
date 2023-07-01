import type { JSX } from 'solid-js';

type ChatInputProps = JSX.IntrinsicElements['input']

const ChatInput = (props: ChatInputProps) => {
    return (
        <input
            type="text"
            class="flex-grow py-2 px-4 rounded-lg bg-white bg-opacity-10  placeholder-white placeholder-opacity-40 focus:outline-none text-teal-300"
            placeholder="Type your message here"
            {...props}
        />
    )
};

export default ChatInput;