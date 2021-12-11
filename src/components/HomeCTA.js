import React from "react";
import { Link } from "react-router-dom";

const HomeCTA = () => {
  return (
    <div className="flex justify-between items-center px-4 sm:px-0">
      <span className="text-white font-medium tracking-wide px-1 relative after:absolute after:left-0 after:right-0 after:h-[1px] after:bg-cornflower-blue after:bottom-[-11px]">
        Posts
      </span>
      <Link
        to="/create"
        className="text-sm font-medium max-w-max text-gray-200 hover:text-white  transition-colors duration-200 p-[12px] rounded bg-gradient-to-tr from-cranberry to-flamingo cursor-pointer"
      >
        New Post
      </Link>
    </div>
  );
};

export default HomeCTA;
