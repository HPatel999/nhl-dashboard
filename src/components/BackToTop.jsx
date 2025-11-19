import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function BackToTop({ primaryColor = "#000", textColor = "#fff" }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="
            fixed bottom-6 right-6 z-50 
            px-5 py-2 rounded-full shadow-lg font-medium
            backdrop-blur-md
          "
          style={{
            backgroundColor: primaryColor,
            color: textColor,
          }}
        >
          Back to top ↑
        </motion.button>
      )}
    </AnimatePresence>
  );
}
