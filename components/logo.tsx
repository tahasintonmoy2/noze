import { cn } from "@/lib/utils";
import { Anta } from "next/font/google";
import Image from "next/image";

interface LogoProps {
  href: string;
  className?: string;
}

const textFont = Anta({
  subsets: ["latin"],
  weight: ["400"],
});

const Logo = ({ href, className }: LogoProps) => {
  return (
    <div>
      <a
        href={href}
        className={cn(
          "flex items-center gap-x-2 font-semibold",
          className
        )}
      >
        <Image src="/ne-logo.svg" alt="" width={40} height={40} />
        <h1 className={cn("text-3xl font-bold text-blue-600 lg:flex hidden", textFont.className)}>
          NOZE
        </h1>
      </a>
    </div>
  );
};

export default Logo;