






"use client";

import Image from "next/image";

import { coolingSystemServices } from "@/data/coolingServices";
export default function CoolingSystemServicesTable() {
  return (
    <section className="bg-[#1f2a30] py-28 w-full">
      
      {/* INNER CONTAINER */}
      <div className="w-full px-6">
        
        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-3xl md:text-3xl font-bold tracking-widest uppercase text-white">
            Cooling System Services
          </h2>

          <p className="mt-6 text-[15px] leading-7 text-gray-300">
            Cooling System services designed to ensure maximum safety,
            reliability, and smooth braking performance for your vehicle.
          </p>
        </div>

        {/* GRID (FULL WIDTH, CONTROLLED) */}
        <div className="max-w-7xl mx-auto grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          { coolingSystemServices.map((service) => (
            <div
              key={service.title}
              className="bg-white overflow-hidden group"
            >
              {/* IMAGE */}
              <div className="relative h-56 w-full overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* CONTENT */}
              <div className="px-7 py-8">
                <h3 className="text-sm font-semibold tracking-widest uppercase text-gray-900">
                  {service.title}
                </h3>
                  <p className="text-sm text-gray-600 mt-3">
  {service.description}
</p>

                <p className="mt-4 text-[14px] leading-7 text-gray-600">
                  Price: <span className="font-medium">{service.price}</span>
                </p>

                <p className="mt-1 text-[14px] text-gray-600">
                  Time: <span className="font-medium">{service.time}</span>
                </p>

                <button
                  className="
                    inline-block
                    mt-7
                    bg-red-600
                    text-white
                    px-7
                    py-3
                    text-xs
                    font-semibold
                    tracking-widest
                    uppercase
                    hover:bg-black
                    transition
                  "
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
