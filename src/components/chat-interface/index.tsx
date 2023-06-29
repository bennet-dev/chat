import { createSignal } from "solid-js";
import getResposne from "~/services/chat";


const ChatInterface = () => {
    const [message, setMessage] = createSignal("");

    const handleMessage = async () => {
        console.log("MESSAGE: ", message());
        const response = await getResposne(message());
        console.log("RESPONSE: ", response);
    };

    return (
        <div>
            <h1>Chat Interface</h1>
            <input type="text" placeholder="Type your message here" value={message()} onChange={e => setMessage(e.target.value)} />
            <button onClick={handleMessage} >Sumbit</button>

        </div>
    );
};

export default ChatInterface;