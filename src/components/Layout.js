import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Nav from "./layout/Nav";
import Notification from "./notification/Notification";

import { useAppContext } from "../hooks/AppContext";

const Layout = ({ children }) => {
  const { showNotification, setNotificationList } = useAppContext();
  return (
    <motion.div
      initial={{ y: "-10%", opacity: 0 }}
      animate={{ y: "0%", opacity: 1 }}
      exit={{ y: "-10%", opacity: 0 }}
      transition={{ type: "tween", duration: 0.2, ease: "easeInOut" }}
      className="relative overflow-x-hidden h-full"
    >
      <Nav />
      <AnimatePresence
        exitBeforeEnter={true}
        onExitComplete={() => {
          setNotificationList([]);
        }}
      >
        {showNotification && <Notification />}
      </AnimatePresence>

      {children}
    </motion.div>
  );
};

export default Layout;
