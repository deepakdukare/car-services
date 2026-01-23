


// "use client";

// import Link from "next/link";
// import { useState } from "react";
// import { ShoppingCart, Menu, X, User } from "lucide-react";

// const navItems = ["Home", "Services", "Our Work", "About", "Contact"];

// export default function Navbar() {
//   const [open, setOpen] = useState(false);

//   return (
//     <header className="fixed top-0 left-0 w-full z-50">
//       <div className="bg-[#F5F5F5] border-b border-gray-300">
//         <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between text-[#111]">

//           {/* LOGO */}
//           <Link href="/" className="flex items-center gap-3">
//             <div className="w-9 h-9 border border-[#111] rounded-full flex items-center justify-center">
//               🔧
//             </div>
//             <span className="text-base sm:text-lg font-semibold tracking-wide">
//               JADE & ANDY
//             </span>
//           </Link>

//           {/* DESKTOP MENU */}
//           <ul className="hidden md:flex items-center gap-10">
//             {navItems.map((item) => (
//               <li key={item} className="relative group">
//                 <Link
//                   href={`/${item === "Home" ? "" : item.toLowerCase().replace(" ", "")}`}
//                   className="
//                     text-sm
//                     font-medium
//                     tracking-wide
//                     transition-colors
//                     group-hover:text-black
//                   "
//                 >
//                   {item}
//                 </Link>

//                 {/* Hover underline */}
//                 <span
//                   className="
//                     absolute left-0 -bottom-1
//                     h-[2px] w-0
//                     bg-black
//                     transition-all duration-300
//                     group-hover:w-full
//                   "
//                 />
//               </li>
//             ))}
//           </ul>

//           {/* DESKTOP ACTIONS */}
//           <div className="hidden md:flex items-center gap-6">
//             <Link href="/cart" className="hover:scale-105 transition">
//               <ShoppingCart size={20} />
//             </Link>

//             <Link
//               href="/login"
//               className="flex items-center gap-1 text-sm hover:text-gray-600 transition"
//             >
//               <User size={16} /> Log In
//             </Link>

//             <Link
//               href="/signup"
//               className="
//                 border border-[#111]
//                 px-5 py-2
//                 text-sm
//                 font-medium
//                 hover:bg-[#111]
//                 hover:text-white
//                 transition
//               "
//             >
//               Sign Up
//             </Link>
//           </div>

//           {/* MOBILE MENU BUTTON */}
//           <button className="md:hidden" onClick={() => setOpen(!open)}>
//             {open ? <X size={26} /> : <Menu size={26} />}
//           </button>
//         </nav>

//         {/* MOBILE MENU */}
//         {open && (
//           <div className="md:hidden bg-[#F5F5F5] border-t border-gray-300">
//             <ul className="flex flex-col text-center text-sm font-medium uppercase tracking-wide">
//               {navItems.map((item) => (
//                 <li key={item} className="py-4 border-b border-gray-300">
//                   <Link
//                     href={`/${item === "Home" ? "" : item.toLowerCase().replace(" ", "")}`}
//                     onClick={() => setOpen(false)}
//                     className="hover:text-gray-600 transition"
//                   >
//                     {item}
//                   </Link>
//                 </li>
//               ))}
//               <li className="py-4">
//                 <Link href="/login">Log In</Link>
//               </li>
//               <li className="py-4">
//                 <Link href="/signup" className="underline">
//                   Sign Up
//                 </Link>
//               </li>
//             </ul>
//           </div>
//         )}
//       </div>
//     </header>
//   );
// }
























// "use client";

// import Link from "next/link";
// import { Search, Share2 } from "lucide-react";
// import { useEffect, useState } from "react";

// export default function Navbar() {
//   const [scrolled, setScrolled] = useState(false);

//   useEffect(() => {
//     const onScroll = () => {
//       setScrolled(window.scrollY > 80);
//     };
//     window.addEventListener("scroll", onScroll);
//     return () => window.removeEventListener("scroll", onScroll);
//   }, []);

