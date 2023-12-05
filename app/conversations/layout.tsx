import getConversations from "@/actions/get-conversation";
import ConversationList from "@/components/messages/ConversationList";
import Sidebarchat from "@/components/sidebar/sidebarchat";
import { auth } from "@clerk/nextjs";

export default async function MessageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = auth();
  const conversations = await getConversations(userId);
  console.log(conversations);
  return (
    <Sidebarchat>
      <ConversationList userId={userId} initialItems={conversations} />
      <div className="h-full">{children}</div>
    </Sidebarchat>
  );
}
