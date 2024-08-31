import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuthContext } from '../hooks/useAuthContext';

const Dashboard = () => {
  const [candidates, setCandidates] = useState([]);
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const response = await axios.get('/api/admin/candidates', {
          headers: {
            'Content-Type': 'application/json',
            'x-auth-token': user.token,
          },
        });
        setCandidates(response.data);
      } catch (error) {
        console.error('Error fetching candidates:', error);
      }
    };
    fetchCandidates();
  }, [user]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-gradient-to-br mt-12 from-indigo-100 via-purple-100 to-pink-100 p-8 pt-24"
    >
      <motion.h1
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-5xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 mb-16"
      >
        Candidate Dashboard
      </motion.h1>
      <AnimatePresence>
        {candidates.map((candidate, index) => (
          <motion.div
            key={candidate._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white bg-opacity-80 p-6 rounded-xl shadow-lg space-y-6 mb-8 backdrop-blur-sm hover:shadow-xl transition-all duration-300"
          >
            <motion.div 
              className="flex justify-between items-center"
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 300, damping: 10 }}
            >
              <Link to={`/candidate/${candidate._id}`}>
                <h2 className="text-3xl font-bold text-indigo-700 hover:text-purple-700 transition-colors duration-300">
                  {candidate.name}
                </h2>
              </Link>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
              {candidate.assignedTo.map((assignment, idx) => (
                <motion.div
                  key={idx}
                  className="bg-gradient-to-br from-indigo-100 to-purple-100 p-5 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: idx * 0.1 }}
                >
                  <div>
                    <Link to={`/expert/${assignment.expert._id}`}>
                      <h3 className="text-xl font-semibold text-indigo-700 hover:text-purple-700 transition-colors duration-300 mb-2">
                        {assignment.expert.name}
                      </h3>
                    </Link>
                    <p className="text-gray-600">{assignment.expert.subject}</p>
                  </div>
                  <motion.p 
                    className="text-lg font-medium text-indigo-600 mt-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    Relevancy Score: {(assignment.score * 100).toFixed(0)}%
                  </motion.p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
};

export default Dashboard;