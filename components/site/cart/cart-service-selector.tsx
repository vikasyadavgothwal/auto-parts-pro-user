"use client";

import { useEffect, useMemo, useState } from "react";
import { Check, ChevronsUpDown, Search, Wrench } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSiteCart } from "@/components/site/cart/cart-provider";
import type {
  PublicGarageDetail,
  PublicGarageListResponse,
  PublicGarageService,
  PublicGarageSummary,
} from "@/types/site/garages";

type GarageDetailResponse = {
  ok?: boolean;
  garage?: PublicGarageDetail;
  message?: string;
};

const fieldClass =
  "h-11 w-full rounded-lg border border-border bg-brand-surface px-3 text-sm text-white outline-none focus:border-primary";

const serviceLabel = (service: PublicGarageService) =>
  `${service.name} - ${service.currency} ${(service.price / 100).toFixed(2)}`;

export function CartServiceSelector() {
  const { addItem, serviceItems } = useSiteCart();
  const [garages, setGarages] = useState<PublicGarageSummary[]>([]);
  const [selectedGarageId, setSelectedGarageId] = useState("");
  const [garageSearch, setGarageSearch] = useState("");
  const [services, setServices] = useState<PublicGarageService[]>([]);
  const [selectedServiceId, setSelectedServiceId] = useState("");
  const [isLoadingGarages, setIsLoadingGarages] = useState(true);
  const [isLoadingServices, setIsLoadingServices] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [message, setMessage] = useState("");

  const selectedGarage = useMemo(
    () => garages.find((garage) => garage.id === selectedGarageId) ?? null,
    [garages, selectedGarageId],
  );
  const selectedService = useMemo(
    () => services.find((service) => service.id === selectedServiceId) ?? null,
    [selectedServiceId, services],
  );
  const alreadySelected = Boolean(
    selectedGarage &&
      selectedService &&
      serviceItems.some(
        (item) =>
          item.garageId === selectedGarage.id &&
          item.serviceId === selectedService.id,
      ),
  );
  const filteredGarages = useMemo(() => {
    const query = garageSearch.trim().toLowerCase();
    if (!query) return garages;
    return garages.filter((garage) =>
      [
        garage.name,
        garage.city,
        garage.state,
        garage.country,
        garage.address,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase()
        .includes(query),
    );
  }, [garageSearch, garages]);

  useEffect(() => {
    let mounted = true;
    fetch("/api/public-garages?page=1&pageSize=50", {
      cache: "no-store",
      headers: { accept: "application/json" },
    })
      .then(async (response) => {
        const payload = (await response.json().catch(() => null)) as
          | PublicGarageListResponse
          | null;
        if (!response.ok || !payload?.ok) {
          throw new Error("Unable to load garages.");
        }
        if (!mounted) return;
        setGarages(payload.garages ?? []);
      })
      .catch((error) => {
        if (!mounted) return;
        setMessage(
          error instanceof Error ? error.message : "Unable to load garages.",
        );
      })
      .finally(() => {
        if (mounted) setIsLoadingGarages(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (!selectedGarageId) {
      return;
    }

    let mounted = true;
    fetch(`/api/public-garages/${encodeURIComponent(selectedGarageId)}`, {
      cache: "no-store",
      headers: { accept: "application/json" },
    })
      .then(async (response) => {
        const payload = (await response.json().catch(() => null)) as
          | GarageDetailResponse
          | null;
        if (!response.ok || !payload?.ok || !payload.garage) {
          throw new Error(payload?.message ?? "Unable to load services.");
        }
        if (!mounted) return;
        setServices(payload.garage.services ?? []);
      })
      .catch((error) => {
        if (!mounted) return;
        setServices([]);
        setMessage(
          error instanceof Error ? error.message : "Unable to load services.",
        );
      })
      .finally(() => {
        if (mounted) setIsLoadingServices(false);
      });

    return () => {
      mounted = false;
    };
  }, [selectedGarageId]);

  async function addSelectedService() {
    if (!selectedGarage || !selectedService || isAdding || alreadySelected) {
      return;
    }

    setIsAdding(true);
    setMessage("");
    const result = await addItem({
      type: "service",
      garageId: selectedGarage.id,
      garageName: selectedGarage.name,
      serviceId: selectedService.id,
      title: selectedService.name,
      category: selectedService.category,
      durationMinutes: selectedService.durationMinutes,
      unitPrice: selectedService.price / 100,
      currency: selectedService.currency,
      quantity: 1,
    });
    setMessage(result.message);
    setIsAdding(false);
  }

  return (
    <div className="space-y-4 rounded-xl border border-border bg-brand-panel p-4">
      <div className="flex items-start gap-3">
        <div className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-primary/25 bg-primary/10 text-primary">
          <Wrench className="h-5 w-5" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-white">
            Need garage service for this order?
          </h2>
          <p className="mt-1 text-sm text-brand-muted">
            Select a garage service now and pay only the service advance with
            the product order. You will choose the service slot after parts are
            delivered.
          </p>
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-[1fr_1fr_auto] md:items-end">
        <label className="grid gap-2 text-sm">
          <span className="text-brand-muted">Garage</span>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                type="button"
                variant="outline"
                disabled={isLoadingGarages}
                className="h-11 justify-between rounded-lg border-border bg-brand-surface px-3 text-left text-white hover:bg-brand-surface"
              >
                <span className="truncate">
                  {selectedGarage?.name ??
                    (isLoadingGarages ? "Loading garages..." : "Search garage")}
                </span>
                <ChevronsUpDown className="h-4 w-4 text-brand-muted" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="start"
              className="w-[min(28rem,calc(100vw-2rem))] border-border bg-brand-panel p-2 text-white"
            >
              <div className="relative mb-2">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-muted" />
                <input
                  value={garageSearch}
                  onChange={(event) => setGarageSearch(event.target.value)}
                  placeholder="Search garage..."
                  className="h-10 w-full rounded-md border border-border bg-brand-surface pl-9 pr-3 text-sm text-white outline-none focus:border-primary"
                />
              </div>
              <div className="max-h-72 overflow-y-auto">
                {filteredGarages.length ? (
                  filteredGarages.map((garage) => (
                    <DropdownMenuItem
                      key={garage.id}
                      onSelect={() => {
                        setMessage("");
                        setServices([]);
                        setSelectedServiceId("");
                        setSelectedGarageId(garage.id);
                        setGarageSearch("");
                        setIsLoadingServices(true);
                      }}
                      className="cursor-pointer px-3 py-2"
                    >
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-medium">{garage.name}</p>
                        <p className="truncate text-xs text-brand-muted">
                          {[garage.city, garage.state, garage.country]
                            .filter(Boolean)
                            .join(", ") || "Garage"}
                        </p>
                      </div>
                      {selectedGarageId === garage.id ? (
                        <Check className="h-4 w-4 text-primary" />
                      ) : null}
                    </DropdownMenuItem>
                  ))
                ) : (
                  <p className="px-3 py-6 text-center text-sm text-brand-muted">
                    No garages found.
                  </p>
                )}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </label>

        <label className="grid gap-2 text-sm">
          <span className="text-brand-muted">Service</span>
          <select
            value={selectedServiceId}
            onChange={(event) => {
              setMessage("");
              setSelectedServiceId(event.target.value);
            }}
            disabled={!selectedGarageId || isLoadingServices}
            className={fieldClass}
          >
            <option value="">
              {isLoadingServices ? "Loading services..." : "Select service"}
            </option>
            {services.map((service) => (
              <option key={service.id} value={service.id}>
                {serviceLabel(service)}
              </option>
            ))}
          </select>
        </label>

        <Button
          type="button"
          disabled={!selectedService || alreadySelected || isAdding}
          onClick={addSelectedService}
          className="h-11 rounded-xl px-4"
        >
          {alreadySelected
            ? "Already added"
            : isAdding
              ? "Adding..."
              : "Add service"}
        </Button>
      </div>

      {message ? (
        <p className="rounded-lg border border-border bg-brand-surface px-3 py-2 text-sm text-brand-muted">
          {message}
        </p>
      ) : null}
    </div>
  );
}
