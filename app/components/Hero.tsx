
"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const slides = [
  {
    image: "/slide1.jpg",
    title: "A MECHANIC \n YOU CAN TRUST",
    desc:
      "Professional auto repair services with certified technicians and advanced diagnostic tools to keep your vehicle running safely.",
  },
  {
    image: "/slide2.jpg",
    title: "TOP NOTCH SERVICE \n IS OUR MAIN AUTO MOTIVE",
    desc:
      "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form.",
  },
];

export default function HomeHero() {
  const [activeSlide, setActiveSlide] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // 5s auto slide

    return () => clearInterval(timer);
  }, []);

  const handleReadMore = () => {
    router.push("/about");
  };

  return (
    <section className="relative h-[90vh] w-full overflow-hidden pt-28">

      {/* BACKGROUND SLIDES */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${activeSlide === index ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
        >
          <Image
            src={slide.image}
            alt="Hero Slide"
            fill
            priority={index === 0}
            className="object-cover"
          />
        </div>
      ))}

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/70 z-20" />

      {/* CONTENT CONTAINER */}
      <div className="relative z-30 h-full flex items-center">
        <div className="max-w-7xl mx-auto w-full px-4 md:px-30">

          {/* HERO CONTENT */}
          <div
            key={activeSlide}
            className="relative max-w-2xl pl-4 md:pl-6 border-l-[6px] md:border-l-[10px] border-red-600
                       animate-hero"
          >
            <h1 className="text-white text-3xl md:text-5xl font-bold leading-tight mb-3 md:mb-4 whitespace-pre-line">
              {slides[activeSlide].title}
            </h1>

            <p className="text-gray-200 text-xs md:text-base max-w-md mb-4 md:mb-6">
              {slides[activeSlide].desc}
            </p>

            <button
              onClick={handleReadMore}
              className="bg-red-600 text-white px-5 md:px-7 py-2.5 md:py-3 text-xs font-semibold
                         tracking-widest uppercase hover:bg-black transition"
            >
              Read More
            </button>

          </div>

        </div>
      </div>

      {/* DOT INDICATORS */}
      <div className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 z-40 flex gap-2 md:gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveSlide(i)}
            className={`w-2.5 md:w-3 h-2.5 md:h-3 rounded-full transition ${activeSlide === i ? "bg-red-600 scale-125" : "bg-white/50"
              }`}
          />
        ))}
      </div>

    </section>
  );
}
