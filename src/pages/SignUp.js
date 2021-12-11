import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

//Firebase
import auth, { appFirestore } from "../firebase.config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

//Assets
import TwitterIcon from "../images/twitter-icon.svg";

// App Context
import { useAppContext } from "../hooks/AppContext";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { notificationList, setNotificationList, setShowNotification } =
    useAppContext();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        const ref = doc(appFirestore, "Users", auth.currentUser.uid);
        return setDoc(ref, { displayName: auth.currentUser.displayName });
      })
      .then(() => {
        setNotificationList([]);
        setNotificationList([
          ...notificationList,
          `Welcome To Out Community 😁`,
        ]);
        setShowNotification(true);
        navigate("/");
      })
      .catch((error) => {
        setNotificationList([...notificationList, error]);
        setShowNotification(true);
        navigate("/");
      });
    setIsLoading(true);
  };

  return (
    <motion.div className="bg-elephant w-full min-h-screen flex justify-center items-center">
      <div className="max-w-xs mx-auto w-96">
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
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="text-lg text-rock-blue font-medium cursor-pointer"
              >
                Password
              </label>
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
              value="Sign Up"
              className="text-sm font-medium max-w-max text-gray-200 hover:text-white transition-colors duration-200 p-[12px] rounded bg-gradient-to-tr from-cranberry to-flamingo cursor-pointer"
              disabled={isLoading}
            />
          </div>
        </form>

        <div className="mt-5">
          <p className=" text-sm text-rock-blue font-medium">
            Already have an account?{" "}
            <Link to="/signin" className="text-white">
              Sign in
            </Link>
            .
          </p>

          <button className="bg-gray-50 mt-[10px] w-full rounded py-3 text-lg font-medium text-[#1DA1F2] hover:bg-white transition-colors duration-200 flex justify-center items-center">
            <TwitterIcon className="mr-2" />
            Sign Up with Twitter
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default SignUp;
