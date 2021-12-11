import { useEffect } from "react";

// App Context
import { useAppContext } from "../hooks/AppContext";

//Firebase
import useStorage from "../hooks/firebase/useStorage";
import auth, { appFirestore } from "../firebase.config";
import { updateProfile } from "@firebase/auth";
import { doc, setDoc } from "@firebase/firestore";

const ImageUpload = ({ file }) => {
  const { progress, url, error } = useStorage(file);
  const { update, setUpdate } = useAppContext();
  const { notificationList, setNotificationList, setShowNotification } =
    useAppContext();

  useEffect(() => {
    updateProfile(auth.currentUser, { photoURL: url }).then(() => {
      setUpdate(!update);
    });

    const userDBRef = doc(appFirestore, `Users/${auth.currentUser.uid}`);
    return setDoc(
      userDBRef,
      {
        photoURL: url,
      },
      { merge: true }
    );
  }, [url]);

  useEffect(() => {
    if (progress > 0 || progress <= 99) {
      setNotificationList([]);
      setNotificationList(["Working On It."]);
      setShowNotification(true);
    }

    if (progress == 100) {
      setNotificationList([]);
      setNotificationList([...notificationList, "All Done."]);
      setShowNotification(true);
    }
  }, [progress]);

  return (
    <div className="absolute inset-0 rounded-full pointer-events-none">
      {url && (
        <img
          src={url}
          alt={auth.currentUser.displayName}
          className="absolute inset-0 w-full h-full object-cover  pointer-events-none"
        />
      )}
    </div>
  );
};

export default ImageUpload;
