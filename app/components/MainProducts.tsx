// "use client";

// import Image from "next/image";
// import Link from "next/link";

// const products = [
//   {
//     id: "tyres",
//     title: "Premium Tyres",
//     subtitle: "All Brands • All Sizes • Best Prices",
//     image: "/tyres.png",
//     link: "/products/tyres",
//   },
//   {
//     id: "engine-oils",
//     title: "Engine Oils",
//     subtitle: "Synthetic • Semi-Synthetic • Mineral",
//     image: "/products/oils.jpg",
//     link: "/products/oils",
//   },
// ];

// export default function MainProducts() {
//   return (
//     <section className="py-28 bg-white">
//       <div className="max-w-7xl mx-auto px-6">

//         {/* HEADER */}
//         <div className="text-center max-w-3xl mx-auto mb-20">
//           <span className="text-sm tracking-widest uppercase text-gray-500">
//             Our Main Products
//           </span>

//           <h2 className="mt-3 text-3xl md:text-4xl font-bold text-gray-900">
//             Premium Tyres & Engine Oils
//           </h2>

//           <p className="mt-6 text-[15px] leading-7 text-gray-600">
//             Explore our high-quality range of tyres and engine oils designed
//             to enhance your vehicle’s performance, safety, and longevity.
//           </p>
//         </div>

//         {/* GRID */}
//         <div className="grid gap-10 md:grid-cols-2">

//           {products.map((p) => (
//             <div
//               key={p.id}
//               className="relative group h-[420px] rounded-2xl overflow-hidden
//                          transition-all duration-700
//                          hover:-translate-y-3 hover:shadow-2xl"
//             >

//               {/* IMAGE */}
//               <Image
//                 src={p.image}
//                 alt={p.title}
//                 fill
//                 className="object-cover transition-transform duration-700
//                            group-hover:scale-110"
//               />

//               {/* DARK OVERLAY */}
//               <div className="absolute inset-0 bg-black/60
//                               group-hover:bg-black/70 transition" />

//               {/* CONTENT */}
//               <div className="relative z-10 h-full flex flex-col
//                               justify-end p-10">

//                 <h3 className="text-white text-3xl font-bold mb-2">
//                   {p.title}
//                 </h3>

//                 <p className="text-gray-200 mb-6">
//                   {p.subtitle}
//                 </p>

//                 <Link
//                   href={p.link}
//                   className="inline-block w-fit bg-red-600 text-white
//                              px-8 py-3 text-xs font-semibold
//                              tracking-widest uppercase
//                              hover:bg-black transition"
//                 >
//                   View Products
//                 </Link>

//               </div>

//             </div>
//           ))}

//         </div>

//       </div>
//     </section>
//   );
// }

























































// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import { Check } from "lucide-react";

// export default function MainProducts() {
//   return (
//     <section className="relative py-28 bg-[#111827] text-white overflow-hidden">

//       {/* SUBTLE TEXTURE */}
//       <div
//         className="absolute inset-0 opacity-20"
//         style={{
//           backgroundImage: "url('/dots.png')",
//           backgroundRepeat: "repeat",
//         }}
//       />

//       <div className="relative z-10 max-w-7xl mx-auto px-6">

//         {/* HERO PRODUCT */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">

//           {/* TEXT */}
//           <div>
//             <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
//               Engineered for Performance. <br />
//               Trusted on Every Road.
//             </h2>

//             <p className="text-gray-300 max-w-xl mb-8">
//               Premium Tyres & Engine Oils tested for Indian roads and extreme
//               conditions.
//             </p>

//             <ul className="space-y-3 mb-10">
//               {[
//                 "Tested in real-world conditions",
//                 "OEM-Grade Quality",
//                 "Used by Professionals & Fleets",
//               ].map((item, i) => (
//                 <li key={i} className="flex items-center gap-3 text-gray-200">
//                   <Check className="text-red-500 w-5 h-5" />
//                   {item}
//                 </li>
//               ))}
//             </ul>

//             <div className="flex flex-wrap gap-4">
//               <Link
//                 href="/products/tyres"
//                 className="bg-red-600 text-white px-7 py-3 text-sm font-semibold uppercase tracking-widest
//                            hover:bg-black transition"
//               >
//                 Explore Tyres
//               </Link>

