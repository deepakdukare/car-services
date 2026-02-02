"use client";

import Image from "next/image";
import { siteConfig } from "@/data/site";

const points = [
  "To facilitate even energy distribution so your vehicle's battery is properly charged.",
  "Avoid breaking down in your vehicle by maintaining its belts and hoses.",
  "Failing an emissions test is usually the fault of either the muffler or the exhaust system.",
  "The performance of the engine, alternator, and secondary electrical systems depend on the battery.",
  "Regular tire inspection and timely repair can help keep you driving safely.",
  "Experience a smooth, controlled ride with a properly functioning suspension system.",
];

export default function WhyChooseUs() {
  return (
    <section className="relative py-24 bg-white overflow-hidden">

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-0 items-stretch">

        {/* LEFT SIDE */}
        <div className="relative py-10 overflow-hidden">

          {/* BACKGROUND IMAGE (COVERS ONLY LEFT SECTION) */}
          <div className="absolute inset-0">
            <Image
              src="/car1.png"
              alt="Workshop Background"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* BRIGHT OVERLAY */}
          <div className="absolute inset-0 bg-white/70" />

          {/* CONTENT */}
          <div className="relative z-10 px-10">

            <span className="text-sm tracking-widest uppercase text-red-600 font-semibold">
              Why Choose Us
            </span>

            <h2 className="mt-3 text-3xl md:text-4xl font-bold tracking-wide text-gray-900">
              Why People Choose Us
            </h2>

            <div className="mt-10 space-y-7">

              {points.map((text, i) => (
                <div
                  key={i}
                  className="group flex items-start gap-5 transition-all duration-400 hover:translate-x-2"
                >
                  {/* NUMBER */}
                  <div
                    className="w-10 h-10 rounded-full bg-gray-200 text-gray-700
                               flex items-center justify-center text-sm font-semibold
                               transition-all duration-400
                               group-hover:bg-red-600 group-hover:text-white"
                  >
                    {i + 1}
                  </div>

                  {/* TEXT */}
                  <p className="text-gray-700 leading-6 text-sm">
                    {text}
                  </p>
                </div>
              ))}

            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="relative flex flex-col">

          {/* IMAGE */}
          <div className="relative w-full h-[300px]">
            <Image
              src="/services/engine/timing-belt-drive.png"
              alt="Why Choose Us"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* RED CTA PANEL */}
          <div className="bg-red-600 text-white px-10 py-10 flex-1 flex flex-col justify-between">

            <div>
              <h3 className="text-2xl font-bold mb-3">
                Want To Talk?
              </h3>

              <p className="text-3xl font-semibold mb-5">
                CALL: {siteConfig.phone}
              </p>

              <p className="text-sm leading-6 opacity-90">
                Need a special repair service? We are happy to fulfill every request
                in order to exceed your expectations.
              </p>
            </div>

            <a
              href="/contact"
              className="inline-block bg-[#1f2a30] text-white
                         px-9 py-3 text-xs font-semibold tracking-widest uppercase
                         transition-all duration-300
                         hover:bg-black hover:scale-105 w-fit mt-8"
            >
              Book An Appointment
            </a>

          </div>
        </div>

      </div>
    </section>
  );
}
