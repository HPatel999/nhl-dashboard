// TransitionContext.jsx
import { createContext, useContext, useState } from "react";

const TransitionContext = createContext();

export function TransitionProvider({ children }) {
  const [transitionData, setTransitionData] = useState(() => {
    const saved = sessionStorage.getItem("transitionData");
    return saved ? JSON.parse(saved) : null;
  });

  const showTransition = (data) => {
    setTransitionData(data);
    sessionStorage.setItem("transitionData", JSON.stringify(data));
  };

  const hideTransition = () => {
    setTransitionData(null);
    sessionStorage.removeItem("transitionData");
  };

  return (
    <TransitionContext.Provider
      value={{ transitionData, showTransition, hideTransition }}
    >
      {children}
    </TransitionContext.Provider>
  );
}

export function usePageTransition() {
  return useContext(TransitionContext);
}
