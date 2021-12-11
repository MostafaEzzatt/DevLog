import { useEffect, useState } from "react";

// Firebase
import { doc, getDoc } from "firebase/firestore";
import { appFirestore } from "../../firebase.config";

//Components
import Loading from "../Loading";

const PostAuthInfo = ({ userPath, home = true }) => {
  const [loading, setLoading] = useState(true);
  const [postAuthor, setPostAuthor] = useState({});

  useEffect(() => {
    const docRef = doc(appFirestore, userPath);
    getDoc(docRef).then((user) => {
      setPostAuthor(user.data());
      setLoading(false);
    });
  }, []);

  if (loading)
    return (
      <div className="mt-6">
        <Loading />
      </div>
    );
  if (home)
    return (
      <HomeAuth
        photo={postAuthor.photoURL}
        displayName={postAuthor.displayName}
      />
    );
  else return <PostAuth displayName={postAuthor.displayName} />;
};

const HomeAuth = ({ photo, displayName }) => {
  return (
    <ul className="flex gap-[10px]">
      <li>
        <span className="text-sm text-rock-blue flex items-center">
          <div className="w-[22px] h-[22px] rounded-full overflow-hidden relative mr-1 hidden sm:inline-block">
            <img
              src={photo}
              alt={displayName}
              className="absolute inset-0 h-full object-cover"
            />
          </div>
          {displayName}
        </span>
      </li>
    </ul>
  );
};

const PostAuth = ({ photo, displayName }) => {
  return (
    <div className="text-rock-blue block text-center text-lg mt-6">
      by {displayName}
    </div>
  );
};

export default PostAuthInfo;
