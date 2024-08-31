import React, { useEffect, useState } from 'react';
import { useSpring, animated, config } from 'react-spring';
import Logo from '../assets/Logo.png';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';

const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const data = useAuthContext();
  const user = data.user;
  console.log(user);

  const fadeIn = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { duration: 1000 },
  });

  const slideDown = useSpring({
    transform: 'translateY(0)',
    from: { transform: 'translateY(-50px)' },
    config: config.wobbly,
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
      {/* Main Content */}
      <main className="pt-20">
        {/* Hero Section */}
        <animated.section style={fadeIn} className="bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="flex items-center mb-6 mx-auto justify-center">
              <animated.h1
                style={staggeredFadeIn(200)}
                className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-indigo-600 via-purple-600  to-blue-600 animate-gradient-x"
              >
                Welcome to
              </animated.h1>
              <animated.h1 style={staggeredFadeIn(200)}>
                <img src={Logo} alt="img" className="w-40 object-scale-down ml-2" />
              </animated.h1>
            </div>

            <animated.p style={staggeredFadeIn(400)} className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              We provide top-notch solutions for all your business needs. Join us to experience the best services.
            </animated.p>
            <animated.div style={staggeredFadeIn(600)} className="flex justify-center space-x-4">
              <Link to={user ? (user.role === "Candidate" ? "/getstartedcandidate" : "/getstartedexpert") : "/auth/login"}>
                <AnimatedButton primary large>
                  Get Started
                </AnimatedButton>
              </Link>
              {user && user.role === "Expert" && (
                <Link to="/expertdashboard">
                  <AnimatedButton primary large>
                    Dashboard
                  </AnimatedButton>
                </Link>
              )}
            </animated.div>
          </div>
        </animated.section>

        {/* About Us Section */}
        <section className="bg-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <animated.div style={fadeIn} className="text-center mb-16">
              <h2 className="text-4xl font-extrabold text-gray-900 mb-4">About Us</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We are a team of professionals dedicated to delivering high-quality solutions that help businesses grow and succeed.
              </p>
            </animated.div>
            <div className="flex flex-wrap justify-center -mx-4">
              <AboutCard
                title="Our Mission"
                description="To empower businesses with innovative and effective solutions tailored to their unique needs."
                delay={200}
              />
              <AboutCard
                title="Our Vision"
                description="To be the leading provider of business solutions that drive growth, efficiency, and success."
                delay={400}
              />
              <AboutCard
                title="Our Values"
                description="Integrity, innovation, and excellence are at the core of everything we do."
                delay={600}
              />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

const NavLink = ({ href, text }) => {
  const [isHovered, setIsHovered] = useState(false);
  const spring = useSpring({
    transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
    color: isHovered ? '#4F46E5' : '#4B5563',
  });

  return (
    <animated.a
      href={href}
      style={spring}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="text-sm font-medium transition-colors duration-300"
    >
      {text}
    </animated.a>
  );
};

const AnimatedButton = ({ children, primary, large, fullWidth }) => {
  const [isHovered, setIsHovered] = useState(false);
  const spring = useSpring({
    transform: isHovered ? 'scale(1.05)' : 'scale(1)',
    boxShadow: isHovered ? '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' : '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  });

  const baseClasses = `py-2 px-4 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${fullWidth ? 'w-full' : ''}`;
  const sizeClasses = large ? 'py-3 px-8 text-lg' : 'py-2 px-4 text-sm';
  const colorClasses = primary
    ? 'text-white  bg-gradient-to-br from-indigo-600 via-purple-600  to-blue-600 animate-gradient-x hover:from-indigo-700 hover:via-purple-700 hover:to-blue-700'
    : 'text-indigo-600 bg-white border border-indigo-600 hover:bg-indigo-50';

  return (
    <animated.button
      style={spring}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`${baseClasses} ${sizeClasses} ${colorClasses}`}
    >
      {children}
    </animated.button>
  );
};

const AboutCard = ({ title, description, delay }) => {
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

export default Home;