//               <Link
//                 href="/products/engine-oils"
//                 className="border border-gray-400 px-7 py-3 text-sm font-semibold uppercase tracking-widest
//                            hover:bg-white hover:text-black transition"
//               >
//                 Explore Engine Oils
//               </Link>
//             </div>
//           </div>

//           {/* IMAGE */}
//           <div className="relative flex justify-center">
//             <div className="relative w-full max-w-md">
//               <Image
//                 src="/tyre6.png"
//                 alt="Premium Tyre"
//                 width={3620}
//                 height={920}
//                 className="relative z-10"
//               />

//               {/* <Image
//                 src="/oil.png"
//                 alt="Premium Engine Oil"
//                 width={500}
//                 height={500}
//                 className="absolute bottom-0 right-0 translate-x-10 translate-y-10"
//               /> */}
//             </div>
//           </div>
//         </div>

//         {/* COMMITMENT */}
//         <div className="text-center max-w-3xl mx-auto mb-20">
//           <h3 className="text-3xl font-semibold mb-6">
//             Our Commitment to Quality
//           </h3>

//           <p className="text-gray-300 leading-7">
//             We create products for those who value reliability and performance.
//             Every tyre and oil is tested to ensure it meets our high standards.
//           </p>
//         </div>

//         {/* PRODUCT CARDS */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24">

//           {/* TYRES CARD */}
//           <div className="relative bg-[#1f2933] rounded-xl p-10 overflow-hidden
//                           transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl">

//             <h4 className="text-2xl font-semibold mb-6">
//               High-Performance Tyres
//             </h4>

//             <ul className="space-y-3 mb-8">
//               {[
//                 "Superior Road Grip & Stability",
//                 "Longer Tread Life",
//                 "Built for Indian Roads",
//               ].map((item, i) => (
//                 <li key={i} className="flex items-center gap-3 text-gray-200">
//                   <Check className="text-red-500 w-5 h-5" />
//                   {item}
//                 </li>
//               ))}
//             </ul>

//             <Link
//               href="/products/tyres"
//               className="inline-block bg-red-600 text-white px-7 py-3 text-xs font-semibold
//                          tracking-widest uppercase hover:bg-black transition"
//             >
//               View Tyre Range
//             </Link>

//             <Image
//               src="/tyre9.png"
//               alt="Tyres"
//               width={220}
//               height={220}
//               className="absolute right-6 bottom-6 opacity-90"
//             />
//           </div>

//           {/* OILS CARD */}
//           <div className="relative bg-[#1f2933] rounded-xl p-10 overflow-hidden
//                           transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl">

//             <h4 className="text-2xl font-semibold mb-6">
//               Advanced Engine Oils
//             </h4>

//             <ul className="space-y-3 mb-8">
//               {[
//                 "Improves Engine Life",
//                 "Reduces Wear & Overheating",
//                 "Optimized for Modern Engines",
//               ].map((item, i) => (
//                 <li key={i} className="flex items-center gap-3 text-gray-200">
//                   <Check className="text-red-500 w-5 h-5" />
//                   {item}
//                 </li>
//               ))}
//             </ul>

//             <Link
//               href="/products/engine-oils"
//               className="inline-block bg-red-600 text-white px-7 py-3 text-xs font-semibold
//                          tracking-widest uppercase hover:bg-black transition"
//             >
//               View Engine Oil Range
//             </Link>

//             <Image
//               src="/oil.png"
//               alt="Engine Oils"
//               width={300}
//               height={400}
//               className="absolute right-6 bottom-6 opacity-90"
//             />
//           </div>

//         </div>

//         {/* BADGES */}
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-center">

//           {[
//             { label: "ISO Certified", icon: "/iso.png" },
//             { label: "Rigorous Testing", icon: "/testing.png" },
//             { label: "20+ Years of Expertise", icon: "/experience.png" },
//             { label: "Trusted by Fleet Owners", icon: "/fleet.png" },
//           ].map((badge, i) => (
//             <div key={i} className="flex flex-col items-center gap-4">
//               <Image
//                 src={badge.icon}
//                 alt={badge.label}
//                 width={60}
//                 height={60}
//               />
//               <span className="text-gray-300 text-sm">{badge.label}</span>
//             </div>
//           ))}

