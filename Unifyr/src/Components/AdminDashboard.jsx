import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const demoData = [
  {
    id: 1,
    name: 'John Doe',
    interviewSubject: 'Software Engineering',
    experts: [
      { name: 'Alice Johnson', role: 'Subject Expert' },
      { name: 'Bob Smith', role: 'Subject Expert' },
      { name: 'Clara Lee', role: 'Subject Expert' },
      { name: 'David Brown', role: 'Subject Expert' },
      { name: 'Emma Davis', role: 'Chairperson' },
    ],
  },
  {
    id: 2,
    name: 'Jane Smith',
    interviewSubject: 'Data Science',
    experts: [
      { name: 'George Wilson', role: 'Subject Expert' },
      { name: 'Hannah White', role: 'Subject Expert' },
      { name: 'Ian Black', role: 'Subject Expert' },
      { name: 'Jack Green', role: 'Subject Expert' },
      { name: 'Kelly Blue', role: 'Chairperson' },
    ],
  },
  // Add more candidates as needed
];

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b mt-20 from-gray-50 to-gray-100 p-8">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-12">Candidate Dashboard</h1>
      <div className="space-y-8">
        {demoData.map((candidate, index) => (
          <motion.div
            key={candidate.id}
            className="bg-white p-6 rounded-xl shadow-lg space-y-4"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <div className="flex justify-between items-center">
              <Link to={`/candidate/${candidate.id}`}>
                <h2 className="text-2xl font-semibold text-indigo-600 hover:underline transition-colors duration-300">
                  {candidate.name}
                </h2>
              </Link>
              <p className="text-sm text-gray-500">{candidate.interviewSubject}</p>
            </div>
            <div className="flex space-x-4 overflow-x-auto">
              {candidate.experts.map((expert, idx) => (
                <motion.div
                  key={idx}
                  className="flex-shrink-0 bg-gradient-to-r from-indigo-50 to-purple-50 p-4 rounded-xl shadow-md w-64 hover:shadow-lg transition-shadow duration-300"
                  whileHover={{ scale: 1.05 }}
                >
                  <Link to={`/expert/${expert.name}`}>
                    <h3 className="text-lg font-semibold text-indigo-600 hover:underline">{expert.name}</h3>
                  </Link>
                  <p className="text-gray-500">{expert.role}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
