import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';
import { FaUser, FaGraduationCap, FaBriefcase } from 'react-icons/fa';

const GetStartedExpertForm = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [formData, setFormData] = useState({});
  const [resumeFile, setResumeFile] = useState(null);

  const fadeInScale = useSpring({
    opacity: 1,
    transform: 'scale(1)',
    from: { opacity: 0, transform: 'scale(0.95)' },
    config: { tension: 100, friction: 10, duration: 300 }
  });

  const pages = [
    {
      title: "Professional Information",
      icon: FaUser,
      description: "Please provide your professional details.",
      fields: [
        { label: "Full Name", name: "fullName", type: "text" },
        { label: "Email Address", name: "emailAddress", type: "email" },
        { label: "Contact Number", name: "contactNumber", type: "text" },
        {
          label: "Designation/Current Position",
          name: "designation",
          type: "dropdown",
          options: ["Senior Scientist", "Principal Engineer", "Research Director"]
        },
        {
          label: "Department/Division",
          name: "department",
          type: "dropdown",
          options: ["Electronics", "Cybersecurity", "Mechanical Engineering", "Data Science"]
        },
        {
          label: "Years of Experience in Current Role",
          name: "yearsOfExperience",
          type: "dropdown",
          options: ["1-3 years", "4-7 years", "8+ years"]
        },
        {
          label: "Upload Resume",
          name: "resumeUpload",
          type: "file"
        }
      ]
    },
    {
      title: "Technical Expertise and Experience",
      icon: FaGraduationCap,
      description: "Select your core areas of expertise and technical skills.",
      fields: [
        {
          label: "Core Areas of Expertise",
          name: "coreAreasOfExpertise",
          type: "checkbox",
          options: [
            "Electronics Engineering",
            "Cybersecurity",
            "Mechanical Design",
            "Data Science and AI",
            "Software Development",
            "Robotics",
            "Others"
          ]
        },
        {
          label: "Technical Skills Proficiency",
          name: "technicalSkillsProficiency",
          type: "checkbox",
          options: [
            "Python",
            "MATLAB",
            "CAD Software",
            "Embedded Systems",
            "Machine Learning",
            "Data Analysis Tools",
            "Cybersecurity Protocols",
            "Others"
          ]
        },
        {
          label: "Relevant Certifications",
          name: "relevantCertifications",
          type: "text"
        },
        {
          label: "Interview Experience",
          name: "interviewExperience",
          type: "radio",
          options: ["Yes", "No"]
        },
        {
          label: "If Yes, in what capacity?",
          name: "interviewCapacity",
          type: "text"
        },
        {
          label: "Publications and Research Contributions",
          name: "publications",
          type: "textarea"
        }
      ]
    },
    {
      title: "Availability & Preferences",
      icon: FaBriefcase,
      description: "Provide your availability and preferences for conducting interviews.",
      fields: [
        {
          label: "Preferred Time Slots for Conducting Interviews",
          name: "preferredTimeSlots",
          type: "dropdown",
          options: ["Morning (9 AM - 12 PM)", "Afternoon (1 PM - 4 PM)", "Evening (5 PM - 8 PM)"]
        },
        {
          label: "Preferred Interview Format",
          name: "preferredInterviewFormat",
          type: "radio",
          options: ["Technical Round", "HR Round", "Coding/Practical Round", "Panel Discussion"]
        },
        {
          label: "Preferred Interview Mode",
          name: "preferredInterviewMode",
          type: "radio",
          options: ["Online", "In-person", "Hybrid"]
        },
        {
          label: "Additional Notes/Preferences",
          name: "additionalNotes",
          type: "textarea"
        }
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
    setResumeFile(e.target.files[0]);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData, resumeFile);
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
                handleFileUpload(e);
              }}
              onDragOver={(e) => e.preventDefault()}
            >
              <p className="text-indigo-600">
                Drag & drop your resume here, or click to select a file
              </p>
              <input
                className="hidden"
                type="file"
                name={field.name}
                onChange={handleFileUpload}
              />
            </div>
            {resumeFile && (
              <p className="mt-2 text-green-600">
                Uploaded: {resumeFile.name}
              </p>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-xl mx-auto p-8 bg-white rounded-lg shadow-md mt-20 border-2 border-indigo-100">
      <h2 className="text-2xl font-semibold mb-4 flex items-center text-indigo-700">
        {React.createElement(pages[currentPage].icon, { className: 'mr-2 text-indigo-600' })}
        {pages[currentPage].title}
      </h2>
      <p className="mb-6 text-indigo-600">
        {pages[currentPage].description}
      </p>
      <form onSubmit={handleFormSubmit}>
        <animated.div style={fadeInScale}>
          {pages[currentPage].fields.map((field) => renderField(field))}
        </animated.div>
        <div className="flex justify-between mt-6">
          <button
            type="button"
            onClick={prevPage}
            className={`bg-gray-300 text-indigo-700 py-2 px-4 rounded hover:bg-gray-400 transition-colors duration-300 ${currentPage === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={currentPage === 0}
          >
            Previous
          </button>
          {currentPage < pages.length - 1 ? (
            <button
              type="button"
              onClick={nextPage}
              className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 transition-colors duration-300"
            >
              Next
            </button>
          ) : (
            <button
              type="submit"
              className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition-colors duration-300"
            >
              Submit
            </button>
          )}
        </div>
        <div className="flex justify-center mt-4">
          {pages.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => jumpToPage(index)}
              className={`w-4 h-4 mx-1 rounded-full transition-colors duration-300 ${
                currentPage === index ? 'bg-indigo-600' : 'bg-gray-300 hover:bg-indigo-400'
              }`}
            />
          ))}
        </div>
      </form>
    </div>
  );
};

export default GetStartedExpertForm;