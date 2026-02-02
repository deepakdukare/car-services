// "use client";

// import Link from "next/link";
// import { MessageCircle } from "lucide-react";

// export default function Footer() {
//   return (
//     <footer className="bg-[#0B0B0B] text-white px-6 pt-24 pb-10">
//       <div className="max-w-7xl mx-auto">

//         {/* TOP */}
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-16">

//           {/* BRAND */}
//           <div>
//             <h3 className="text-lg font-semibold tracking-wide">
//               JADE & ANDY
//             </h3>
//             <p className="mt-4 text-sm text-gray-400 leading-relaxed">
//               Premium car service and maintenance trusted by vehicle owners
//               across Dubai.
//             </p>
//           </div>

//           {/* SERVICES */}
//           <div>
//             <h4 className="text-sm uppercase tracking-widest text-gray-400">
//               Services
//             </h4>
//             <ul className="mt-6 space-y-3 text-sm">
//               <li><Link href="/services">Brake Service</Link></li>
//               <li><Link href="/services">Engine Repair</Link></li>
//               <li><Link href="/services">AC Service</Link></li>
//               <li><Link href="/services">Diagnostics</Link></li>
//             </ul>
//           </div>

//           {/* COMPANY */}
//           <div>
//             <h4 className="text-sm uppercase tracking-widest text-gray-400">
//               Company
//             </h4>
//             <ul className="mt-6 space-y-3 text-sm">
//               <li><Link href="/about">About Us</Link></li>
//               <li><Link href="/work">Our Work</Link></li>
//               <li><Link href="/contact">Contact</Link></li>
//             </ul>
//           </div>

//           {/* CONTACT */}
//           <div>
//             <h4 className="text-sm uppercase tracking-widest text-gray-400">
//               Contact
//             </h4>
//             <ul className="mt-6 space-y-4 text-sm text-gray-300">
//               <li>Dubai, United Arab Emirates</li>
//               <li>Phone: +971 XX XXX XXXX</li>
//               <li>Email: info@jadeandandy.com</li>

//               {/* WhatsApp */}
//               <li>
//                 <a
//                   href="https://wa.me/971XXXXXXXXX"
//                   target="_blank"
//                   className="
//                     inline-flex items-center gap-2
//                     text-[#25D366]
//                     hover:opacity-80
//                     transition
//                   "
//                 >
//                   <MessageCircle size={18} />
//                   WhatsApp Chat
//                 </a>
//               </li>
//             </ul>
//           </div>
//         </div>

//         {/* DIVIDER */}
//         <div className="border-t border-white/10 mt-20 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500">
//           <p>
//             © {new Date().getFullYear()} Jade & Andy. All rights reserved.
//           </p>
//           <p className="mt-4 sm:mt-0">
//             Dubai · UAE
//           </p>
//         </div>

//       </div>
//     </footer>
//   );
// }




"use client";

import Link from "next/link";
import {
  Instagram,
  Facebook,
  Linkedin,
  MessageCircle,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#0B0B0B] text-white px-6 pt-24 pb-10">
      <div className="max-w-7xl mx-auto">

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-14">

          {/* BRAND */}
          <div>
            <h3 className="text-lg font-semibold tracking-wide">
              JADE & ANDY
            </h3>
            <p className="mt-4 text-sm text-gray-400 leading-relaxed">
              Premium car service and maintenance trusted by vehicle owners
              across Dubai.
            </p>

            {/* SOCIAL */}
            <div className="mt-6 flex items-center gap-4">
              {[Instagram, Facebook, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="
                    text-gray-400
                    transition-transform duration-300
                    hover:text-white
                    hover:-translate-y-1
                  "
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* SERVICES (2 COLS WITH CENTERED HEADING) */}
          <div className="lg:col-span-2">
            {/* Centered heading */}
            <div className="flex justify-center">
              <h4 className="text-sm uppercase tracking-widest text-gray-400">
                Services
              </h4>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-x-12 gap-y-4 text-sm text-gray-300">
              {[
                "Brake System",
                "Engine Services",
                "Suspension & Steering",
                "Electrical System",
                "Cooling System",
                "Transmission",
                "Tyres & Wheels",
                "Exhaust & Emission",
                "Air Conditioning",
                "Diagnostics",
                "General & Preventive Maintenance"
              ].map((service, index) => (
                <Link
                  key={index}
                  href="/services"
                  className="
                    group relative
                    inline-block
                    transition-all duration-300
                    hover:text-white
                    hover:translate-x-1
                  "
                >
                  {service}

                  {/* underline animation */}
                  <span
                    className="
                      absolute left-0 -bottom-1
                      h-[1px] w-0 bg-white
                      transition-all duration-300
                      group-hover:w-6
                    "
                  />
                </Link>
              ))}
            </div>
          </div>

          {/* COMPANY */}
          <div>
            <h4 className="text-sm uppercase tracking-widest text-gray-400">
              Company
            </h4>
            <ul className="mt-6 space-y-4 text-sm text-gray-300">
              {[
                { label: "About Us", href: "/about" },
                { label: "Our Work", href: "/work" },
                { label: "Contact", href: "/contact" },
                { label: "FAQs", href: "/faq" },
              ].map((item, i) => (
                <li key={i}>
                  <Link
                    href={item.href}
                    className="
                      group relative inline-block
                      transition-all duration-300
                      hover:text-white
                      hover:translate-x-1
                    "
                  >
                    {item.label}
                    <span
                      className="
                        absolute left-0 -bottom-1
                        h-[1px] w-0 bg-white
                        transition-all duration-300
                        group-hover:w-6
                      "
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h4 className="text-sm uppercase tracking-widest text-gray-400">
              Contact
            </h4>
            <ul className="mt-6 space-y-4 text-sm text-gray-300">
              <li>Dubai, UAE</li>
              <li>+971 6589 50887</li>
              <li>info@jadeandandy.com</li>
              <li>
                <a
                  href="https://wa.me/971658950887"
                  target="_blank"
                  className="
                    inline-flex items-center gap-2
                    text-[#25D366]
                    transition-all duration-300
                    hover:translate-x-1
                    hover:opacity-90
                  "
                >
                  <MessageCircle size={18} />
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* BOTTOM */}
        <div className="border-t border-white/10 mt-20 pt-8 text-xs text-gray-500 flex flex-col sm:flex-row justify-between">
          <p>© {new Date().getFullYear()} Jade & Andy. All rights reserved.</p>
          <p className="mt-4 sm:mt-0">Dubai · United Arab Emirates</p>
        </div>

      </div>
    </footer>
  );
}
