import { NextResponse } from "next/server";

// import prisma from "@/app/libs/prismadb";
import { db } from "@/lib/db";
import { pusherServer } from "@/lib/pusher";
import { auth } from "@clerk/nextjs";

export async function POST(request: Request) {
  try {
    const currentUser = auth();
    console.log(currentUser);
    const body = await request.json();
    const { userId, members, name, user1Name, user2Name } = body;

    if (!currentUser?.userId) {
      return new NextResponse("Unauthorized", { status: 400 });
    }

    console.log("userId", userId);
    console.log("current user", currentUser.userId);

    const existingConversations = await db.conversation.findMany({
      where: {
        OR: [
          {
            userId1: currentUser.userId,
            userId2: userId,
          },
          {
            userId1: userId,
            userId2: currentUser.userId,
          },
        ],
      },
    });

    console.log(existingConversations);

    const singleConversation = existingConversations[0];

    if (singleConversation) {
      return NextResponse.json(singleConversation);
    }

    const newConversation = await db.conversation.create({
      data: {
        userId1: currentUser.userId,
        userId2: userId,
        user1Name: user1Name,
        user2Name: user2Name,
      },
    });

    const users = [currentUser.userId, userId];

    // Update all connections with new conversation
    users.map((user) => {
      pusherServer.trigger(user, "conversation:new", newConversation);
    });

    return NextResponse.json(newConversation);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
