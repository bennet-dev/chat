import { Title } from "solid-start";
import Counter from "~/components/Counter";
import ChatInterface from "~/components/chat-interface";

export default function Home() {
  return (
    <main>
      <Title>Chat!</Title>
      <ChatInterface />
    </main>
  );
}
