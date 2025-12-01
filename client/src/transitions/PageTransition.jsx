import { motion, AnimatePresence } from "framer-motion";

export default function PageTransition({ data }) {
  if (!data) return null;

  const { name, image, primaryColor, textColor } = data;

  return (
    <AnimatePresence>
      <motion.div
        key="transition"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
        style={{
          background: primaryColor,
          color: textColor,
        }}
      >
        {image && (
          <motion.img
            src={image}
            className="w-56 h-56 mb-10"
            initial={{ x: -300, opacity: 0, scale: 0.8 }}
            animate={{
              x: 0,
              opacity: 1,
              scale: 1,
              transition: { duration: 0.7, ease: "easeOut" },
            }}
            exit={{
              x: 200,
              opacity: 0,
              scale: 0.8,
              transition: { duration: 0.4 },
            }}
          />
        )}

        <motion.h1
          className="text-7xl font-extrabold tracking-wide uppercase"
          initial={{ x: 300, opacity: 0 }}
          animate={{
            x: 0,
            opacity: 1,
            transition: {
              delay: 0.1,
              duration: 0.65,
              ease: "easeOut",
            },
          }}
          exit={{
            x: 150,
            opacity: 0,
            transition: { duration: 0.4 },
          }}
        >
          {name}
        </motion.h1>
        <motion.div
          className="mt-6 flex flex-col items-center"
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: { delay: 0.35, duration: 0.5 },
          }}
        >
          <p className="text-lg font-semibold">Loading..</p>

          <div
            className="mt-3 h-8 w-8 border-4 border-white/40 border-t-white rounded-full animate-spin"
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
