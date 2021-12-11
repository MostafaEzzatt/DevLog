import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router";

//Firebase
import auth from "../../firebase.config";
import { onAuthStateChanged } from "@firebase/auth";

// Components
import Loading from "../Loading";

const RequireAuth = ({ children }) => {
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
  if (user == null) return <Navigate to="/" state={{ from: location }} />;

  return children;
};

export default RequireAuth;
