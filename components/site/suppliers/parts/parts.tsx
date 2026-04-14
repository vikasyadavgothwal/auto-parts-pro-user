"use client";

import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Clock,
  Star,
  Shield,
  CircleCheck,
  Package,
  TrendingUp,
  Search,
  ChevronDown,
} from "lucide-react";

type Product = {
  id: number;
  name: string;
  partNumber: string;
  condition: string;
  price: string;
  offers?: string;
  image: string;
  href: string;
  confirmedFit?: boolean;
};

const products: Product[] = [
  {
    id: 1,
    name: "Front Brake Pad Set - Ceramic",
    partNumber: "BP-2847-C",
    condition: "New - OEM",
    price: "$89.99",
    offers: "3 offers from $79.99",
    image:
      "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400",
    href: "/product/1",
    confirmedFit: true,
  },
  {
    id: 2,
    name: "Front Strut Assembly",
    partNumber: "SA-1923-L",
    condition: "New - Aftermarket",
    price: "$249.99",
    image:
      "https://images.unsplash.com/photo-1625047509248-ec889cbff17f?w=400",
    href: "/product/2",
    confirmedFit: true,
  },
  {
    id: 3,
    name: "Engine Air Filter",
    partNumber: "AF-7781",
    condition: "New - OEM",
    price: "$34.99",
    offers: "2 offers from $29.99",
    image:
      "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=400",
    href: "/product/3",
    confirmedFit: true,
  },
];