//         </div>

//       </div>
//     </section>
//   );
// }





































// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import { Check } from "lucide-react";

// export default function MainProducts() {
//   return (
//     <section
//       className="relative py-28 text-white overflow-hidden"
//       style={{
//         background: "linear-gradient(135deg, #1f2933 0%, #111827 100%)",
//       }}
//     >
//       {/* SUBTLE TEXTURE (LIGHTER NOW) */}
//       <div
//         className="absolute inset-0 opacity-10"
//         style={{
//           backgroundImage: "url('/dots.png')",
//           backgroundRepeat: "repeat",
//         }}
//       />

//       <div className="relative z-10 max-w-7xl mx-auto px-6">

//         {/* HERO PRODUCT */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">

//           {/* TEXT */}
//           <div>
//             <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
//               Engineered for Performance. <br />
//               Trusted on Every Road.
//             </h2>

//             <p className="text-gray-300 max-w-xl mb-8">
//               Premium Tyres & Engine Oils tested for Indian roads and extreme
//               conditions.
//             </p>

//             <ul className="space-y-3 mb-10">
//               {[
//                 "Tested in real-world conditions",
//                 "OEM-Grade Quality",
//                 "Used by Professionals & Fleets",
//               ].map((item, i) => (
//                 <li key={i} className="flex items-center gap-3 text-gray-200">
//                   <Check className="text-red-500 w-5 h-5" />
//                   {item}
//                 </li>
//               ))}
//             </ul>

//             <div className="flex flex-wrap gap-4">
//               <Link
//                 href="/products/tyres"
//                 className="bg-red-600 text-white px-7 py-3 text-sm font-semibold uppercase tracking-widest
//                            hover:bg-black transition"
//               >
//                 Explore Tyres
//               </Link>

//               <Link
//                 href="/products/engine-oils"
//                 className="border border-gray-400 px-7 py-3 text-sm font-semibold uppercase tracking-widest
//                            hover:bg-white hover:text-black transition"
//               >
//                 Explore Engine Oils
//               </Link>
//             </div>
//           </div>

//           {/* IMAGE - BIGGER & CLEAN */}
//           <div className="relative flex justify-center">
//             <div className="relative w-full max-w-xl">
//               <Image
//                 src="/tyre6.png"
//                 alt="Premium Tyre"
//                 width={800}
//                 height={600}
//                 className="relative z-10 scale-110"
//                 priority
//               />
//             </div>
//           </div>
//         </div>

//         {/* COMMITMENT */}
//         <div className="text-center max-w-3xl mx-auto mb-20">
//           <h3 className="text-3xl font-semibold mb-6">
//             Our Commitment to Quality
//           </h3>

//           <p className="text-gray-300 leading-7">
//             We create products for those who value reliability and performance.
//             Every tyre and oil is tested to ensure it meets our high standards.
//           </p>
//         </div>

//         {/* PRODUCT CARDS */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24">

//           {/* TYRES CARD */}
//           <div className="relative bg-[#1f2933] rounded-xl p-10 overflow-hidden
//                           transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl">

//             <h4 className="text-2xl font-semibold mb-6">
//               High-Performance Tyres
//             </h4>

//             <ul className="space-y-3 mb-8">
//               {[
//                 "Superior Road Grip & Stability",
//                 "Longer Tread Life",
//                 "Built for Indian Roads",
//               ].map((item, i) => (
//                 <li key={i} className="flex items-center gap-3 text-gray-200">
//                   <Check className="text-red-500 w-5 h-5" />
//                   {item}
//                 </li>
//               ))}
//             </ul>

//             <Link
//               href="/products/tyres"
//               className="inline-block bg-red-600 text-white px-7 py-3 text-xs font-semibold
//                          tracking-widest uppercase hover:bg-black transition"
//             >
//               View Tyre Range
//             </Link>

//             <Image
//               src="/tyre9.png"
//               alt="Tyres"
//               width={240}
//               height={240}
//               className="absolute right-6 bottom-6 opacity-90"
//             />
//           </div>

