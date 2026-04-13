import Image from "next/image";
import Link from "next/link";

export const Featured = () => {
  const products = [
    {
      id: 1,
      category: "BRAKES",
      name: "ACDelco Professional Brake Pads",
      price: "$89.99",
      image:
        "https://images.unsplash.com/photo-1656597631995-9fa0e1072279?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
    },
    {
      id: 2,
      category: "FILTERS",
      name: "Bosch Oil Filter Premium",
      price: "$24.99",
      image:
        "https://images.unsplash.com/photo-1764869427688-3e97480f4b82?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
    },
    {
      id: 3,
      category: "IGNITION",
      name: "Denso Spark Plug Set",
      price: "$42.99",
      image:
        "https://images.unsplash.com/photo-1759832217256-244b5bc54882?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
    },
    {
      id: 4,
      category: "SUSPENSION",
      name: "Monroe Shock Absorber",
      price: "$156.00",
      image:
        "https://images.unsplash.com/photo-1729545321223-e597f91a25d9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
    },
  ];

  return (
    <section className="bg-[#0A0A0A] py-24">
      <div className="mx-auto max-w-[1200px] px-8">
        <div className="mb-16 text-center">
          <span className="text-sm font-semibold uppercase tracking-wide text-[#DC2626]">
            FEATURED PARTS
          </span>

          <h2 className="mt-2 mb-4 text-4xl font-bold text-white">
            Top-Rated Products
          </h2>

          <p className="text-lg text-[#9CA3AF]">
            Best-selling parts from verified suppliers
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/product/${product.id}`}
              className="group overflow-hidden rounded-xl border border-[#2A2A2A] bg-[#1A1A1A] transition-all hover:border-[#DC2626]"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-[#2A2A2A]">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />

                <div className="absolute top-3 left-3">
                  <span className="rounded bg-[#DC2626] px-3 py-1 text-xs font-semibold text-white">
                    {product.category}
                  </span>
                </div>
              </div>

              <div className="p-5">
                <h3 className="mb-2 text-sm font-semibold text-white">
                  {product.name}
                </h3>
                <p className="text-lg font-bold text-[#DC2626]">
                  {product.price}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/search"
            className="inline-flex items-center gap-2 rounded-lg bg-[#DC2626] px-8 py-4 font-medium text-white transition-all hover:bg-[#B91C1C]"
          >
            <span>View All Parts</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};
