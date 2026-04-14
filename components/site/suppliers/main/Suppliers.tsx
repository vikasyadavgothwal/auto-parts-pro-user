"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Search,
  ChevronDown,
  MapPin,
  Clock,
  Star,
  Shield,
  Award,
  CircleCheck,
} from "lucide-react";

type Supplier = {
  id: number;
  name: string;
  image: string;
  location: string;
  responseTime: string;
  rating: number;
  reviews: string;
  specialties: string[];
  trustScore: number;
  ordersCompleted: string;
  verified: boolean;
  topRated: boolean;
  href: string;
};

const suppliers: Supplier[] = [
  {
    id: 1,
    name: "Premium Auto Parts Inc.",
    image:
      "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=200&fit=crop",
    location: "Detroit, MI",
    responseTime: "1.8 hrs",
    rating: 4.8,
    reviews: "1,234",
    specialties: ["Brake Systems", "Suspension", "Engine Parts"],
    trustScore: 92,
    ordersCompleted: "2,847",
    verified: true,
    topRated: true,
    href: "/suppliers/parts",
  },
  {
    id: 2,
    name: "Quality Parts Direct",
    image:
      "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=200&h=200&fit=crop",
    location: "Los Angeles, CA",
    responseTime: "2.4 hrs",
    rating: 4.6,
    reviews: "892",
    specialties: ["Electrical", "Body Parts", "Interior"],
    trustScore: 88,
    ordersCompleted: "1,923",
    verified: true,
    topRated: false,
    href: "/suppliers/parts",
  },
  {
    id: 3,
    name: "AutoZone Supply Co.",
    image:
      "https://images.unsplash.com/photo-1611312449408-fcece27cdbb7?w=200&h=200&fit=crop",
    location: "Chicago, IL",
    responseTime: "1.2 hrs",
    rating: 4.9,
    reviews: "2,156",
    specialties: ["OEM Parts", "Performance", "Maintenance"],
    trustScore: 95,
    ordersCompleted: "4,521",
    verified: true,
    topRated: true,
    href: "/suppliers/parts",
  },
  {
    id: 4,
    name: "Parts Express USA",
    image:
      "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=200&h=200&fit=crop",
    location: "Houston, TX",
    responseTime: "3.1 hrs",
    rating: 4.5,
    reviews: "678",
    specialties: ["Aftermarket", "Used Parts", "Salvage"],
    trustScore: 85,
    ordersCompleted: "1,456",
    verified: true,
    topRated: false,
    href: "/suppliers/parts",
  },
  {
    id: 5,
    name: "Reliable Auto Supply",
    image:
      "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=200&h=200&fit=crop",
    location: "Phoenix, AZ",
    responseTime: "2.0 hrs",
    rating: 4.7,
    reviews: "1,045",
    specialties: ["Transmission", "Engine Parts", "Drivetrain"],
    trustScore: 90,
    ordersCompleted: "2,234",
    verified: true,
    topRated: true,
    href: "/suppliers/parts",
  },
  {
    id: 6,
    name: "Metro Parts Warehouse",
    image:
      "https://images.unsplash.com/photo-1563453392212-326f5e854473?w=200&h=200&fit=crop",
    location: "Philadelphia, PA",
    responseTime: "2.8 hrs",
    rating: 4.4,
    reviews: "534",
    specialties: ["Body Parts", "Paint", "Collision"],
    trustScore: 83,
    ordersCompleted: "1,187",
    verified: true,
    topRated: false,
    href: "/suppliers/parts",
  },
];

