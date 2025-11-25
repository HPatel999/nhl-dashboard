import { createContext, useContext, useState } from "react";

const TransitionContext = createContext();

export function TransitionProvider({ children }) {
  const [transitionData, setTransitionData] = useState(null);

  const showTransition = (data) => setTransitionData(data);
  const hideTransition = () => setTransitionData(null);

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
