"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { HiOutlineHome, HiOutlineRefresh, HiOutlineExclamation } from 'react-icons/hi';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <div className="min-h-screen bg-secondary-50 flex items-center justify-center px-4">
          <div className="max-w-2xl mx-auto text-center">
            {/* Hata İkonu */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <HiOutlineExclamation className="w-12 h-12 text-red-600" />
              </div>
            </motion.div>

            {/* Başlık */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="mb-6"
            >
              <h1 className="text-3xl font-bold text-secondary-800 mb-4">
                Bir Hata Oluştu! 😔
              </h1>
              <p className="text-lg text-secondary-600 mb-8">
                Beklenmeyen bir hata oluştu. Lütfen tekrar deneyin veya ana sayfaya dönün.
              </p>
            </motion.div>

            {/* Hata Detayı (Sadece development'ta) */}
            {process.env.NODE_ENV === 'development' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-left"
              >
                <h3 className="text-sm font-semibold text-red-800 mb-2">Hata Detayı:</h3>
                <p className="text-sm text-red-700 font-mono break-all">
                  {error.message}
                </p>
                {error.digest && (
                  <p className="text-xs text-red-600 mt-2">
                    Hata ID: {error.digest}
                  </p>
                )}
              </motion.div>
            )}

            {/* Aksiyon Butonları */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8"
            >
              <button
                onClick={reset}
                className="flex items-center space-x-2 bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors shadow-lg hover:shadow-xl"
              >
                <HiOutlineRefresh className="w-5 h-5" />
                <span>Tekrar Dene</span>
              </button>
              
              <Link
                href="/"
                className="flex items-center space-x-2 bg-secondary-200 text-secondary-700 px-6 py-3 rounded-lg hover:bg-secondary-300 transition-colors"
              >
                <HiOutlineHome className="w-5 h-5" />
                <span>Ana Sayfaya Dön</span>
              </Link>
            </motion.div>

            {/* Yardım Metni */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="bg-white rounded-xl shadow-sm border border-secondary-200 p-6"
            >
              <h3 className="text-lg font-semibold text-secondary-800 mb-3">
                Sorun Devam Ediyor mu?
              </h3>
              <p className="text-secondary-600 mb-4">
                Bu hata sürekli tekrarlanıyorsa, lütfen bizimle iletişime geçin.
              </p>
              <Link 
                href="/#contact"
                className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-700 font-medium"
              >
                <span>İletişime Geç</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </motion.div>
          </div>
        </div>
      </body>
    </html>
  );
}
