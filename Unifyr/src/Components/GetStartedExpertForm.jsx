import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';
import { FaUser, FaGraduationCap, FaBriefcase, FaHeart, FaInfoCircle, FaFileAlt } from 'react-icons/fa';

const GetStartedExpertForm = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [formData, setFormData] = useState({});

  const fadeInScale = useSpring({
    opacity: 1,
    transform: 'scale(1)',
    from: { opacity: 0, transform: 'scale(0.95)' },
    config: { tension: 100, friction: 10, duration: 300 }
  });

  const pages = [
    { 
      title: "Personal Information", 
      icon: FaUser, 
      description: "Please provide your personal details.", 
      fields: [
        "fullName", "designation", "department", "workLocation", "employeeID", "contactNumber", 
        "email", "linkedinProfile", "yearsOfExperienceInDRDO"
      ] 
    },
    { 
      title: "Areas of Expertise", 
      icon: FaGraduationCap, 
      description: "Select the relevant areas that apply to you.", 
      fields: [
        "aerospaceEngineering", "electronicsAndCommunication", "mechanicalEngineering", "computerScienceAndIT", 
        "materialScience", "chemicalEngineering", "defenseResearch", "roboticsAndAutomation", "cybersecurity", 
        "aiAndMachineLearning", "navalSystems", "radarSystems", "missileTechnology", "nuclearTechnology", "otherExpertise"
      ] 
    },
    { 
      title: "Interviewing Experience", 
      icon: FaBriefcase, 
      description: "Share your interviewing experience.", 
      fields: [
        "totalYearsOfInterviewingExperience", "previousExperienceAsPanelist", "typesOfInterviewsConducted", 
        "numberOfInterviewsConducted"
      ] 
    },
    { 
      title: "Education & Certifications", 
      icon: FaFileAlt, 
      description: "Detail your education and certifications.", 
      fields: [
        "highestDegree", "relevantCertifications", "specializedTraining"
      ] 
    },
    { 
      title: "Key Skills & Competencies", 
      icon: FaHeart, 
      description: "Select the skills relevant to your expertise.", 
      fields: [
        "projectManagement", "researchAndDevelopment", "leadershipAndTeamManagement", "strategicPlanning", 
        "problemSolving", "technicalWriting", "innovationAndDesignThinking", "otherSkills"
      ] 
    },
    { 
      title: "Availability", 
      icon: FaInfoCircle, 
      description: "Provide your availability for conducting interviews.", 
      fields: [
        "preferredDays", "preferredTimeSlots", "willingnessToTravel"
      ] 
    },
    { 
      title: "Security Clearance", 
      icon: FaInfoCircle, 
      description: "Indicate your security clearance status.", 
      fields: [
        "hasSecurityClearance", "levelOfClearance"
      ] 
    },
    { 
      title: "Languages Spoken", 
      icon: FaInfoCircle, 
      description: "Specify the languages you speak.", 
      fields: [
        "primaryLanguage", "otherLanguages"
      ] 
    },
    { 
      title: "Preferences & Matching Criteria", 
      icon: FaInfoCircle, 
      description: "Provide your preferences and matching criteria.", 
      fields: [
        "preferredTypesOfPosts", "preferenceForIntervieweeSkillLevel", "additionalMatchingCriteria"
      ] 
    },
    { 
      title: "Additional Information", 
      icon: FaFileAlt, 
      description: "Provide any additional information.", 
      fields: [
        "professionalAchievements", "publications", "contributionsToDRDOProjects", "additionalNotes"
      ] 
    },
    { 
      title: "Agreement & Consent", 
      icon: FaInfoCircle, 
      description: "Read and agree to the terms.", 
      fields: [
        "agreementConsent", "profileConsent"
      ] 
    }
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const nextPage = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const jumpToPage = (index) => {
    setCurrentPage(index);
  };

  const capitalizeLabel = (label) => {
    return label
      .split(/(?=[A-Z])/)
      .join(" ")
      .replace(/^\w/, (c) => c.toUpperCase());
  };

  const renderField = (field) => {
    const label = capitalizeLabel(field);
    
    if (pages[currentPage].title === "Areas of Expertise" || pages[currentPage].title === "Key Skills & Competencies") {
      return (
        <div key={field} className="mb-4">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              name={field}
              checked={formData[field] || false}
              onChange={handleInputChange}
              className="form-checkbox text-indigo-600 transition duration-150 ease-in-out"
            />
            <span className="ml-2">{label}</span>
          </label>
        </div>
      );
    } else {
      return (
        <div key={field} className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            {label}
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-indigo-500"
            type="text"
            name={field}
            value={formData[field] || ""}
            onChange={handleInputChange}
          />
        </div>
      );
    }
  };

  const IconComponent = pages[currentPage].icon;

  return (
    <div className="min-h-screen flex ">
      {/* Sidebar */}
      <div className="w-1/4 bg-gray-100 p-4 mt-20 border-r border-gray-200">
        <ul className="space-y-4">
          {pages.map((page, index) => (
            <li 
              key={index} 
              className={`flex items-center p-2 cursor-pointer rounded-lg ${
                currentPage === index ? 'bg-indigo-600 text-white' : 'text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => jumpToPage(index)}
            >
              <page.icon className="mr-2" />
              <span>{page.title}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Form Content */}
      <div className="flex-1 flex items-center justify-center px-4 py-10">
        <animated.div style={fadeInScale} className="bg-white shadow-2xl mt-24 rounded-lg p-8 max-w-2xl w-full border border-gray-200 relative">
          {/* Progress Indicator */}
          <div className="mb-4 top-4 left-4 text-sm text-gray-500">
            Step {currentPage + 1} of {pages.length}
          </div>

          {/* Page Title with Icon */}
          <div className="flex items-center mb-6">
            <IconComponent className="text-3xl text-indigo-600 mr-3" />
            <h2 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
              {pages[currentPage].title}
            </h2>
          </div>

          {/* Description */}
          <p className="text-gray-500 mb-6">{pages[currentPage].description}</p>

          {/* Form Fields */}
          <form className="space-y-4" onSubmit={handleFormSubmit}>
            {pages[currentPage].fields.map(renderField)}
            <div className="flex justify-between mt-8">
              <AnimatedButton onClick={prevPage} disabled={currentPage === 0}>
                Previous
              </AnimatedButton>
              <AnimatedButton
                primary
                onClick={nextPage}
                disabled={currentPage === pages.length - 1}
                type="button"
              >
                {currentPage === pages.length - 1 ? "Submit" : "Next"}
              </AnimatedButton>
            </div>
          </form>
        </animated.div>
      </div>
    </div>
  );
};

const AnimatedButton = ({ children, primary, onClick, disabled, type }) => {
  const [isHovered, setIsHovered] = useState(false);
  const spring = useSpring({
    transform: isHovered && !disabled ? 'scale(1.05)' : 'scale(1)',
    boxShadow: isHovered && !disabled ? '0 12px 20px -5px rgba(0, 0, 0, 0.2)' : '0 6px 10px -5px rgba(0, 0, 0, 0.1)',
    config: { tension: 300, friction: 20 },
  });

  const baseClasses = `py-2 px-5 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`;
  const colorClasses = primary
    ? 'text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700'
    : 'text-indigo-600 bg-white border border-indigo-600 hover:bg-indigo-50';
  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : '';

  return (
    <animated.button
      style={spring}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      disabled={disabled}
      type={type}
      className={`${baseClasses} ${colorClasses} ${disabledClasses}`}
    >
      {children}
    </animated.button>
  );
};

export default GetStartedExpertForm;
