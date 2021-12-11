import { useNavigate } from "react-router-dom";

//Firebase
import { doc, deleteDoc } from "firebase/firestore";
import { appFirestore } from "../../firebase.config";

//AppContext
import { useAppContext } from "../../hooks/AppContext";

const DeletePost = ({ cancel, postId }) => {
  const { setNotificationList, setShowNotification } = useAppContext();
  const navigate = useNavigate();

  const handleOnClickDelete = () => {
    if (postId) {
      deleteDoc(doc(appFirestore, "Posts", postId)).then(() => {
        setNotificationList(["Your Post Deleted"]);
        setShowNotification(true);
        navigate("/");
      });
    }
  };

  return (
    <div className="bg-gray-100 text-flamingo px-8 py-6 rounded">
      <p className="capitalize font-medium text-center">are you sure ?!</p>
      <div className="mt-7">
        <button
          onClick={() => handleOnClickDelete()}
          className="mr-4 bg-flamingo hover:bg-flamingo/60 transition-colors text-white font-medium px-4 py-3"
        >
          Yes, Delete it Permanently
        </button>
        <button
          onClick={() => cancel()}
          className="font-medium px-4 py-3 border-2 border-solid border-cornflower-blue text-cornflower-blue hover:bg-cornflower-blue hover:text-white transition-colors rounded"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default DeletePost;
