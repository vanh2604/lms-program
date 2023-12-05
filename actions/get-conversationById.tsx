import { db } from "@/lib/db";
const getConversationById = async (conversationId: string, userId: any) => {
  try {
    if (!userId) {
      return null;
    }

    const conversation = await db.conversation.findUnique({
      where: {
        id: conversationId,
      },
    });

    return conversation;
  } catch (error: any) {
    console.log(error, "SERVER_ERROR");
    return null;
  }
};

export default getConversationById;
