import React from "react";
import { motion } from "framer-motion";
import { FaLightbulb, FaEnvelope } from "react-icons/fa";

const VisionSection = ({ vision, email }) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="bg-gradient-to-tr from-purple-800 via-blue-800 to-cyan-900 p-12 text-center rounded-3xl mx-6 shadow-2xl relative overflow-hidden mb-12"
    >
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="relative z-10">
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 0.6, type: "spring" }}
          className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-6"
        >
          <FaLightbulb className="text-3xl text-yellow-400" />
        </motion.div>

        <h2 className="text-4xl font-black mb-6 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
          My Vision
        </h2>
        <p className="text-gray-200 text-lg max-w-3xl mx-auto mb-8 leading-relaxed">
          {vision}
        </p>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <a
            href={email}
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-purple-900 rounded-2xl font-bold hover:bg-gray-100 transition-all duration-300 shadow-lg"
          >
            <FaEnvelope />
            Get In Touch
          </a>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default VisionSection;