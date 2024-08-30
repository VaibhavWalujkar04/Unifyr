import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { PlusCircle, User, FileText, BarChart2 } from 'lucide-react';
import { motion } from "framer-motion";

const localizer = momentLocalizer(moment);

// Helper function to check for overlapping events
const getOverlappingEvents = (events, targetEvent) => {
  return events.filter(event => {
    return (
      event.id !== targetEvent.id &&
      moment(event.start).isBefore(targetEvent.end) &&
      moment(targetEvent.start).isBefore(event.end)
    );
  });
};

const events = [
  {
    id: 0,
    title: "Interview with John Doe",
    start: new Date(2024, 8, 1, 10, 0),
    end: new Date(2024, 8, 1, 11, 0),
  },
  {
    id: 1,
    title: "Interview with Jane Smith",
    start: new Date(2024, 8, 1, 10, 30),
    end: new Date(2024, 8, 1, 12, 0),
  },
  {
    id: 2,
    title: "Interview with Jan Smih",
    start: new Date(2024, 8, 1, 11, 0),
    end: new Date(2024, 8, 1, 12, 30),
  },
  {
    id: 3,
    title: "Interview with ahjf Smih",
    start: new Date(2024, 8, 2, 11, 0),
    end: new Date(2024, 8, 2, 12, 30),
  },
  {
    id: 4,
    title: "Interview with ahjf Smih",
    start: new Date(2024, 8, 4, 11, 0),
    end: new Date(2024, 8, 4, 12, 30),
  },
];

const ExpertDashboard = () => {
  const [selectedView, setSelectedView] = useState('calendar');
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  const renderView = () => {
    switch (selectedView) {
      case 'calendar':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: animate ? 1 : 0, y: animate ? 0 : 20 }}
            transition={{ duration: 0.5 }}
            className="bg-white p-6 rounded-xl shadow-lg"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Scheduled Interviews</h2>
            <Calendar
              localizer={localizer}
              events={events}
              startAccessor="start"
              endAccessor="end"
              style={{ height: 500 }}
              eventPropGetter={(event) => {
                const overlappingEvents = getOverlappingEvents(events, event);
                const hasOverlap = overlappingEvents.length > 0;
                const borderColor = hasOverlap
                  ? event.id % 2 === 0
                    ? "darkred"
                    : "firebrick"
                  : "black";
                return {
                  style: {
                    background: hasOverlap
                      ? event.id % 2 === 0
                        ? "red" : "#ff0045"
                        : `linear-gradient(45deg, ${event.id % 2 === 0 ? "#3b82f6" : "#8b5cf6"}, ${event.id % 2 === 0 ? "#60a5fa" : "#a78bfa"})`,
                    color: "white",
                    borderRadius: "5px",
                    border: `2px solid ${borderColor}`,
                    display: "block",
                  },
                };
              }}
              components={{
                event: (props) => (
                  <div>
                    <strong>{props.event.title}</strong>
                    <br />
                    <small>
                      {moment(props.event.start).format('HH:mm')} - {moment(props.event.end).format('HH:mm')}
                      ({moment.duration(moment(props.event.end).diff(props.event.start)).asMinutes()} mins)
                    </small>
                  </div>
                ),
              }}
            />
          </motion.div>
        );
      case 'candidates':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: animate ? 1 : 0, y: animate ? 0 : 20 }}
            transition={{ duration: 0.5 }}
            className="bg-white p-6 rounded-xl shadow-lg border border-gray-300"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Candidate Management</h2>
            <p>Candidate management functionality coming soon...</p>
          </motion.div>
        );
      case 'resumes':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: animate ? 1 : 0, y: animate ? 0 : 20 }}
            transition={{ duration: 0.5 }}
            className="bg-white p-6 rounded-xl shadow-lg border border-gray-300"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Resume Database</h2>
            <p>Resume database functionality coming soon...</p>
          </motion.div>
        );
      case 'analytics':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: animate ? 1 : 0, y: animate ? 0 : 20 }}
            transition={{ duration: 0.5 }}
            className="bg-white p-6 rounded-xl shadow-lg border border-gray-300"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Recruitment Analytics</h2>
            <p>Recruitment analytics functionality coming soon...</p>
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-screen flex bg-gradient-to-r from-blue-400 to-purple-500 pt-20">
        {/* Sidebar */}
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-64 bg-white shadow-lg border border-gray-300"
        >
          <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-800">Expert Dashboard</h1>
          </div>
          <nav className="mt-6">
            {['calendar', 'candidates', 'resumes', 'analytics'].map((view, index) => (
              <motion.a
                key={view}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center py-3 px-6 text-gray-700 hover:bg-gray-100 ${selectedView === view ? 'bg-gray-100' : ''}`}
                href="#"
                onClick={() => setSelectedView(view)}
              >
                {view === 'calendar' && <PlusCircle className="mr-3" size={20} />}
                {view === 'candidates' && <User className="mr-3" size={20} />}
                {view === 'resumes' && <FileText className="mr-3" size={20} />}
                {view === 'analytics' && <BarChart2 className="mr-3" size={20} />}
                {view.charAt(0).toUpperCase() + view.slice(1)}
              </motion.a>
            ))}
          </nav>
        </motion.div>

        {/* Main content */}
        <div className="flex-1 p-10 overflow-y-auto">
          <div className="max-w-4xl mx-auto">
            {renderView()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpertDashboard;
