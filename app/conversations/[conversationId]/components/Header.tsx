"use client";

import { HiChevronLeft } from "react-icons/hi";
import { HiEllipsisHorizontal } from "react-icons/hi2";
import { useMemo, useState } from "react";
import Link from "next/link";
import { UserButton, useUser } from "@clerk/nextjs";
import { Conversation } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

interface HeaderProps {
  conversation: Conversation;
}

const Header: React.FC<HeaderProps> = ({ conversation }) => {
  const { user } = useUser();
  const otherName =
    user?.id === conversation.userId1
      ? conversation.user2Name
      : conversation.user1Name;
  return (
    <>
      <div
        className="
        bg-white 
        w-full 
        flex 
        border-b-[1px] 
        sm:px-4 
        py-3 
        px-4 
        lg:px-6 
        justify-between 
        items-center 
        shadow-sm
      "
      >
        <div className="flex gap-3 items-center">
          <Link
            href="/conversations"
            className="
            lg:hidden 
            block 
            text-sky-500 
            hover:text-sky-600 
            transition 
            cursor-pointer
          "
          >
            <HiChevronLeft size={32} />
          </Link>
          <UserButton />
          <div className="flex flex-col">
            <div>{otherName}</div>
            <div className="text-sm font-light text-neutral-500">online</div>
          </div>
        </div>
        <Link href="/">
          <Button size="sm" variant="ghost">
            <LogOut className="h-4 w-4 mr-2" />
            Exit
          </Button>
        </Link>
      </div>
    </>
  );
};

export default Header;
