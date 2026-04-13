import Link from "next/link";
import Image from "next/image";
export const ServicesListingSection = () => {
  return (
    <section className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col lg:flex-row gap-8">

        {/* FILTER SIDEBAR */}
        <aside className="lg:w-80 flex-shrink-0">
          <div className="sticky top-28 rounded-xl border border-[#2A2A2A] bg-[#1A1A1A] p-6">
            
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">Filters</h3>
              <button className="text-sm text-[#DC2626] hover:underline">
                Clear all
              </button>
            </div>

            {/* SERVICE TYPE */}
            <FilterGroup
              title="Service Type"
              items={[
                "Oil Change",
                "Brake Service",
                "Tire Rotation",
                "Battery Service",
                "Engine Diagnostics",
                "Transmission Service",
                "AC Service",
                "Wheel Alignment",
              ]}
            />

            <Divider />

            {/* AVAILABILITY */}
            <FilterGroup
              title="Availability"
              items={["Available Today", "Available This Week"]}
              defaultChecked={[0]}
            />

            <Divider />

            {/* CERTIFICATIONS */}
            <FilterGroup
              title="Certifications"
              items={[
                "ASE Certified",
                "AAA Approved",
                "Manufacturer Certified",
              ]}
            />

            <Divider />

            {/* PRICE RANGE */}
            <FilterGroup
              title="Price Range"
              items={[
                "Under $50",
                "$50 - $100",
                "$100 - $200",
                "Over $200",
              ]}
            />
          </div>
        </aside>

        {/* RESULTS */}
        <div className="flex-1">

          {/* TOP BAR */}
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 rounded-lg border border-[#2A2A2A] bg-[#1A1A1A] px-4 py-2 text-white hover:border-[#DC2626] transition-colors">
                Filters
              </button>

              <p className="text-sm text-[#9CA3AF]">
                <span className="font-medium text-white">4</span> garages near you
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-sm text-[#9CA3AF]">Sort by:</span>

              <button className="flex items-center gap-2 rounded-lg border border-[#2A2A2A] bg-[#1A1A1A] px-4 py-2 text-white hover:border-[#DC2626] transition-colors">
                Best Match
              </button>
            </div>

          </div>

          {/* GARAGE CARDS */}
          <div className="space-y-6">
            <GarageCard
              id="1"
              title="Premium Auto Care"
              rating="4.9"
              reviews="328"
              price="$49.99"
              distance="2.3 miles away"
              address="1234 Main St, San Francisco, CA"
              image="https://images.unsplash.com/photo-1632053002928-c6c8763bb0c0?w=400&h=300&fit=crop"
              specialties={[
                "Brake Service",
                "Engine Diagnostics",
                "Oil Change",
              ]}
            />

            <GarageCard
              id="2"
              title="AutoTech Pro"
              rating="4.8"
              reviews="512"
              price="$44.99"
              distance="3.7 miles away"
              address="5678 Oak Ave, San Francisco, CA"
              image="https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=400&h=300&fit=crop"
              specialties={[
                "Transmission Service",
                "AC Service",
                "Oil Change",
              ]}
            />

            <GarageCard
              id="3"
              title="Quick Service Center"
              rating="4.7"
              reviews="201"
              price="$39.99"
              distance="5.1 miles away"
              address="9012 Elm St, San Francisco, CA"
              image="https://images.unsplash.com/photo-1625047509248-ec889cbff17f?w=400&h=300&fit=crop"
              specialties={[
                "Oil Change",
                "Tire Rotation",
                "Battery Service",
              ]}
            />

            <GarageCard
              id="4"
              title="Elite Motors Service"
              rating="5"
              reviews="89"
              price="$69.99"
              distance="1.8 miles away"
              address="3456 Pine St, San Francisco, CA"
              image="https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400&h=300&fit=crop"
              specialties={[
                "Engine Diagnostics",
                "Transmission Service",
                "Brake Service",
              ]}
            />
          </div>

        </div>
      </div>
    </section>
  );
};

const Divider = () => (
  <div className="my-6 border-t border-[#2A2A2A]" />
);

const FilterGroup = ({
  title,
  items,
  defaultChecked = [],
}: {
  title: string;
  items: string[];
  defaultChecked?: number[];
}) => (
  <div className="mb-6">
    <h4 className="mb-3 text-sm font-medium text-white">{title}</h4>

    <div className="space-y-2">
      {items.map((item, i) => (
        <label
          key={item}
          className="group flex cursor-pointer items-center gap-3"
        >
          <input
            type="checkbox"
            defaultChecked={defaultChecked.includes(i)}
            className="h-4 w-4 rounded border-[#2A2A2A] bg-[#0A0A0A] text-[#DC2626]"
          />

          <span className="text-sm text-[#9CA3AF] group-hover:text-white">
            {item}
          </span>
        </label>
      ))}
    </div>
  </div>
);

const GarageCard = ({
  id,
  title,
  rating,
  reviews,
  price,
  distance,
  address,
  image,
  specialties,
}: {
  id: string;
  title: string;
  rating: string;
  reviews: string;
  price: string;
  distance: string;
  address: string;
  image: string;
  specialties: string[];
}) => (
  <div className="group overflow-hidden rounded-xl border border-[#2A2A2A] bg-[#1A1A1A] hover:border-[#DC2626] transition-all">
    <div className="flex flex-col md:flex-row">

      <div className="relative h-64 md:h-auto md:w-80 overflow-hidden bg-[#2A2A2A]">
        <Image
          src={image}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          width={400}
          height={300}
        />
      </div>

      <div className="flex-1 p-6">

        <div className="mb-3 flex items-start justify-between">
          <div>
            <Link
              href={`/garage/${id}`}
              className="text-2xl font-bold text-white hover:text-[#DC2626]"
            >
              {title}
            </Link>

            <div className="mt-2 flex items-center gap-2 text-sm text-[#9CA3AF]">
              ⭐ {rating} ({reviews})
            </div>
          </div>

          <div className="text-right">
            <div className="text-sm text-[#9CA3AF]">Starting at</div>
            <div className="text-3xl font-bold text-[#DC2626]">
              {price}
            </div>
          </div>
        </div>

        <div className="mb-4 text-sm text-[#9CA3AF]">
          {distance} • {address}
        </div>

        <div className="mb-4 flex flex-wrap gap-2">
          {specialties.map((s: string) => (
            <span
              key={s}
              className="rounded-lg bg-[#2A2A2A] px-3 py-1 text-xs text-white"
            >
              {s}
            </span>
          ))}
        </div>

        <div className="flex gap-3">
          <Link
            href={`/garage/${id}`}
            className="flex h-11 flex-1 items-center justify-center rounded-lg bg-[#DC2626] text-white hover:bg-[#B91C1C]"
          >
            View Details & Book
          </Link>

          <button className="h-11 rounded-lg bg-[#2A2A2A] px-6 text-white hover:bg-[#3A3A3A]">
            Get Quote
          </button>
        </div>

      </div>
    </div>
  </div>
);