export default function Loading() {
  return (
    <div className="min-h-screen bg-secondary-50 flex items-center justify-center">
      <div className="text-center">
        {/* Logo Animasyonu */}
        <div className="mb-8">
          <div className="text-3xl font-bold">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-primary-800">
              Vien
            </span>
            <span className="text-secondary-800">
              Dijital
            </span>
          </div>
        </div>

        {/* Loading Spinner */}
        <div className="relative">
          <div className="w-16 h-16 border-4 border-secondary-200 border-t-primary-600 rounded-full animate-spin mx-auto mb-4"></div>
          
          {/* Pulse Effect */}
          <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-primary-400 rounded-full animate-ping mx-auto"></div>
        </div>

        {/* Loading Text */}
        <p className="text-secondary-600 text-lg font-medium">
          Yükleniyor...
        </p>
        
        {/* Loading Dots */}
        <div className="flex justify-center space-x-1 mt-4">
          <div className="w-2 h-2 bg-primary-600 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-primary-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-2 h-2 bg-primary-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>
    </div>
  );
}
