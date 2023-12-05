import { db } from "@/lib/db";
import { isTeacher } from "@/lib/teacher";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const TeacherLayout = async ({ children }: { children: React.ReactNode }) => {
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
  if (!isTeacher) {
    return redirect("/");
  }

  return <>{children}</>;
};

export default TeacherLayout;
