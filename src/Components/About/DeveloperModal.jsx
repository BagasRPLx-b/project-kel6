import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaInstagram, FaGithub, FaLinkedin, FaTimes, FaExternalLinkAlt } from "react-icons/fa";

const DeveloperModal = ({ developer, isOpen, onClose }) => {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Handle escape key press
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-sm overflow-y-auto"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ 
            type: "spring", 
            damping: 25,
            stiffness: 300
          }}
          className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl w-full max-w-5xl mx-auto overflow-hidden border border-white/10 flex flex-col md:flex-row max-h-[95vh] md:max-h-[90vh]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Bagian Foto - Mobile: atas, Desktop: kiri */}
          <div className="relative w-full md:w-2/5 lg:w-1/2 flex-shrink-0">
            <img
              src={developer.img}
              alt={developer.name}
              className="w-full h-48 sm:h-64 md:h-full object-cover"
            />
            {/* Gradient overlay untuk text readability di mobile */}
            <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-gray-900 to-transparent md:hidden"></div>
            
            {/* Close button mobile */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 w-10 h-10 bg-black/70 rounded-full flex items-center justify-center text-white hover:bg-black/90 transition-all duration-300 active:scale-95 md:hidden shadow-lg"
            >
              <FaTimes size={18} />
            </button>

            {/* Name & Role overlay di mobile */}
            <div className="absolute bottom-4 left-4 right-4 md:hidden">
              <h3 className="text-xl font-bold text-white mb-1 truncate">
                {developer.name}
              </h3>
              <p className="text-yellow-400 font-semibold text-sm truncate">
                {developer.role}
              </p>
            </div>
          </div>

          {/* Bagian Konten - Mobile: bawah, Desktop: kanan */}
          <div className="flex-1 flex flex-col relative min-h-0">
            {/* Close button desktop */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-10 h-10 hidden md:flex bg-black/70 rounded-full items-center justify-center text-white hover:bg-black/90 transition-all duration-300 active:scale-95 z-10 shadow-lg"
            >
              <FaTimes />
            </button>

            <div className="p-4 sm:p-6 md:p-8 overflow-y-auto flex-1">
              {/* Header untuk desktop */}
              <div className="hidden md:block mb-6">
                <h3 className="text-2xl lg:text-3xl font-bold mb-2 text-white">
                  {developer.name}
                </h3>
                <p className="text-yellow-400 font-semibold text-lg">
                  {developer.role}
                </p>
              </div>

              {/* Bio Section */}
              <div className="mb-6 md:mb-8">
                <p className="text-gray-300 leading-relaxed text-sm sm:text-base text-justify md:text-left">
                  {developer.fullBio}
                </p>
              </div>

              {/* Skill Section */}
              <div className="mb-6 md:mb-8">
                <h4 className="font-semibold mb-3 md:mb-4 text-gray-400 text-base sm:text-lg text-center md:text-left">
                  Skills & Technologies
                </h4>
                <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                  {developer.skills.map((skill, idx) => (
                    <motion.span
                      key={idx}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: idx * 0.1 }}
                      className="px-3 py-1.5 bg-yellow-500/20 text-yellow-300 rounded-xl text-xs sm:text-sm border border-yellow-500/30 hover:bg-yellow-500/30 transition-colors duration-200"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>

              {/* Social Buttons */}
              <div className="mt-auto">
                <h4 className="font-semibold mb-3 text-gray-400 text-base text-center md:text-left md:hidden">
                  Connect with me
                </h4>
                <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
                  <motion.a
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    href={developer.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl text-white font-semibold text-sm hover:from-pink-600 hover:to-purple-700 transition-all duration-300 active:scale-95 flex-1 sm:flex-none min-w-0"
                  >
                    <FaInstagram className="flex-shrink-0" />
                    <span className="truncate">Instagram</span>
                    <FaExternalLinkAlt size={10} className="flex-shrink-0 opacity-70" />
                  </motion.a>
                  
                  <motion.a
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    href={developer.social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-700 rounded-xl text-white font-semibold text-sm hover:bg-gray-600 transition-all duration-300 active:scale-95 flex-1 sm:flex-none min-w-0"
                  >
                    <FaGithub className="flex-shrink-0" />
                    <span className="truncate">GitHub</span>
                    <FaExternalLinkAlt size={10} className="flex-shrink-0 opacity-70" />
                  </motion.a>
                  
                  <motion.a
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    href={developer.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 rounded-xl text-white font-semibold text-sm hover:bg-blue-700 transition-all duration-300 active:scale-95 flex-1 sm:flex-none min-w-0"
                  >
                    <FaLinkedin className="flex-shrink-0" />
                    <span className="truncate">LinkedIn</span>
                    <FaExternalLinkAlt size={10} className="flex-shrink-0 opacity-70" />
                  </motion.a>
                </div>
              </div>

              {/* Swipe hint untuk mobile */}
              <div className="mt-4 md:hidden">
                <p className="text-gray-500 text-xs text-center">
                  👆 Scroll untuk melihat lebih banyak
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Close hint untuk mobile */}
        <div className="mt-4 md:hidden">
          <p className="text-gray-400 text-sm text-center">
            Tap di luar modal untuk menutup
          </p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default DeveloperModal;