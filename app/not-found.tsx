import { buttonVariants } from "@/components/ui/button";
import Image from "next/image";

const NotFound = () => {
  return (
    <div className="mt-24 lg:grid lg:items-start gap-x-12">
      <div className="lg:col-span-7 flex flex-col items-center justify-center">
        <Image src="/404-error.png" alt="" width={350} height={350} />
        <div className="mb-6 text-xl text-center font-bold">
          <p>Not Found</p>
          <p>Could not find requested resource</p>
        </div>
        <a href="/" className={buttonVariants({ variant: "default" })}>
          Return Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
