"use client";

import { useState, type FormEvent } from "react";

import { Button } from "@/components/ui/button";
import {
  CompanyInformationSection,
  PartsNeededSection,
  VehicleInformationSection,
} from "./form-sections";

export function RequestQuoteForm() {
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const values = new FormData(form);
    const partIds = Array.from(values.keys())
      .map((key) => key.match(/^parts\.(\d+)\.name$/)?.[1])
      .filter((value): value is string => Boolean(value));
    const parts = partIds.map((id) => ({
      partName: String(values.get(`parts.${id}.name`) ?? ""),
      partNumber: String(values.get(`parts.${id}.partNumber`) ?? ""),
      quantity: Number(values.get(`parts.${id}.quantity`) ?? 1),
      targetPrice: String(values.get(`parts.${id}.targetPrice`) ?? ""),
      notes: String(values.get(`parts.${id}.notes`) ?? ""),
    }));
    const deadline = new Date();
    deadline.setDate(deadline.getDate() + 7);
    const companyName = String(values.get("companyName") ?? "");
    const contactName = String(values.get("contactName") ?? "").trim();
    const email = String(values.get("email") ?? "").trim().toLowerCase();
    const phone = String(values.get("phone") ?? "").trim();
    const vin = String(values.get("vehicleVin") ?? "").trim().toUpperCase();
    const year = Number(values.get("vehicleYear"));
    const make = String(values.get("vehicleMake") ?? "").trim();
    const model = String(values.get("vehicleModel") ?? "").trim();
    const currentYear = new Date().getFullYear();
    const validationError =
      companyName.trim().length < 2
        ? "Company name must contain at least 2 characters."
        : contactName.length < 2
          ? "Contact name must contain at least 2 characters."
          : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
            ? "Enter a valid email address."
            : !/^[+\d][\d\s()-]{6,20}$/.test(phone)
              ? "Enter a valid phone number."
              : vin && !/^[A-HJ-NPR-Z0-9]{17}$/.test(vin)
                ? "VIN must contain exactly 17 valid characters."
                : !Number.isInteger(year) || year < 1886 || year > currentYear + 1
                  ? `Vehicle year must be between 1886 and ${currentYear + 1}.`
                  : !make
                    ? "Vehicle make is required."
                    : !model
                      ? "Vehicle model is required."
                      : parts.some((part) => part.partName.trim().length < 2)
                        ? "Every part must have a valid part name."
                        : parts.some(
                            (part) =>
                              !Number.isInteger(part.quantity) ||
                              part.quantity < 1 ||
                              part.quantity > 10000,
                          )
                          ? "Every part quantity must be between 1 and 10,000."
                          : parts.some(
                              (part) =>
                                part.targetPrice !== "" &&
                                (!Number.isFinite(Number(part.targetPrice)) ||
                                  Number(part.targetPrice) < 0),
                            )
                            ? "Target prices must be valid non-negative amounts."
                            : "";
    const attachment = values.get("attachment");
    const attachmentError =
      attachment instanceof File && attachment.size > 10 * 1024 * 1024
        ? "Attachment must be 10 MB or smaller."
        : attachment instanceof File &&
            attachment.size > 0 &&
            !["application/pdf", "image/png", "image/jpeg"].includes(
              attachment.type,
            )
          ? "Attachment must be PDF, PNG, or JPG."
          : "";
    if (validationError || attachmentError) {
      setError(validationError || attachmentError);
      setMessage("");
      return;
    }
    const payload = {
      source: "user",
      projectName: `${companyName} parts request`,
      description: "Public website RFQ",
      responseDeadline: deadline.toISOString(),
      deliveryRequirement: "Standard Delivery",
      paymentTerms: "Due on Receipt",
      companyName,
      contactName,
      email,
      phone,
      vehicle: {
        vin,
        year,
        make,
        model,
        trim: String(values.get("vehicleTrim") ?? ""),
      },
      parts,
    };
    const body = new FormData();
    body.set("payload", JSON.stringify(payload));
    if (attachment instanceof File && attachment.size > 0) body.set("attachment", attachment);

    setPending(true);
    setError("");
    setMessage("");
    try {
      const response = await fetch("/api/rfqs", { method: "POST", body });
      const result = await response.json();
      if (!response.ok || !result.ok) throw new Error(result.message ?? "Unable to submit RFQ");
      form.reset();
      setMessage("Quote request submitted to suppliers successfully.");
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Unable to submit RFQ");
    } finally {
      setPending(false);
    }
  }

  return (
    <form className="space-y-6 sm:space-y-8" onSubmit={submit}>
      <CompanyInformationSection />
      <VehicleInformationSection />
      <PartsNeededSection />
      {error ? <p className="text-center text-sm text-red-500">{error}</p> : null}
      {message ? <p className="text-center text-sm text-green-500">{message}</p> : null}
      <div className="flex justify-center">
        <Button type="submit" disabled={pending} className="h-12 w-full rounded-full px-6 text-base font-medium hover:bg-brand-primary-hover sm:h-auto sm:w-auto sm:px-8 sm:py-6 sm:text-lg">
          {pending ? "Submitting..." : "Submit Quote Request"}
        </Button>
      </div>
    </form>
  );
}
