import { notFound } from "next/navigation";

import { ServiceDetailPage } from "@/components/site/service/sections/single-garage";
import { getPublicGarage } from "@/lib/public-garages";

export const dynamic = "force-dynamic";

type GarageDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function GarageDetailPage({
  params,
}: GarageDetailPageProps) {
  const garage = await getPublicGarage((await params).id);

  if (!garage) {
    notFound();
  }

  return <ServiceDetailPage garage={garage} />;
}
