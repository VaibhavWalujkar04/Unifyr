import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { PlusCircle, User, FileText, BarChart2 } from "lucide-react";
import { motion } from "framer-motion";
import { FaUser, FaChevronDown, FaChevronUp } from "react-icons/fa";

const localizer = momentLocalizer(moment);

// Dummy Data for Profile Section
const dummyProfileData = {
  fullName: "John Doe",
  emailAddress: "johndoe@example.com",
  contactNumber: "123-456-7890",
  designation: "Senior Scientist",
  department: "Data Science",
  yearsOfExperience: "4-7 years",
  coreAreasOfExpertise: ["Data Science and AI", "Software Development"],
  technicalSkillsProficiency: ["Python", "Machine Learning", "Data Analysis Tools"],
  relevantCertifications: "Certified Data Scientist, AWS Certified Machine Learning Specialty",
  interviewExperience: "Yes",
  interviewCapacity: "Panel Member",
  publications: "Contributed to multiple research papers on AI and Machine Learning.",
  preferredTimeSlots: "Morning (9 AM - 12 PM)",
  preferredInterviewFormat: "Technical Round",
  preferredInterviewMode: "Online",
  additionalNotes: "Looking forward to contributing to impactful interviews."
};

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
  const [selectedView, setSelectedView] = useState("calendar");
  const [animate, setAnimate] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    contact: true,
    experience: false,
    skills: false,
    publications: false,
    preferences: false
  });

  useEffect(() => {
    setAnimate(true);
  }, []);

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const renderProfileSection = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: animate ? 1 : 0, y: animate ? 0 : 20 }}
      transition={{ duration: 0.5 }}
      className="bg-white p-6 rounded-xl shadow-lg border border-gray-300"
    >
      <div className="flex items-center mb-6">
        <img
          src="https://via.placeholder.com/100"
          alt="User Avatar"
          className="w-24 h-24 rounded-full mr-4"
        />
        <div>
          <h2 className="text-3xl font-bold text-gray-800">{dummyProfileData.fullName}</h2>
          <p className="text-gray-600">{dummyProfileData.designation} - {dummyProfileData.department}</p>
        </div>
      </div>
      <div className="space-y-4">
        {Object.entries(dummyProfileData).map(([key, value], index) => (
          key !== 'fullName' && key !== 'designation' && key !== 'department' && (
            <div key={index} className="border rounded-lg p-4 bg-gray-50 shadow-sm">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-700 capitalize">
                  {key.replace(/([A-Z])/g, ' $1')}
                </h3>
                <button
                  onClick={() => toggleSection(key)}
                  className="focus:outline-none"
                >
                  {expandedSections[key] ? <FaChevronUp /> : <FaChevronDown />}
                </button>
              </div>
              {expandedSections[key] && (
                <p className="mt-2 text-gray-600">
                  {Array.isArray(value) ? value.join(', ') : value}
                </p>
              )}
            </div>
          )
        ))}
      </div>
    </motion.div>
  );

  const renderView = () => {
    switch (selectedView) {
      case "calendar":
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
      case "candidates":
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
      case "resumes":
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
      case "analytics":
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: animate ? 1 : 0, y: animate ? 0 : 20 }}
            transition={{ duration: 0.5 }}
            className="bg-white p-6 rounded-xl shadow-lg border border-gray-300"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Analytics Dashboard</h2>
            <p>Analytics functionality coming soon...</p>
          </motion.div>
        );
      case "profile":
        return renderProfileSection();
      default:
        return null;
    }
  };

  return (
    <div className="bg-gradient-to-br mt-20 from-indigo-500 via-purple-500 to-pink-500 min-h-screen flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg p-4">
        <div className="flex flex-col space-y-4">
          <button
            onClick={() => setSelectedView("profile")}
            className={`px-4 py-2 rounded-full text-gray-800 font-bold flex items-center gap-2 transition-transform transform hover:scale-105 ${selectedView === "profile" ? "bg-indigo-600 text-white shadow-lg" : "bg-gray-200"}`}
          >
            <FaUser size={20} /> Profile
          </button>
          <button
            onClick={() => setSelectedView("calendar")}
            className={`px-4 py-2 rounded-full text-gray-800 font-bold flex items-center gap-2 transition-transform transform hover:scale-105 ${selectedView === "calendar" ? "bg-indigo-600 text-white shadow-lg" : "bg-gray-200"}`}
          >
            <PlusCircle size={20} /> Calendar
          </button>
          <button
            onClick={() => setSelectedView("candidates")}
            className={`px-4 py-2 rounded-full text-gray-800 font-bold flex items-center gap-2 transition-transform transform hover:scale-105 ${selectedView === "candidates" ? "bg-indigo-600 text-white shadow-lg" : "bg-gray-200"}`}
          >
            <User size={20} /> Candidates
          </button>
          <button
            onClick={() => setSelectedView("resumes")}
            className={`px-4 py-2 rounded-full text-gray-800 font-bold flex items-center gap-2 transition-transform transform hover:scale-105 ${selectedView === "resumes" ? "bg-indigo-600 text-white shadow-lg" : "bg-gray-200"}`}
          >
            <FileText size={20} /> Resumes
          </button>
          <button
            onClick={() => setSelectedView("analytics")}
            className={`px-4 py-2 rounded-full text-gray-800 font-bold flex items-center gap-2 transition-transform transform hover:scale-105 ${selectedView === "analytics" ? "bg-indigo-600 text-white shadow-lg" : "bg-gray-200"}`}
          >
            <BarChart2 size={20} /> Analytics
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-10">
        <h1 className="text-4xl font-bold text-white mb-10">Expert Dashboard</h1>
        {renderView()}
      </div>
    </div>
  );
};

export default ExpertDashboard;