export const Suppliers = () => {
  return (
    <main className="pt-24 pb-20">
      <div className="mb-12 border-b border-[#2A2A2A] bg-gradient-to-b from-[#1A1A1A] to-[#0A0A0A] py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="mb-4 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
              Find Trusted Auto Parts Suppliers
            </h1>
            <p className="text-base text-[#9CA3AF] sm:text-lg lg:text-xl">
              Browse verified suppliers, compare trust scores, and get the best
              parts for your vehicle
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-8 rounded-xl border border-[#2A2A2A] bg-[#1A1A1A] p-4 sm:p-6">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:flex-wrap">
            <div className="min-w-0 flex-1 xl:min-w-[300px]">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#9CA3AF]" />
                <input
                  type="text"
                  placeholder="Search suppliers by name or specialty..."
                  className="w-full rounded-lg border border-[#2A2A2A] bg-[#0A0A0A] py-3 pl-12 pr-4 text-white placeholder-[#9CA3AF] transition-colors focus:outline-none focus:border-[#DC2626]"
                />
              </div>
            </div>

            <div className="relative w-full sm:w-auto">
              <select className="min-w-full cursor-pointer appearance-none rounded-lg border border-[#2A2A2A] bg-[#0A0A0A] py-3 pl-4 pr-10 text-white transition-colors focus:outline-none focus:border-[#DC2626] sm:min-w-[160px]">
                <option value="all">All Locations</option>
                <option value="mi">Michigan</option>
                <option value="ca">California</option>
                <option value="il">Illinois</option>
                <option value="tx">Texas</option>
                <option value="az">Arizona</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9CA3AF]" />
            </div>

            <div className="relative w-full sm:w-auto">
              <select className="min-w-full cursor-pointer appearance-none rounded-lg border border-[#2A2A2A] bg-[#0A0A0A] py-3 pl-4 pr-10 text-white transition-colors focus:outline-none focus:border-[#DC2626] sm:min-w-[160px]">
                <option value="all">All Specialties</option>
                <option value="brakes">Brake Systems</option>
                <option value="suspension">Suspension</option>
                <option value="engine">Engine Parts</option>
                <option value="electrical">Electrical</option>
                <option value="body">Body Parts</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9CA3AF]" />
            </div>

            <div className="relative w-full sm:w-auto">
              <select className="min-w-full cursor-pointer appearance-none rounded-lg border border-[#2A2A2A] bg-[#0A0A0A] py-3 pl-4 pr-10 text-white transition-colors focus:outline-none focus:border-[#DC2626] sm:min-w-[200px]">
                <option value="trust-score">Highest Trust Score</option>
                <option value="rating">Highest Rating</option>
                <option value="orders">Most Orders</option>
                <option value="response-time">Fastest Response</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9CA3AF]" />
            </div>
          </div>
        </div>

        <div className="mb-6">
          <p className="text-[#9CA3AF]">
            Showing <span className="font-medium text-white">6</span> verified
            suppliers
          </p>
        </div>

        <div className="space-y-4">
          {suppliers.map((supplier) => (
            <Link
              key={supplier.id}
              href={supplier.href}
              className="group block rounded-xl border border-[#2A2A2A] bg-[#1A1A1A] p-4 transition-all hover:border-[#DC2626] hover:shadow-lg hover:shadow-[#DC2626]/10 sm:p-6"
            >
              <div className="flex flex-col gap-6 lg:flex-row lg:items-center">
                <div className="h-24 w-24 overflow-hidden rounded-xl border-2 border-[#2A2A2A] bg-white transition-colors group-hover:border-[#DC2626] flex-shrink-0">
                  <Image
                    src={supplier.image}
                    alt={supplier.name}
                    width={96}
                    height={96}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="mb-3 flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
                    <div className="min-w-0 flex-1">
                      <div className="mb-2 flex flex-wrap items-center gap-2 sm:gap-3">
                        <h2 className="truncate text-xl font-bold text-white transition-colors group-hover:text-[#DC2626] sm:text-2xl">
                          {supplier.name}
                        </h2>

                        {supplier.verified && (
                          <div className="inline-flex items-center gap-1.5 rounded-full border border-green-500/20 bg-green-500/10 px-1.5 py-0.5 text-xs">
                            <CircleCheck className="h-3 w-3 text-green-500" />
                            <span className="font-medium text-green-500">
                              Verified
                            </span>
                          </div>
                        )}

                        {supplier.topRated && (
                          <div className="inline-flex items-center gap-1.5 rounded-full border border-yellow-500/20 bg-yellow-500/10 px-1.5 py-0.5 text-xs">
                            <Star className="h-3 w-3 text-yellow-500" />
                            <span className="font-medium text-yellow-500">
                              Top Rated
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="mb-3 flex flex-col gap-2 text-sm text-[#9CA3AF] sm:flex-row sm:flex-wrap sm:items-center sm:gap-6">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          <span>{supplier.location}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          <span>Responds in {supplier.responseTime}</span>
                        </div>

                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-[#DC2626] text-[#DC2626]" />
                          <span className="font-medium text-white">
                            {supplier.rating}
                          </span>
                          <span>({supplier.reviews})</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-2">
                        {supplier.specialties.map((specialty) => (
                          <span
                            key={specialty}
                            className="rounded-md border border-[#2A2A2A] bg-[#0A0A0A] px-2.5 py-1 text-xs text-[#9CA3AF]"
                          >
                            {specialty}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="text-left xl:w-[110px] xl:flex-shrink-0 xl:text-center">
                      <div className="inline-flex items-center gap-1.5">
                        <Shield
                          className={`h-4 w-4 ${
                            supplier.trustScore >= 90
                              ? "text-green-500"
                              : "text-yellow-500"
                          }`}
                        />
                        <span
                          className={`text-lg font-bold ${
                            supplier.trustScore >= 90
                              ? "text-green-500"
                              : "text-yellow-500"
                          }`}
                        >
                          {supplier.trustScore}
                        </span>
                      </div>
                      <p className="mt-2 text-xs text-[#9CA3AF]">Trust Score</p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-4 border-t border-[#2A2A2A] pt-4 sm:flex-row sm:items-center sm:gap-6">
                    <div className="flex items-center gap-2 text-sm">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#DC2626]/10">
                        <Award className="h-4 w-4 text-[#DC2626]" />
                      </div>
                      <div>
                        <div className="font-semibold text-white">
                          {supplier.ordersCompleted}
                        </div>
                        <div className="text-xs text-[#9CA3AF]">
                          Orders Completed
                        </div>
                      </div>
                    </div>

                    <div className="flex-1" />

                    <div className="flex flex-col gap-3 sm:flex-row">
                      <button
                        type="button"
                        className="rounded-lg bg-[#DC2626] px-6 py-2.5 text-sm font-medium text-white transition-all hover:bg-[#B91C1C]"
                      >
                        View Products
                      </button>
                      <button
                        type="button"
                        className="rounded-lg border border-[#2A2A2A] px-6 py-2.5 text-sm font-medium text-white transition-all hover:border-[#DC2626] hover:bg-[#DC2626]/10"
                      >
                        Request Quote
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 text-center">
          <button
            type="button"
            className="rounded-lg border border-[#2A2A2A] px-8 py-3 font-medium text-white transition-all hover:border-[#DC2626] hover:bg-[#DC2626]/10"
          >
            Load More Suppliers
          </button>
        </div>
      </div>
    </main>
  );
};