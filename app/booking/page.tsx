import { BookingPage } from "@/components/site/booking/main-booking";

import { getPublicGarage } from "@/lib/public-garages";

export const dynamic = "force-dynamic";

type BookingProps = {
  searchParams: Promise<{
    garageId?: string;
    serviceId?: string;
  }>;
};

export default async function Booking({ searchParams }: BookingProps) {
  const params = await searchParams;
  const garageId = typeof params.garageId === "string" ? params.garageId : "";
  const serviceId = typeof params.serviceId === "string" ? params.serviceId : "";
  const garage = garageId ? await getPublicGarage(garageId) : null;

  return <BookingPage garage={garage} initialServiceId={serviceId} />;
}
