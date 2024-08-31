import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';
import { FaUser, FaGraduationCap, FaBriefcase } from 'react-icons/fa';

const GetStartedCandidateForm = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [formData, setFormData] = useState({});
  const [certificationsFile, setCertificationsFile] = useState(null);

  const fadeInScale = useSpring({
    opacity: 1,
    transform: 'scale(1)',
    from: { opacity: 0, transform: 'scale(0.95)' },
    config: { tension: 100, friction: 10, duration: 300 }
  });

  const pages = [
    {
      title: "Personal and Contact Information",
      icon: FaUser,
      description: "Please provide your personal and contact details.",
      fields: [
        { label: "Full Name", name: "fullName", type: "text" },
        { label: "Email Address", name: "emailAddress", type: "email" },
        { label: "Contact Number", name: "contactNumber", type: "text" },
        {
          label: "Position Applied For",
          name: "positionAppliedFor",
          type: "dropdown",
          options: ["Research Scientist", "Software Engineer", "Mechanical Designer", "Others"]
        },
        {
          label: "Current Employment Status",
          name: "employmentStatus",
          type: "dropdown",
          options: ["Employed", "Unemployed", "Student", "Self-employed"]
        },
        { label: "LinkedIn Profile (Optional)", name: "linkedInProfile", type: "text" }
      ]
    },
    {
      title: "Educational Background & Technical Skills",
      icon: FaGraduationCap,
      description: "Provide details of your educational background and technical skills.",
      fields: [
        {
          label: "Highest Degree Attained",
          name: "highestDegree",
          type: "dropdown",
          options: ["Bachelor's Degree", "Master's Degree", "PhD", "Diploma", "Others"]
        },
        { label: "Field of Study", name: "fieldOfStudy", type: "text" },
        { label: "University/Institution", name: "universityInstitution", type: "text" },
        {
          label: "Technical Skills",
          name: "technicalSkills",
          type: "checkbox",
          options: [
            "Programming Languages (e.g., Python, C++, Java)",
            "CAD Tools (e.g., SolidWorks, AutoCAD)",
            "Data Analysis (e.g., R, MATLAB)",
            "Cybersecurity Tools (e.g., Wireshark, Metasploit)",
            "Others"
          ]
        },
        {
          label: "Certifications (Upload if any)",
          name: "certifications",
          type: "file"
        },
        {
          label: "Notable Academic Projects/Research Work",
          name: "academicProjects",
          type: "textarea"
        }
      ]
    },
    {
      title: "Professional Experience & Preferences",
      icon: FaBriefcase,
      description: "Provide details of your professional experience and interview preferences.",
      fields: [
        { label: "Work Experience", name: "workExperience", type: "textarea" },
        { label: "Key Achievements", name: "keyAchievements", type: "textarea" },
        {
          label: "Preferred Interview Mode",
          name: "preferredInterviewMode",
          type: "radio",
          options: ["Online", "In-person", "Hybrid"]
        },
        {
          label: "Preferred Interview Time",
          name: "preferredInterviewTime",
          type: "dropdown",
          options: ["Morning (9 AM - 12 PM)", "Afternoon (1 PM - 4 PM)", "Evening (5 PM - 8 PM)"]
        },
        { label: "Additional Information", name: "additionalInformation", type: "textarea" }
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

  const handleFileUpload = (e) => {
    setCertificationsFile(e.target.files[0]);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData, certificationsFile);
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

  const renderField = (field) => {
    switch (field.type) {
      case 'text':
      case 'email':
        return (
          <div key={field.name} className="mb-6">
            <label className="block text-indigo-700 text-sm font-bold mb-2">
              {field.label}
            </label>
            <input
              className="shadow appearance-none border-2 border-indigo-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              type={field.type}
              name={field.name}
              value={formData[field.name] || ""}
              onChange={handleInputChange}
            />
          </div>
        );
      case 'dropdown':
        return (
          <div key={field.name} className="mb-6">
            <label className="block text-indigo-700 text-sm font-bold mb-2">
              {field.label}
            </label>
            <select
              className="shadow appearance-none border-2 border-indigo-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              name={field.name}
              value={formData[field.name] || ""}
              onChange={handleInputChange}
            >
              <option value="">Select an option</option>
              {field.options.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        );
      case 'checkbox':
        return (
          <div key={field.name} className="mb-4">
            <label className="block text-indigo-700 text-sm font-bold mb-2">
              {field.label}
            </label>
            {field.options.map((option, index) => (
              <div key={index} className="inline-flex items-center mr-4 mb-2">
                <input
                  type="checkbox"
                  name={option}
                  checked={formData[option] || false}
                  onChange={handleInputChange}
                  className="form-checkbox text-indigo-600 transition duration-150 ease-in-out border-indigo-300"
                />
                <span className="ml-2 text-gray-700">{option}</span>
              </div>
            ))}
          </div>
        );
      case 'radio':
        return (
          <div key={field.name} className="mb-4">
            <label className="block text-indigo-700 text-sm font-bold mb-2">
              {field.label}
            </label>
            {field.options.map((option, index) => (
              <div key={index} className="inline-flex items-center mr-4 mb-2">
                <input
                  type="radio"
                  name={field.name}
                  value={option}
                  checked={formData[field.name] === option}
                  onChange={handleInputChange}
                  className="form-radio text-indigo-600 transition duration-150 ease-in-out border-indigo-300"
                />
                <span className="ml-2 text-gray-700">{option}</span>
              </div>
            ))}
          </div>
        );
      case 'textarea':
        return (
          <div key={field.name} className="mb-6">
            <label className="block text-indigo-700 text-sm font-bold mb-2">
              {field.label}
            </label>
            <textarea
              className="shadow appearance-none border-2 border-indigo-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              name={field.name}
              value={formData[field.name] || ""}
              onChange={handleInputChange}
              rows="4"
            />
          </div>
        );
      case 'file':
        return (
          <div key={field.name} className="mb-6">
            <label className="block text-indigo-700 text-sm font-bold mb-2">
              {field.label}
            </label>
            <div
              className="border-2 border-dashed border-indigo-300 rounded-lg p-4 text-center cursor-pointer hover:border-indigo-500 transition-colors duration-300"
              onDrop={(e) => {
                e.preventDefault();
                setCertificationsFile(e.dataTransfer.files[0]);
              }}
              onDragOver={(e) => e.preventDefault()}
            >
              <input
                type="file"
                name={field.name}
                onChange={handleFileUpload}
                className="hidden"
              />
              {certificationsFile ? (
                <p className="text-sm text-gray-600">
                  {certificationsFile.name}
                </p>
              ) : (
                <p className="text-sm text-indigo-600">
                  Drag and drop a file here or click to select
                </p>
              )}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-24">
      <form
        onSubmit={handleFormSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 border-2 border-indigo-200"
      >
        <div className="flex justify-center mb-8">
          {pages.map((page, index) => (
            <div
              key={index}
              className={`text-center cursor-pointer px-4 ${
                currentPage === index
                  ? "text-indigo-600 font-bold"
                  : "text-indigo-400"
              }`}
              onClick={() => jumpToPage(index)}
            >
              <page.icon className="mx-auto text-2xl" />
              <span>{page.title}</span>
            </div>
          ))}
        </div>

        <animated.div style={fadeInScale}>
          <h2 className="text-xl font-semibold text-indigo-700 mb-4 text-center">
            {pages[currentPage].title}
          </h2>
          <p className="text-gray-600 mb-8 text-center">
            {pages[currentPage].description}
          </p>
          {pages[currentPage].fields.map((field) => renderField(field))}
        </animated.div>

        <div className="flex justify-between mt-8">
          {currentPage > 0 && (
            <button
              type="button"
              onClick={prevPage}
              className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Previous
            </button>
          )}
          {currentPage < pages.length - 1 ? (
            <button
              type="button"
              onClick={nextPage}
              className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-auto"
            >
              Next
            </button>
          ) : (
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-auto"
            >
              Submit
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default GetStartedCandidateForm;
