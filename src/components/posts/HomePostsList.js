import { useEffect, useState } from "react";

// Components
import HomePostBlock from "./HomePostBlock";
import Loading from "../Loading";

// Firebase
import { collection, getDocs, query, limit, orderBy } from "firebase/firestore";
import { appFirestore } from "../../firebase.config";

const HomePostsList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const postsQuery = query(
      collection(appFirestore, "Posts"),
      limit(10),
      orderBy("createdOn", "desc")
    );
    getDocs(postsQuery).then((currentDocs) => {
      setPosts(currentDocs.docs);
      setLoading(false);
    });
  }, []);

  if (loading) return <Loading />;
  return (
    <ul className="mt-[20px] divide-solid divide-cloud-burst divide-y-[1px]">
      {posts.map((post) => (
        <HomePostBlock key={post.id} post={post} />
      ))}
    </ul>
  );
};

export default HomePostsList;
