import { BookingPage } from "@/components/site/booking/main-booking";

import { getPublicGarage } from "@/lib/public-garages";

export const dynamic = "force-dynamic";

type BookingProps = {
  searchParams: Promise<{
    garageId?: string;
    serviceId?: string;
    payment?: string;
    session_id?: string;
    payment_id?: string;
  }>;
};

export default async function Booking({ searchParams }: BookingProps) {
  const params = await searchParams;
  const garageId = typeof params.garageId === "string" ? params.garageId : "";
  const serviceId = typeof params.serviceId === "string" ? params.serviceId : "";
  const paymentStatus = typeof params.payment === "string" ? params.payment : "";
  const paymentSessionId =
    typeof params.session_id === "string"
      ? params.session_id
      : typeof params.payment_id === "string"
        ? params.payment_id
        : "";
  const garage = garageId ? await getPublicGarage(garageId) : null;

  return (
    <BookingPage
      garage={garage}
      initialServiceId={serviceId}
      paymentStatus={paymentStatus}
      paymentSessionId={paymentSessionId}
    />
  );
}
