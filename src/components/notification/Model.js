import { motion } from "framer-motion";

const Model = ({ children, onClickHandler }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute top-0 left-0 h-screen w-full bg-black/50 z-[9000] flex justify-center items-center"
      onClick={onClickHandler}
    >
      {children}
    </motion.div>
  );
};

export default Model;
