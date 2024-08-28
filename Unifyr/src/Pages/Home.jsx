import React, { useState } from 'react';
import { useSpring, animated, config } from 'react-spring';

const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
      {/* Navbar */}
      <animated.nav style={slideDown} className="bg-white shadow-md fixed w-full top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo / Brand */}
            <div className="flex-shrink-0">
              <a href="#" className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transition-colors duration-300">
                MyCompany
              </a>
            </div>

            {/* Navigation Links */}
            <div className="hidden md:flex space-x-8">
              <NavLink href="#" text="Home" />
              <NavLink href="#" text="About Us" />
              <NavLink href="#" text="Contact" />
            </div>

            {/* Auth Buttons */}
            <div className="hidden md:flex space-x-4">
              <AnimatedButton primary>Log In</AnimatedButton>
              <AnimatedButton>Sign Up</AnimatedButton>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-600 hover:text-indigo-600 focus:outline-none focus:text-indigo-600"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50">Home</a>
              <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50">About Us</a>
              <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50">Contact</a>
            </div>
            <div className="pt-4 pb-3 border-t border-gray-200">
              <div className="flex items-center px-5">
                <AnimatedButton primary fullWidth>Log In</AnimatedButton>
              </div>
              <div className="mt-3 px-2 space-y-1">
                <AnimatedButton fullWidth>Sign Up</AnimatedButton>
              </div>
            </div>
          </div>
        )}
      </animated.nav>

      {/* Main Content */}
      <main className="pt-20">
        {/* Hero Section */}
        <animated.section style={fadeIn} className="bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <animated.h1 style={staggeredFadeIn(200)} className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 mb-6">
              Welcome to MyCompany
            </animated.h1>
            <animated.p style={staggeredFadeIn(400)} className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              We provide top-notch solutions for all your business needs. Join us to experience the best services.
            </animated.p>
            <animated.div style={staggeredFadeIn(600)}>
              <AnimatedButton primary large>
                Get Started
              </AnimatedButton>
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
    ? 'text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700'
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