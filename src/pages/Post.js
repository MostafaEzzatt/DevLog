import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

// Components
import PostAuthInfo from "../components/posts/PostAuthInfo";

// Firebase
import auth, { appFirestore } from "../firebase.config";
import { doc, getDoc } from "@firebase/firestore";
import PostBlock from "../components/posts/PostBlock";

// Assets
import EditeSVG from "../images/update-post.svg";
import DeleteSVG from "../images/delete.svg";
import DeletePost from "../components/notification/DeletePost";
import Model from "../components/notification/Model";

// Components
import Loading from "../components/Loading";

const Post = () => {
  const { postid } = useParams();
  const [currentPost, setCurrentPost] = useState({});
  const [loading, setLoading] = useState(true);
  const [showDelete, setShowDelete] = useState(false);

  useEffect(() => {
    const docRef = doc(appFirestore, `Posts/${postid}`);
    getDoc(docRef).then((post) => {
      setCurrentPost(post.data());
      setLoading(false);
    });
  }, []);

  const onClickHandleDelete = () => {
    setShowDelete(!showDelete);
  };

  if (loading) return <Loading />;

  return (
    <>
      <AnimatePresence exitBeforeEnter={true} onExitComplete={() => null}>
        {showDelete && (
          <Model>
            <DeletePost cancel={() => setShowDelete(false)} postId={postid} />
          </Model>
        )}
      </AnimatePresence>
      <div
        className={`max-w-screen-sm mx-auto mt-12 px-4 ${
          showDelete ? "h-5/6 overflow-hidden" : ""
        }`}
      >
        <div>
          <h2 className="font-black text-4xl text-center text-white block">
            {currentPost.title}
          </h2>
          <PostAuthInfo userPath={currentPost.author.path} home={false} />
          {auth.currentUser !== null &&
            currentPost.author.id === auth.currentUser.uid && (
              <div className="flex items-center justify-center gap-1 mt-4">
                <Link
                  to={`/post/${postid}/update`}
                  className="ml-2 text-sm font-medium text-rock-blue hover:text-white"
                >
                  <EditeSVG className="w-6 h-6 inline-block" /> Edit Post
                </Link>

                <button
                  to={`/post/${postid}/update`}
                  className="ml-2 text-sm font-medium text-gray-100 hover:text-white bg-flamingo px-2 py-1 rounded"
                  onClick={() => onClickHandleDelete()}
                >
                  <DeleteSVG className="w-6 h-6 inline-block" /> Delete Post
                </button>
              </div>
            )}
        </div>
        <div className="post-content mt-9 text-xl text-white">
          {currentPost.body.map((block) => {
            return <PostBlock key={block.id} block={block} />;
          })}
          <>&nbsp;</>
        </div>
      </div>
    </>
  );
};

export default Post;
