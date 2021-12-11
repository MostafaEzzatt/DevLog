import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

//Firebase
import auth from "../../firebase.config";

// AppContext
import { useAppContext } from "../../hooks/AppContext";

// Componenets
import Loading from "../Loading";

const CheckAuthor = ({ children, authorId }) => {
  const [isAuthor, setIsAuthor] = useState(false);
  const {
    notificationList,
    setNotificationList,
    showNotification,
    setShowNotification,
  } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (authorId !== undefined) {
      if (auth.currentUser.uid !== authorId) {
        setNotificationList([
          ...notificationList,
          "Your Not The Author Of This Post",
        ]);
        setShowNotification(true);
        navigate("/");
      } else {
        setIsAuthor(true);
      }
    }
  }, [authorId]);

  if (!isAuthor) return <Loading />;
  return children;
};

export default CheckAuthor;
