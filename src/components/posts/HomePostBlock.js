import { Link } from "react-router-dom";

// Components
import PostAuthInfo from "./PostAuthInfo";

const HomePostBlock = ({ post }) => {
  const userPath = post.data().author?.path;

  return (
    <li className="py-[10px] group">
      <Link to={`post/${post.id}`}>
        <div className="px-4 sm:px-0">
          <h2 className="text-[21px] text-rock-blue group-hover:text-white transition-colors duration-200">
            {post.data().title}
          </h2>
          <div className="mt-[7px]">
            <PostAuthInfo userPath={userPath} />
          </div>
        </div>
      </Link>
    </li>
  );
};

export default HomePostBlock;
