// "use client";

// import {
//   Headphones,
//   Truck,
//   Search,
//   ClipboardCheck,
//   Wrench,
//   Car,
// } from "lucide-react";

// const steps = [
//   {
//     title: "BOOK A SERVICE",
//     description: "Call Us For Booking & Free Inspection",
//     icon: Headphones,
//   },
//   {
//     title: "FREE PICKUP",
//     description: "We Pickup Your Car From Your Home, Office Or Shopping Mall",
//     icon: Truck,
//   },
//   {
//     title: "FREE INSPECTION",
//     description:
//       "We Inspect Your Car According To Your Concerns & General Health Check",
//     icon: Search,
//   },
//   {
//     title: "JOB APPROVAL",
//     description:
//       "We Present Fair Estimation, You Approve The Work Needed To Be Done",
//     icon: ClipboardCheck,
//   },
//   {
//     title: "REPAIR & FIX",
//     description: "We Repair Your Car, Road Test & Quality Control",
//     icon: Wrench,
//   },
//   {
//     title: "DELIVER BACK",
//     description:
//       "We Wash The Car, Clean From Inside & Deliver It Back To You!",
//     icon: Car,
//   },
// ];

// export default function OurProcess() {
//   return (
//     <section className="py-28 bg-gray-50">
//       <div className="max-w-7xl mx-auto px-6">

//         {/* HEADER */}
//         <div className="text-center max-w-3xl mx-auto mb-20">
//           <h2 className="text-4xl md:text-5xl font-bold tracking-widest uppercase text-gray-900">
//             Our Process
//           </h2>

//           <div className="w-16 h-[3px] bg-red-600 mx-auto my-6" />

//           <p className="text-gray-600 leading-7">
//             Our State of the Art Repair Services is powered by Modern Tools,
//             Latest Techniques, Advance Processes, and Experienced Technicians.
//             Our 6 Steps Car Repair Model is designed to add comfort and
//             convenience for all car owners.
//           </p>
//         </div>

//         {/* GRID */}
//         <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">

//           {steps.map((step, i) => {
//             const Icon = step.icon;

//             return (
//               <div
//                 key={i}
//                 className="group bg-white rounded-xl p-10 text-center
//                            shadow-md border border-gray-200
//                            transition-all duration-500
//                            hover:-translate-y-3 hover:shadow-2xl"
//               >
//                 {/* ICON */}
//                 <div
//                   className="w-20 h-20 mx-auto mb-8 rounded-full
//                              flex items-center justify-center
//                              border-2 border-red-600 text-red-600
//                              transition-all duration-500
//                              group-hover:bg-red-600 group-hover:text-white"
//                 >
//                   <Icon size={38} />
//                 </div>

//                 {/* TITLE */}
//                 <h3 className="text-sm font-semibold tracking-widest uppercase text-gray-900 mb-3">
//                   {step.title}
//                 </h3>

//                 {/* DESCRIPTION */}
//                 <p className="text-gray-600 text-[15px] leading-7">
//                   {step.description}
//                 </p>
//               </div>
//             );
//           })}

//         </div>

//       </div>
//     </section>
//   );
// }












































// "use client";

// import {
//   Headphones,
//   Truck,
//   Search,
//   ClipboardCheck,
//   Wrench,
//   Car,
// } from "lucide-react";

// const steps = [
//   {
//     title: "BOOK A SERVICE",
//     description: "Call Us For Booking & Free Inspection",
//     icon: Headphones,
//   },
//   {
//     title: "FREE PICKUP",
//     description: "We Pickup Your Car From Your Home, Office Or Shopping Mall",
//     icon: Truck,
//   },
//   {
//     title: "FREE INSPECTION",
//     description:
//       "We Inspect Your Car According To Your Concerns & General Health Check",
//     icon: Search,
//   },
//   {
//     title: "JOB APPROVAL",
//     description:
//       "We Present Fair Estimation, You Approve The Work Needed To Be Done",
//     icon: ClipboardCheck,
//   },
//   {
//     title: "REPAIR & FIX",
//     description: "We Repair Your Car, Road Test & Quality Control",
//     icon: Wrench,
//   },
//   {
//     title: "DELIVER BACK",
//     description:
//       "We Wash The Car, Clean From Inside & Deliver It Back To You!",
//     icon: Car,
//   },
// ];

// export default function OurProcess() {
//   return (
//     <section className="relative py-28 overflow-hidden">

//       {/* BACKGROUND IMAGE */}
//       <div
//         className="absolute inset-0 bg-center bg-no-repeat bg-cover opacity-10"
//         style={{
//           backgroundImage: "url('/process-bg-car.png')",
//         }}
//       />

//       {/* LIGHT OVERLAY */}
//       <div className="absolute inset-0 bg-white/85" />

//       {/* CONTENT */}
//       <div className="relative z-10 max-w-7xl mx-auto px-6">

