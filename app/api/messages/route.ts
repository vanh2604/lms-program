import { NextResponse } from "next/server";

import { pusherServer } from "@/lib/pusher";
// import prisma from "@/app/libs/prismadb";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";

export async function POST(request: Request) {
  try {
    const { userId } = auth();
    const body = await request.json();
    const { message, image, conversationId } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const newMessage = await db.message.create({
      data: {
        body: message,
        // image: image,
        conversation: {
          connect: { id: conversationId },
        },
        senderId: userId,
        seenId: userId,
      },
    });

    const updatedConversation = await db.conversation.update({
      where: {
        id: conversationId,
      },
      data: {
        lastMessageAt: new Date(),
        Message: {
          connect: {
            id: newMessage.id,
          },
        },
      },
      include: {
        Message: {
          select: {
            seenId: true,
            body: true,
          },
          orderBy: {
            createdAt: "asc",
          },
        },
      },
    });

    const users = [updatedConversation.userId1, updatedConversation.userId2];

    console.log("users", users);

    await pusherServer.trigger(conversationId, "messages:new", newMessage);
    console.log("updatedConversation", updatedConversation.Message);
    const lastMessage =
      updatedConversation.Message[updatedConversation.Message.length - 1];

    users.map((user) => {
      pusherServer.trigger(user, "conversation:update", {
        id: conversationId,
        messages: [lastMessage],
      });
    });

    return NextResponse.json(newMessage);
  } catch (error) {
    console.log(error, "ERROR_MESSAGES");
    return new NextResponse("Error", { status: 500 });
  }
}
