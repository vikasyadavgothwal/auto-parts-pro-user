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
  const confirmedModelId = getSearchParam(params, "modelId").trim();
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
    modelId: confirmedModelId,
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
    ? "Part Search Results"
    : confirmedVin
      ? "Confirmed Fitment"
      : "Results Found";
  const description = confirmedVin
    ? "Parts below are matched against the vehicle fitment data saved in the database."
    : partNumber
      ? "Part number, OEM number, and part name matches from the marketplace database."
      : textQuery
        ? "Part number, OEM number, and part name matches from the marketplace database."
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
        partNumber || textQuery
          ? "No part number, OEM number, or part name matches were found in the marketplace database."
          : confirmedVin
            ? "No database parts are linked to this VIN yet."
            : "No mapped supplier products were found for this search."
      }
    />
  );
}
