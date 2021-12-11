import { useEffect, useState } from "react";

//Firebase
import { appStorage } from "../../firebase.config";
import auth from "../../firebase.config";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";

const useStorage = (file) => {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);

  useEffect(() => {
    const storageRef = ref(appStorage, auth.currentUser.uid);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_change",
      (snapshot) => {
        const prog = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );

        setProgress(prog);
      },
      (err) => setError(err),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => setUrl(url));
      }
    );
  }, [file]);

  return { progress, url, error };
};

export default useStorage;
