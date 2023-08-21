import Message from "./Message";

export default function Messages({ messages }) {
  const messageItems = messages?.map((message) => {
    return (
      <Message
        key={message.user_id}
        content={message.content}
        self={message.self}
      />
    );
  });

  return <div className="flex w-full flex-col px-3 gap-8">{messageItems}</div>;
}
