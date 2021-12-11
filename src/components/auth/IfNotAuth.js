import { useState, useEffect } from "react";

//React Routes
import { Navigate, useLocation } from "react-router";

//Firebase
import { onAuthStateChanged } from "@firebase/auth";
import auth from "../../firebase.config";

//Components
import Loading from "../Loading";

const IfNotAuth = ({ children }) => {
  const [user, setUser] = useState(false);
  const location = useLocation();

  useEffect(() => {
    let clearAuthStateChange;

    clearAuthStateChange = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => {
      clearAuthStateChange();
    };
  }, []);

  if (user === false) return <Loading />;
  if (user) return <Navigate to="/" state={{ from: location }} />;

  return children;
};

export default IfNotAuth;
