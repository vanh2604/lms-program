"use client";

import clsx from "clsx";
import ConversationBox from "./ConversationBox";
import { Conversation } from "@prisma/client";
import { useEffect, useMemo, useState } from "react";
import useConversation from "@/hooks/useConversation";
import { useRouter } from "next/navigation";
import { pusherClient } from "@/lib/pusher";
import { FullConversationType } from "@/app/types";
import { find } from "lodash";

// import { User } from "@prisma/client";
// import { useRouter } from "next/navigation";
// import { useSession } from "next-auth/react";
// import { useEffect, useMemo, useState } from "react";
// import { MdOutlineGroupAdd } from 'react-icons/md';
// import clsx from "clsx";
// import { find, uniq } from 'lodash';

// import useConversation from "@/app/hooks/useConversation";
// import { pusherClient } from "@/app/libs/pusher";
// import GroupChatModal from "@/app/components/modals/GroupChatModal";
// import ConversationBox from "./ConversationBox";

interface ConversationListProps {
  initialItems: Conversation[];
  userId: any;
  //   users: User[];
  //   title?: string;
}

const ConversationList: React.FC<ConversationListProps> = ({
  initialItems,
  userId,
  //   users
}) => {
  const [items, setItems] = useState(initialItems);
  console.log("new items:", items);
  //   const [isModalOpen, setIsModalOpen] = useState(false);

  const router = useRouter();
  //   const session = useSession();

  const { conversationId, isOpen } = useConversation();

  const pusherKey = useMemo(() => {
    return userId;
  }, [userId]);

  useEffect(() => {
    if (!pusherKey) {
      return;
    }

    pusherClient.subscribe(pusherKey);

    const updateHandler = (conversation: FullConversationType) => {
      console.log("lastmessage new:", conversation);
      setItems((current) =>
        current.map((currentConversation) => {
          if (currentConversation.id === conversation.id) {
            console.log("run here");
            return {
              ...currentConversation,
              //@ts-ignore
              Message: conversation.messages,
            };
          }

          return currentConversation;
        })
      );
    };

    const newHandler = (conversation: FullConversationType) => {
      setItems((current) => {
        if (find(current, { id: conversation.id })) {
          return current;
        }

        return [conversation, ...current];
      });
    };

    pusherClient.bind("conversation:update", updateHandler);
    pusherClient.bind("conversation:new", newHandler);
  }, [pusherKey, router]);

  return (
    <>
      <aside
        className={clsx(
          `
        fixed 
        inset-y-0 
        pb-20
        lg:pb-0
        lg:left-20 
        lg:w-80 
        lg:block
        overflow-y-auto 
        border-r 
        border-gray-200 
      `,
          isOpen ? "hidden" : "block w-full left-0"
        )}
      >
        <div className="px-4">
          <div className="flex justify-between mb-4 pt-4">
            <div className="text-2xl font-bold text-neutral-800">Messages</div>
          </div>
          {items.map((item) => (
            <ConversationBox
              key={item.id}
              //@ts-ignore
              data={item}
              selected={conversationId === item.id}
            />
          ))}
          {/* <ConversationBox
            key={1}
            //   data={item}
            //   selected={conversationId === item.id}
          />
          <ConversationBox
            key={2}
            //   data={item}
            //   selected={conversationId === item.id}
          /> */}
        </div>
      </aside>
    </>
  );
};

export default ConversationList;
