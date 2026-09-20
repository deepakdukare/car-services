// "use client";

// import { servicePackages } from "@/data/servicePackages";
// import { Check, X } from "lucide-react";

// export default function ServicePackages() {
//   return (
//     <section className="bg-gray-100 py-28">
//       <div className="max-w-7xl mx-auto px-6">

//         {/* HEADER */}
//         <div className="text-center mb-20">
//           <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
//             Special Offers
//           </h2>
//           <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
//             Choose the perfect service package that fits your vehicle and
//             driving needs.
//           </p>
//         </div>

//         {/* GRID */}
//         <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
//           {servicePackages.map((pkg) => (
//             <div
//               key={pkg.id}
//               className={`relative rounded-2xl p-8 transition-all duration-500
//                 ${
//                   pkg.highlighted
//                     ? "bg-[#2d1b4e] text-white scale-105 shadow-2xl"
//                     : "bg-white text-gray-900 shadow-lg hover:-translate-y-2"
//                 }`}
//             >
//               <h3 className="text-xl font-semibold mb-2">{pkg.title}</h3>

//               <p className="text-sm mb-6 opacity-80">
//                 Starting From
//               </p>

//               <p className="text-2xl font-bold mb-6">{pkg.price}</p>

//               <button
//                 className={`w-full py-3 mb-8 rounded-md text-sm font-semibold
//                   ${
//                     pkg.highlighted
//                       ? "bg-white text-black hover:bg-gray-200"
//                       : "bg-[#2d1b4e] text-white hover:bg-black"
//                   } transition`}
//               >
//                 Book Now
//               </button>

//               <ul className="space-y-3 text-sm">
//                 {pkg.features.map((f, i) => (
//                   <li key={i} className="flex items-start gap-3">
//                     {f.included ? (
//                       <Check className="text-green-500 w-5 h-5 mt-0.5" />
//                     ) : (
//                       <X className="text-red-500 w-5 h-5 mt-0.5" />
//                     )}
//                     <span className={!f.included ? "line-through opacity-60" : ""}>
//                       {f.label}
//                     </span>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           ))}
//         </div>

//       </div>
//     </section>
//   );
// }









import { prisma } from "@/lib/prisma";
import { servicePackages as defaultPackages } from "@/data/servicePackages";

export default async function ServicePackages() {
  let packages: any[] = [];
  try {
    packages = await prisma.servicePackage.findMany({
      orderBy: { createdAt: "asc" }
    });
  } catch {
    // DB offline or unseeded
  }

  const items = packages && packages.length > 0 
    ? packages 
    : defaultPackages.map(pkg => ({
        ...pkg,
        features: JSON.stringify(pkg.features)
      }));

  return (
    <section id="packages" className="bg-gray-100 py-28">
      <div className="max-w-7xl mx-auto px-6">

        {/* HEADER */}
        <div className="text-center mb-20">
          <h2 className="text-4xl font-semibold tracking-wide text-gray-900">
            BEST PACKAGES
          </h2>

          <p className="mt-6 text-gray-600 max-w-3xl mx-auto leading-relaxed">
            There are many variations of passages of Lorem Ipsum available, but
            the majority have suffered alteration in some form.
          </p>
        </div>

        {/* PACKAGES GRID */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {items.map((pkg: any) => {
            const features = JSON.parse(pkg.features || '[]');

            return (
              <div
                key={pkg.id}
                className={`group relative flex flex-col justify-between
                  transition-all duration-500 ease-out
                  ${pkg.highlighted
                    ? "bg-red-600 text-white -translate-y-4 shadow-2xl"
                    : "bg-[#1f2a30] text-white hover:bg-red-600 hover:-translate-y-4"
                  }`}
              >
                {/* TOP CONTENT */}
                <div className="p-8">
                  <h3 className="text-lg uppercase tracking-widest mb-6">
                    {pkg.title}
                  </h3>

                  <div className="mb-8 font-bold">
                    <span className="text-3xl lg:text-4xl">
                      {pkg.price}
                    </span>
                  </div>

                  <ul className="space-y-4 text-sm">
                    {features
                      .filter((f: any) => f.included)
                      .map((f: any, i: number) => (
                        <li key={i} className="flex items-center gap-3">
                          <span className="text-lg">{">"}</span>
                          <span>{f.label}</span>
                        </li>
                      ))}
                  </ul>
                </div>

                {/* BOTTOM BAR */}
                <div
                  className={`p-6 text-center transition-colors duration-300
                    ${pkg.highlighted
                      ? "bg-[#1f2a30]"
                      : "bg-[#232f36] group-hover:bg-[#1f2a30]"
                    }`}
                >
                  <button className="bg-red-600 px-10 py-3 text-xs font-semibold tracking-widest uppercase hover:bg-black transition">
                    SELECT PLAN
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
