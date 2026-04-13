import Link from "next/link";

const Search = () => {
  return (
    <section className="bg-[#0A0A0A] py-10">
      <div className="mx-auto max-w-[1200px] px-10">
        <div className="flex flex-col gap-4 md:flex-row">
          <div className="flex-1">
            <label className="mb-2 block text-sm font-medium text-[#9CA3AF]">
              Vehicle Identification Number (VIN)
            </label>

            <div className="relative">
              <input
                type="text"
                placeholder="Enter 17-digit VIN (e.g., 1HGBH41JXMN109186)"
                className="h-14 w-full rounded-lg border border-[#2A2A2A] bg-[#1A1A1A] px-5 text-white transition-all placeholder:text-[#4B5563] focus:border-[#DC2626] focus:outline-none focus:ring-2 focus:ring-[#DC2626]/50"
              />
            </div>
          </div>

          <div className="flex items-end">
            <Link
              href="/search"
              className="group flex h-14 w-full items-center justify-center gap-2 rounded-lg bg-[#DC2626] px-8 font-medium text-white transition-all hover:bg-[#B91C1C] md:w-auto"
            >
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
                className="h-5 w-5 text-white"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>

              <span className="text-white">Search Parts</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Search;