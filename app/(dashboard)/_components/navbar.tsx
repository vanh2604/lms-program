import { NavbarRoutes } from "@/components/navbar-routes";

import { MobileSidebar } from "./mobile-sidebar";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";

export const Navbar = async () => {
  const { userId } = auth();
  const isTeacher = await db.teacher.findFirst({
    where: {
      userId: userId!,
    },
    select: {
      id: true,
      teacherName: true,
    },
  });

  return (
    <div className="p-4 border-b h-full flex items-center bg-white shadow-sm">
      <MobileSidebar />
      <NavbarRoutes isTeacher={!!isTeacher} />
    </div>
  );
};
