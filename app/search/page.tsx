import { SearchPage } from "@/components/site/search/main-search";
import { bookingVehicles } from "@/lib/data/booking";

type SearchPageRouteProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

const getSearchParam = (
  params: Record<string, string | string[] | undefined> | undefined,
  key: string,
) => {
  const value = params?.[key];

  if (Array.isArray(value)) {
    return value[0] ?? "";
  }

  return value ?? "";
};

export default async function Search({ searchParams }: SearchPageRouteProps) {
  const params = await searchParams;
  const isConfirmedFitment = getSearchParam(params, "fitment") === "confirmed";
  const confirmedVin = getSearchParam(params, "vin").trim();
  const confirmedYear = getSearchParam(params, "year").trim();
  const confirmedModel = getSearchParam(params, "model").trim();
  const confirmedVehicle =
    isConfirmedFitment && confirmedVin
      ? {
          year: confirmedYear,
          model: confirmedModel.toUpperCase(),
          vin: confirmedVin,
        }
      : bookingVehicles[0];

  return (
    <SearchPage
      heading="Confirmed Fitment"
      description="This part is guaranteed to fit your vehicle"
      buttonLabel="Change Vehicle"
      vehicle={confirmedVehicle}
    />
  );
}
