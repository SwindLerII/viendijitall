"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  HiOutlineGlobe, 
  HiOutlineChartBar, 
  HiOutlineDeviceMobile,
  HiOutlineLightningBolt,
  HiOutlineShoppingCart,
  HiOutlinePhotograph,
  HiOutlineArrowRight,
  HiOutlineCheck
} from 'react-icons/hi';

const services = [
  {
    id: 'web',
    icon: <HiOutlineGlobe className="w-10 h-10" />,
    title: 'Web Tasarım & Geliştirme',
    description: 'Modern, responsive ve kullanıcı dostu web siteleri tasarlıyor ve geliştiriyoruz.',
    color: 'from-blue-500 to-blue-700',
    features: [
      'Özelleştirilmiş premium tasarım',
      'Mobil uyumlu responsive yapı',
      'SEO optimizasyonu',
      'Hızlı sayfa yükleme',
      'Kolay içerik yönetimi'
    ]
  },
  {
    id: 'seo',
    icon: <HiOutlineChartBar className="w-10 h-10" />,
    title: 'SEO & Dijital Pazarlama',
    description: 'Arama motoru optimizasyonu ve etkili dijital pazarlama stratejileri ile online varlığınızı güçlendiriyoruz.',
    color: 'from-purple-500 to-purple-700',
    features: [
      'Anahtar kelime analizi ve stratejisi',
      'Teknik SEO optimizasyonu',
      'İçerik pazarlama stratejisi',
      'Sosyal medya pazarlaması',
      'Dönüşüm optimizasyonu (CRO)'
    ]
  },
  {
    id: 'mobile',
    icon: <HiOutlineDeviceMobile className="w-10 h-10" />,
    title: 'Mobil Uygulama Geliştirme',
    description: 'İşletmeniz için özel, kullanıcı dostu ve yüksek performanslı mobil uygulamalar geliştiriyoruz.',
    color: 'from-green-500 to-green-700',
    features: [
      'iOS ve Android uygulamalar',
      'React Native ile çapraz platform geliştirme',
      'Kullanıcı deneyimi odaklı tasarım',
      'API entegrasyonları',
      'Uygulama bakım ve destek'
    ]
  },
  {
    id: 'perf',
    icon: <HiOutlineLightningBolt className="w-10 h-10" />,
    title: 'Performans Optimizasyonu',
    description: 'Web sitenizin yükleme hızını artırarak kullanıcı deneyimini ve SEO performansını iyileştiriyoruz.',
    color: 'from-yellow-500 to-yellow-700',
    features: [
      'Sayfa hızı optimizasyonu',
      'Görsel ve içerik sıkıştırma',
      'Önbellek stratejileri',
      'CDN entegrasyonu',
      'Core Web Vitals iyileştirme'
    ]
  },
  {
    id: 'ecommerce',
    icon: <HiOutlineShoppingCart className="w-10 h-10" />,
    title: 'E-Ticaret Çözümleri',
    description: 'Online satış yapmanızı sağlayacak özelleştirilmiş e-ticaret çözümleri sunuyoruz.',
    color: 'from-red-500 to-red-700',
    features: [
      'Özelleştirilmiş e-ticaret platformları',
      'Ödeme sistemi entegrasyonları',
      'Ürün yönetim sistemleri',
      'Mobil uyumlu e-ticaret',
      'Satış optimizasyonu'
    ]
  },
  {
    id: 'content',
    icon: <HiOutlinePhotograph className="w-10 h-10" />,
    title: 'İçerik Üretimi',
    description: 'Markanızı öne çıkaracak ve müşterilerinizi etkileyecek kaliteli içerikler üretiyoruz.',
    color: 'from-primary-500 to-primary-700',
    features: [
      'SEO uyumlu içerik yazımı',
      'Blog ve makale yazarlığı',
      'Ürün tanıtım metinleri',
      'Sosyal medya içerikleri',
      'Görsel içerik üretimi'
    ]
  }
];

