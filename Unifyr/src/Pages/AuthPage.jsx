import React, { useState } from "react";
import { motion } from "framer-motion";

const roles = ["Expert", "Candidate"];

const AuthPage = () => {
  const [activeRole, setActiveRole] = useState("Expert");
  const [isLogin, setIsLogin] = useState(true);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const renderForm = () => (
    <motion.form
      className="space-y-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="space-y-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
          <input
            type="email"
            className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
          <input
            type="password"
            className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
            required
          />
        </div>
        {!isLogin && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
            <input
              type="password"
              className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
              required
            />
          </motion.div>
        )}
      </motion.div>
      <motion.div
        className="flex items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <input
          id="terms"
          name="terms"
          type="checkbox"
          className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded transition-all duration-300"
          checked={acceptedTerms}
          onChange={(e) => setAcceptedTerms(e.target.checked)}
          required
        />
        <label htmlFor="terms" className="ml-3 block text-sm text-gray-900">
          I agree to the <a href="#" className="text-blue-600 hover:text-blue-500 transition-colors duration-300">Terms and Conditions</a>
        </label>
      </motion.div>
      <motion.button
        type="submit"
        className={`w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 shadow-lg hover:shadow-xl ${
          acceptedTerms
            ? "bg-blue-600 hover:bg-blue-700"
            : "bg-gray-300 text-black cursor-not-allowed"
        }`}
        style={acceptedTerms ? {background: "linear-gradient(to right, #3b82f6, #6366f1, #8b5cf6)"} : {}}
        disabled={!acceptedTerms}
        whileHover={acceptedTerms ? { scale: 1.05 } : {}}
        whileTap={acceptedTerms ? { scale: 0.95 } : {}}
        initial={{ opacity: 0 }}
        animate={{ opacity: 2 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        {isLogin ? "Log In" : "Sign Up"}
      </motion.button>
    </motion.form>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-400 to-purple-500 p-8">
      <motion.div
        className="max-w-md w-full bg-white p-12 rounded-xl shadow-lg space-y-8"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="flex justify-center space-x-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {roles.map((role) => (
            <motion.button
              key={role}
              onClick={() => setActiveRole(role)}
              className={`px-6 py-2 w-96 rounded-full text-sm font-medium transition-all duration-300 ${
                activeRole === role
                  ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {role}
            </motion.button>
          ))}
        </motion.div>
        <motion.div
          className="text-center space-y-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-gray-800">
            {activeRole} {isLogin ? "Login" : "Sign Up"}
          </h2>
          <p className="text-sm text-gray-500">
            {isLogin
              ? "Welcome back! Please log in to your account."
              : "Create a new account for " + activeRole + "."}
          </p>
        </motion.div>
        {renderForm()}
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-indigo-600 hover:underline hover:text-indigo-800 text-sm font-medium transition-colors duration-300"
          >
            {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Log In"}
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AuthPage;