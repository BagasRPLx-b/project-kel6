import React from "react";
import Navbar from "../Components/Navbar";
import { FaInstagram } from "react-icons/fa";
import FP from "../assets/FP.jpg";
import pp from "../assets/pp.jpg";
import btf from "../assets/btf.jpg";
import cat from "../assets/cat.jpg";
import shop from "../assets/shop.jpg";
import cat2 from "../assets/cat2.jpg";
import city from "../assets/city.jpg";

const team = [
  { name: "Bagas Aditya", role: "Coder", img: FP, ig: "https://instagram.com/bagass_adt" },
  { name: "Naufal Maulana", role: "Coder", img: FP, ig: "https://instagram.com/nvlmlnaa" },
  { name: "Purwa Rizki", role: "Coder", img: FP, ig: "https://instagram.com/daysunday271" },
  { name: "Shofiyatuzzahra", role: "Coder", img: FP, ig: "https://instagram.com/shfyzhra" },
];

const AboutUs = () => {

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white relative">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative rounded-3xl overflow-hidden mx-4 my-8 shadow-2xl flex items-center justify-center text-center">
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent z-10"></div>
        <img
          src= {btf}
          alt="About Us Hero"
          className="w-full h-96 object-cover"
        />
        <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-white p-8 md:p-16">
          <h1 className="text-5xl md:text-6xl font-black mb-4 bg-gradient-to-r from-blue-400 to-pink-500 bg-clip-text text-transparent animate-pulse">
            Meet Our Team
          </h1>
          <p className="text-xl md:text-2xl mb-6 text-gray-200 font-light max-w-2xl">
            Explore the talented individuals behind our project. Connect with us directly on Instagram.
          </p>
        </div>
      </section>

      {/* Team Grid */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-12">
        {team.map((member, idx) => (
          <div
            key={idx}
            className="relative group bg-gray-800 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 cursor-pointer"
          >
            <img
              src={member.img}
              alt={member.name}
              className="w-full h-64 object-cover group-hover:brightness-75 transition-all duration-500"
            />
            <div className="absolute inset-0 flex flex-col justify-end p-4 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
              <h3 className="text-xl font-bold">{member.name}</h3>
              <p className="text-sm text-gray-300 mb-2">{member.role}</p>
              <a
                href={member.ig}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-pink-500 font-semibold hover:text-pink-400"
              >
                <FaInstagram /> Instagram
              </a>
            </div>
            <div className="absolute top-4 right-4 w-4 h-4 rounded-full bg-pink-500 animate-ping"></div>
          </div>
        ))}
      </div>

      {/* Futuristic Bottom Section */}
      <section className="bg-gradient-to-tr from-purple-800 to-blue-900 p-12 text-center rounded-3xl mx-6 shadow-2xl">
        <h2 className="text-4xl font-black mb-6 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent animate-pulse">
          Our Vision
        </h2>
        <p className="text-gray-200 text-lg max-w-3xl mx-auto mb-8">
          We aim to create the most immersive gaming experience by combining cutting-edge technology and creativity. Our team works passionately to bring innovative solutions to life.
        </p>
        <a
          href="mailto:contact@company.com"
          className="inline-block px-8 py-4 bg-gradient-to-r from-green-500 to-blue-600 rounded-2xl text-white font-semibold hover:from-green-600 hover:to-blue-700 transition-all duration-300"
        >
          Contact Us
        </a>
      </section>
    </div>
  );
};

export default AboutUs;
