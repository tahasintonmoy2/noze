import { Separator } from "@/components/ui/separator";
import Logo from "./logo";
import { Nav } from "./nav";
import { Projects } from "./projects";
import { WorkspaceSwitcher } from "./workspace-switcher";

const Sidebar = () => {
  return (
    <aside className="h-full p-4 w-full lg:bg-neutral-100 lg:dark:bg-[#0a0a0a] border-r dark:border-[#0f111a]">
      <Logo href="/" className="lg:flex hidden mb-4"/>
      <WorkspaceSwitcher />
      <Separator className="my-4" />
      <Nav />
      <Separator />
      <Projects />
    </aside>
  );
};

export default Sidebar;
