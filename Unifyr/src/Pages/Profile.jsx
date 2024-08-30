import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';
import { AlertCircle, Briefcase, Calendar, File, Globe, Mail, MapPin, Phone, Shield, User } from 'lucide-react';
import Navbar from '../Components/Navbar';
import Avatar from '../assets/profile.svg';

const ProfilePage = () => {
  const [activeSection, setActiveSection] = useState('personal');

  const fadeIn = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { duration: 1000 },
  });

  const slideUp = useSpring({
    transform: 'translateY(0)',
    from: { transform: 'translateY(50px)' },
    config: { tension: 300, friction: 10 },
  });

  const staggeredFadeIn = (delay) =>
    useSpring({
      opacity: 1,
      transform: 'translateY(0)',
      from: { opacity: 0, transform: 'translateY(50px)' },
      config: { tension: 300, friction: 10 },
      delay: delay,
    });

  const sidebarItems = [
    { id: 'personal', icon: <User />, label: 'Personal Information' },
    { id: 'expertise', icon: <Briefcase />, label: 'Areas of Expertise' },
    { id: 'interview', icon: <AlertCircle />, label: 'Interviewing Experience' },
    { id: 'education', icon: <File />, label: 'Education & Certifications' },
    { id: 'skills', icon: <Globe />, label: 'Key Skills & Competencies' },
    { id: 'availability', icon: <Calendar />, label: 'Availability' },
    { id: 'security', icon: <Shield />, label: 'Security Clearance' },
    { id: 'languages', icon: <Globe />, label: 'Languages Spoken' },
    { id: 'preferences', icon: <User />, label: 'Preferences & Matching Criteria' },
    { id: 'additional', icon: <File />, label: 'Additional Information' },
    { id: 'agreement', icon: <File />, label: 'Agreement & Consent' },
  ];

  const profileData = {
    personal: {
      fullName: 'John Doe',
      designation: 'Senior Scientist',
      department: 'Aerospace Engineering',
      workLocation: 'New Delhi',
      employeeId: 'DRDO123456',
      contactNumber: '+91 98765 43210',
      emailAddress: 'john.doe@drdo.gov.in',
      linkedInProfile: 'linkedin.com/in/johndoe',
      yearsOfExperience: 10,
    },
    expertise: [
      'Aerospace Engineering',
      'Electronics and Communication',
      'Robotics and Automation',
      'AI & Machine Learning',
    ],
    // ... (other sections remain the same)
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'personal':
        return (
          <animated.div style={fadeIn} className="space-y-6">
            <h2 className="text-3xl font-extrabold text-indigo-600">Personal Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(profileData.personal).map(([key, value], index) => (
                <InfoItem
                  key={key}
                  icon={getIconForKey(key)}
                  label={formatLabel(key)}
                  value={value}
                  delay={index * 100}
                />
              ))}
            </div>
          </animated.div>
        );
      case 'expertise':
        return (
          <animated.div style={fadeIn} className="space-y-6">
            <h2 className="text-3xl font-extrabold text-indigo-600">Areas of Expertise</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {profileData.expertise.map((item, index) => (
                <ProfileCard
                  key={index}
                  title={item}
                  description=""
                  delay={index * 100}
                />
              ))}
            </div>
          </animated.div>
        );
      // Add cases for other sections...
      default:
        return <div>Select a section from the sidebar</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Navbar />
      <div className="flex pt-20">
        <animated.aside style={slideUp} className="w-64 bg-white shadow-lg">
          <div className="p-6 bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
            <animated.img 
              style={slideUp} 
              src={Avatar} 
              alt="Profile" 
              className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-white shadow-lg object-cover" 
            />
            <animated.h1 style={staggeredFadeIn(200)} className="text-2xl font-extrabold text-center">
              {profileData.personal.fullName}
            </animated.h1>
            <animated.p style={staggeredFadeIn(400)} className="text-indigo-100 text-center">
              {profileData.personal.designation}
            </animated.p>
          </div>
          <nav className="mt-8">
            <ul>
              {sidebarItems.map((item, index) => (
                <animated.li key={item.id} style={staggeredFadeIn(index * 50)}>
                  <button
                    onClick={() => setActiveSection(item.id)}
                    className={`flex items-center w-full px-6 py-3 text-left transition-colors duration-200 ${
                      activeSection === item.id ? 'bg-indigo-100 text-indigo-700' : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {item.icon}
                    <span className="ml-3">{item.label}</span>
                  </button>
                </animated.li>
              ))}
            </ul>
          </nav>
        </animated.aside>
        <main className="flex-1 p-8 overflow-y-auto">
          <animated.div style={fadeIn} className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8">
            {renderContent()}
          </animated.div>
        </main>
      </div>
    </div>
  );
};

const InfoItem = ({ icon, label, value, delay }) => {
  const spring = useSpring({
    opacity: 1,
    transform: 'translateY(0)',
    from: { opacity: 0, transform: 'translateY(50px)' },
    config: { tension: 300, friction: 10 },
    delay: delay,
  });

  return (
    <animated.div style={spring} className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl transform hover:-translate-y-2">
      <div className="flex items-center space-x-3 mb-2">
        <span className="text-indigo-600">{icon}</span>
        <span className="font-semibold text-indigo-600">{label}</span>
      </div>
      <p className="text-gray-800 ml-9">{value}</p>
    </animated.div>
  );
};

const ProfileCard = ({ title, description, delay }) => {
  const spring = useSpring({
    opacity: 1,
    transform: 'translateY(0)',
    from: { opacity: 0, transform: 'translateY(50px)' },
    config: { tension: 300, friction: 10 },
    delay: delay,
  });

  return (
    <animated.div style={spring} className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl transform hover:-translate-y-2">
      <h3 className="text-2xl font-semibold text-indigo-600 mb-4">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </animated.div>
  );
};

const getIconForKey = (key) => {
  const iconMap = {
    fullName: <User />,
    designation: <Briefcase />,
    department: <Briefcase />,
    workLocation: <MapPin />,
    employeeId: <User />,
    contactNumber: <Phone />,
    emailAddress: <Mail />,
    linkedInProfile: <Globe />,
    yearsOfExperience: <Briefcase />,
  };
  return iconMap[key] || <User />;
};

const formatLabel = (key) => {
  return key.split(/(?=[A-Z])/).join(' ').replace(/^\w/, c => c.toUpperCase());
};

export default ProfilePage;