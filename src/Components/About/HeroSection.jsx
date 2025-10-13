import React from "react";
import { motion } from "framer-motion";

const HeroSection = ({ onOpenModal }) => {
  return (
    <section className="relative rounded-3xl overflow-hidden mx-4 my-8 shadow-2xl flex items-center justify-center text-center min-h-[60vh]">
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-purple-900/50 to-black/70 z-10"></div>
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-fixed"
        style={{ backgroundImage: `url(https://images.alphacoders.com/988/988021.jpg)` }}
      ></div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-20 flex flex-col justify-center items-center text-white p-8 md:p-16 max-w-6xl mx-auto"
      >
        <motion.h1
          initial={{ scale: 0.5 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-500 bg-clip-text text-transparent"
        >
          Built With Passion
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-xl md:text-2xl mb-8 text-gray-200 font-light max-w-3xl leading-relaxed"
        >
          Sebuah platform gaming discovery yang dikembangkan dengan dedikasi penuh oleh seorang developer. 
          Menghadirkan pengalaman terbaik untuk menjelajahi dunia game.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="flex gap-4"
        >
          <button
            onClick={onOpenModal}
            className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl text-white font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            About the Developer
          </button>
          <a
            href="#projects"
            className="px-8 py-3 bg-transparent border-2 border-white/30 rounded-2xl text-white font-semibold hover:bg-white/10 transition-all duration-300"
          >
            View Projects
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;