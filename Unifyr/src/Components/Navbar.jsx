import React, { useState } from 'react';
import { useSpring, animated, config } from 'react-spring';
import { Link } from 'react-router-dom';
import Logo from '../assets/Logo.png';
import { useAuthContext } from '../hooks/useAuthContext';
import { useLogout } from '../hooks/useLogout';

function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { user } = useAuthContext();
    const { logout } = useLogout();

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
        <animated.nav style={slideDown} className="bg-white shadow-md fixed w-full top-0 z-40">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-4">
                    {/* Logo / Brand */}
                    <div className="flex-shrink-0">
                        <Link to="/">
                            <img src={Logo} alt="img" className="object-scale-down w-28 p-0" />
                        </Link>
                    </div>

                    {/* Navigation Links */}
                    <div className="hidden md:flex space-x-8">
                        <NavLink to="/" text="Home" />
                        <NavLink to="/about" text="About Us" />
                        <NavLink to="/contact" text="Contact" />
                    </div>

                    {/* Auth Buttons or Username & Logout */}
                    <div className="hidden md:flex space-x-4 items-center">
                        {user ? (
                            <>
                                <span className="text-gray-700 font-medium">{user.username}</span>
                                <AnimatedButton onClick={logout}>Logout</AnimatedButton>
                            </>
                        ) : (
                            <>
                                <Link to={'/auth/login'}>
                                    <AnimatedButton primary>Log In</AnimatedButton>
                                </Link>
                                <Link to={'/auth/signup'}>
                                    <AnimatedButton>Sign Up</AnimatedButton>
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="text-gray-600 hover:text-indigo-600 focus:outline-none focus:text-indigo-600"
                        >
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {isMenuOpen && (
                <div className="md:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <NavLink to="/" text="Home" />
                        <NavLink to="/about" text="About Us" />
                        <NavLink to="/contact" text="Contact" />
                    </div>
                    <div className="pt-4 pb-3 border-t border-gray-200">
                        <div className="flex items-center px-5">
                            {user ? (
                                <div className="flex flex-col space-y-2">
                                    <span className="text-gray-700 font-medium">Hello, {user.username}</span>
                                    <AnimatedButton onClick={logout} fullWidth>Logout</AnimatedButton>
                                </div>
                            ) : (
                                <>
                                    <Link to={'/auth/login'}>
                                        <AnimatedButton primary fullWidth>Log In</AnimatedButton>
                                    </Link>
                                    <Link to={'/auth/signup'}>
                                        <AnimatedButton fullWidth>Sign Up</AnimatedButton>
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </animated.nav>
    );
}

const NavLink = ({ to, text }) => {
    const [isHovered, setIsHovered] = useState(false);
    const spring = useSpring({
        transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
        color: isHovered ? '#4F46E5' : '#4B5563',
    });

    return (
        <animated.div
            style={spring}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="text-sm font-medium transition-colors duration-300"
        >
            <Link to={to} className="text-sm font-medium transition-colors duration-300">
                {text}
            </Link>
        </animated.div>
    );
};

const AnimatedButton = ({ children, primary, large, fullWidth, onClick }) => {
    const [isHovered, setIsHovered] = useState(false);
    const spring = useSpring({
        transform: isHovered ? 'scale(1.05)' : 'scale(1)',
        boxShadow: isHovered
            ? '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
            : '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
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
            onClick={onClick}  // Handle button click
        >
            {children}
        </animated.button>
    );
};

export default Navbar;
