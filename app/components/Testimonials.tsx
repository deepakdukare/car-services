import { prisma } from "@/lib/prisma";

const defaultTestimonials = [
  {
    id: "1",
    name: "Alexander Bull",
    role: "Loyal Customer For 3 Years",
    image: "/about/pic11.jpg",
    review: "There are many variations of passages of lorem Ipsum available, but the majority have suffered.",
  },
  {
    id: "2",
    name: "John David",
    role: "Loyal Customer For 3 Years",
    image: "/about/pic12.jpg",
    review: "There are many variations of passages of lorem Ipsum available, but the majority have suffered.",
  },
  {
    id: "3",
    name: "Alina Danial",
    role: "Loyal Customer For 3 Years",
    image: "/about/pic13.jpg",
    review: "There are many variations of passages of lorem Ipsum available, but the majority have suffered.",
  },
  {
    id: "4",
    name: "Rosalina William",
    role: "Loyal Customer For 3 Years",
    image: "/about/pic14.jpg",
    review: "There are many variations of passages of lorem Ipsum available, but the majority have suffered.",
  },
];

export default async function Testimonials() {
  let testimonials: any[] = [];
  try {
    testimonials = await prisma.testimonial.findMany({
      orderBy: { createdAt: 'desc' }
    });
  } catch {
    // Database offline or unseeded; proceed with fallback
  }

  const items = testimonials && testimonials.length > 0 ? testimonials : defaultTestimonials;

  return (
    <section className="bg-white py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">

        {/* HEADER */}
        <div className="text-center mb-16">
          <p className="text-xs tracking-widest uppercase text-gray-500">
            Client Testimonials
          </p>
          <h2 className="mt-4 text-3xl md:text-4xl font-semibold">
            Trusted by Car Owners Across Dubai
          </h2>

          {/* TRUST LINE */}
          <p className="mt-6 text-sm text-gray-600">
            Rated <span className="font-medium text-black">4.9★ on Google</span> ·
            Serving Dubai since 2016 · 1,200+ vehicles serviced
          </p>
        </div>

        {/* AUTO SLIDER */}
        <div className="relative w-full">
          <div className="flex gap-12 animate-testimonial-scroll-slow">
            {[...items, ...items].map((item, index) => (
              <div
                key={index}
                className="
                  min-w-[340px] max-w-[340px]
                  bg-white
                  border border-gray-200
                  p-8
                  shadow-[0_25px_50px_rgba(0,0,0,0.12)]
                "
              >
                <div className="flex items-center gap-4 mb-6">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-14 h-14 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold text-black">
                      {item.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {item.role}
                    </p>
                  </div>
                </div>

                <p className="text-gray-700 text-sm leading-relaxed">
                  “{item.review}”
                </p>

                <div className="mt-4 text-yellow-500 text-sm">
                  ★★★★★
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
