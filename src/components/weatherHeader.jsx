import { Cloud } from "lucide-react";
import { motion } from "framer-motion";

const WeatherHeader = () => {
  return (
    <motion.h1
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="cursor-default text-4xl font-bold text-white tracking-wide flex items-center justify-center gap-3 mb-12"
    >
      <motion.span
        animate={{ y: [0, -5, 0] }}
        transition={{
          repeat: Infinity,
          duration: 1.5,
          ease: "easeInOut",
        }}
      >
        <Cloud className="w-8 h-8 text-blue-400" />
      </motion.span>
      Weather App
    </motion.h1>
  );
};

export default WeatherHeader;
