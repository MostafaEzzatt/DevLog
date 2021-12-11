import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

//Firebase
import { onAuthStateChanged, signOut } from "firebase/auth";
import auth from "../../firebase.config";

//Assets
import LogoSmall from "../../images/small-logo.svg";
import FullLogo from "../../images/full-logo.svg";
import MenuIcon from "../../images/menu.svg";
import Envelope from "../../images/envelope.svg";
import Pencil from "../../images/pencil.svg";

//App Context
import { useAppContext } from "../../hooks/AppContext";

const Nav = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [loading, setLoading] = useState(true);
  const menuBTN = useRef(null);
  const { currentUser } = useAppContext();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, () => {
      setLoading(!loading);
    });
    return () => {
      unsub;
    };
  }, []);

  useEffect(() => {
    const windowOnClikc = (e) => {
      if (menuBTN.current && !menuBTN.current.contains(e.target)) {
        setShowMenu(false);
      }
    };
    window.addEventListener("click", windowOnClikc);
    return () => {
      window.removeEventListener("click", windowOnClikc);
    };
  }, [menuBTN]);

  return (
    <>
      <div className="w-full bg-cloud-burst h-[58px]">
        <div className="max-w-screen-sm h-full mx-auto px-4 sm:px-0 flex justify-between items-center ">
          <div className="flex items-center gap-[10px] relative ">
            <Link to="/">
              <LogoSmall className="cursor-pointer sm:hidden hover:opacity-80 transition-opacity duration-200" />
            </Link>
            <button ref={menuBTN} onClick={() => setShowMenu(!showMenu)}>
              <MenuIcon className="cursor-pointer fill-current text-bermuda-gray hover:text-white transition-colors duration-200" />
            </button>
            <AnimatePresence exitBeforeEnter={true}>
              {showMenu && <DropDownMenu />}
            </AnimatePresence>
          </div>

          <Link to="/">
            <FullLogo className="cursor-pointer hidden sm:inline-block hover:opacity-80 transition-opacity duration-200" />
          </Link>

          {currentUser == null && <NavBTNS />}
          {currentUser !== null && <UserSection />}
        </div>
      </div>
    </>
  );
};

const NavBTNS = () => {
  return (
    <div>
      <Link
        to="/signin"
        className="text-sm font-medium text-rock-blue hover:text-white transition-colors duration-200 p-[10px] border-2 border-solid border-cloud-burst sm:border-rock-blue sm:hover:border-white"
      >
        Log In
      </Link>
      <Link
        to="/signup"
        className="ml-[10px] text-sm font-medium text-rock-blue sm:text-gray-200 sm:hover:text-white hover:text-white transition-colors duration-200 p-[12px] sm:rounded sm:bg-gradient-to-tr sm:from-cranberry sm:to-flamingo"
      >
        Sign Up
      </Link>
    </div>
  );
};

const UserSection = () => {
  const { currentUser, setCurrentUser, update, setUpdate } = useAppContext();

  const handleUserSignOut = () => {
    signOut(auth);
    setCurrentUser(null);
    setUpdate(!update);
  };

  return (
    <>
      <div className="flex items-center gap-[10px] group">
        <Link to="/profile">
          <div className="flex items-center">
            {currentUser?.photoURL ? (
              <img
                src={currentUser?.photoURL}
                alt={currentUser?.displayName}
                className="w-6 h-6 rounded-full bg-rock-blue"
              />
            ) : (
              <div className="w-6 h-6 rounded-full bg-rock-blue"></div>
            )}
            <span className="ml-2 text-sm font-medium text-rock-blue group-hover:text-white">
              {currentUser?.displayName}
            </span>
          </div>
        </Link>

        <button
          onClick={() => handleUserSignOut()}
          className=" text-sm font-medium text-rock-blue sm:text-gray-200 sm:hover:text-white hover:text-white transition-colors duration-200 p-[12px] "
        >
          Sign Out
        </button>
      </div>
    </>
  );
};

const DropDownMenu = () => {
  const dropDownMenuVariant = {
    start: {
      y: "-10%",
      opacity: 0,
    },
    end: {
      y: "0%",
      opacity: 1,
    },
  };

  return (
    <motion.div
      variants={dropDownMenuVariant}
      initial="start"
      animate="end"
      exit="start"
      className="absolute py-[10px] px-4 bg-cloud-burst top-[61px] w-80 rounded-md z-10 "
    >
      <ul className="space-y-2">
        <DropDownMenuItem
          Icon={Envelope}
          title="NEWSLETTER"
          subTitle="Stay up-to-date in 5 minutes or less."
          color="flamingo"
          to="/news"
        />
        <DropDownMenuItem
          Icon={Pencil}
          title="Blog"
          subTitle="Lets See What The Community Says."
          color="cranberry"
          to="/"
        />
      </ul>
    </motion.div>
  );
};

const DropDownMenuItem = ({ Icon, title, subTitle, color, to }) => {
  // bg-flamingo
  // text-flamingo
  // bg-cranberry
  // text-cranberry
  return (
    <>
      <li>
        <Link to={to} className="flex items-center cursor-pointer">
          <div>
            <div
              className={`w-11 h-11 flex justify-center items-center rounded-full mr-2 bg-${color}`}
            >
              <Icon />
            </div>
          </div>
          <div>
            <h4 className={`text-sm font-medium text-${color}`}>{title}</h4>
            <p className="text-sm text-bermuda-gray"> {subTitle}</p>
          </div>
        </Link>
      </li>
    </>
  );
};

export default Nav;
