import { Title } from "solid-start";
import Counter from "~/features/Counter";
import ChatInterface from "~/features/chat-interface";

export default function Home() {
  return (
    <main>
      <Title>Chat!</Title>
      <ChatInterface />
    </main>
  );
}