export const Parts = () => {
  return (
    <main className="pt-24 pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-6">
          <div className="flex flex-wrap items-center gap-2 text-sm text-[#9CA3AF]">
            <Link href="/" className="transition-colors hover:text-white">
              Home
            </Link>
            <span>/</span>
            <Link href="/suppliers" className="transition-colors hover:text-white">
              Suppliers
            </Link>
            <span>/</span>
            <span className="text-white">Premium Auto Parts Inc.</span>
          </div>
        </div>

        <div className="mb-8 rounded-2xl border border-[#2A2A2A] bg-[#1A1A1A] p-5 sm:p-6 lg:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-8">
            <div className="h-28 w-28 overflow-hidden rounded-xl border-2 border-[#2A2A2A] bg-white sm:h-32 sm:w-32 flex-shrink-0">
              <Image
                src="https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=200&fit=crop"
                alt="Premium Auto Parts Inc."
                width={128}
                height={128}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="flex-1">
              <div className="mb-4 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <div className="mb-3 flex flex-wrap items-center gap-3">
                    <h1 className="text-2xl font-bold text-white sm:text-3xl">
                      Premium Auto Parts Inc.
                    </h1>

                    <div className="inline-flex items-center gap-1.5 rounded-full border border-green-500/20 bg-green-500/10 px-2 py-1 text-sm">
                      <CircleCheck className="h-4 w-4 text-green-500" />
                      <span className="font-medium text-green-500">Verified</span>
                    </div>

                    <div className="inline-flex items-center gap-1.5 rounded-full border border-yellow-500/20 bg-yellow-500/10 px-2 py-1 text-sm">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span className="font-medium text-yellow-500">Top Rated</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 text-sm text-[#9CA3AF] sm:flex-row sm:flex-wrap sm:items-center sm:gap-6">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <span>Detroit, MI</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span>Avg. response: 1.8 hrs</span>
                    </div>
                  </div>
                </div>

                <div className="text-left lg:text-center">
                  <div className="inline-flex items-center gap-1.5">
                    <Shield className="h-4 w-4 text-green-500" />
                    <span className="text-lg font-bold text-green-500">92</span>
                  </div>
                  <p className="mt-2 text-xs text-[#9CA3AF]">Trust Score</p>
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                <button
                  type="button"
                  className="rounded-lg bg-[#DC2626] px-8 py-3 font-medium text-white transition-all hover:bg-[#B91C1C]"
                >
                  View Products
                </button>
                <Link
                  href="/dashboard/buyer/create-rfq"
                  className="rounded-lg border border-[#2A2A2A] px-8 py-3 font-medium text-white transition-all hover:border-[#DC2626] hover:bg-[#DC2626]/10"
                >
                  Request Quote
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-xl border border-[#2A2A2A] bg-[#1A1A1A] p-6">
            <div className="mb-2 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#DC2626]/10">
                <Star className="h-5 w-5 text-[#DC2626]" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">4.8</div>
                <div className="text-xs text-[#9CA3AF]">Average Rating</div>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-[#DC2626] text-[#DC2626]" />
              <Star className="h-4 w-4 fill-[#DC2626] text-[#DC2626]" />
              <Star className="h-4 w-4 fill-[#DC2626] text-[#DC2626]" />
              <Star className="h-4 w-4 fill-[#DC2626] text-[#DC2626]" />
              <Star className="h-4 w-4 text-[#2A2A2A]" />
              <span className="ml-2 text-xs text-[#9CA3AF]">(1,234)</span>
            </div>
          </div>

          <div className="rounded-xl border border-[#2A2A2A] bg-[#1A1A1A] p-6">
            <div className="mb-2 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#DC2626]/10">
                <Package className="h-5 w-5 text-[#DC2626]" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">2,847</div>
                <div className="text-xs text-[#9CA3AF]">Orders Completed</div>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-[#2A2A2A] bg-[#1A1A1A] p-6">
            <div className="mb-2 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#DC2626]/10">
                <TrendingUp className="h-5 w-5 text-[#DC2626]" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">98%</div>
                <div className="text-xs text-[#9CA3AF]">Fulfillment Rate</div>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-[#2A2A2A] bg-[#1A1A1A] p-6">
            <div className="mb-2 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#DC2626]/10">
                <Clock className="h-5 w-5 text-[#DC2626]" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">1.8 hrs</div>
                <div className="text-xs text-[#9CA3AF]">Response Time</div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-8 rounded-xl border border-[#DC2626]/20 bg-gradient-to-r from-[#DC2626]/10 to-[#DC2626]/5 p-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <CircleCheck className="mt-0.5 h-5 w-5 text-[#DC2626]" />
              <div>
                <p className="text-sm font-medium text-white">
                  Showing parts for{" "}
                  <span className="text-[#DC2626]">2019 Toyota Camry SE</span>
                </p>
                <p className="mt-0.5 text-xs text-[#9CA3AF]">
                  Products are filtered for compatibility with your vehicle
                </p>
              </div>
            </div>

            <button
              type="button"
              className="text-left text-sm font-medium text-[#DC2626] transition-colors hover:text-[#B91C1C] sm:text-right"
            >
              Change Vehicle
            </button>
          </div>
        </div>

        <div className="sticky top-20 z-10 mb-8 -mx-4 border-b border-[#2A2A2A] bg-[#0A0A0A] px-4 sm:-mx-6 sm:px-6">
          <div className="flex items-center gap-5 overflow-x-auto sm:gap-8">
            <button className="border-b-2 border-[#DC2626] py-4 text-sm font-medium capitalize text-white whitespace-nowrap">
              products
            </button>
            <button className="border-b-2 border-transparent py-4 text-sm font-medium capitalize text-[#9CA3AF] transition-colors hover:text-white whitespace-nowrap">
              reviews
            </button>
            <button className="border-b-2 border-transparent py-4 text-sm font-medium capitalize text-[#9CA3AF] transition-colors hover:text-white whitespace-nowrap">
              about
            </button>
            <button className="border-b-2 border-transparent py-4 text-sm font-medium capitalize text-[#9CA3AF] transition-colors hover:text-white whitespace-nowrap">
              rfq
            </button>
          </div>
        </div>

        <div id="products-section">
          <div className="mb-6 rounded-xl border border-[#2A2A2A] bg-[#1A1A1A] p-4">
            <div className="flex flex-col gap-4 lg:flex-row lg:flex-wrap lg:items-center">
              <div className="min-w-0 flex-1 lg:min-w-[200px]">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9CA3AF]" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    className="w-full rounded-lg border border-[#2A2A2A] bg-[#0A0A0A] py-2.5 pl-10 pr-4 text-white placeholder-[#9CA3AF] transition-colors focus:outline-none focus:border-[#DC2626]"
                  />
                </div>
              </div>

              <div className="relative w-full sm:w-auto">
                <select className="min-w-full appearance-none rounded-lg border border-[#2A2A2A] bg-[#0A0A0A] py-2.5 pl-4 pr-10 text-white transition-colors focus:outline-none focus:border-[#DC2626] cursor-pointer sm:min-w-[180px]">
                  <option value="all">All Categories</option>
                  <option value="brakes">Brake Systems</option>
                  <option value="suspension">Suspension</option>
                  <option value="engine">Engine Parts</option>
                  <option value="electrical">Electrical</option>
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9CA3AF]" />
              </div>

              <div className="relative w-full sm:w-auto">
                <select className="min-w-full appearance-none rounded-lg border border-[#2A2A2A] bg-[#0A0A0A] py-2.5 pl-4 pr-10 text-white transition-colors focus:outline-none focus:border-[#DC2626] cursor-pointer sm:min-w-[180px]">
                  <option value="all">All Conditions</option>
                  <option value="new-oem">New - OEM</option>
                  <option value="new-aftermarket">New - Aftermarket</option>
                  <option value="refurbished">Refurbished</option>
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9CA3AF]" />
              </div>

              <div className="relative w-full sm:w-auto">
                <select className="min-w-full appearance-none rounded-lg border border-[#2A2A2A] bg-[#0A0A0A] py-2.5 pl-4 pr-10 text-white transition-colors focus:outline-none focus:border-[#DC2626] cursor-pointer sm:min-w-[180px]">
                  <option value="relevance">Most Relevant</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="newest">Newest First</option>
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9CA3AF]" />
              </div>
            </div>
          </div>

          <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {products.map((product) => (
              <Link
                key={product.id}
                href={product.href}
                className="group block overflow-hidden rounded-xl border border-[#2A2A2A] bg-[#1A1A1A] transition-all hover:border-[#DC2626] hover:shadow-lg hover:shadow-[#DC2626]/10"
              >
                <div className="relative aspect-square overflow-hidden bg-[#0A0A0A]">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                <div className="p-5">
                  {product.confirmedFit && (
                    <div className="mb-3">
                      <div className="inline-flex items-center gap-1.5 rounded-md border border-green-500/20 bg-green-500/10 px-2.5 py-1">
                        <CircleCheck className="h-3.5 w-3.5 text-green-500" />
                        <span className="text-xs font-medium text-green-500">
                          Confirmed Fit
                        </span>
                      </div>
                    </div>
                  )}

                  <h3 className="mb-1 text-lg font-semibold text-white transition-colors group-hover:text-[#DC2626]">
                    {product.name}
                  </h3>

                  <p className="mb-3 text-sm text-[#9CA3AF]">
                    Part #: {product.partNumber}
                  </p>

                  <div className="mb-4 text-xs text-[#9CA3AF]">
                    {product.condition}
                  </div>

                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold text-white">
                        {product.price}
                      </div>
                      {product.offers && (
                        <div className="text-xs text-[#9CA3AF]">
                          {product.offers}
                        </div>
                      )}
                    </div>
                  </div>

                  <button
                    type="button"
                    className="w-full rounded-lg bg-[#DC2626] py-2.5 text-sm font-medium text-white transition-all hover:bg-[#B91C1C]"
                  >
                    View Offers
                  </button>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};