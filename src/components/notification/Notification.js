import { motion } from "framer-motion";
import { useEffect } from "react";

//Context
import { useAppContext } from "../../hooks/AppContext";

const Notification = () => {
  const { setShowNotification, notificationList, setNotificationList } =
    useAppContext();

  const listVariants = {
    visible: {
      opacity: 1,
      x: "0%",
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.3,
      },
    },
    hidden: {
      opacity: 0,
      x: "100%",
      transition: {
        when: "afterChildren",
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    visible: {
      x: "0%",
    },
    hidden: {
      x: "140%",
    },
  };

  setTimeout(() => {
    setShowNotification(false);
  }, 3000);

  return (
    <>
      <motion.ul
        className="absolute top-24 right-0 space-y-3 z-[99999]"
        initial="hidden"
        animate="visible"
        exit="hidden"
        variants={listVariants}
      >
        {notificationList.map((msg, idx) => {
          return (
            <motion.li
              key={idx}
              variants={itemVariants}
              transition={{
                type: "tween",
                duration: 0.4,
                ease: "easeInOut",
              }}
              className="px-3 py-2 bg-cornflower-blue text-white font-medium rounded-tl rounded-bl z-[99999]"
            >
              {msg}
            </motion.li>
          );
        })}
      </motion.ul>
    </>
  );
};

export default Notification;
