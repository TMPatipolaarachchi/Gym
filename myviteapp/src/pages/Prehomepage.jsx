import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import bodybuilderImage from '../assets/sudda.png'; 


const Prehomepage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  const sections = [
    {
      title: 'Supplement',
      image: 'https://www.stack3d.com/cdn-cgi/image/w=840,q=50,f=auto/wp-content/uploads/2016/05/alphaprowhey.jpg',
      route: '/addsuplement',
      color: 'from-blue-900/70',
      bgColor: 'bg-blue-800',
    },
    {
      title: 'machine',
      image: 'https://reconhf.com/cdn/shop/products/safety-squat-machine-277759.jpg?v=1709247893&width=1800',
      route: '/#',
      color: 'from-blue-900/70',
      bgColor: 'bg-blue-800',
    },
    {
      title: 'workout', 
      image: 'https://fitnessvolt.com/wp-content/uploads/2022/07/Bench-Press-By-Age-1024x576.jpg',
      route: '/#',
      color: 'from-blue-900/70',
      bgColor: 'bg-blue-800',
    },
    {
      title: 'protein',
      image: 'https://www.touchinghearts.com/nyc/wp-content/uploads/sites/44/2023/09/bigstock-Healthy-Eating-And-Diet-Concep-354440129-1.jpg',
      route: '/#',
      color: 'from-blue-900/70',
      bgColor: 'bg-blue-800',
    },
  ];

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);

  }, []);


 if (isLoading) {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-900 to-blue-800 flex items-center justify-center z-50">
      <div className="text-center relative w-full h-full">
        
        <div className="absolute inset-0 flex items-center justify-center">
          <img
            src={bodybuilderImage}
            alt="Bodybuilder loading"
            className="max-w-[100px] max-h-[100px] object-contain animate-pulse opacity-80"
          />
          <div className="absolute inset-0 bg-blue-900/70"></div>
        </div>


      </div>
    </div>
  );
}




  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 overflow-hidden relative">
  
    <div className="grid grid-cols-1 lg:grid-cols-2 fixed inset-0 z-10 overflow-auto gap-0 p-2">
        {sections.map((section, index) => (
          <div
            key={index}
            className="relative overflow-hidden shadow-2xl transform transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl border border-black"
          >
            <div className="aspect-video w-full relative bg-gray-800">
              <div className="w-full h-full overflow-hidden">
                <img
                  src={section.image}
                  alt={`${section.title} Demo`}
                  className="absolute inset-0 w-full h-full object-cover scale-105"
                />
              </div>

            
              <div className={`absolute inset-0 bg-gradient-to-t ${section.color}`}></div>
            </div>

       
            <div className="absolute inset-0 flex flex-col items-center justify-end pb-10 px-6 text-center">

              <button
                onClick={() => navigate(section.route)}
                className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-medium px-8 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 focus:ring-4 focus:ring-cyan-400/50 focus:outline-none shadow-lg flex items-center group"
                aria-label={`Navigate to ${section.title}`}
              >
                <span className="group-hover:translate-x-1 transition-transform">Explore {section.title}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 ml-3 group-hover:translate-x-1 transition-transform"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>

     
      <div className="fixed inset-0 overflow-hidden z-0">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-cyan-500/10 to-blue-500/10 animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 300 + 100}px`,
              height: `${Math.random() * 300 + 100}px`,
              animationDuration: `${Math.random() * 10 + 10}s`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Prehomepage;
