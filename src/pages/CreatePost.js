import React, { useState } from "react";
import Editor from "../components/editorjs/Editor";
import { useNavigate } from "react-router-dom";

// Firebase
import { doc, addDoc, collection, Timestamp } from "firebase/firestore";
import auth, { appFirestore } from "../firebase.config";

// Context
import { useAppContext } from "../hooks/AppContext";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [handleEditor, setHandleEditor] = useState(null);
  const [btnDisabled, setBTNDisabled] = useState(false);
  const { notificationList, setNotificationList, setShowNotification } =
    useAppContext();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setBTNDisabled(true);

    handleEditor.current.save().then((data) => {
      if (title.length >= 20 && data.blocks.length >= 1) {
        const docReff = collection(appFirestore, "Posts");
        addDoc(docReff, {
          author: doc(appFirestore, "Users", auth.currentUser.uid),
          title,
          body: data.blocks,
          createdOn: Timestamp.fromDate(new Date()),
        }).then(() => {
          setNotificationList([
            ...notificationList,
            "Community Excited To Read Your Post",
          ]);
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
  return (
    <div className="min-h-screen pt-14 relative">
      <div className="max-w-screen-sm mx-auto px-4 sm:px-0">
        <div className="flex justify-between items-center">
          <h4 className="text-lg font-medium text-white">
            What You Want To Tell Us
          </h4>

          <button
            onClick={(e) => handleSubmit(e)}
            disabled={btnDisabled}
            className="text-sm font-medium rounded text-gray-200 hover:text-white transition-colors duration-200 p-[12px] bg-gradient-to-tr from-cranberry to-flamingo cursor-pointer"
          >
            {btnDisabled ? "Working on Your Post" : "Create Post"}
          </button>
        </div>

        <input
          type="text"
          placeholder="Place Your Title Here"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full bg-transparent placeholder-bermuda-gray outline-none border-2 border-cloud-burst p-4 text-white mt-5 text-center font-black text-4xl"
        />
        <Editor setHandleEditor={setHandleEditor} />
      </div>
    </div>
  );
};

export default CreatePost;
