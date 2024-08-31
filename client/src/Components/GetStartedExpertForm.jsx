import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';
import { FaUser, FaGraduationCap, FaBriefcase } from 'react-icons/fa';
import TagInput from './TagInput';  // Import the TagInput component
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuthContext } from '../hooks/useAuthContext';


const GetStartedExpertForm = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [formData, setFormData] = useState({});
  const [resumeFile, setResumeFile] = useState(null);

  const [expertiseTags, setExpertiseTags] = useState([]);  // State for Core Areas of Expertise
  const [skillsTags, setSkillsTags] = useState([]);  // State for Technical Skills Proficiency
  const {user} = useAuthContext();

  const fadeInScale = useSpring({
    opacity: 1,
    transform: 'scale(1)',
    from: { opacity: 0, transform: 'scale(0.95)' },
    config: { tension: 100, friction: 10, duration: 300 }
  });

  const navigate = useNavigate();

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
          type: "number"  // Changed from 'dropdown' to 'number'
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
          type: "text",
        },
        {
          label: "Technical Skills Proficiency",
          name: "technicalSkillsProficiency",
          type: "tagInput",
          tags: skillsTags,
          setTags: setSkillsTags,
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

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Include expertiseTags and skillsTags in formData before submission
    const finalFormData = {
      ...formData,
      technicalSkillsProficiency: skillsTags,
      skills: skillsTags.join(', '),
      resumeFile,
      user: user.userId
    };
    console.log(finalFormData);
    try {
      // Send the form data to the backend
      const response = await axios.post('/api/experts', finalFormData, {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': user.token,
        },
      });

      console.log('Form submitted:', response.data);
      alert('Form Successfully Submitted');
      navigate('/');  // Redirect to the home page or any other route
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error submitting form. Please try again.');
    }
  };

  const nextPage = (e) => {
    e.preventDefault();
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
      case 'number':  // Handle number input
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
              className="border-dashed border-2 border-indigo-300 text-center p-4 cursor-pointer"
              onClick={() => document.getElementById(field.name).click()}
            >
              <input
                id={field.name}
                className="hidden"
                type="file"
                name={field.name}
                onChange={handleFileUpload}
              />
              {resumeFile ? (
                <span>{resumeFile.name}</span>
              ) : (
                <span>Drag and drop a file here or click to upload</span>
              )}
            </div>
          </div>
        );
      case 'tagInput':  // Handle tag input using the TagInput component
        return (
          <div key={field.name} className="mb-6">
            <label className="block text-indigo-700 text-sm font-bold mb-2">
              {field.label}
            </label>
            <TagInput tags={field.tags} setTags={field.setTags} />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <animated.div style={fadeInScale}>
      <div className="max-w-3xl mx-auto mt-20 bg-white mt-20 shadow-md rounded-lg p-8 mb-4">
        <div className="mb-8">
          <div className="flex justify-center mb-4">
            {pages.map((page, index) => (
              <button
                key={index}
                onClick={() => jumpToPage(index)}
                className={`flex items-center text-indigo-600 font-bold mx-2 ${currentPage === index ? 'text-xl' : 'text-lg'}`}
              >
                <page.icon className="mr-2" />
                {page.title}
              </button>
            ))}
          </div>
          <h2 className="text-2xl font-bold text-center text-indigo-700 mb-2">
            {pages[currentPage].title}
          </h2>
          <p className="text-center text-gray-500 mb-4">
            {pages[currentPage].description}
          </p>
        </div>

        <form onSubmit={handleFormSubmit}>
          {pages[currentPage].fields.map(renderField)}

          <div className="flex justify-between mt-8">
              <button
                type="button"
                onClick={prevPage}
                className={`px-4 py-2 rounded ${currentPage === 0 ? 'bg-gray-300 cursor-not-allowed' : 'bg-indigo-500 text-white hover:bg-indigo-600'}`}
              >
                Previous
              </button>
            {currentPage < pages.length - 1 ? (
              <button
                type="button"
                onClick={nextPage}
                className="bg-indigo-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                className="bg-indigo-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Submit
              </button>
            )}
          </div>
        </form>
      </div>
    </animated.div>
  );
};

export default GetStartedExpertForm;
