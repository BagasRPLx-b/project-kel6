import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaUser, FaLock, FaEye, FaEyeSlash, FaGamepad } from "react-icons/fa";

const Login = ({ onLogin }) => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: ""
  });

  // Check if user is already logged in
  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser");
    if (currentUser) {
      console.log('User already logged in, redirecting...');
      navigate("/");
    }
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDummyLogin = () => {
    console.log('Dummy login triggered');
    
    const dummyUser = {
      id: 1,
      username: "dummy_user",
      name: "Dummy User",
      avatar: "https://i.pravatar.cc/300?img=5",
      bio: "I'm a dummy user for testing purposes",
      favoriteGenre: "Action",
      level: 1,
      experience: 0,
      stats: {
        gamesPlayed: 0,
        achievements: 0,
        hoursPlayed: 0,
        favoriteGame: "None"
      },
      badges: ["Beginner"]
    };

    // Save to localStorage
    localStorage.setItem("currentUser", JSON.stringify(dummyUser));
    
    // Initialize storage if not exists
    if (!localStorage.getItem("userComments")) {
      localStorage.setItem("userComments", JSON.stringify([]));
    }
    if (!localStorage.getItem("users")) {
      localStorage.setItem("users", JSON.stringify([]));
    }

    console.log('Dummy user saved, calling onLogin callback');
    
    // Call the callback from App.jsx
    if (onLogin) {
      onLogin();
    } else {
      // Fallback: navigate directly
      navigate("/");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    
    if (isLogin) {
      // Login logic
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const user = users.find(u => 
        u.username === formData.username && u.password === formData.password
      );

      if (user) {
        console.log('Login successful for user:', user.username);
        // Remove password from user object before saving
        const { password, ...userWithoutPassword } = user;
        localStorage.setItem("currentUser", JSON.stringify(userWithoutPassword));
        
        // Call the callback from App.jsx
        if (onLogin) {
          onLogin();
        } else {
          // Fallback: navigate directly
          navigate("/");
        }
      } else {
        console.log('Login failed: invalid credentials');
        alert("Invalid username or password");
      }
    } else {
      // Register logic
      if (formData.password !== formData.confirmPassword) {
        alert("Passwords don't match");
        return;
      }

      if (formData.password.length < 3) {
        alert("Password must be at least 3 characters long");
        return;
      }

      const users = JSON.parse(localStorage.getItem("users") || "[]");
      
      if (users.find(u => u.username === formData.username)) {
        alert("Username already exists");
        return;
      }

      const newUser = {
        id: Date.now(),
        username: formData.username,
        password: formData.password,
        name: formData.username,
        avatar: `https://i.pravatar.cc/300?img=${Math.floor(Math.random() * 70)}`,
        bio: "New gaming enthusiast",
        favoriteGenre: "Action",
        level: 1,
        experience: 0,
        stats: {
          gamesPlayed: 0,
          achievements: 0,
          hoursPlayed: 0,
          favoriteGame: "None"
        },
        badges: ["Beginner"]
      };

      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));
      
      console.log('Registration successful for user:', newUser.username);
      
      // Auto-fill login form and switch to login
      setFormData({
        username: formData.username,
        password: formData.password,
        confirmPassword: ""
      });
      setIsLogin(true);
      alert("Registration successful! You can now login.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-8 w-full max-w-md border border-white/20"
      >
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4"
          >
            <FaGamepad className="text-white text-3xl" />
          </motion.div>
          <h1 className="text-3xl font-bold text-white mb-2">
            {isLogin ? "Welcome Back" : "Create Account"}
          </h1>
          <p className="text-white/70">
            {isLogin ? "Sign in to continue your gaming journey" : "Join our gaming community"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="relative">
              <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60" />
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                placeholder="Username"
                className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
                minLength={3}
              />
            </div>

            <div className="relative">
              <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Password"
                className="w-full pl-12 pr-12 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
                minLength={3}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            {!isLogin && (
              <div className="relative">
                <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60" />
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Confirm Password"
                  className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                  minLength={3}
                />
              </div>
            )}
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg"
          >
            {isLogin ? "Sign In" : "Create Account"}
          </motion.button>
        </form>

        <div className="mt-6">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleDummyLogin}
            className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-300 shadow-lg mb-4"
          >
            Login with Dummy Account
          </motion.button>
        </div>

        <div className="text-center mt-6">
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setFormData({
                username: "",
                password: "",
                confirmPassword: ""
              });
            }}
            className="text-white/70 hover:text-white transition-colors"
          >
            {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
          </button>
        </div>

        {/* Debug Info */}
        <div className="mt-4 p-3 bg-black/20 rounded-lg">
          <p className="text-white/50 text-xs">Test Account: username: test, password: test</p>
          <p className="text-white/50 text-xs">Or use Dummy Account button</p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;