//           {/* OILS CARD */}
//           <div className="relative bg-[#1f2933] rounded-xl p-10 overflow-hidden
//                           transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl">

//             <h4 className="text-2xl font-semibold mb-6">
//               Advanced Engine Oils
//             </h4>

//             <ul className="space-y-3 mb-8">
//               {[
//                 "Improves Engine Life",
//                 "Reduces Wear & Overheating",
//                 "Optimized for Modern Engines",
//               ].map((item, i) => (
//                 <li key={i} className="flex items-center gap-3 text-gray-200">
//                   <Check className="text-red-500 w-5 h-5" />
//                   {item}
//                 </li>
//               ))}
//             </ul>

//             <Link
//               href="/products/engine-oils"
//               className="inline-block bg-red-600 text-white px-7 py-3 text-xs font-semibold
//                          tracking-widest uppercase hover:bg-black transition"
//             >
//               View Engine Oil Range
//             </Link>

//             <Image
//               src="/oil.png"
//               alt="Engine Oils"
//               width={300}
//               height={420}
//               className="absolute right-6 bottom-6 opacity-90"
//             />
//           </div>

//         </div>

//         {/* BADGES */}
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-center">

//           {[
//             { label: "ISO Certified", icon: "/iso.png" },
//             { label: "Rigorous Testing", icon: "/testing.png" },
//             { label: "20+ Years of Expertise", icon: "/experience.png" },
//             { label: "Trusted by Fleet Owners", icon: "/fleet.png" },
//           ].map((badge, i) => (
//             <div key={i} className="flex flex-col items-center gap-4">
//               <Image
//                 src={badge.icon}
//                 alt={badge.label}
//                 width={60}
//                 height={60}
//               />
//               <span className="text-gray-300 text-sm">{badge.label}</span>
//             </div>
//           ))}

//         </div>

//       </div>
//     </section>
//   );
// }
























// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import { Check } from "lucide-react";

// export default function MainProducts() {
//   return (
//     <section
//       className="relative py-28 text-white overflow-hidden"
//       style={{
//         background: "linear-gradient(135deg, #1f2933 0%, #111827 100%)",
//       }}
//     >
//       {/* SUBTLE TEXTURE */}
//       <div
//         className="absolute inset-0 opacity-10"
//         style={{
//           backgroundImage: "url('/dots.png')",
//           backgroundRepeat: "repeat",
//         }}
//       />

//       <div className="relative z-10 max-w-7xl mx-auto px-6">

//         {/* HERO PRODUCT */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">

//           {/* TEXT */}
//           <div className="animate-fade-up">
//             <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
//               Engineered for Performance. <br />
//               Trusted on Every Road.
//             </h2>

//             <p className="text-gray-300 max-w-xl mb-8">
//               Premium Tyres & Engine Oils tested for Indian roads and extreme
//               conditions.
//             </p>

//             <ul className="space-y-3 mb-10">
//               {[
//                 "Tested in real-world conditions",
//                 "OEM-Grade Quality",
//                 "Used by Professionals & Fleets",
//               ].map((item, i) => (
//                 <li key={i} className="flex items-center gap-3 text-gray-200">
//                   <Check className="text-red-500 w-5 h-5" />
//                   {item}
//                 </li>
//               ))}
//             </ul>

//             <div className="flex flex-wrap gap-4">
//               <Link
//                 href="/products/tyres"
//                 className="bg-red-600 text-white px-7 py-3 text-sm font-semibold uppercase tracking-widest
//                            hover:bg-black transition"
//               >
//                 Explore Tyres
//               </Link>

//               <Link
//                 href="/products/engine-oils"
//                 className="border border-gray-400 px-7 py-3 text-sm font-semibold uppercase tracking-widest
//                            hover:bg-white hover:text-black transition"
//               >
//                 Explore Engine Oils
//               </Link>
//             </div>
//           </div>

//           {/* IMAGE AREA */}
//           <div className="relative flex justify-center spotlight">

//             {/* Floating Product */}
//             <div className="relative w-full max-w-xl animate-float z-10">
//               <Image
//                 src="/tyre6.png"
//                 alt="Premium Tyre"
//                 width={900}
//                 height={650}
//                 className="relative z-10"
//                 priority
//               />
//             </div>