export default function Services() {
  const [activeService, setActiveService] = useState('web');
  const [hoveredService, setHoveredService] = useState<string | null>(null);

  const selectedService = services.find(s => s.id === activeService) || services[0];

  return (
    <section id="services" className="section py-20 md:py-32 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 -z-10 w-1/3 h-1/3 bg-gradient-to-bl from-primary-100 to-transparent rounded-bl-full opacity-60" />
      <div className="absolute bottom-0 left-0 -z-10 w-1/4 h-1/4 bg-gradient-to-tr from-primary-100 to-transparent rounded-tr-full opacity-60" />
      
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <span className="inline-block px-3 py-1 rounded-full bg-primary-100 text-primary-700 font-medium text-xs sm:text-sm mb-3 sm:mb-4">HİZMETLERİMİZ</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold font-heading mb-4 sm:mb-6">Dijital Dönüşümünüz İçin <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-400">Uzman Çözümler</span></h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-secondary-600">
            Dijital dünyada fark yaratmanız ve rekabette öne geçmeniz için ihtiyacınız olan tüm hizmetleri tek çatı altında sunuyoruz.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 items-start">
          {/* Service tabs */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
            className="lg:col-span-4 xl:col-span-3 order-2 lg:order-1"
          >
            <div className="bg-secondary-50 rounded-2xl p-2 mb-6 lg:mb-8 lg:sticky lg:top-24">
              {services.map((service, index) => (
                <div
                  key={service.id}
                  className="mb-2 last:mb-0"
                >
                  <button
                    onClick={() => setActiveService(service.id)}
                    onMouseEnter={() => setHoveredService(service.id)}
                    onMouseLeave={() => setHoveredService(null)}
                    className={`w-full flex items-center p-3 sm:p-4 rounded-xl text-left transition-all duration-300 ${
                      activeService === service.id
                        ? 'bg-white shadow-lg shadow-secondary-200/40 scale-[1.02]'
                        : 'hover:bg-white/80'
                    }`}
                  >
                    <div className={`flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center bg-gradient-to-br ${service.color} text-white`}>
                      {service.icon}
                    </div>
                    <div className="ml-3 sm:ml-4">
                      <h3 className={`font-bold font-heading text-sm sm:text-base transition-colors duration-300 ${
                        activeService === service.id ? 'text-primary-600' : 'text-secondary-800'
                      }`}>
                        {service.title}
                      </h3>
                      <motion.div
                        initial={false}
                        animate={{ width: activeService === service.id || hoveredService === service.id ? '100%' : '0%' }}
                        transition={{ duration: 0.3 }}
                        className="h-0.5 bg-primary-500 mt-1"
                      />
                    </div>
                    {(activeService === service.id) && (
                      <HiOutlineArrowRight className="ml-auto text-primary-600 w-5 h-5" />
                    )}
                  </button>
                </div>
              ))}
            </div>
          </motion.div>
          
          {/* Service details */}
          <motion.div
            key={selectedService.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-8 xl:col-span-9 order-1 lg:order-2"
          >
            <div className="bg-gradient-to-br from-secondary-50 to-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 shadow-xl shadow-secondary-200/20 relative overflow-hidden">
              {/* Background gradient decoration */}
              <div className={`absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl ${selectedService.color} opacity-10 blur-2xl rounded-full -z-10`}></div>
              <div className={`absolute bottom-0 left-0 w-60 h-60 bg-gradient-to-tr ${selectedService.color} opacity-5 blur-3xl rounded-full -z-10`}></div>
              
              <div className="grid md:grid-cols-2 gap-6 sm:gap-8 md:gap-10">
                <div>
                  <div className={`inline-flex w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br ${selectedService.color} text-white items-center justify-center mb-4 sm:mb-6`}>
                    {selectedService.icon}
                  </div>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold font-heading mb-3 sm:mb-4">{selectedService.title}</h3>
                  <p className="text-sm sm:text-base md:text-lg text-secondary-600 mb-4 sm:mb-6">
                    {selectedService.description}
                  </p>
                  
                  <ul className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
                    {selectedService.features.map((feature, idx) => (
                      <motion.li 
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * idx, duration: 0.4 }}
                        className="flex items-start"
                      >
                        <div className={`flex-shrink-0 p-1 rounded-full bg-gradient-to-r ${selectedService.color} text-white mr-3 mt-1`}>
                          <HiOutlineCheck className="w-4 h-4" />
                        </div>
                        <span className="text-sm sm:text-base text-secondary-700">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                  
                  <a 
                    href="#contact"
                    className={`inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 rounded-xl bg-gradient-to-r ${selectedService.color} text-white text-sm sm:text-base font-medium hover:shadow-lg transition-all duration-300 hover:scale-105`}
                  >
                    <span>Teklif Alın</span>
                    <HiOutlineArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
                  </a>
                </div>
                
                <div className="relative">
                  <div className={`rounded-2xl overflow-hidden aspect-square bg-gradient-to-br ${selectedService.color} p-4 sm:p-6 flex items-center justify-center shadow-lg`}>
                    <div className="text-white text-center">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 mx-auto mb-4 sm:mb-6 flex items-center justify-center">
                        {selectedService.icon}
                      </div>
                      <h4 className="text-lg sm:text-xl md:text-2xl font-bold mb-2">{selectedService.title}</h4>
                      <p className="text-sm sm:text-base opacity-80">Uzman ekibimizle profesyonel çözümler sunuyoruz.</p>
                    </div>
                  </div>
                  
                  {/* Decorative elements */}
                  <div className="absolute -top-4 -right-4 w-20 h-20 rounded-lg bg-white/10 -z-10"></div>
                  <div className="absolute -bottom-4 -left-4 w-20 h-20 rounded-lg bg-white/10 -z-10"></div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-secondary-600 max-w-3xl mx-auto mb-4 sm:mb-6">
            Projeleriniz için özel çözümler geliştiriyor, markanızı dijital dünyada öne çıkaracak stratejiler sunuyoruz.
          </p>
          <a 
            href="#portfolio" 
            className="inline-flex items-center font-medium text-primary-600 hover:text-primary-700 transition-colors"
          >
            <span>Çalışmalarımızı inceleyin</span>
            <HiOutlineArrowRight className="ml-2 w-5 h-5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
