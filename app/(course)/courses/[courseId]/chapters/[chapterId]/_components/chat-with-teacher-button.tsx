"use client";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useCallback, useState } from "react";

interface ChatWithTeacherButtonProps {
  userId: string;
  teacherName: any;
}
const ChatWithTeacherButton: React.FC<ChatWithTeacherButtonProps> = ({
  userId,
  teacherName,
}) => {
  const router = useRouter();
  const { user } = useUser();
  console.log("user", user?.primaryEmailAddress?.emailAddress);
  const [isLoading, setIsLoading] = useState(false);
  //   console.log(userId);
  const handleClick = useCallback(() => {
    setIsLoading(true);

    axios
      .post("/api/conversations", {
        userId,
        user1Name: user?.primaryEmailAddress?.emailAddress,
        user2Name: teacherName,
      })
      .then((data) => {
        router.push(`/conversations/${data.data.id}`);
      })
      .finally(() => setIsLoading(false));
  }, [router, teacherName, user, userId]);
  return (
    <Button
      size="sm"
      className="w-full md:w-auto mr-2"
      title="You have rated this course"
      disabled={isLoading}
      onClick={handleClick}
    >
      Chat with teacher
    </Button>
  );
};

export default ChatWithTeacherButton;