//           </div>
//         </div>

//         {/* COMMITMENT */}
//         <div className="text-center max-w-3xl mx-auto mb-20 animate-fade-up">
//           <h3 className="text-3xl font-semibold mb-6">
//             Our Commitment to Quality
//           </h3>

//           <p className="text-gray-300 leading-7">
//             We create products for those who value reliability and performance.
//             Every tyre and oil is tested to ensure it meets our high standards.
//           </p>
//         </div>

//         {/* PRODUCT CARDS */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24">

//           {/* TYRES CARD */}
//           <div className="relative bg-[#1f2933] rounded-xl p-10 overflow-hidden
//                           transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl">

//             <h4 className="text-2xl font-semibold mb-6">
//               High-Performance Tyres
//             </h4>

//             <ul className="space-y-3 mb-8">
//               {[
//                 "Superior Road Grip & Stability",
//                 "Longer Tread Life",
//                 "Built for Indian Roads",
//               ].map((item, i) => (
//                 <li key={i} className="flex items-center gap-3 text-gray-200">
//                   <Check className="text-red-500 w-5 h-5" />
//                   {item}
//                 </li>
//               ))}
//             </ul>

//             <Link
//               href="/products/tyres"
//               className="inline-block bg-red-600 text-white px-7 py-3 text-xs font-semibold
//                          tracking-widest uppercase hover:bg-black transition"
//             >
//               View Tyre Range
//             </Link>

//             <Image
//               src="/tyre9.png"
//               alt="Tyres"
//               width={240}
//               height={240}
//               className="absolute right-6 bottom-6 opacity-90"
//             />
//           </div>

//           {/* OILS CARD */}
//           <div className="relative bg-[#1f2933] rounded-xl p-10 overflow-hidden
//                           transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl">

//             <h4 className="text-2xl font-semibold mb-6">
//               Advanced Engine Oils
//             </h4>

//             <ul className="space-y-3 mb-8">
//               {[
//                 "Improves Engine Life",
//                 "Reduces Wear & Overheating",
//                 "Optimized for Modern Engines",
//               ].map((item, i) => (
//                 <li key={i} className="flex items-center gap-3 text-gray-200">
//                   <Check className="text-red-500 w-5 h-5" />
//                   {item}
//                 </li>
//               ))}
//             </ul>

//             <Link
//               href="/products/engine-oils"
//               className="inline-block bg-red-600 text-white px-7 py-3 text-xs font-semibold
//                          tracking-widest uppercase hover:bg-black transition"
//             >
//               View Engine Oil Range
//             </Link>

//             <Image
//               src="/oil.png"
//               alt="Engine Oils"
//               width={300}
//               height={420}
//               className="absolute right-6 bottom-6 opacity-90"
//             />
//           </div>

//         </div>

//         {/* BADGES */}
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-center animate-fade-up">

//           {[
//             { label: "ISO Certified", icon: "/iso.png" },
//             { label: "Rigorous Testing", icon: "/testing.png" },
//             { label: "20+ Years of Expertise", icon: "/experience.png" },
//             { label: "Trusted by Fleet Owners", icon: "/fleet.png" },
//           ].map((badge, i) => (
//             <div key={i} className="flex flex-col items-center gap-4">
//               <Image
//                 src={badge.icon}
//                 alt={badge.label}
//                 width={60}
//                 height={60}
//               />
//               <span className="text-gray-300 text-sm">{badge.label}</span>
//             </div>
//           ))}

//         </div>

//       </div>
//     </section>
//   );
// }

































"use client";

import Image from "next/image";
import Link from "next/link";
import { Check } from "lucide-react";

