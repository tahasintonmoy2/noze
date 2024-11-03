import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface MemberAvatarProps {
  image?: string;
  name: string;
  className?: string;
  fallbackClassName?: string;
}

export const MemberAvatar = ({
  image,
  name,
  className,
  fallbackClassName,
}: MemberAvatarProps) => {
  if (image) {
    return (
      <div
        className={cn("size-10 relative rounded-md overflow-hidden", className)}
      >
        <Image src={image} alt="Member logo" />
      </div>
    );
  }

  return (
    <Avatar className={cn("size-7 rounded-md", className)}>
      <AvatarFallback
        className={cn(
          "text-white bg-indigo-600 dark:text-indigo-200  rounded-md font-semibold text-xl uppercase",
          fallbackClassName
        )}
      >
        {name[0]}
      </AvatarFallback>
    </Avatar>
  );
};
