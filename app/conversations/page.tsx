import EmptyState from "@/components/messages/EmptyState";
import clsx from "clsx";
const MessagePage = () => {
  const isOpen = false;
  return (
    <div
      className={clsx(
        "lg:pl-80 h-full lg:block",
        isOpen ? "lg:block" : "lg:hidden"
      )}
    >
      <EmptyState />
    </div>
  );
};

export default MessagePage;
