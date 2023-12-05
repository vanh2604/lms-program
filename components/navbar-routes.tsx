"use client";

import { UserButton, useAuth, useUser } from "@clerk/nextjs";
import { usePathname, useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

import { SearchInput } from "./search-input";
import { db } from "@/lib/db";
import React from "react";
import axios from "axios";

interface NavbarRoutesProps {
  isTeacher: boolean;
}

export const NavbarRoutes: React.FC<NavbarRoutesProps> = ({ isTeacher }) => {
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useUser();

  const handleBecomeTeacher = async () => {
    try {
      const response = await axios.post("/api/teacher", { userId: user?.id });
      console.log(response);
      router.refresh();
    } catch {}
  };
  const isTeacherPage = pathname?.startsWith("/teacher");
  const isCoursePage = pathname?.includes("/courses");
  const isSearchPage = pathname === "/search";

  return (
    <>
      {isSearchPage && (
        <div className="hidden md:block">
          <SearchInput />
        </div>
      )}
      <div className="flex gap-x-2 ml-auto">
        {isTeacherPage || isCoursePage ? (
          <Link href="/">
            <Button size="sm" variant="ghost">
              <LogOut className="h-4 w-4 mr-2" />
              Exit
            </Button>
          </Link>
        ) : isTeacher ? (
          <Link href="/teacher/courses">
            <Button size="sm" variant="ghost">
              Teacher mode
            </Button>
          </Link>
        ) : (
          <>
            {" "}
            <Button size="sm" variant="ghost" onClick={handleBecomeTeacher}>
              Become teacher
            </Button>
          </>
        )}
        <UserButton afterSignOutUrl="/" />
      </div>
    </>
  );
};
