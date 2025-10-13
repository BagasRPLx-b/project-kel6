import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import HeroSection from "../Components/About/HeroSection";
import StatsSection from "../Components/About/StatsSection";
import ProjectsSection from "../Components/About/ProjectsSection";
import DeveloperCard from "../Components/About/DeveloperCard";
import VisionSection from "../Components/About/VisionSection";
import DeveloperModal from "../Components/About/DeveloperModal";
import {
  FaCode,
  FaGamepad,
  FaUsers,
  FaRocket,
  FaGlobe,
  FaMobile,
} from "react-icons/fa";
import FP from "../assets/fp1.jpeg";

const AboutUs = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const developer = {
    name: "Bagas Aditya",
    role: "Full Stack Developer & UI/UX Designer",
    img: FP,
    bio: "Seorang passionate developer yang mencintai dunia gaming dan teknologi. Membangun platform ini dengan dedikasi tinggi untuk memberikan pengalaman terbaik bagi para gamer.",
    fullBio: "Saya adalah seorang Full Stack Developer dengan passion yang mendalam dalam menciptakan pengalaman digital yang menarik dan fungsional. Project ini dikembangkan dengan React, Tailwind CSS, dan berbagai teknologi modern lainnya untuk memberikan pengalaman browsing game yang smooth dan menyenangkan.",
    skills: ["React", "JavaScript", "Tailwind CSS", "Node.js", "UI/UX Design", "API Integration", "Responsive Design"],
    social: {
      instagram: "https://instagram.com/bagass_adt",
      github: "https://github.com/bagas-aditya",
      linkedin: "https://linkedin.com/in/bagas-aditya",
      email: "mailto:bagas@example.com"
    }
  };

  const projects = [
    {
      name: "Game Discovery Platform",
      description: "Platform lengkap untuk menemukan dan mengeksplorasi berbagai game dari seluruh dunia",
      icon: FaGamepad,
      features: ["Search & Filter", "Game Details", "Responsive Design"]
    },
    {
      name: "Store Directory",
      description: "Direktori toko game digital dan fisik dengan informasi lengkap",
      icon: FaGlobe,
      features: ["Store Listings", "Website Integration", "Category Filter"]
    },
    {
      name: "User Experience",
      description: "Desain yang intuitif dan pengalaman pengguna yang smooth di semua device",
      icon: FaMobile,
      features: ["Mobile First", "Dark Mode", "Smooth Animations"]
    }
  ];

  const stats = [
    {
      icon: FaCode,
      value: "15K+",
      label: "Lines of Code",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: FaGamepad,
      value: "500+",
      label: "Games Integrated",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: FaUsers,
      value: "1",
      label: "Dedicated Developer",
      color: "from-green-500 to-teal-500",
    },
    {
      icon: FaRocket,
      value: "2024",
      label: "Project Launch",
      color: "from-orange-500 to-red-500",
    },
  ];

  const vision = "Saya percaya bahwa teknologi dan gaming dapat menyatukan orang-orang dari berbagai belahan dunia. Melalui platform ini, saya berharap dapat membantu gamers menemukan pengalaman gaming terbaik sambil terus belajar dan berinovasi dalam pengembangan software.";

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

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl"></div>
      </div>

      <Navbar />

      <HeroSection onOpenModal={openModal} />

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-6 mb-16">
        <StatsSection stats={stats} />
      </section>

      {/* Projects Section */}
      <section id="projects" className="max-w-7xl mx-auto px-6 mb-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Beberapa fitur utama yang dikembangkan dalam platform ini
          </p>
        </div>
        <ProjectsSection projects={projects} />
      </section>

      {/* Developer Section */}
      <section className="max-w-4xl mx-auto px-6 mb-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
            The Developer
          </h2>
          <p className="text-gray-400 text-lg">
            Dibangun dengan passion oleh seorang developer
          </p>
        </div>
        <DeveloperCard developer={developer} onOpenModal={openModal} />
      </section>

      <VisionSection vision={vision} email={developer.social.email} />

      <DeveloperModal 
        developer={developer} 
        isOpen={isModalOpen} 
        onClose={closeModal} 
      />

      <Footer />
    </div>
  );
};

export default AboutUs;