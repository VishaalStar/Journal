import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";

const Home : React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  const slides = [
    {
      image: "COORG.jpg",
      title: "Coorg, Karnataka",
      subtitle: "Scotland of India",
    },
    {
      image: "DARJEELING.jpg",
      title: "Darjeeling, West Bengal",
      subtitle: "Queen of Hills",
    },
    {
      image: "GANGTOK.jpg",
      title: "Gangtok, Sikkim",
      subtitle: "City of Monasteries",
    },
    {
      image: "SHILLONG.jpg",
      title: "Shillong, Meghalaya",
      subtitle: "Scotland of East",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer); // Clear interval on unmount
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll); // Cleanup
  }, []);

  return (
    <>
    <Navbar   isScrolled={isScrolled} />
    <section className="relative min-h-[100vh] w-full flex items-center justify-center overflow-hidden">
      {/* Background Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            currentSlide === index ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
          style={{
            backgroundImage: `url('${slide.image}')`,
            backgroundSize: "cover",
            backgroundPosition: "center center",
          }}
        >
          {/* Content Below Image */}
          <div className="absolute bottom-10 w-full text-center text-white">
            <h1 className="text-[2rem] sm:text-[2.5rem] md:text-[3.5rem] lg:text-[4.5rem] font-serif mb-2">
              {slide.title}
            </h1>
            <p className="text-xl sm:text-2xl opacity-80">{slide.subtitle}</p>
          </div>
        </div>
      ))}

      {/* Carousel Indicators */}
      <div className="absolute bottom-4 flex justify-center space-x-2 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              currentSlide === index ? "bg-white/40 w-5" : "bg-white/20"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
    </>
  );
};

export default Home;
