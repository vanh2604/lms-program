import { auth } from "@clerk/nextjs";
import DesktopSidebar from "./DesktopSidebar";

async function Sidebarchat({ children }: { children: React.ReactNode }) {
  //   const currentUser = await getCurrentUser();
  const { userId } = auth();

  return (
    <div className="h-full">
      <DesktopSidebar />
      <main className="lg:pl-20 h-full">{children}</main>
    </div>
  );
}

export default Sidebarchat;