//   return (
//     <header
//       className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
//         scrolled ? "bg-[#1f2a30] shadow-lg" : "bg-transparent"
//       }`}
//     >
//       <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between text-white">

//         {/* LOGO */}
//         <Link href="/" className="flex items-center gap-2 font-bold text-lg">
//           🚗 <span>CAR <span className="text-red-500">SERVX</span></span>
//         </Link>

//         {/* MENU */}
//         <ul className="hidden md:flex items-center gap-8 text-sm uppercase tracking-wide">
//           {["Home", "Portfolio", "Pages", "Services", "Blog", "Contact Us"].map(
//             (item) => (
//               <li key={item}>
//                 <Link
//                   href={item === "Home" ? "/" : `/${item.toLowerCase().replace(" ", "")}`}
//                   className="hover:text-red-500 transition"
//                 >
//                   {item}
//                 </Link>
//               </li>
//             )
//           )}
//         </ul>

//         {/* ICONS */}
//         <div className="flex items-center gap-4">
//           <Search size={18} className="cursor-pointer hover:text-red-500" />
//           <Share2 size={18} className="cursor-pointer hover:text-red-500" />
//         </div>
//       </nav>
//     </header>
//   );
// }














































// "use client";

// import Link from "next/link";
// import { useEffect, useState } from "react";
// import { ShoppingCart, Menu, X, User, Search, Share2 } from "lucide-react";

// const navItems = ["Home", "Services", "Main Products", "About", "Contact"];

// export default function Navbar() {
//   const [open, setOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);

//   useEffect(() => {
//     const onScroll = () => setScrolled(window.scrollY > 80);
//     window.addEventListener("scroll", onScroll);
//     return () => window.removeEventListener("scroll", onScroll);
//   }, []);

//   return (
//     <header
//       className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
//         scrolled
//           ? "bg-[#1f2a30] shadow-lg"
//           : "bg-transparent"
//       }`}
//     >
//       <nav
//         className={`max-w-7xl mx-auto px-6 py-4 flex items-center justify-between transition-colors ${
//           scrolled ? "text-white" : "text-white"
//         }`}
//       >
//         {/* LOGO */}
//         <Link href="/" className="flex items-center gap-3">
//           <div
//             className={`w-9 h-9 rounded-full flex items-center justify-center border ${
//               scrolled ? "border-white" : "border-white"
//             }`}
//           >
//             🔧
//           </div>
//           <span className="text-base sm:text-lg font-semibold tracking-wide">
//             JADE & ANDY
//           </span>
//         </Link>

//         {/* DESKTOP MENU */}
//         <ul className="hidden md:flex items-center gap-10">
//           {navItems.map((item) => (
//             <li key={item} className="relative group">

//               <Link
//                 href={`/${item === "Home" ? "" : item.toLowerCase().replace(" ", "")}`}
//                 className="text-sm font-medium tracking-wide transition-colors group-hover:text-red-500"
//               >
//                 {item}
//               </Link>

//               {/* Hover underline */}
//               <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-red-500 transition-all duration-300 group-hover:w-full" />
//             </li>
//           ))}
//         </ul>

//         {/* DESKTOP ACTIONS */}
//         <div className="hidden md:flex items-center gap-6">
//           <Search size={18} className="cursor-pointer hover:text-red-500 transition" />


//           <Link href="/cart" className="hover:scale-105 transition">
//             <ShoppingCart size={20} />
//           </Link>

//           <Link href="/login" className="flex items-center gap-1 text-sm hover:text-red-500 transition">
//             <User size={16} /> Log In
//           </Link>

//           <Link
//             href="/signup"
//             className="border border-white px-5 py-2 text-sm font-medium hover:bg-white hover:text-black transition"
//           >
//             Sign Up
//           </Link>
//         </div>

//         {/* MOBILE MENU BUTTON */}
//         <button className="md:hidden" onClick={() => setOpen(!open)}>
//           {open ? <X size={26} /> : <Menu size={26} />}
//         </button>
//       </nav>

