import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MagnifyingGlassIcon, ShoppingBagIcon, UserIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import bodybuilderImage from '../assets/sudda.png'


const useClickOutside = (ref, callback) => {
  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        callback();
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [ref, callback]);
};


const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true); 
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [cartItems] = useState(3);

  const navigate = useNavigate();

  const userMenuRef = useRef(null);
  useClickOutside(userMenuRef, () => setIsUserMenuOpen(false));

  const navigation = [
    { name: 'Home', href: '/homepage' },
    { name: 'Products', href: '/getproduct' },
    { name: 'Coconut & Other', href: '/getcoconut' },
    { name: 'Expert', href: '/addland' },
  ];

  const handleLogout =  () => {
        
        axios.post("http://localhost:5001/api/authuser/logout", {}, { withCredentials: true });
        setIsLoggedIn(false);
        setIsUserMenuOpen(false);
        navigate("/homepage");
        
  };

  return (
    <nav className="bg-indigo-600 shadow-lg">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
         
          <div className="flex items-center space-x-2">
            <Link to="/homepage" className="flex items-center">
             <img
                           alt="Your Company"
                           src={bodybuilderImage}
                           className="mx-auto h-10 w-auto"
                         />
                         <h1 className='text-gray-1000 text-2xl font-bold'>Gym</h1><h2 className='text-amber-500 text-2xl font-bold'>hub</h2>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-gray-1000 hover:text-gray-100 transition-colors font-medium"
              >
                {item.name}
              </Link>
            ))}
            
         
            <div className="relative ml-4">
              <input
                type="text"
                placeholder="Search products..."
                className="pl-10 pr-4 py-2 border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-gray-100"
              />
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-1000 absolute left-3 top-2.5" />
            </div>
          </div>

      
          <div className="flex items-center space-x-4">
            <Link to="/cart" className="relative p-2 hover:text-gray-100">
              <ShoppingBagIcon className="h-6 w-6" />
              {cartItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItems}
                </span>
              )}
            </Link>

         
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="p-2 hover:text-gray-100 focus:outline-none"
              >
                <UserIcon className="h-6 w-6" />
              </button>
              
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 border z-50">
                  {isLoggedIn ? (
                    <>
                      <Link
                        to="/dashboard"
                        className="block px-4 py-2 text-gray-1000 hover:bg-gray-100"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        Dashboard
                      </Link>
                      
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-gray-1000 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/login"
                        className="block px-4 py-2 text-gray-1000 hover:bg-gray-100"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        Sign In
                      </Link>
                      <Link
                        to="/register"
                        className="block px-4 py-2 text-gray-1000 hover:bg-gray-100"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        Register
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>

       
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 hover:text-gray-100"
            >
              {isOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

    
        {isOpen && (
          <div className="md:hidden absolute top-20 left-0 right-0 bg-white border-t shadow-lg z-40">
            <div className="px-4 pt-4 pb-8 space-y-6">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="block text-gray-700 hover:text-green-700"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              
              <div className="pt-4 border-t">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search products..."
                    className="w-full pl-10 pr-4 py-2 border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
                </div>

                <div className="mt-4 flex space-x-4">
                  <Link
                    to="/cart"
                    className="flex items-center text-gray-700 hover:text-green-700"
                  >
                    <ShoppingBagIcon className="h-5 w-5 mr-1" />
                    Cart ({cartItems})
                  </Link>
                  
                  <Link
                    to={isLoggedIn ? "/account" : "/login"}
                    className="flex items-center text-gray-700 hover:text-green-700"
                  >
                    <UserIcon className="h-5 w-5 mr-1" />
                    {isLoggedIn ? 'Account' : 'Sign In'}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;