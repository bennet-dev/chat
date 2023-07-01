import { Component, JSX } from 'solid-js';

type MessageBubbleProps = {
    isHuman?: boolean;
    children: JSX.Element | JSX.Element[];
}

const MessageBubble: Component<MessageBubbleProps> = ({ children, isHuman }) => {

    return (
        <div class={
            `flex-grow py-2 px-4 rounded-lg bg-white bg-opacity-10 justify-start text-left ${isHuman ? "text-blue-100" : "text-lime-400"}`
        }
        >
            {children}
        </div>
    )
};

export default MessageBubble;