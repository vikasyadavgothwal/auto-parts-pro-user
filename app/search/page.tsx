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
  const partNumber = getSearchParam(params, "partNumber").trim().slice(0, 120);
  const textQuery = getSearchParam(params, "q").trim().slice(0, 120);
  const confirmedVin = getSearchParam(params, "vin").trim().toUpperCase().slice(0, 17);
  const confirmedModelId = getSearchParam(params, "modelId").trim().slice(0, 100);
  const confirmedYear = getSearchParam(params, "year").trim().slice(0, 4);
  const confirmedMake = getSearchParam(params, "make").trim().slice(0, 80);
  const confirmedModel = getSearchParam(params, "model").trim().slice(0, 80);
  const deliveryCity = getSearchParam(params, "deliveryCity").trim().slice(0, 120);
  const deliveryState = getSearchParam(params, "deliveryState").trim().slice(0, 120);
  const deliveryCountry = getSearchParam(params, "deliveryCountry").trim().slice(0, 120);
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
    deliveryCity,
    deliveryState,
    deliveryCountry,
    limit: 24,
  });
  const products = result.products.map((product) =>
    marketplaceProductToSearchProduct(product, {
      deliveryCity,
      deliveryState,
      deliveryCountry,
    }),
  );
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
