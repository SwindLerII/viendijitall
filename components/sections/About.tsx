"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { HiCheck } from 'react-icons/hi';

const features = [
  'Modern ve responsive tasarımlar',
  'SEO dostu web siteleri',
  'Hızlı teslimat süreleri',
  'Rekabetçi fiyatlandırma',
  'Ücretsiz teknik destek',
  '7/24 müşteri hizmetleri'
];

export default function About() {
  return (
    <section id="about" className="section py-16 sm:py-20 md:py-24 lg:py-32 bg-secondary-50">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center">
          <div className="order-2 lg:order-1">
            <div className="relative">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="aspect-[4/3] bg-primary-600 rounded-lg sm:rounded-xl overflow-hidden shadow-xl relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary-600/90 to-primary-800/90"></div>
                <div className="relative z-10 p-6 sm:p-8 text-white h-full flex flex-col justify-center">
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4 font-heading">Vien Dijital</h3>
                  <p className="text-sm sm:text-base md:text-lg mb-4 sm:mb-6">
                    2018'den beri 100+ müşteriye 150+ projede hizmet verdik. Amacımız, işinizi büyütmenize yardımcı olacak dijital çözümler sunmak.
                  </p>
                  <div className="grid grid-cols-2 gap-3 sm:gap-4">
                    <div className="border border-white/30 rounded-lg p-3 sm:p-4 text-center">
                      <div className="text-2xl sm:text-3xl font-bold">100+</div>
                      <div className="text-xs sm:text-sm opacity-80">Mutlu Müşteri</div>
                    </div>
                    <div className="border border-white/30 rounded-lg p-3 sm:p-4 text-center">
                      <div className="text-2xl sm:text-3xl font-bold">150+</div>
                      <div className="text-xs sm:text-sm opacity-80">Tamamlanan Proje</div>
                    </div>
                  </div>
                </div>
              </motion.div>
              
              {/* Decorative elements */}
              <div className="absolute -top-4 sm:-top-6 -left-4 sm:-left-6 w-16 h-16 sm:w-24 sm:h-24 bg-secondary-200 rounded-lg sm:rounded-xl -z-10"></div>
              <div className="absolute -bottom-4 sm:-bottom-6 -right-4 sm:-right-6 w-16 h-16 sm:w-24 sm:h-24 bg-primary-100 rounded-lg sm:rounded-xl -z-10"></div>
            </div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="order-1 lg:order-2"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold font-heading mb-4 sm:mb-6">Hakkımızda</h2>
            <p className="text-sm sm:text-base md:text-lg text-secondary-600 mb-4 sm:mb-6">
              Vien Dijital olarak, markanızın dijital dünyada başarılı olması için gereken tüm hizmetleri bir arada sunuyoruz.
              Modern web tasarımı, SEO optimizasyonu ve dijital pazarlama stratejileri ile işletmenizi bir adım öne taşıyoruz.
            </p>
            <p className="text-sm sm:text-base md:text-lg text-secondary-600 mb-6 sm:mb-8">
              Uzman ekibimiz, her projeye özgün bir bakış açısıyla yaklaşır ve müşterilerimizin ihtiyaçlarını en iyi şekilde karşılamak için
              çözümler üretir. Amacımız, işinizi büyütmenize yardımcı olacak etkili ve sürdürülebilir dijital varlık oluşturmaktır.
            </p>
            
            <div className="grid sm:grid-cols-2 gap-x-4 sm:gap-x-8 gap-y-3 sm:gap-y-4 mb-6 sm:mb-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 mr-3">
                    <HiCheck className="w-3 h-3" />
                  </div>
                  <span className="text-sm sm:text-base">{feature}</span>
                </div>
              ))}
            </div>
            
            <a href="#contact" className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 rounded-lg bg-gradient-to-r from-primary-500 to-primary-600 text-white text-sm sm:text-base font-medium hover:shadow-lg hover:shadow-primary-500/30 transition-all duration-300 hover:scale-105">
              Bizimle Çalışın
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
