import { db } from "../lib/db";

const getConversations = async (userId: any) => {
  //   const currentUser = await getCurrentUser();

  //   if (!currentUser?.id) {
  //     return [];
  //   }

  try {
    const conversations = await db.conversation.findMany({
      orderBy: {
        lastMessageAt: "desc",
      },
      where: {
        OR: [
          {
            userId1: userId,
          },
          {
            userId2: userId,
          },
        ],
      },
      include: {
        Message: {
          select: {
            body: true,
            senderId: true,
            seenId: true,
          },
          orderBy: {
            createdAt: "asc",
          },
        },
      },
    });

    return conversations;
  } catch (error: any) {
    return [];
  }
};

export default getConversations;