export default function MainProducts() {
  return (
    <section
      className="relative py-28 text-white overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #2a3640 0%, #1f2a30 100%)",
      }}
    >
      {/* SUBTLE TEXTURE */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: "url('/dots.png')",
          backgroundRepeat: "repeat",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">

        {/* SECTION TITLE */}
        <div className="text-center mb-20 animate-fade-up">
          <span className="text-sm tracking-widest uppercase text-red-500">
            Our Main Products
          </span>

          <h2 className="mt-4 text-4xl md:text-5xl font-bold text-white">
            Premium Tyres & Engine Oils
          </h2>

          <p className="mt-6 text-gray-300 max-w-2xl mx-auto">
            Designed for reliability, performance and long life on every drive.
          </p>
        </div>

        {/* HERO PRODUCT */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">

          {/* TEXT */}
          <div className="animate-fade-up">
            <h3 className="text-3xl md:text-4xl font-bold leading-tight mb-6 text-white">
              Built for Performance. <br />
              Trusted Everywhere.
            </h3>

            <p className="text-gray-300 max-w-xl mb-8">
              Premium Tyres & Engine Oils tested for Dubai roads and extreme
              conditions.
            </p>

            <ul className="space-y-3 mb-10">
              {[
                "Tested in real-world conditions",
                "OEM-Grade Quality",
                "Used by Professionals & Fleets",
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-gray-200">
                  <Check className="text-red-500 w-5 h-5" />
                  {item}
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/mainproducts/tyre"
                className="bg-red-600 text-white px-7 py-3 text-sm font-semibold uppercase tracking-widest
                           hover:bg-black transition"
              >
                Explore Tyres
              </Link>

              <Link
                href="/mainproducts/oil"
                className="border border-gray-400 text-white px-7 py-3 text-sm font-semibold uppercase tracking-widest
                           hover:bg-white hover:text-black transition"
              >
                Explore Engine Oils
              </Link>
            </div>
          </div>

          {/* IMAGE */}
          <div className="relative flex justify-center ">
            <div className="relative w-full max-w-xl animate-float z-10">
              <Image
                src="/tyre6.png"
                alt="Premium Tyre and Engine Oil"
                width={900}
                height={650}
                className="relative z-10"
                priority
              />
            </div>
          </div>
        </div>

        {/* COMMITMENT */}
        <div className="text-center max-w-3xl mx-auto mb-20 animate-fade-up">
          <h3 className="text-3xl font-semibold mb-6 text-white">
            Our Commitment to Quality
          </h3>

          <p className="text-gray-300 leading-7">
            We create products for those who value reliability and performance.
            Every tyre and oil is tested to ensure it meets our high standards.
          </p>
        </div>

        {/* PRODUCT CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24">

          {/* TYRES CARD */}
          <div className="relative bg-[#24303a] rounded-xl p-10 overflow-hidden
                          transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl">

            <h4 className="text-2xl font-semibold mb-6 text-white">
              High-Performance Tyres
            </h4>

            <ul className="space-y-3 mb-8">
              {[
                "Superior Road Grip & Stability",
                "Longer Tread Life",
                "Built for Dubai Roads",
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-gray-200">
                  <Check className="text-red-500 w-5 h-5" />
                  {item}
                </li>
              ))}
            </ul>

            <Link
              href="/mainproducts/tyre"
              className="inline-block bg-red-600 text-white px-7 py-3 text-xs font-semibold
                         tracking-widest uppercase hover:bg-black transition"
            >
              View Tyre Range
            </Link>

            <Image
              src="/tyre9.png"
              alt="Tyres"
              width={240}
              height={240}
              className="absolute right-6 bottom-6 opacity-90"
            />
          </div>

          {/* OILS CARD */}
          <div className="relative bg-[#24303a] rounded-xl p-10 overflow-hidden
                          transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl">

            <h4 className="text-2xl font-semibold mb-6 text-white">
              Advanced Engine Oils
            </h4>

            <ul className="space-y-3 mb-8">
              {[
                "Improves Engine Life",
                "Reduces Wear & Overheating",
                "Optimized for Modern Engines",
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-gray-200">
                  <Check className="text-red-500 w-5 h-5" />
                  {item}
                </li>
              ))}
            </ul>

            <Link
              href="/mainproducts/oil"
              className="inline-block bg-red-600 text-white px-7 py-3 text-xs font-semibold
                         tracking-widest uppercase hover:bg-black transition"
            >
              View Engine Oil Range
            </Link>

            <Image
              src="/Oil.png"
              alt="Engine Oils"
              width={300}
              height={420}
              className="absolute right-6 bottom-6 opacity-90"
            />
          </div>

        </div>



      </div>
    </section>
  );
}
