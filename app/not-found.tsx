"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { HiOutlineHome, HiOutlineArrowLeft, HiOutlineSearch } from 'react-icons/hi';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-secondary-50 flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        {/* 404 Animasyonu */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="text-9xl font-bold text-primary-600 mb-4">
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            >
              4
            </motion.span>
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              className="text-secondary-400"
            >
              0
            </motion.span>
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
            >
              4
            </motion.span>
          </div>
        </motion.div>

        {/* Başlık */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mb-6"
        >
          <h1 className="text-3xl font-bold text-secondary-800 mb-4">
            Sayfa Bulunamadı! 😕
          </h1>
          <p className="text-lg text-secondary-600 mb-8">
            Aradığınız sayfa mevcut değil veya taşınmış olabilir. 
            Ana sayfaya dönerek istediğiniz içeriği bulabilirsiniz.
          </p>
        </motion.div>

        {/* Aksiyon Butonları */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8"
        >
          <Link
            href="/"
            className="flex items-center space-x-2 bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors shadow-lg hover:shadow-xl"
          >
            <HiOutlineHome className="w-5 h-5" />
            <span>Ana Sayfaya Dön</span>
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className="flex items-center space-x-2 bg-secondary-200 text-secondary-700 px-6 py-3 rounded-lg hover:bg-secondary-300 transition-colors"
          >
            <HiOutlineArrowLeft className="w-5 h-5" />
            <span>Geri Git</span>
          </button>
        </motion.div>

        {/* Arama Önerisi */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="bg-white rounded-xl shadow-sm border border-secondary-200 p-6"
        >
          <div className="flex items-center space-x-3 mb-4">
            <HiOutlineSearch className="w-6 h-6 text-primary-600" />
            <h3 className="text-lg font-semibold text-secondary-800">
              Ne Arıyordunuz?
            </h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <Link 
              href="/#services"
              className="p-3 rounded-lg hover:bg-secondary-50 transition-colors text-secondary-700 hover:text-primary-600"
            >
              🛠️ Hizmetlerimiz
            </Link>
            <Link 
              href="/#portfolio"
              className="p-3 rounded-lg hover:bg-secondary-50 transition-colors text-secondary-700 hover:text-primary-600"
            >
              🎨 Portfolyo
            </Link>
            <Link 
              href="/#contact"
              className="p-3 rounded-lg hover:bg-secondary-50 transition-colors text-secondary-700 hover:text-primary-600"
            >
              📞 İletişim
            </Link>
          </div>
        </motion.div>

        {/* Yardım Metni */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mt-8 text-sm text-secondary-500"
        >
          <p>
            Hala aradığınızı bulamadıysanız,{' '}
            <Link href="/#contact" className="text-primary-600 hover:text-primary-700 underline">
              bizimle iletişime geçin
            </Link>
            . Size yardımcı olmaktan mutluluk duyarız!
          </p>
        </motion.div>
      </div>
    </div>
  );
}
