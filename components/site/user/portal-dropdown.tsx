"use client";

import Link from "next/link";
import {
  Building2,
  ChevronDown,
  Shield,
  ShoppingCart,
  Truck,
  Wrench,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const portals = [
  {
    label: "Buyer Portal",
    href: "/dashboard/buyer",
    icon: ShoppingCart,
  },
  {
    label: "Supplier Portal",
    href: "/dashboard/supplier",
    icon: Building2,
  },
  {
    label: "Garage Portal",
    href: "/dashboard/garage",
    icon: Wrench,
  },
  {
    label: "Fleet Portal",
    href: "/dashboard/fleet",
    icon: Truck,
  },
  {
    label: "Admin Portal",
    href: "/dashboard/admin",
    icon: Shield,
  },
];

export function PortalDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-2 rounded-full border px-5 py-2.5 text-black transition-all">
          Portals
          <ChevronDown className="h-4 w-4 transition-transform data-[state=open]:rotate-180" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="z-50 mt-2 w-[280px] overflow-hidden rounded-xl border border-[#2A2A2A] bg-[#1A1A1A] p-2 shadow-2xl"
      >
        {portals.map((item) => {
          const Icon = item.icon;

          return (
            <DropdownMenuItem key={item.href} asChild>
              <Link
                href={item.href}
                className="group flex cursor-pointer items-center gap-3 rounded-lg px-4 py-3 transition-all hover:bg-[#2A2A2A] focus:bg-[#2A2A2A]"
              >
                <Icon className="h-5 w-5 text-[#DC2626]" />
                <span className="font-medium text-white transition-colors group-hover:text-[#DC2626]">
                  {item.label}
                </span>
              </Link>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}