//       {/* MOBILE MENU */}
//       {open && (
//         <div className="md:hidden bg-[#1f2a30] border-t border-white/10">
//           <ul className="flex flex-col text-center text-sm font-medium uppercase tracking-wide text-white">
//             {navItems.map((item) => (
//               <li key={item} className="py-4 border-b border-white/10">
//                 <Link
//                   href={`/${item === "Home" ? "" : item.toLowerCase().replace(" ", "")}`}
//                   onClick={() => setOpen(false)}
//                   className="hover:text-red-500 transition"
//                 >
//                   {item}
//                 </Link>
//               </li>
//             ))}
//             <li className="py-4">
//               <Link href="/login">Log In</Link>
//             </li>
//             <li className="py-4">
//               <Link href="/signup" className="underline">
//                 Sign Up
//               </Link>
//             </li>
//           </ul>
//         </div>
//       )}
//     </header>
//   );
// }
































































// "use client";

// import Link from "next/link";
// import { useEffect, useState } from "react";
// import { ShoppingCart, Menu, X, User, Search } from "lucide-react";

// const navItems = ["Home", "Services", "Main Products", "About", "Contact"];

// export default function Navbar() {
//   const [open, setOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);

//   useEffect(() => {
//     const onScroll = () => setScrolled(window.scrollY > 80);
//     window.addEventListener("scroll", onScroll);
//     return () => window.removeEventListener("scroll", onScroll);
//   }, []);

//   return (
//     <header
//       className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
//         scrolled ? "bg-[#1f2a30] shadow-lg" : "bg-transparent"
//       }`}
//     >
//       <nav
//         className={`max-w-7xl mx-auto px-6 py-4 flex items-center justify-between transition-colors ${
//           scrolled ? "text-white" : "text-white"
//         }`}
//       >
//         {/* LOGO */}
//         <Link href="/" className="flex items-center gap-3">
//           <div
//             className={`w-9 h-9 rounded-full flex items-center justify-center border ${
//               scrolled ? "border-white" : "border-white"
//             }`}
//           >
//             🔧
//           </div>
//           <span className="text-base sm:text-lg font-semibold tracking-wide">
//             JADE & ANDY
//           </span>
//         </Link>

//         {/* DESKTOP MENU */}
//         <ul className="hidden md:flex items-center gap-10">
//           {navItems.map((item) => (
//             <li key={item} className="relative group">
//               {/* <Link
//                 href={`/${item === "Home" ? "" : item.toLowerCase().replace(" ", "")}`}
//                 className="text-sm font-medium tracking-wide transition-colors group-hover:text-red-500"
//               >
//                 {item}
//               </Link> */}
//               {item === "Main Products" ? (
//   <span className="text-sm font-medium tracking-wide cursor-pointer transition-colors group-hover:text-red-500">
//     {item}
//   </span>
// ) : (
//   <Link
//     href={`/${item === "Home" ? "" : item.toLowerCase().replace(" ", "")}`}
//     className="text-sm font-medium tracking-wide transition-colors group-hover:text-red-500"
//   >
//     {item}
//   </Link>
// )}


//               {/* Hover underline */}
//               <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-red-500 transition-all duration-300 group-hover:w-full" />

//               {/* DROPDOWN FOR MAIN PRODUCTS */}
//               {item === "Main Products" && (
//                 <div className="absolute left-0 top-full mt-3 w-52 bg-white text-black shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
//                   <Link
//                     href="/mainproducts/oil"
//                     className="block px-5 py-3 text-sm hover:bg-gray-100 transition"
//                   >
//                     Engine Oil
//                   </Link>
//                   <Link
//                     href="/mainproducts/tyre"
//                     className="block px-5 py-3 text-sm hover:bg-gray-100 transition"
//                   >
//                     Tyres
//                   </Link>
//                 </div>
//               )}
//             </li>
//           ))}
//         </ul>

//         {/* DESKTOP ACTIONS */}
//         <div className="hidden md:flex items-center gap-6">
//           <Search size={18} className="cursor-pointer hover:text-red-500 transition" />

//           <Link href="/cart" className="hover:scale-105 transition">
//             <ShoppingCart size={20} />
//           </Link>

