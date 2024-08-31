import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';
import { FaUser, FaGraduationCap, FaBriefcase } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import TagInput from './TagInput';  // Ensure the correct path
import { useAuthContext } from '../hooks/useAuthContext';
import axios from 'axios';

const GetStartedCandidateForm = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [formData, setFormData] = useState({
    fullName: '',
    emailAddress: '',
    contactNumber: '',
    positionAppliedFor: '',
    employmentStatus: '',
    linkedInProfile: '',
    highestDegree: '',
    fieldOfStudy: '',
    universityInstitution: '',
    technicalSkills: [],
    yearsOfExperience: '',
    certificationsFile: null,
    academicProjects: '',
    workExperience: '',
    keyAchievements: '',
    preferredInterviewMode: '',
    preferredInterviewTime: '',
    additionalInformation: ''
  });
  const [certificationsFile, setCertificationsFile] = useState(null);
  const [skillsTags, setSkillsTags] = useState([]);
  const [yearsOfExperience, setYearsOfExperience] = useState('');
  const {user} = useAuthContext();
  const navigate = useNavigate();

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
          type: "tagInput",
          tags: skillsTags,
          setTags: setSkillsTags,
        },
        {
          label: "Years of Experience",
          name: "yearsOfExperience",
          type: "number"
        },
        {
          label: "Upload Resume",
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

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const finalData = {
      ...formData,
      technicalSkills: skillsTags.join(', '),
      yearsOfExperience,
      certificationsFile,
      user:user.userId
    };
    console.log(finalData);
    try {
      // Send the form data to the backend
      const response = await axios.post('/api/candidates', finalData, {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': user.token,
        },
      });

      console.log('Form submitted:', response.data);
      alert('Form Successfully Submitted');
      navigate('/');
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
            ></textarea>
          </div>
        );
      case 'file':
        return (
          <div key={field.name} className="mb-6">
            <label className="block text-indigo-700 text-sm font-bold mb-2">
              {field.label}
            </label>
            <input
              className="shadow appearance-none border-2 border-indigo-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              type="file"
              name={field.name}
              onChange={handleFileUpload}
            />
          </div>
        );
      case 'tagInput':
        return (
          <div key={field.name} className="mb-6">
            <label className="block text-indigo-700 text-sm font-bold mb-2">
              {field.label}
            </label>
            <TagInput tags={field.tags} setTags={field.setTags} />
          </div>
        );
      case 'number':
        return (
          <div key={field.name} className="mb-6">
            <label className="block text-indigo-700 text-sm font-bold mb-2">
              {field.label}
            </label>
            <input
              className="shadow appearance-none border-2 border-indigo-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              type="number"
              name={field.name}
              value={yearsOfExperience}
              onChange={(e) => setYearsOfExperience(e.target.value)}
              min="0"
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <animated.div style={fadeInScale} className="max-w-3xl mx-auto mt-20 p-8 bg-white rounded-lg shadow-md">
      <div className="flex items-center mb-6">
        {pages.map((page, index) => (
          <div
            key={index}
            className={`flex items-center cursor-pointer ${index === currentPage ? 'text-indigo-500' : 'text-gray-500'}`}
            onClick={() => jumpToPage(index)}
          >
            <page.icon className="mr-2" />
            <span className="font-semibold">{page.title}</span>
            {index < pages.length - 1 && (
              <span className="mx-4 text-gray-400">|</span>
            )}
          </div>
        ))}
      </div>

      <form onSubmit={handleFormSubmit}>
        {pages[currentPage].fields.map(renderField)}

        <div className="flex justify-between mt-8">
          <button
            type="button"
            onClick={prevPage}
            disabled={currentPage === 0}
            className={`px-4 py-2 rounded ${currentPage === 0 ? 'bg-gray-300 cursor-not-allowed' : 'bg-indigo-500 text-white hover:bg-indigo-600'}`}
          >
            Previous
          </button>
          {currentPage === 2 ? (
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Submit
            </button>
          ) : (
            <button
              type="button"
              onClick={nextPage}
              className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600"
            >
              Next
            </button>
          )}
        </div>
      </form>
    </animated.div>
  );
};

export default GetStartedCandidateForm;
