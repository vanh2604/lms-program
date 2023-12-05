"use client";

import { useEffect, useRef, useState } from "react";

import MessageBox from "./MessageBox";
import { Conversation, Message } from "@prisma/client";
import { pusherClient } from "@/lib/pusher";
import useConversation from "@/hooks/useConversation";
import { find } from "lodash";

interface BodyProps {
  initialMessages: Message[];
  conversation: Conversation;
  userId: any;
}

const Body: React.FC<BodyProps> = ({
  initialMessages = [],
  userId,
  conversation,
}) => {
  const bottomRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState(initialMessages);

  const { conversationId } = useConversation();

  useEffect(() => {
    pusherClient.subscribe(conversationId);
    bottomRef?.current?.scrollIntoView();

    const messageHandler = (message: Message) => {
      setMessages((current) => {
        if (find(current, { id: message.id })) {
          return current;
        }

        return [...current, message];
      });

      bottomRef?.current?.scrollIntoView();
    };

    const updateMessageHandler = (newMessage: Message) => {
      setMessages((current) =>
        current.map((currentMessage) => {
          if (currentMessage.id === newMessage.id) {
            return newMessage;
          }

          return currentMessage;
        })
      );
    };

    pusherClient.bind("messages:new", messageHandler);
    pusherClient.bind("message:update", updateMessageHandler);

    return () => {
      pusherClient.unsubscribe(conversationId);
      pusherClient.unbind("messages:new", messageHandler);
      pusherClient.unbind("message:update", updateMessageHandler);
    };
  }, [conversationId]);

  return (
    <div className="flex-1 overflow-y-auto">
      {messages.map((message, i) => (
        <MessageBox
          conversation={conversation}
          userId={userId}
          isLast={i === messages.length - 1}
          key={message.id}
          data={message}
        />
      ))}
      <div className="pt-24" ref={bottomRef} />
    </div>
  );
};

export default Body;
