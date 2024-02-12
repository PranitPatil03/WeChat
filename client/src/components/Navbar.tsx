import { logo } from "@/assets";
import { Separator } from "@radix-ui/react-separator";

const Navbar = () => {
  return (
    <>
      <div className="w-full mx-4 mt-3 fixed">
        <img src={logo} className="w-[6rem] h-[2rem]"></img>
        <Separator className="text-gray-700 mt-3 px-2 z-20" />
      </div>
    </>
  );
};

export default Navbar;
