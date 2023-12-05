import { Conversation, Message } from "@prisma/client";

export type FullConversationType = Conversation & {
  Message: Message[];
};
