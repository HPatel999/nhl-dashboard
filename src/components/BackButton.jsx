import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { usePageTransition } from "../transitions/usePageTransition";

export default function BackButton({ transitionData, buttonTextColor = "white" }) {
  const navigate = useNavigate();
  const { showTransition } = usePageTransition();

  const handleBack = () => {
    if (transitionData) {
      showTransition(transitionData);
    }

    setTimeout(() => {
      navigate(-1);
    }, 500);
  };

  return (
    <motion.button
      onClick={handleBack}
      className="absolute top-5 left-5 px-4 py-2 rounded-lg text-lg font-semibold"
      style={{ color: buttonTextColor }}
      whileTap={{ scale: 0.9 }}
    >
      ← Back
    </motion.button>
  );
}