//           <Link
//             href="/login"
//             className="flex items-center gap-1 text-sm hover:text-red-500 transition"
//           >
//             <User size={16} /> Log In
//           </Link>

//           <Link
//             href="/signup"
//             className="border border-white px-5 py-2 text-sm font-medium hover:bg-white hover:text-black transition"
//           >
//             Sign Up
//           </Link>
//         </div>

//         {/* MOBILE MENU BUTTON */}
//         <button className="md:hidden" onClick={() => setOpen(!open)}>
//           {open ? <X size={26} /> : <Menu size={26} />}
//         </button>
//       </nav>

//       {/* MOBILE MENU */}
//       {open && (
//         <div className="md:hidden bg-[#1f2a30] border-t border-white/10">
//           <ul className="flex flex-col text-center text-sm font-medium uppercase tracking-wide text-white">
//             {navItems.map((item) => (
//               <li key={item} className="py-4 border-b border-white/10">
//                 {item === "Main Products" ? (
//                   <div className="flex flex-col gap-2">
//                     <span className="uppercase">{item}</span>
//                     <Link
//                       href="/mainproducts/oil"
//                       onClick={() => setOpen(false)}
//                       className="text-sm text-white/70 hover:text-red-500 transition"
//                     >
//                       Engine Oil
//                     </Link>
//                     <Link
//                       href="/mainproducts/tyre"
//                       onClick={() => setOpen(false)}
//                       className="text-sm text-white/70 hover:text-red-500 transition"
//                     >
//                       Tyres
//                     </Link>
//                   </div>
//                 ) : (
//                   <Link
//                     href={`/${item === "Home" ? "" : item.toLowerCase().replace(" ", "")}`}
//                     onClick={() => setOpen(false)}
//                     className="hover:text-red-500 transition"
//                   >
//                     {item}
//                   </Link>
//                 )}
//               </li>
//             ))}

//             <li className="py-4">
//               <Link href="/login" onClick={() => setOpen(false)}>
//                 Log In
//               </Link>
//             </li>
//             <li className="py-4">
//               <Link href="/signup" onClick={() => setOpen(false)} className="underline">
//                 Sign Up
//               </Link>
//             </li>
//           </ul>
//         </div>
//       )}
//     </header>
//   );
// }



































"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { ShoppingCart, Menu, X, User, Search, LogOut } from "lucide-react";
import { useSession, signOut } from "next-auth/react";

const navItems = ["Home", "Services", "Main Products", "About", "Contact"];

