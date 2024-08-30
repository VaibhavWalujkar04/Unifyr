import React, { useState } from 'react';
import { useSpring, animated, config } from 'react-spring';
import { FaUser, FaGraduationCap, FaBriefcase, FaHeart, FaInfoCircle, FaFileAlt } from 'react-icons/fa';

const GetStartedCandidateForm = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [formData, setFormData] = useState({});

  const fadeInScale = useSpring({
    opacity: 1,
    transform: 'scale(1)',
    from: { opacity: 0, transform: 'scale(0.95)' },
    config: { tension: 100, friction: 10, duration: 300 }
  });

  const pages = [
    { title: "Personal Information", icon: FaUser, description: "Please provide your personal details.", fields: [
      "fullName", "dateOfBirth", "gender", "nationality", "address", "contactNumber", "email", "linkedinProfile", "preferredCommunication"
    ] },
    { title: "Educational Background", icon: FaGraduationCap, description: "Tell us about your education.", fields: [
      "highestDegree", "fieldOfStudy", "institution", "graduationYear", "gpa", "additionalCertifications", "relevantCourses"
    ] },
    { title: "Professional Experience", icon: FaBriefcase, description: "Share your professional experience.", fields: [
      "totalExperience", "currentEmployer", "jobTitle", "employmentDuration", "keyResponsibilities", "relevantProjects", "programmingLanguages", "toolsSoftware", "otherSkills", "previousPositions"
    ] },
    { title: "Research & Publications", icon: FaFileAlt, description: "Detail your research and publications.", fields: [
      "researchPapers", "journalConferenceName", "yearOfPublication", "patents", "otherContributions"
    ] },
    { title: "Areas of Interest", icon: FaHeart, description: "Let us know your areas of interest.", fields: [
      "areasOfInterest", "preferredJobPostings"
    ] },
    { title: "Matching Criteria", icon: FaInfoCircle, description: "Provide your matching criteria.", fields: [
      "preferredLocation", "willingnessToRelocate", "expectedSalaryRange", "preferredWorkEnvironment", "availabilityToStart"
    ] },
    { title: "Security Clearance", icon: FaInfoCircle, description: "Indicate your security clearance status.", fields: [
      "securityClearance", "securityClearanceLevel", "willingToUndergoClearance"
    ] },
    { title: "References", icon: FaInfoCircle, description: "Provide references.", fields: [
      "reference1Name", "reference1Relationship", "reference1Contact", "reference2Name", "reference2Relationship", "reference2Contact"
    ] },
    { title: "Upload Documents", icon: FaFileAlt, description: "Upload necessary documents.", fields: [
      "resume", "coverLetter", "academicTranscripts", "otherSupportingDocuments"
    ] },
    { title: "Additional Information", icon: FaInfoCircle, description: "Provide any additional information.", fields: [
      "interestInDRDO", "uniqueSkillsOrExperiences", "specificProjectsOrAreas", "additionalNotes"
    ] },
    { title: "Agreement & Consent", icon: FaInfoCircle, description: "Read and agree to the terms.", fields: [
      "agreementConsent"
    ] },
  ];

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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

  const renderField = (field) => (
    <div key={field} className="mb-6">
      <label className="block text-gray-700 text-sm font-bold mb-2">
        {field.split(/(?=[A-Z])/).join(" ")}
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

  const IconComponent = pages[currentPage].icon;

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10">
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

export default GetStartedCandidateForm;
