import { useState, useEffect } from "react";

const slides = [
  "https://images.unsplash.com/photo-1490750967868-88aa4486c946?ixlib=rb-4.0.3",
  "https://images.unsplash.com/photo-1606041008023-472dfb5e530f?ixlib=rb-4.0.3", 
  "https://images.unsplash.com/photo-1524598171353-ce84a157ed05?ixlib=rb-4.0.3"
];

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 7000);

    return () => clearInterval(timer);
  }, []);

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };
  return (
    <div className="relative w-full h-[400px] overflow-hidden rounded-xl">
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <img
            key={index}
            src={slide}
            alt={`Flower ${index + 1}`}
            className="w-full h-[400px] object-cover flex-shrink-0"
          />
        ))}
      </div>

      <button
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/50 hover:bg-white/75 p-2 rounded-full"
        onClick={handlePrevSlide}
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </button>

      <button
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/50 hover:bg-white/75 p-2 rounded-full"
        onClick={handleNextSlide}
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </button>
    </div>
  )
}

export default Carousel