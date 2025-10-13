import React from "react";
import { motion } from "framer-motion";
import { FaCode } from "react-icons/fa";

const DeveloperCard = ({ developer, onOpenModal }) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.8 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
    hover: {
      y: -10,
      scale: 1.05,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      className="relative group cursor-pointer"
      onClick={onOpenModal}
    >
      <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl overflow-hidden shadow-2xl border border-white/10 hover:border-yellow-500/50 transition-all duration-500">
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-md group-hover:blur-lg"></div>
        <div className="absolute inset-[2px] bg-gray-900 rounded-3xl z-10"></div>

        <div className="relative z-20 flex flex-col md:flex-row items-center p-8">
          <div className="relative mb-6 md:mb-0 md:mr-8">
            <img
              src={developer.img}
              alt={developer.name}
              className="w-32 h-32 md:w-40 md:h-40 rounded-2xl object-cover transform group-hover:scale-110 transition-transform duration-700 border-4 border-yellow-500/20"
            />
            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center border-2 border-gray-900">
              <FaCode className="text-xs text-white" />
            </div>
          </div>

          <div className="flex-1 text-center md:text-left">
            <h3 className="text-2xl font-bold mb-2 group-hover:text-yellow-400 transition-colors duration-300">
              {developer.name}
            </h3>
            <p className="text-yellow-400 font-semibold mb-4">
              {developer.role}
            </p>
            <p className="text-gray-300 mb-6">
              {developer.bio}
            </p>

            <div className="flex flex-wrap gap-2 justify-center md:justify-start">
              {developer.skills.slice(0, 4).map((skill, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-yellow-500/20 text-yellow-300 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
              {developer.skills.length > 4 && (
                <span className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-sm">
                  +{developer.skills.length - 4} more
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default DeveloperCard;