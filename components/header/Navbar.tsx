"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { HiMenu, HiX, HiOutlineArrowRight } from 'react-icons/hi';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';

const navItems = [
  { name: 'Ana Sayfa', href: '/' },
  { name: 'Hizmetler', href: '#services' },
  { name: 'Hakkımızda', href: '#about' },
  { name: 'Projeler', href: '#portfolio' },
  { name: 'İletişim', href: '#contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [scrollProgress, setScrollProgress] = useState(0);

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setScrolled(scrollPosition > 20);
      
      // Calculate scroll progress
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollPosition / totalHeight) * 100;
      setScrollProgress(Math.min(progress, 100));
      
      // Update active section based on scroll position
      const sections = navItems.map(item => item.href.replace('#', '')).filter(id => id !== '/');
      
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element && window.scrollY >= element.offsetTop - 100) {
          setActiveSection(section);
          break;
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
             className="fixed top-0 left-0 right-0 z-50 w-full bg-white shadow-lg py-3 transition-all duration-300"
    >
      {/* Scroll Progress Bar */}
      <motion.div
        className="absolute top-0 left-0 h-1 bg-gradient-to-r from-primary-500 to-primary-600 z-10"
        style={{ width: `${scrollProgress}%` }}
        transition={{ duration: 0.1 }}
      />
      
      <div className="container flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-2xl font-bold font-heading"
          >
                         <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-primary-800">
               Vien
             </span>
             <span className="text-secondary-800">
               Dijital
             </span>
          </motion.span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-2">
          <ul className="flex">
            {navItems.map((item, index) => {
              const isActive = activeSection === item.href.replace('#', '') ||
                (activeSection === '' && item.href === '/');
              
              return (
                <motion.li 
                  key={item.name}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                                     <Link
                     href={item.href}
                     className={clsx(
                       "font-medium px-5 py-2 rounded-full mx-1 transition-all duration-300 relative",
                       isActive
                         ? "text-primary-500 font-semibold" 
                         : "text-secondary-800 hover:text-primary-500"
                     )}
                   >
                    {item.name}
                    {isActive && (
                      <motion.span
                        layoutId="navIndicator"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-400 rounded-full mx-auto w-1/2"
                      />
                    )}
                  </Link>
                </motion.li>
              );
            })}
          </ul>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
          >
                         <Link 
               href="#contact" 
               className="btn ml-4 inline-flex items-center px-6 py-3 rounded-full font-medium transition-all duration-300 bg-gradient-to-r from-primary-500 to-primary-600 text-white hover:shadow-lg hover:shadow-primary-500/20 hover:scale-105"
             >
              <span>Teklif Al</span>
              <HiOutlineArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </motion.div>
        </div>

        {/* Mobile menu button */}
        <button
                     className="lg:hidden rounded-full p-3 transition-colors text-secondary-600 hover:bg-secondary-100"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
        >
          <span className="sr-only">Menüyü aç</span>
          {isOpen ? <HiX size={24} /> : <HiMenu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="lg:hidden fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-50"
          >
            <div className="p-6 h-full flex flex-col">
              <div className="flex justify-between items-center mb-8">
                <span className="text-xl font-bold text-secondary-800">Menü</span>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-full hover:bg-secondary-100 transition-colors"
                >
                  <HiX size={24} />
                </button>
              </div>
              <ul className="space-y-1 flex-1">
                {navItems.map((item, index) => {
                  const isActive = activeSection === item.href.replace('#', '') || 
                    (activeSection === '' && item.href === '/');
                    
                  return (
                    <motion.li 
                      key={item.name}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 * index }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className={clsx(
                          "block py-3 px-4 font-medium rounded-lg transition-colors",
                          isActive
                            ? "bg-gradient-to-r from-primary-50 to-primary-100/50 text-primary-500 font-semibold"
                            : "text-secondary-700 hover:bg-secondary-50"
                        )}
                      >
                        {item.name}
                        {isActive && (
                          <span className="float-right">
                            <motion.div 
                              animate={{ x: [0, 5, 0] }}
                              transition={{ repeat: Infinity, duration: 1 }}
                            >
                              <HiOutlineArrowRight className="w-5 h-5" />
                            </motion.div>
                          </span>
                        )}
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>
              <div className="mt-auto pt-6">
                <Link 
                  href="#contact"
                  onClick={() => setIsOpen(false)}
                  className="btn w-full flex justify-center items-center py-4 rounded-lg bg-gradient-to-r from-primary-500 to-primary-600 text-white font-medium hover:shadow-lg hover:shadow-primary-500/30 transition-all duration-300"
                >
                  <span>Teklif Al</span>
                  <HiOutlineArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
