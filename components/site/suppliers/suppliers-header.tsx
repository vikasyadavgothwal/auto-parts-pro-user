import Link from "next/link";

export const Supplier_Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-[#2A2A2A] bg-[#0A0A0A]">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex h-20 items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#DC2626]">
              <span className="text-xl font-bold text-white">A</span>
            </div>
            <span className="text-xl font-bold text-white">AutoParts</span>
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            <Link
              href="/search"
              className="font-medium text-[#9CA3AF] transition-colors hover:text-white"
            >
              Parts
            </Link>
            <Link
              href="/rfq"
              className="font-medium text-[#9CA3AF] transition-colors hover:text-white"
            >
              RFQ
            </Link>
            <Link
              href="/services"
              className="font-medium text-[#9CA3AF] transition-colors hover:text-white"
            >
              Garages
            </Link>
            <Link
              href="/suppliers"
              className="font-medium text-[#9CA3AF] transition-colors hover:text-white"
            >
              Suppliers
            </Link>
            <Link
              href="/business"
              className="font-medium text-[#9CA3AF] transition-colors hover:text-white"
            >
              For Business
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <button className="p-2 text-[#9CA3AF] transition-colors hover:text-white">
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
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </button>

            <Link
              href="/checkout"
              className="relative p-2 text-[#9CA3AF] transition-colors hover:text-white"
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
                className="h-5 w-5"
              >
                <circle cx="8" cy="21" r="1" />
                <circle cx="19" cy="21" r="1" />
                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
              </svg>
            </Link>

            <Link
              href="/dashboard/buyer"
              className="p-2 text-[#9CA3AF] transition-colors hover:text-white"
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
                className="h-5 w-5"
              >
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

