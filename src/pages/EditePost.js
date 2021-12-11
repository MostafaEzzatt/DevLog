import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

// Components
import Editor from "../components/editorjs/Editor";

// Firebase
import { doc, getDoc, setDoc } from "firebase/firestore";
import auth, { appFirestore } from "../firebase.config";

// Context
import { useAppContext } from "../hooks/AppContext";
import CheckAuthor from "../components/posts/CheckAuthor";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [body, setBody] = useState({});
  const [handleEditor, setHandleEditor] = useState(null);
  const [btnDisabled, setBTNDisabled] = useState(false);
  const { postid } = useParams();
  const { notificationList, setNotificationList, setShowNotification } =
    useAppContext();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setBTNDisabled(true);
    setNotificationList([]);
    handleEditor.current.save().then((post) => {
      if (
        title.length >= 20 &&
        post.blocks.length >= 1 &&
        author.id == auth.currentUser.uid
      ) {
        const docReff = doc(appFirestore, "Posts", postid);
        setDoc(
          docReff,
          {
            title: title,
            body: post.blocks,
          },
          { merge: true }
        )
          .then(() => {
            setNotificationList([...notificationList, "Your Post Updated 👍"]);
            setShowNotification(true);
            navigate("/");
          })
          .catch((r) => {
            setNotificationList([]);
            setNotificationList([...notificationList, r.message]);
            setShowNotification(true);
            navigate("/");
          });
      } else {
        setNotificationList([
          ...notificationList,
          "Please Title Must Be > or Equal 20 Character And Your Post Body Not Empty",
        ]);
        setShowNotification(true);
        navigate("/");
      }
    });
  };

  useEffect(() => {
    const docReff = doc(appFirestore, "Posts", postid);
    getDoc(docReff).then((post) => {
      setTitle(post.data().title);
      setAuthor(post.data().author);
      setBody({
        time: new Date().getTime(),
        blocks: post.data().body,
        version: "2.22.2",
      });
    });
  }, []);

  useEffect(() => {
    if (handleEditor && body) {
      handleEditor.current.isReady.then(() => {
        if (body.blocks) {
          handleEditor.current.render(body);
        }
      });
    }
  }, [handleEditor, body]);

  return (
    <CheckAuthor authorId={author.id}>
      <>
        <div className="min-h-screen pt-14 relative">
          <div className="max-w-screen-sm mx-auto px-4 sm:px-0">
            <div className="flex justify-between items-center">
              <h4 className="text-lg font-medium text-white">
                Something Change ?!
              </h4>

              <button
                onClick={(e) => handleSubmit(e)}
                disabled={btnDisabled}
                className="text-sm font-medium rounded text-gray-200 hover:text-white transition-colors duration-200 p-[12px] bg-gradient-to-tr from-cranberry to-flamingo cursor-pointer"
              >
                {btnDisabled ? "Working on Your Post" : "Edit Post"}
              </button>
            </div>

            <input
              type="text"
              placeholder="Place Your Title Here"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-transparent placeholder-bermuda-gray outline-none border-2 border-cloud-burst p-4 text-white mt-5 text-center font-black text-4xl"
            />
            <Editor setHandleEditor={setHandleEditor} defaultContent={body} />
          </div>
        </div>
      </>
    </CheckAuthor>
  );
};

export default CreatePost;
