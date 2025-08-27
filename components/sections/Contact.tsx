"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  HiOutlineMail, 
  HiOutlinePhone, 
  HiOutlineLocationMarker, 
  HiOutlinePaperAirplane,
  HiOutlineCheck
} from 'react-icons/hi';

export default function Contact() {
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    terms: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : null;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple form validation
    if (!formData.name || !formData.email || !formData.message || !formData.terms) {
      alert("Lütfen tüm zorunlu alanları doldurunuz.");
      return;
    }
    
    setFormStatus('submitting');
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject || 'Genel İletişim',
          message: formData.message,
          category: 'general'
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setFormStatus('success');
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
          terms: false
        });
        
        // Reset form status after 3 seconds
        setTimeout(() => {
          setFormStatus('idle');
        }, 3000);
      } else {
        setFormStatus('error');
        alert(data.error || 'Mesaj gönderilemedi. Lütfen tekrar deneyiniz.');
        
        // Reset error status after 3 seconds
        setTimeout(() => {
          setFormStatus('idle');
        }, 3000);
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setFormStatus('error');
      alert('Bir hata oluştu. Lütfen tekrar deneyiniz.');
      
      // Reset error status after 3 seconds
      setTimeout(() => {
        setFormStatus('idle');
      }, 3000);
    }
  };

  return (
    <section id="contact" className="py-16 sm:py-20 md:py-24 lg:py-32 bg-gradient-to-br from-primary-900 to-secondary-900 text-white relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-2/3 h-2/3 bg-gradient-to-bl from-primary-800/30 to-transparent rounded-bl-full opacity-50" />
        <div className="absolute bottom-0 left-0 w-2/3 h-1/2 bg-gradient-to-tr from-secondary-800/30 to-transparent rounded-tr-full opacity-40" />
        
        {/* Blurred circles */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-primary-700/20 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-primary-700/10 blur-3xl" />
        
        {/* Grid overlay */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10"></div>
      </div>

      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 lg:mb-20"
        >
          <span className="inline-block px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm text-white font-medium text-xs sm:text-sm mb-3 sm:mb-4">İLETİŞİME GEÇİN</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold font-heading mb-4 sm:mb-6">
            Projelerinizi <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-primary-300">Hayata Geçirelim</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/80">
            Dijital dönüşüm yolculuğunuzda yanınızda olmak için sabırsızlanıyoruz. 
            Bize ulaşın, ihtiyaçlarınıza uygun çözümler sunalım.
          </p>
        </motion.div>
        
        <div className="grid lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 items-start">
          {/* Contact information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
            className="lg:col-span-5 xl:col-span-4 order-2 lg:order-1"
          >
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 border border-white/10 h-full">
                              <div className="relative mb-8 sm:mb-12">
                  <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">İletişim Bilgilerimiz</h3>
                  <p className="text-sm sm:text-base text-white/80 mb-6 sm:mb-8">
                  Projeleriniz veya sorularınız hakkında bizimle iletişime geçin. En kısa sürede size dönüş yapacağız.
                </p>
                
                <div className="absolute right-0 top-0 w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-primary-500/20 to-primary-500/5 rounded-full blur-xl -z-10"></div>
              </div>
              
              <div className="space-y-6 sm:space-y-8">
                                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-primary-400 mr-3 sm:mr-5">
                      <HiOutlineMail className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    <div>
                      <h4 className="text-base sm:text-lg font-medium mb-1">Email</h4>
                      <a href="mailto:info@viendigital.com" className="text-sm sm:text-base text-white/80 hover:text-primary-300 transition-colors">
                        info@viendigital.com
                      </a>
                    </div>
                  </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-primary-400 mr-3 sm:mr-5">
                    <HiOutlinePhone className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div>
                    <h4 className="text-base sm:text-lg font-medium mb-1">Telefon</h4>
                    <a href="tel:+903125551234" className="text-sm sm:text-base text-white/80 hover:text-primary-300 transition-colors">
                      +90 (312) 555 12 34
                    </a>
                    <p className="text-white/60 text-xs sm:text-sm mt-1">Pazartesi - Cuma, 09:00 - 18:00</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-primary-400 mr-3 sm:mr-5">
                    <HiOutlineLocationMarker className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div>
                    <h4 className="text-base sm:text-lg font-medium mb-1">Adres</h4>
                    <address className="text-sm sm:text-base text-white/80 not-italic">
                      Kızılay Meydanı, Atatürk Bulvarı No:123<br />
                      06420 Çankaya/Ankara
                    </address>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 sm:mt-10 pt-8 sm:pt-10 border-t border-white/10">
                <h4 className="text-base sm:text-lg font-medium mb-4 sm:mb-5">Bizi Takip Edin</h4>
                <div className="flex space-x-3 sm:space-x-4">
                  <a href="#" className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                    </svg>
                  </a>
                  <a href="#" className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                  <a href="#" className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                    </svg>
                  </a>
                  <a href="#" className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            viewport={{ once: true }}
            className="lg:col-span-7 xl:col-span-8 order-1 lg:order-2"
          >
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 border border-white/10 relative">
              <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-primary-500/10 to-transparent rounded-3xl -z-10"></div>
              
              <h3 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8">Mesaj Gönder</h3>
              
              {formStatus === 'success' ? (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-green-500/20 backdrop-blur-sm border border-green-500/30 rounded-xl sm:rounded-2xl p-6 sm:p-8 text-center"
                >
                                      <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-green-500/30 flex items-center justify-center mx-auto mb-3 sm:mb-4">
                      <HiOutlineCheck className="w-6 h-6 sm:w-8 sm:h-8 text-green-400" />
                    </div>
                    <h4 className="text-lg sm:text-xl font-bold mb-2">Teşekkürler!</h4>
                    <p className="text-sm sm:text-base text-white/80 mb-0">
                    Mesajınız başarıyla iletildi. En kısa sürede size dönüş yapacağız.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="grid md:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
                    <div>
                                              <label htmlFor="name" className="block text-xs sm:text-sm font-medium text-white/80 mb-2">
                          Adınız Soyadınız <span className="text-primary-400">*</span>
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg placeholder-white/40 text-white text-sm sm:text-base focus:ring-2 focus:ring-primary-400 focus:border-primary-500 outline-none transition-colors"
                          placeholder="Adınız Soyadınız"
                          required
                        />
                    </div>
                    <div>
                                              <label htmlFor="email" className="block text-xs sm:text-sm font-medium text-white/80 mb-2">
                          Email Adresiniz <span className="text-primary-400">*</span>
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg placeholder-white/40 text-white text-sm sm:text-base focus:ring-2 focus:ring-primary-400 focus:border-primary-500 outline-none transition-colors"
                          placeholder="Email adresiniz"
                          required
                        />
                    </div>
                  </div>
                  
                  <div className="mb-4 sm:mb-6">
                    <label htmlFor="subject" className="block text-xs sm:text-sm font-medium text-white/80 mb-2">
                      Konu
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg placeholder-white/40 text-white text-sm sm:text-base focus:ring-2 focus:ring-primary-400 focus:border-primary-500 outline-none transition-colors"
                      placeholder="Mesajınızın konusu"
                    />
                  </div>
                  
                  <div className="mb-4 sm:mb-6">
                    <label htmlFor="message" className="block text-xs sm:text-sm font-medium text-white/80 mb-2">
                      Mesajınız <span className="text-primary-400">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg placeholder-white/40 text-white text-sm sm:text-base focus:ring-2 focus:ring-primary-400 focus:border-primary-500 outline-none transition-colors"
                      placeholder="Mesajınızı yazın..."
                      required
                    ></textarea>
                  </div>
                  
                  <div className="flex items-start mb-6 sm:mb-8">
                    <div className="flex items-center h-5">
                      <input
                        id="terms"
                        name="terms"
                        type="checkbox"
                        checked={formData.terms}
                        onChange={handleChange}
                        className="w-4 h-4 bg-white/10 border-white/20 rounded focus:ring-primary-500 text-primary-600"
                        required
                      />
                    </div>
                    <label htmlFor="terms" className="ml-3 text-xs sm:text-sm text-white/70">
                      Kişisel verilerimin korunması kanunu kapsamında <a href="#" className="text-primary-400 hover:text-primary-300">aydınlatma metnini</a> okudum ve kabul ediyorum. <span className="text-primary-400">*</span>
                    </label>
                  </div>
                  
                  <button
                    type="submit"
                    disabled={formStatus === 'submitting'}
                    className={`inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 text-white text-sm sm:text-base font-medium transition-all hover:shadow-lg hover:shadow-primary-500/30 hover:scale-[1.02] active:scale-[0.98] ${
                      formStatus === 'submitting' ? 'opacity-70 cursor-not-allowed' : ''
                    }`}
                  >
                    {formStatus === 'submitting' ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Gönderiliyor...
                      </>
                    ) : (
                      <>
                        <span>Mesaj Gönder</span>
                        <HiOutlinePaperAirplane className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
        
        {/* Map or additional info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-12 sm:mt-16"
        >
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-4 border border-white/10 overflow-hidden h-48 sm:h-64 md:h-72 relative">
            {/* Google Maps iframe - Ankara, Kızılay */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3060.1234567890123!2d32.8597!3d39.9334!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14d347d520732db1%3A0xbdc57b0c0842b8d!2sK%C4%B1z%C4%B1lay%2C%20Ankara!5e0!3m2!1str!2str!4v1234567890123"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-xl"
              title="Vien Dijital - Ankara Ofis"
            ></iframe>
            
            {/* Map overlay with company info */}
            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
                  <HiOutlineLocationMarker className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">Vien Dijital</p>
                  <p className="text-xs text-gray-600">Ankara, Kızılay</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}