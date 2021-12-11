import React from "react";
import { useRoutes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
// App Routes
import appRoutes from "../allRoutes";

const App = () => {
  const appRoutesElem = useRoutes(appRoutes);
  const location = useLocation();
  return (
    <AnimatePresence exitBeforeEnter={true} onExitComplete={() => null}>
      <div className="h-full" key={location.pathname}>
        {appRoutesElem}
      </div>
    </AnimatePresence>
  );
};

export default App;