const serviceLinks = [
  { id: "brake-system", title: "Brake System" },
  { id: "engine-services", title: "Engine Services" },
  { id: "suspension-steering", title: "Suspension & Steering" },
  { id: "electrical-system", title: "Electrical System" },
  { id: "cooling-systemcooling-system", title: "Cooling System" },
  { id: "transmission-services", title: "Transmission Services" },
  { id: "tyres-wheels", title: "Tyres & Wheels" },
  { id: "exhaust-emission", title: "Exhaust & Emission" },
  { id: "air-conditioning", title: "Air Conditioning" },
  { id: "diagnostic-services", title: "Diagnostic Services" },
  { id: "general-maintenance", title: "General Maintenance" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Check if we're on the home page
  const isHomePage = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Determine navbar background - force dark on non-home pages
  const navbarBg = isHomePage
    ? (scrolled ? "bg-[#1f2a30] shadow-lg" : "bg-transparent")
    : "bg-[#1f2a30] shadow-md";

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${navbarBg}`}
    >
      <nav
        className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between transition-colors text-white"
      >
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full flex items-center justify-center border border-white">
            🔧
          </div>
          <span className="text-base sm:text-lg font-semibold tracking-wide">
            JADE & ANDY
          </span>
        </Link>

        {/* DESKTOP MENU */}
        <ul className="hidden md:flex items-center gap-10">
          {navItems.map((item) => (
            <li key={item} className="relative group">
              {/* MAIN LINK LOGIC */}
              {item === "Main Products" ? (
                <span className="text-sm font-medium tracking-wide cursor-pointer transition-colors group-hover:text-red-500">
                  {item}
                </span>
              ) : (
                <Link
                  href={`/${item === "Home" ? "" : item.toLowerCase().replace(" ", "")}`}
                  className="text-sm font-medium tracking-wide transition-colors group-hover:text-red-500"
                >
                  {item}
                </Link>
              )}

              {/* Hover underline */}
              <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-red-500 transition-all duration-300 group-hover:w-full" />

              {/* DROPDOWN FOR MAIN PRODUCTS */}
              {item === "Main Products" && (
                <div className="absolute left-0 top-full mt-3 w-52 bg-white text-black shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <Link
                    href="/mainproducts/oil"
                    className="block px-5 py-3 text-sm hover:bg-gray-100 transition"
                  >
                    Engine Oil
                  </Link>
                  <Link
                    href="/mainproducts/tyre"
                    className="block px-5 py-3 text-sm hover:bg-gray-100 transition"
                  >
                    Tyres
                  </Link>
                </div>
              )}

              {/* DROPDOWN FOR SERVICES */}
              {item === "Services" && (
                <div className="absolute left-0 top-full mt-3 w-64 bg-white text-black shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 max-h-[400px] overflow-y-auto">
                  {serviceLinks.map((service) => (
                    <Link
                      key={service.id}
                      href={`/services/${service.id}`}
                      className="block px-5 py-3 text-sm hover:bg-gray-100 transition"
                    >
                      {service.title}
                    </Link>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>

        {/* DESKTOP ACTIONS */}
        <div className="hidden md:flex items-center gap-6">
          <Search size={18} className="cursor-pointer hover:text-red-500 transition" />

          <Link href="/cart" className="hover:scale-105 transition">
            <ShoppingCart size={20} />
          </Link>

          <Link
            href="/login"
            className="flex items-center gap-1 text-sm hover:text-red-500 transition"
          >
            <User size={16} /> Log In
          </Link>

          <Link
            href="/signup"
            className="border border-white px-5 py-2 text-sm font-medium hover:bg-white hover:text-black transition"
          >
            Sign Up
          </Link>
        </div>

        {/* MOBILE MENU BUTTON */}
        <button className="md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </nav>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden bg-[#1f2a30] border-t border-white/10">
          <ul className="flex flex-col text-center text-sm font-medium uppercase tracking-wide text-white">
            {navItems.map((item) => (
              <li key={item} className="py-4 border-b border-white/10">
                {item === "Main Products" ? (
                  <div className="flex flex-col gap-2">
                    <span className="uppercase">{item}</span>
                    <Link
                      href="/mainproducts/oil"
                      onClick={() => setOpen(false)}
                      className="text-sm text-white/70 hover:text-red-500 transition"
                    >
                      Engine Oil
                    </Link>
                    <Link
                      href="/mainproducts/tyre"
                      onClick={() => setOpen(false)}
                      className="text-sm text-white/70 hover:text-red-500 transition"
                    >
                      Tyres
                    </Link>
                  </div>
                ) : item === "Services" ? (
                  <div className="flex flex-col gap-2">
                    <Link
                      href="/services"
                      onClick={() => setOpen(false)}
                      className="hover:text-red-500 transition"
                    >
                      Services
                    </Link>
                    {serviceLinks.map((service) => (
                      <Link
                        key={service.id}
                        href={`/services/${service.id}`}
                        onClick={() => setOpen(false)}
                        className="text-sm text-white/70 hover:text-red-500 transition"
                      >
                        {service.title}
                      </Link>
                    ))}
                  </div>
                ) : (
                  <Link
                    href={`/${item === "Home" ? "" : item.toLowerCase().replace(" ", "")}`}
                    onClick={() => setOpen(false)}
                    className="hover:text-red-500 transition"
                  >
                    {item}
                  </Link>
                )}
              </li>
            ))}

            <li className="py-4">
              <Link href="/login" onClick={() => setOpen(false)}>
                Log In
              </Link>
            </li>
            <li className="py-4">
              <Link href="/signup" onClick={() => setOpen(false)} className="underline">
                Sign Up
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
