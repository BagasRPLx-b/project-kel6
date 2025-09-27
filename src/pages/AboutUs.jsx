import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import {
  FaInstagram,
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaHeart,
  FaRocket,
  FaLightbulb,
  FaUsers,
  FaCode,
  FaGamepad,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import FP from "../assets/FP.jpg";
import btf from "../assets/btf.jpg";
import Footer from "../Components/Footer";

const team = [
  {
    name: "Bagas Aditya",
    role: "Frontend Specialist",
    img: FP,
    ig: "https://instagram.com/bagass_adt",
    bio: "Mengerjakan bagian Home dan Game Detail, serta fokus pada pengalaman pengguna yang mulus.",
    skills: ["React", "Node.js", "Tailwind"],
  },
  {
    name: "Naufal Maulana",
    role: "Frontend Specialist",
    img: FP,
    ig: "https://instagram.com/nvlmlnaa",
    bio: "Bertanggung jawab pada Store, Profile, serta membantu membuat About Us.",
    skills: ["React", "UI/UX", "Tailwind"],
  },
  {
    name: "Purwa Rizki",
    role: "Backend Engineer",
    img: FP,
    ig: "https://instagram.com/daysunday271",
    bio: "Membantu dalam pembuatan Game Detail dan menambahkan halaman Publisher.",
    skills: ["React", "Python", "Tailwind"],
  },
  {
    name: "Shofiyatuzzahra",
    role: "UI/UX Designer",
    img: FP,
    ig: "https://instagram.com/shfyzhra",
    bio: "Membuat desain untuk Footer dan About Us agar tampilan lebih intuitif dan menarik.",
    skills: ["Figma", "Prototyping", "Design System"],
  },
];

const AboutUs = () => {
  const [activeMember, setActiveMember] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isModalOpen]);

  const openMemberModal = (member) => {
    setActiveMember(member);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setActiveMember(null);
  };

  // Animation variants
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

  const stats = [
    {
      icon: FaCode,
      value: "10K+",
      label: "Lines of Code",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: FaGamepad,
      value: "500+",
      label: "Games Listed",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: FaUsers,
      value: "4",
      label: "Team Members",
      color: "from-green-500 to-teal-500",
    },
    {
      icon: FaRocket,
      value: "2024",
      label: "Project Year",
      color: "from-orange-500 to-red-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl"></div>
      </div>

      {/* Navbar */}
      <Navbar />

      {/* Hero Section dengan Parallax Effect */}
      <section className="relative rounded-3xl overflow-hidden mx-4 my-8 shadow-2xl flex items-center justify-center text-center min-h-[60vh]">
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-purple-900/50 to-black/70 z-10"></div>
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-fixed"
          style={{ backgroundImage: `url(${btf})` }}
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
            Meet The Creators
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-xl md:text-2xl mb-8 text-gray-200 font-light max-w-3xl leading-relaxed"
          >
            We're passionate developers and designers united by our love for
            gaming and technology. Together, we're building the ultimate gaming
            discovery platform.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="flex gap-4"
          >
            <button
              onClick={() =>
                document
                  .getElementById("team-section")
                  .scrollIntoView({ behavior: "smooth" })
              }
              className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl text-white font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Meet The Team
            </button>
            <a
              href="mailto:contact@company.com"
              className="px-8 py-3 bg-transparent border-2 border-white/30 rounded-2xl text-white font-semibold hover:bg-white/10 transition-all duration-300"
            >
              Get In Touch
            </a>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        >
          <div className="animate-bounce">
            <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-1 h-3 bg-white/70 rounded-full mt-2"
              ></motion.div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-6 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 text-center border border-white/10 hover:border-white/20 transition-all duration-300"
            >
              <div
                className={`w-16 h-16 bg-gradient-to-r ${stat.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}
              >
                <stat.icon className="text-2xl text-white" />
              </div>
              <div className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                {stat.value}
              </div>
              <div className="text-gray-400 text-sm mt-2">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Team Section */}
      <section id="team-section" className="max-w-7xl mx-auto px-6 mb-20">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
            Our Dream Team
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Meet the brilliant minds behind this project. Each member brings
            unique skills and passion to create something extraordinary.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {team.map((member, idx) => (
            <motion.div
              key={idx}
              variants={cardVariants}
              whileHover="hover"
              onHoverStart={() => setHoveredCard(idx)}
              onHoverEnd={() => setHoveredCard(null)}
              className="relative group cursor-pointer"
              onClick={() => openMemberModal(member)}
            >
              {/* Main Card */}
              <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl overflow-hidden shadow-2xl border border-white/10 hover:border-purple-500/50 transition-all duration-500 h-full">
                {/* Animated Border */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-md group-hover:blur-lg"></div>
                <div className="absolute inset-[2px] bg-gray-900 rounded-3xl z-10"></div>

                {/* Content */}
                <div className="relative z-20">
                  <div className="relative overflow-hidden">
                    <img
                      src={member.img}
                      alt={member.name}
                      className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <div className="bg-black/50 backdrop-blur-sm rounded-full p-4">
                        <FaUsers className="text-3xl text-white" />
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-1 group-hover:text-purple-400 transition-colors duration-300">
                      {member.name}
                    </h3>
                    <p className="text-purple-400 font-semibold mb-3">
                      {member.role}
                    </p>
                    <p className="text-gray-400 text-sm line-clamp-2">
                      {member.bio}
                    </p>

                    {/* Skills Tags */}
                    <div className="flex flex-wrap gap-2 mt-4">
                      {member.skills.slice(0, 2).map((skill, skillIdx) => (
                        <span
                          key={skillIdx}
                          className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded-full text-xs"
                        >
                          {skill}
                        </span>
                      ))}
                      {member.skills.length > 2 && (
                        <span className="px-2 py-1 bg-gray-700 text-gray-300 rounded-full text-xs">
                          +{member.skills.length - 2}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Social Button */}
                <div className="absolute bottom-4 right-4 z-30">
                  <a
                    href={member.ig}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform duration-300 shadow-lg"
                  >
                    <FaInstagram />
                  </a>
                </div>
              </div>

              {/* Floating Elements */}
              <AnimatePresence>
                {hoveredCard === idx && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                    className="absolute -top-3 -right-3 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center"
                  >
                    <FaHeart className="text-xs text-red-500" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Vision Section */}
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
            Our Vision
          </h2>
          <p className="text-gray-200 text-lg max-w-3xl mx-auto mb-8 leading-relaxed">
            We believe in creating immersive gaming experiences that bring
            people together. Through innovation and passion, we're building a
            platform that helps gamers discover their next favorite adventure
            while connecting with like-minded enthusiasts worldwide.
          </p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <a
              href="mailto:team@gaminghub.com"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-purple-900 rounded-2xl font-bold hover:bg-gray-100 transition-all duration-300 shadow-lg"
            >
              <FaEnvelope />
              Join Our Journey
            </a>
          </motion.div>
        </div>
      </motion.section>

      {/* Member Detail Modal */}
      <AnimatePresence>
        {isModalOpen && activeMember && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl max-w-md w-full mx-auto overflow-hidden border border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <img
                  src={activeMember.img}
                  alt={activeMember.name}
                  className="w-full h-64 object-cover"
                />
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 w-10 h-10 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors duration-300"
                >
                  ×
                </button>
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2">{activeMember.name}</h3>
                <p className="text-purple-400 font-semibold mb-4">
                  {activeMember.role}
                </p>
                <p className="text-gray-300 mb-6">{activeMember.bio}</p>

                <div className="mb-6">
                  <h4 className="font-semibold mb-3 text-gray-400">
                    Skills & Expertise
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {activeMember.skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
                  <a
                    href={activeMember.ig}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl text-white font-semibold hover:from-pink-600 hover:to-purple-700 transition-all duration-300"
                  >
                    <FaInstagram />
                    Connect
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default AboutUs;
