import { Title } from "solid-start";
import ChatInterface from "~/features/chat-interface";

export default function Home() {
  return (
    <main>
      <Title>Chat!</Title>
      <ChatInterface />
    </main>
  );
}
