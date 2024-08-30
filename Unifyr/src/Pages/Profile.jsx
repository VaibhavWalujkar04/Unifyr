import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';
import Navbar from '../Components/Navbar';
import Avatar from '../assets/profile.svg';

const Profile = () => {
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Navbar */}
      <Navbar />
      
      {/* Profile Content */}
      <main className="pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Profile Header */}
          <animated.section style={fadeIn} className="py-16">
            <div className="flex flex-col items-center">
              <animated.img 
                style={slideUp} 
                src={Avatar} 
                alt="User Avatar" 
                className="w-40 h-40 rounded-full shadow-lg mb-6 object-cover" 
              />
              <animated.h1 style={staggeredFadeIn(200)} className="text-4xl font-extrabold text-indigo-600">
                John Doe
              </animated.h1>
              <animated.p style={staggeredFadeIn(400)} className="text-xl text-gray-600 max-w-xl mx-auto mt-4">
                Passionate developer and tech enthusiast. Loves to build innovative solutions and explore new technologies.
              </animated.p>
            </div>
          </animated.section>
          
          {/* Profile Details */}
          <section className="bg-white py-20">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <animated.div style={fadeIn} className="text-left mb-16">
                <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Profile Details</h2>
                <p className="text-xl text-gray-600 max-w-3xl">
                  Here you can find detailed information about the user, their interests, skills, and more.
                </p>
              </animated.div>
              <div className="flex flex-wrap justify-center -mx-4">
                <ProfileCard
                  title="Email"
                  description="john.doe@example.com"
                  delay={200}
                />
                <ProfileCard
                  title="Location"
                  description="New York, USA"
                  delay={400}
                />
                <ProfileCard
                  title="Skills"
                  description="JavaScript, React, Node.js, Python"
                  delay={600}
                />
                <ProfileCard
                  title="Interests"
                  description="AI, Blockchain, Open Source"
                  delay={800}
                />
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
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
    <animated.div style={spring} className="w-full md:w-1/2 lg:w-1/3 px-4 mb-8">
      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl shadow-lg p-8 h-full transition-all duration-300 hover:shadow-xl transform hover:-translate-y-2">
        <h3 className="text-2xl font-semibold text-indigo-600 mb-4">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </animated.div>
  );
};

export default Profile;
