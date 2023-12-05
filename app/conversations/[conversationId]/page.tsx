import getMessages from "@/actions/get-messages";
import getConversationById from "@/actions/get-conversationById";
import Header from "./components/Header";
import Body from "./components/Body";
import Form from "./components/Form";
import EmptyState from "@/components/messages/EmptyState";
import { auth } from "@clerk/nextjs";

interface IParams {
  conversationId: string;
}

const ChatId = async ({ params }: { params: IParams }) => {
  const { userId } = auth();
  const conversation = await getConversationById(params.conversationId, userId);
  const messages = await getMessages(params.conversationId);

  if (!conversation) {
    return (
      <div className="lg:pl-80 h-full">
        <div className="h-full flex flex-col">
          <EmptyState />
        </div>
      </div>
    );
  }

  return (
    <div className="lg:pl-80 h-full">
      <div className="h-full flex flex-col">
        <Header conversation={conversation} />
        <Body
          conversation={conversation}
          userId={userId}
          initialMessages={messages}
        />
        <Form />
      </div>
    </div>
  );
};

export default ChatId;
