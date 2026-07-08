import { SearchPage } from "@/components/site/search/main-search";
import {
  marketplaceProductToSearchProduct,
  searchMarketplaceProducts,
} from "@/lib/marketplace";

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
  const partNumber = getSearchParam(params, "partNumber").trim();
  const textQuery = getSearchParam(params, "q").trim();
  const confirmedVin = getSearchParam(params, "vin").trim();
  const confirmedYear = getSearchParam(params, "year").trim();
  const confirmedMake = getSearchParam(params, "make").trim();
  const confirmedModel = getSearchParam(params, "model").trim();
  const confirmedVehicle =
    isConfirmedFitment && confirmedVin
      ? {
          year: confirmedYear,
          make: confirmedMake.toUpperCase(),
          model: confirmedModel.toUpperCase(),
          vin: confirmedVin,
        }
      : undefined;
  const result = await searchMarketplaceProducts({
    partNumber,
    vin: confirmedVin,
    year: confirmedYear,
    make: confirmedMake,
    model: confirmedModel,
    q: textQuery,
    limit: 24,
  });
  const products = result.products.map(marketplaceProductToSearchProduct);
  const queryLabel =
    partNumber ||
    [confirmedYear, confirmedMake || confirmedModel]
      .filter(Boolean)
      .join(" ")
      .trim() ||
    textQuery ||
    "available parts";
  const heading = partNumber
    ? "Part Number Results"
    : confirmedVin
      ? "Confirmed Fitment"
      : "Results Found";
  const description = confirmedVin
    ? "Parts below are matched against the vehicle fitment data saved in the database."
    : partNumber
      ? "Exact part-number matches from the marketplace database."
      : undefined;

  return (
    <SearchPage
      heading={heading}
      description={description}
      buttonLabel="Change Vehicle"
      vehicle={confirmedVehicle}
      products={products}
      queryLabel={queryLabel}
      emptyMessage={
        partNumber
          ? "This part number was not found in the marketplace database."
          : "No mapped supplier products were found for this search."
      }
    />
  );
}
