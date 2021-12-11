import React, { useEffect, useState } from "react";
import { useAppContext } from "../hooks/AppContext";

//Firebase
import {
  onAuthStateChanged,
  signOut,
  updatePassword,
  updateProfile,
} from "@firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import auth, { appFirestore } from "../firebase.config";
import ImageUpload from "../components/imageUpload";

//Assets
import PlusIcon from "../images/plus.svg";
import { useNavigate } from "react-router";

const Profile = () => {
  const [email, setEmail] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [avatarURL, setAvatarURL] = useState("");

  useEffect(() => {
    const unSubAuthStateChanged = onAuthStateChanged(auth, (user) => {
      if (user !== null) {
        setEmail(user.email || "");
        setDisplayName(user.displayName || "");
        setPhone(user.phoneNumber || "");
        setAvatarURL(user.photoURL || "");
      }
    });
    return () => {
      unSubAuthStateChanged();
    };
  }, []);

  return (
    <div className="px-4 sm:px-0">
      <ProfileHeading />
      <UpdateCurrentUserProfile
        email={email}
        displayName={displayName}
        setDisplayName={setDisplayName}
      />

      <UpdateCurrentUserPassword
        password={password}
        setPassword={setPassword}
      />
    </div>
  );
};

const ProfileHeading = () => {
  let { currentUser, setNotificationList, setShowNotification } =
    useAppContext();
  const [file, setFile] = useState(null);

  const types = ["image/png", "image/jpeg"];

  const changeHandler = (e) => {
    const selected = e.target.files[0];

    if (selected && types.includes(selected.type)) {
      setFile(selected);
    } else {
      setFile(null);
      setNotificationList([...notificationList, "only png/jpeg files Allowed"]);
      setShowNotification(true);
    }
  };

  return (
    <div className="mt-24 max-w-screen-sm mx-auto flex items-center gap-2">
      <form>
        <div className="relative rounded-full overflow-hidden">
          <label className="w-16 h-16 rounded-full cursor-pointer bg-cloud-burst text-flamingo flex justify-center items-center">
            <PlusIcon className="w-8 h-8" />
            <input type="file" onChange={changeHandler} className="hidden" />
          </label>
          <div className="absolute inset-0 rounded-full pointer-events-none">
            {auth.currentUser.photoURL && (
              <img
                src={auth.currentUser.photoURL}
                alt={auth.currentUser.displayName}
                className="absolute inset-0 w-full h-full object-cover  pointer-events-none"
              />
            )}
          </div>
          {file && <ImageUpload file={file} setFile={setFile} />}
        </div>
      </form>
      <span className="text-3xl font-bold text-white">
        {currentUser?.displayName}
      </span>
    </div>
  );
};

const UpdateCurrentUserProfile = ({ email, displayName, setDisplayName }) => {
  const {
    update,
    setUpdate,
    setCurrentUser,
    notificationList,
    setNotificationList,
    setShowNotification,
  } = useAppContext();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile(auth.currentUser, { displayName: displayName })
      .then(
        () => {
          setUpdate(!update);
          setCurrentUser(auth.currentUser);

          const userDBRef = doc(appFirestore, `Users/${auth.currentUser.uid}`);
          return setDoc(
            userDBRef,
            {
              displayName: displayName,
            },
            { merge: true }
          ).then((sDoc) => {
            setNotificationList([...notificationList, "Your Name Changed !"]);
            setShowNotification(true);
            navigate("/");

            return sDoc;
          });
        },
        (r) => {
          setNotificationList([...notificationList, r]);
          setShowNotification(true);
          navigate("/");
        }
      )
      .then()
      .catch((r) => {
        setNotificationList([...notificationList, r]);
        setShowNotification(true);
        navigate("/");
      });
  };

  return (
    <div className="mt-5 max-w-screen-sm mx-auto">
      <form onSubmit={handleSubmit} autoComplete="on">
        <div className="flex flex-col gap-5">
          <div>
            <label
              htmlFor="email"
              className="text-lg text-rock-blue font-medium cursor-pointer"
            >
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              autoComplete="username"
              className="w-full py-3 px-2 font-medium outline-none rounded-sm border-2 border-solid border-gray-100 hover:border-blue-400 focus:border-blue-400 transition-colors mt-2"
              id="email"
              disabled
            />
          </div>

          <div>
            <label
              htmlFor="displayname"
              className="text-lg text-rock-blue font-medium cursor-pointer"
            >
              Display Name
            </label>
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="displayname"
              autoComplete="username"
              className="w-full py-3 px-2 font-medium outline-none rounded-sm border-2 border-solid border-gray-100 hover:border-blue-400 focus:border-blue-400 transition-colors mt-2"
              id="displayname"
            />
          </div>

          <input
            type="submit"
            value="Update Profile"
            className="text-sm font-medium max-w-max text-rock-blue sm:text-gray-200 sm:hover:text-white hover:text-white transition-colors duration-200 p-[12px] sm:rounded sm:bg-gradient-to-tr sm:from-cranberry sm:to-flamingo cursor-pointer"
          />
        </div>
      </form>
    </div>
  );
};

const UpdateCurrentUserPassword = ({ password, setPassword }) => {
  const { notificationList, setNotificationList, setShowNotification } =
    useAppContext();

  const handleSubmit = (e) => {
    e.preventDefault();

    updatePassword(auth.currentUser, password).catch((r) => {
      if (r.message == "Firebase: Error (auth/requires-recent-login).") {
        setNotificationList([]);
        setNotificationList([
          ...notificationList,
          "Please Re-Login To Be Able To Change Your Password",
        ]);
        setShowNotification(true);
        signOut(auth);
      }
    });
  };
  return (
    <div className="mt-5 max-w-screen-sm mx-auto">
      <form onSubmit={handleSubmit} autoComplete="on">
        <div className="flex flex-col gap-5">
          <div>
            <label
              htmlFor="password"
              className="text-lg text-rock-blue font-medium cursor-pointer"
            >
              Password
            </label>

            <input
              hidden
              type="text"
              name=""
              id="username"
              disabled
              defaultValue={auth.currentUser.email}
              autoComplete="username"
            />

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              autoComplete="current-password"
              className="w-full py-3 px-2 font-medium outline-none rounded-sm border-2 border-solid border-gray-100 hover:border-blue-400 focus:border-blue-400 transition-colors mt-2"
              id="password"
            />
          </div>

          <input
            type="submit"
            value="Update Password"
            className="text-sm font-medium max-w-max text-rock-blue sm:text-gray-200 sm:hover:text-white hover:text-white transition-colors duration-200 p-[12px] sm:rounded sm:bg-gradient-to-tr sm:from-cranberry sm:to-flamingo cursor-pointer"
          />
        </div>
      </form>
    </div>
  );
};

export default Profile;
