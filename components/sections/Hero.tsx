"use client";

import React, { useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useAnimation, useInView, useScroll, useTransform } from 'framer-motion';
import { HiOutlineArrowNarrowDown, HiOutlineChevronRight, HiOutlineDeviceMobile, HiOutlineGlobe, HiOutlineLightBulb } from 'react-icons/hi';

export default function Hero() {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref);
  const { scrollYProgress } = useScroll();
  
  // Parallax effect values
  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Animate elements when in view
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  // Animation variants
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: {
      y: 20,
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.7,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8 } },
  };

  // Mock data for the 3D devices
  const devices = [
    { name: 'Website', icon: <HiOutlineGlobe className="w-8 h-8" /> },
    { name: 'Mobile App', icon: <HiOutlineDeviceMobile className="w-8 h-8" /> },
    { name: 'Digital Marketing', icon: <HiOutlineLightBulb className="w-8 h-8" /> },
  ];

  return (
    <section className="relative overflow-hidden h-screen flex items-center bg-gradient-to-br from-secondary-900 via-secondary-800 to-primary-900 text-white">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <motion.div 
          style={{ y, opacity }}
          className="absolute top-0 left-0 right-0 bottom-0"
        >
          {/* Gradient blobs */}
          <div className="absolute top-1/4 right-1/4 w-[30rem] h-[30rem] rounded-full bg-primary-600 opacity-20 blur-[8rem]" />
          <div className="absolute top-2/3 left-1/3 w-[25rem] h-[25rem] rounded-full bg-purple-600 opacity-10 blur-[6rem]" />
          <div className="absolute bottom-0 right-0 w-[20rem] h-[20rem] rounded-full bg-blue-500 opacity-10 blur-[4rem]" />
          
          {/* Grid overlay */}
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-20"></div>
        </motion.div>
      </div>

      <div className="container h-full flex items-start sm:items-center pt-24 sm:pt-0 relative z-10">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="grid lg:grid-cols-12 gap-8 md:gap-12 items-center"
        >
          <div className="text-center lg:text-left lg:col-span-12 xl:col-span-7">
            <motion.div variants={fadeIn} className="inline-flex items-center mb-4 bg-white/10 backdrop-blur-sm rounded-full pl-2 pr-4 py-1">
              <span className="bg-primary-500 text-white text-xs px-3 py-1 rounded-full mr-2 font-medium">YENI</span>
              <span className="text-xs sm:text-sm text-white/90">Yeni Hizmet</span>
            </motion.div>

                          <motion.h1 
              variants={itemVariants} 
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-heading tracking-tight leading-tight mb-6"
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-primary-300">Dijital Vizyonunuzu</span>
              <br />Gerçeğe Dönüştürüyoruz
            </motion.h1>
            
            <motion.p 
              variants={itemVariants}
              className="text-base sm:text-lg md:text-xl text-white/80 mb-8 max-w-2xl mx-auto lg:mx-0"
            >
              Vien Dijital ile modern web tasarım, mobil uygulama geliştirme ve stratejik dijital pazarlama çözümleriyle markanızı geleceğe taşıyın.
            </motion.p>
            
            <motion.div 
              variants={itemVariants}
              className="flex flex-row gap-4 sm:gap-5 justify-center lg:justify-start"
            >
              <Link 
                href="#services" 
                className="btn px-4 sm:px-6 md:px-8 py-3 md:py-4 rounded-full bg-gradient-to-r from-primary-500 to-primary-600 text-white text-sm sm:text-base font-medium hover:shadow-lg hover:shadow-primary-500/30 transition-all duration-300 hover:scale-105 whitespace-nowrap flex items-center"
              >
                <span>Hizmetlerimiz</span>
                <HiOutlineChevronRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
              </Link>
              
              <Link 
                href="#portfolio" 
                className="btn px-4 sm:px-6 md:px-8 py-3 md:py-4 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm sm:text-base font-medium hover:bg-white/20 transition-all duration-300 whitespace-nowrap"
              >
                Projelerimiz
              </Link>
            </motion.div>
            
            <motion.div 
              variants={itemVariants}
              className="mt-8 md:mt-10 flex flex-row flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-8"
            >
              <div className="flex -space-x-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div 
                    key={i} 
                    className="w-12 h-12 rounded-full border-2 border-secondary-800 flex items-center justify-center overflow-hidden bg-gradient-to-br from-secondary-700 to-secondary-800 shadow-lg"
                  >
                    <span className="text-xs font-medium text-white">M{i}</span>
                  </div>
                ))}
                <div className="w-12 h-12 rounded-full bg-primary-500 border-2 border-secondary-800 flex items-center justify-center text-white font-medium text-xs">
                  +50
                </div>
              </div>
              
              <div>
                <p className="text-base sm:text-lg font-semibold text-white">+150 Mutlu Müşteri</p>
                <div className="flex text-yellow-400 text-base sm:text-lg">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <span key={i}>★</span>
                  ))}
                  <span className="ml-2 text-xs sm:text-sm text-white/80">(200+)</span>
                </div>
              </div>
            </motion.div>
          </div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="hidden xl:block xl:col-span-5 relative"
          >
            <div className="relative">
              {/* 3D device mockup */}
              <div className="transform perspective-1000 relative z-10 w-full aspect-[5/4]">
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div 
                    initial={{ rotateY: -10, rotateX: 10 }}
                    animate={{ rotateY: 0, rotateX: 5 }}
                    transition={{ duration: 1.5 }}
                    className="w-4/5 aspect-[16/9] bg-gradient-to-br from-white/5 to-white/20 backdrop-blur-lg rounded-2xl overflow-hidden border border-white/30 shadow-[0_0_15px_rgba(0,0,0,0.2)] relative"
                  >
                    <div className="absolute inset-0">
                      <div className="h-6 bg-secondary-800 flex items-center px-4 space-x-2">
                        <div className="w-3 h-3 rounded-full bg-red-400"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                        <div className="w-3 h-3 rounded-full bg-green-400"></div>
                      </div>
                      <div className="p-6 pt-8 h-full bg-secondary-800">
                        <div className="bg-gradient-to-br from-primary-500 to-primary-700 h-16 rounded-lg mb-4 flex items-center justify-center">
                          <p className="text-white font-bold text-lg">VienDijital.com</p>
                        </div>
                        <div className="grid grid-cols-3 gap-3">
                          <div className="bg-white/10 h-20 rounded-lg"></div>
                          <div className="bg-white/10 h-20 rounded-lg"></div>
                          <div className="bg-white/10 h-20 rounded-lg"></div>
                          <div className="col-span-2 bg-white/10 h-16 rounded-lg"></div>
                          <div className="bg-white/10 h-16 rounded-lg"></div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
                
                {/* Floating elements */}
                {devices.map((device, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 + index * 0.3, duration: 0.5 }}
                    className="absolute bg-gradient-to-br from-primary-900/80 to-primary-800/80 backdrop-blur-lg p-4 rounded-xl border border-primary-700/50 shadow-xl"
                    style={{
                      top: `${20 + index * 30}%`,
                      right: index % 2 === 0 ? '10%' : 'auto',
                      left: index % 2 === 0 ? 'auto' : '10%',
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary-600 rounded-lg text-white">
                        {device.icon}
                      </div>
                      <span className="text-white font-medium">{device.name}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              {/* Glow effect */}
              <div className="absolute -inset-10 bg-primary-600/20 rounded-full blur-3xl -z-10 opacity-50"></div>
            </div>
          </motion.div>
        </motion.div>
        
        {/* Scroll indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-20 sm:bottom-24 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          >
            <HiOutlineArrowNarrowDown className="w-6 h-6 text-white/70" />
          </motion.div>
          <span className="text-sm text-white/70 mt-2">Kaydır</span>
        </motion.div>
      </div>
    </section>
  );
}
