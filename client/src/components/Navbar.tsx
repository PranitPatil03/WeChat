import Image from "../assets/bg.webp";

import { AspectRatio } from "@/components/ui/aspect-ratio";
const Navbar = () => {
  return (
    <div className="w-[100vw] h-[100vh]">
        <AspectRatio>
          <img src={Image} alt="Image" className="rounded-md object-cover" />
        </AspectRatio>
    </div>
  );
};

export default Navbar;
