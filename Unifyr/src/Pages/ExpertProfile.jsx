import React from 'react';
import { useSpring, animated } from 'react-spring';
import { FaUser, FaGraduationCap, FaBriefcase, FaFileAlt } from 'react-icons/fa';

const ProfilePage = () => {
  const profileData = {
    fullName: "Dr. John Doe",
    emailAddress: "john.doe@example.com",
    contactNumber: "+123456789",
    designation: "Senior Scientist",
    department: "Cybersecurity",
    yearsOfExperience: "8+ years",
    resume: "John_Doe_Resume.pdf",
    coreAreasOfExpertise: [
      "Cybersecurity",
      "Data Science and AI"
    ],
    technicalSkillsProficiency: [
      "Python",
      "Cybersecurity Protocols",
      "Machine Learning"
    ],
    relevantCertifications: "Certified Information Systems Security Professional (CISSP)",
    interviewExperience: "Yes",
    interviewCapacity: "Panel Member",
    publications: "Published 15 papers on Cybersecurity.",
    preferredTimeSlots: "Morning (9 AM - 12 PM)",
    preferredInterviewFormat: "Technical Round",
    preferredInterviewMode: "Online",
    additionalNotes: "Flexible with the timing on weekends."
  };

  const fadeIn = useSpring({
    opacity: 1,
    transform: 'translateY(0)',
    from: { opacity: 0, transform: 'translateY(20px)' },
    config: { tension: 100, friction: 10, duration: 300 }
  });

  const renderProfileField = (icon, label, value) => (
    <div className="mb-6">
      <div className="flex items-center text-indigo-700 mb-2">
        {React.createElement(icon, { className: 'mr-2 text-indigo-600' })}
        <span className="font-bold">{label}:</span>
      </div>
      <p className="text-gray-700">{value}</p>
    </div>
  );

  return (
    <animated.div style={fadeIn} className="max-w-3xl mx-auto p-8 bg-white rounded-lg shadow-md mt-20 border-2 border-indigo-100">
      <h2 className="text-3xl font-semibold mb-6 text-indigo-700 flex items-center">
        <FaUser className="mr-2 text-indigo-600" />
        Profile of {profileData.fullName}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {renderProfileField(FaUser, "Full Name", profileData.fullName)}
        {renderProfileField(FaGraduationCap, "Designation", profileData.designation)}
        {renderProfileField(FaBriefcase, "Department", profileData.department)}
        {renderProfileField(FaUser, "Years of Experience", profileData.yearsOfExperience)}
        {renderProfileField(FaFileAlt, "Resume", profileData.resume)}
        {renderProfileField(FaGraduationCap, "Core Areas of Expertise", profileData.coreAreasOfExpertise.join(', '))}
        {renderProfileField(FaBriefcase, "Technical Skills Proficiency", profileData.technicalSkillsProficiency.join(', '))}
        {renderProfileField(FaGraduationCap, "Relevant Certifications", profileData.relevantCertifications)}
        {renderProfileField(FaUser, "Interview Experience", profileData.interviewExperience)}
        {renderProfileField(FaUser, "Interview Capacity", profileData.interviewCapacity)}
        {renderProfileField(FaFileAlt, "Publications", profileData.publications)}
        {renderProfileField(FaBriefcase, "Preferred Time Slots", profileData.preferredTimeSlots)}
        {renderProfileField(FaBriefcase, "Preferred Interview Format", profileData.preferredInterviewFormat)}
        {renderProfileField(FaBriefcase, "Preferred Interview Mode", profileData.preferredInterviewMode)}
        {renderProfileField(FaUser, "Additional Notes", profileData.additionalNotes)}
      </div>
    </animated.div>
  );
};

export default ProfilePage;
