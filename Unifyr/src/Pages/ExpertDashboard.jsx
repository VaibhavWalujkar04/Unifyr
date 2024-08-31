import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { PlusCircle, User, FileText, BarChart2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
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
      className="bg-white p-6 rounded-xl shadow-md border border-gray-200"
    >
      <div className="flex items-center mb-6">
        <img
          src="https://via.placeholder.com/100"
          alt="User Avatar"
          className="w-24 h-24 rounded-full mr-4 border-4 border-gray-300 shadow-md"
        />
        <div>
          <h2 className="text-3xl font-bold text-gray-800">{dummyProfileData.fullName}</h2>
          <p className="text-gray-600">{dummyProfileData.designation} - {dummyProfileData.department}</p>
        </div>
      </div>
      <div className="space-y-6">
        {Object.entries(dummyProfileData).map(([key, value], index) => (
          key !== 'fullName' && key !== 'designation' && key !== 'department' && (
            <motion.div 
              key={index} 
              className="border rounded-lg p-4 bg-gray-50 shadow-sm hover:bg-gray-100 cursor-pointer"
              onClick={() => toggleSection(key)}
              initial={false}
              animate={{
                backgroundColor: expandedSections[key] ? "#E5E7EB" : "#F9FAFB"
              }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-700 capitalize">
                  {key.replace(/([A-Z])/g, ' $1')}
                </h3>
                <motion.button 
                  className="focus:outline-none"
                  animate={{ rotate: expandedSections[key] ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <FaChevronDown />
                </motion.button>
              </div>
              <AnimatePresence>
                {expandedSections[key] && (
                  <motion.p 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3, ease: "easeIn" }}
                    className="mt-2 text-gray-600 overflow-hidden"
                  >
                    {Array.isArray(value) ? value.join(', ') : value}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>
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
            className="bg-white p-6 rounded-xl shadow-md border border-gray-200"
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
            className="bg-white p-6 rounded-xl shadow-md border border-gray-200"
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
            className="bg-white p-6 rounded-xl shadow-md border border-gray-200"
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
            className="bg-white p-6 rounded-xl shadow-md border border-gray-200"
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

  const sidebarVariants = {
    hidden: { x: -300 },
    visible: { x: 0, transition: { type: "spring", stiffness: 100 } }
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
  };

  return (
    <div className="min-h-screen flex mt-20">
      {/* Sidebar with moving gradient */}
      <motion.div 
        className="w-64 shadow-xl p-6 relative overflow-hidden"
        initial="hidden"
        animate="visible"
        variants={sidebarVariants}
      >
        {/* Moving gradient background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-700 via-purple-800 to-violet-400 animate-gradient-x"></div>
        </div>
        
        {/* Sidebar content */}
        <div className="relative z-10 flex flex-col space-y-6">
          {[
            { view: "profile", icon: FaUser, label: "Profile" },
            { view: "calendar", icon: PlusCircle, label: "Calendar" },
            { view: "candidates", icon: User, label: "Candidates" },
            { view: "resumes", icon: FileText, label: "Resumes" },
            { view: "analytics", icon: BarChart2, label: "Analytics" }
          ].map(({ view, icon: Icon, label }) => (
            <motion.div
              key={view}
              className="relative"
            >
              <motion.button
                onClick={() => setSelectedView(view)}
                className={`w-full px-4 py-3 rounded-xl font-bold flex items-center gap-3 transition-all duration-300 ${
                  selectedView === view
                    ? "text-black"
                    : "text-white hover:bg-black hover:bg-opacity-10"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon size={22} />
                {label}
              </motion.button>
              {selectedView === view && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-green-400 via-green-600 to-green-200 rounded-xl -z-10"
                  layoutId="sidebar-background"
                  initial={false}
                  animate={{ opacity: 1 }}
                  transition={{ type: "spring", stiffness: 100, damping: 30 }}
                />
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Main Content with moving gradient */}
      <motion.div 
        className="flex-1 p-10 relative overflow-hidden"
        initial="hidden"
        animate="visible"
        variants={contentVariants}
      >
        {/* Moving gradient background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-300 via-gray-600 to-gray-400 animate-gradient-x"></div>
        </div>
        
        {/* Main content */}
        <div className="relative z-10">
          <motion.h1 
            className="text-4xl font-bold text-white mb-10"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
          >
            Expert Dashboard
          </motion.h1>
          {renderView()}
        </div>
      </motion.div>
    </div>
  );
};

export default ExpertDashboard;