//         {/* HEADER */}
//         <div className="text-center max-w-3xl mx-auto mb-20">
//           <h2 className="text-4xl md:text-5xl font-bold tracking-widest uppercase text-gray-900">
//             Our Process
//           </h2>

//           <div className="w-16 h-[3px] bg-red-600 mx-auto my-6" />

//           <p className="text-gray-600 leading-7">
//             Our State of the Art Repair Services is powered by Modern Tools,
//             Latest Techniques, Advance Processes, and Experienced Technicians.
//             Our 6 Steps Car Repair Model is designed to add comfort and
//             convenience for all car owners.
//           </p>
//         </div>

//         {/* GRID */}
//         <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">

//           {steps.map((step, i) => {
//             const Icon = step.icon;

//             return (
//               <div
//                 key={i}
//                 className="group bg-white/95 backdrop-blur-sm
//                            rounded-xl p-10 text-center
//                            shadow-md border border-gray-200
//                            transition-all duration-500
//                            hover:-translate-y-3 hover:shadow-2xl"
//               >
//                 {/* ICON */}
//                 <div
//                   className="w-20 h-20 mx-auto mb-8 rounded-full
//                              flex items-center justify-center
//                              border-2 border-red-600 text-red-600
//                              transition-all duration-500
//                              group-hover:bg-red-600 group-hover:text-white"
//                 >
//                   <Icon size={38} />
//                 </div>

//                 {/* TITLE */}
//                 <h3 className="text-sm font-semibold tracking-widest uppercase text-gray-900 mb-3">
//                   {step.title}
//                 </h3>

//                 {/* DESCRIPTION */}
//                 <p className="text-gray-600 text-[15px] leading-7">
//                   {step.description}
//                 </p>
//               </div>
//             );
//           })}

//         </div>

//       </div>
//     </section>
//   );
// }











"use client";

import {
  Headphones,
  Truck,
  Search,
  ClipboardCheck,
  Wrench,
  Car,
} from "lucide-react";

const steps = [
  {
    title: "BOOK A SERVICE",
    description: "Call Us For Booking & Free Inspection",
    icon: Headphones,
  },
  {
    title: "FREE PICKUP",
    description: "We Pickup Your Car From Your Home, Office Or Shopping Mall",
    icon: Truck,
  },
  {
    title: "FREE INSPECTION",
    description:
      "We Inspect Your Car According To Your Concerns & General Health Check",
    icon: Search,
  },
  {
    title: "JOB APPROVAL",
    description:
      "We Present Fair Estimation, You Approve The Work Needed To Be Done",
    icon: ClipboardCheck,
  },
  {
    title: "REPAIR & FIX",
    description: "We Repair Your Car, Road Test & Quality Control",
    icon: Wrench,
  },
  {
    title: "DELIVER BACK",
    description:
      "We Wash The Car, Clean From Inside & Deliver It Back To You!",
    icon: Car,
  },
];

export default function OurProcess() {
  return (
    <section className="relative py-16 overflow-hidden">

      {/* BACKGROUND IMAGE */}
      <div
        className="absolute inset-0 bg-center bg-no-repeat bg-cover opacity-10"
        style={{
          backgroundImage: "url('/services/services-hero.jpg')",
        }}
      />

      {/* LIGHT OVERLAY */}
      <div className="absolute inset-0 bg-white/85" />

      {/* CONTENT */}
      <div className="relative z-10 max-w-7xl mx-auto px-6">

        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-widest uppercase text-gray-900">
            Our Process
          </h2>

          <div className="w-14 h-[3px] bg-red-600 mx-auto my-4" />

          <p className="text-gray-600 leading-6 text-sm">
            Our State of the Art Repair Services is powered by Modern Tools,
            Latest Techniques, Advance Processes, and Experienced Technicians.
            Our 6 Steps Car Repair Model is designed to add comfort and
            convenience for all car owners.
          </p>
        </div>

        {/* GRID */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

          {steps.map((step, i) => {
            const Icon = step.icon;

            return (
              <div
                key={i}
                className="group bg-white/95 backdrop-blur-sm
                           rounded-xl p-6 text-center
                           shadow-sm border border-gray-200
                           transition-all duration-500
                           hover:-translate-y-2 hover:shadow-xl"
              >
                {/* ICON */}
                <div
                  className="w-16 h-16 mx-auto mb-5 rounded-full
                             flex items-center justify-center
                             border-2 border-red-600 text-red-600
                             transition-all duration-500
                             group-hover:bg-red-600 group-hover:text-white"
                >
                  <Icon size={30} />
                </div>

                {/* TITLE */}
                <h3 className="text-xs font-semibold tracking-widest uppercase text-gray-900 mb-2">
                  {step.title}
                </h3>

                {/* DESCRIPTION */}
                <p className="text-gray-600 text-sm leading-6">
                  {step.description}
                </p>
              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}
