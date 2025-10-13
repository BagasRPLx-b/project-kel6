import React from "react";
import { motion } from "framer-motion";

const ProjectsSection = ({ projects }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

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
      className="grid grid-cols-1 md:grid-cols-3 gap-8"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {projects.map((project, idx) => (
        <motion.div
          key={idx}
          variants={cardVariants}
          whileHover="hover"
          className="relative group"
        >
          <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl overflow-hidden shadow-2xl border border-white/10 hover:border-purple-500/50 transition-all duration-500 h-full p-6">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-md group-hover:blur-lg"></div>
            <div className="absolute inset-[2px] bg-gray-900 rounded-3xl z-10"></div>

            <div className="relative z-20 h-full flex flex-col">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-4">
                <project.icon className="text-2xl text-white" />
              </div>
              
              <h3 className="text-xl font-bold mb-3 group-hover:text-purple-400 transition-colors duration-300">
                {project.name}
              </h3>
              
              <p className="text-gray-400 text-sm mb-4 flex-grow">
                {project.description}
              </p>

              <div className="space-y-2">
                {project.features.map((feature, featureIdx) => (
                  <div key={featureIdx} className="flex items-center gap-2 text-sm text-gray-300">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    {feature}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default ProjectsSection;