import Link from "next/link";
import { services } from "@/data/services";

type Props = {
  activeId: string;
};

export default function ServicesSidebar({ activeId }: Props) {
  return (
    <aside className="lg:col-span-1">
      <div className="bg-gray-100">

        {/* SERVICES LIST */}
        <ul>
          {services.map((item) => {
            const isActive = item.id === activeId;

            return (
              <li key={item.id}>
                <Link
                  href={item.id}
                  className={`
                    block px-5 py-4 text-sm border-b border-gray-200 transition-all
                    ${isActive
                      ? "bg-gray-200 text-black font-semibold border-l-4 border-black-600"
                      : "text-gray-700 hover:bg-gray-200"
                    }
                  `}
                >
                  {item.title}
                </Link>
              </li>
            );
          })}
          <li>
            <Link
              href="/services#packages"
              className="block px-5 py-4 text-sm text-gray-700 hover:bg-gray-200 border-b border-gray-200 transition-all font-semibold text-red-600"
            >
              Service Packages
            </Link>
          </li>
        </ul>

        {/* OFFER BOX */}
        <div className="p-6">
          <h3 className="text-3xl font-semibold mb-4">
            GET 30% OFF TODAY
          </h3>

          <p className="text-gray-600 text-sm mb-6">
            A Completely Safe and Advanced Cleaning Solution for both Petrol and
            Diesel Engines
          </p>

          <button className="bg-red-600 text-white px-6 py-3 text-sm hover:bg-red-700 transition">
            READ MORE
          </button>
        </div>
      </div>
    </aside>
  );
}
