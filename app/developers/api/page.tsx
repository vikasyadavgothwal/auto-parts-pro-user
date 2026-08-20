import type { Metadata } from "next"
import { headers } from "next/headers"
import Link from "next/link"
import {
  Building2,
  CalendarCheck,
  Car,
  CheckCircle2,
  FileCode2,
  KeyRound,
  PackageSearch,
  ShieldCheck,
  Truck,
  UploadCloud,
  Wrench,
} from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Developer API | AutoParts Pro",
  description: "Developer API guide for garage, fleet, and supplier integrations on AutoParts Pro.",
}

const baseUrl = async () => {
  const host = (await headers()).get("host") ?? "localhost:3001"
  const protocol = host.startsWith("localhost") || host.startsWith("127.0.0.1") ? "http" : "https"
  return `${protocol}://${host}`
}

const noBody = { requestBody: "No request body" }

const profileFields = {
  garage: ["garageName", "workingDays", "workingHours", "workingHoursByDay", "address", "country", "state", "city", "jobCompletedNumber", "yearsExperience", "responseTime", "certifications", "about"],
  fleet: ["companyName", "firstName", "lastName", "addressLine1", "addressLine2", "city", "state", "country"],
  supplier: ["companyName", "firstName", "lastName", "contactPerson", "designation", "addressLine1", "addressLine2", "city", "state", "country"],
}

const roles = [
  {
    id: "garage",
    label: "Garage APIs",
    icon: Building2,
    description: "Profile, services, and appointments for a garage account.",
    scopes: "account.profile.*, garage.services.*, garage.bookings.*",
    sections: [
      {
        title: "Profile update",
        icon: Building2,
        summary: "Use this first so your garage information is complete before services and appointments go live.",
        fields: profileFields.garage,
        actions: [
          {
            method: "GET",
            endpoint: "/api/v1/developer/account",
            purpose: "Read the current editable garage profile fields.",
            rules: ["Use this before PATCH if your system only updates changed fields."],
            body: noBody,
          },
          {
            method: "PATCH",
            endpoint: "/api/v1/developer/account",
            purpose: "Update garage profile fields. Send only the fields that changed.",
            rules: ["Email, mobile verification, documents, logo, and gallery stay in dashboard settings."],
            body: {
              garageName: "Rapid Fix Garage",
              address: "Al Quoz Industrial Area 3",
              country: "United Arab Emirates",
              state: "Dubai",
              city: "Dubai",
              responseTime: "Within 2 hours",
              yearsExperience: 8,
              about: "German, Japanese, and commercial fleet service specialist.",
            },
          },
        ],
      },
      {
        title: "Services create, edit, delete",
        icon: Wrench,
        summary: "Publish services that customers can book. Create/edit bodies should not send status from this docs flow; delete removes the service from booking selection.",
        actions: [
          {
            method: "GET",
            endpoint: "/api/v1/developer/garage/services",
            purpose: "List active garage services and copy service ids for edits, deletes, or appointments.",
            rules: ["Response includes service id, public id, price, duration, bookings count, and status."],
            body: noBody,
          },
          {
            method: "POST",
            endpoint: "/api/v1/developer/garage/services",
            purpose: "Create one garage service.",
            rules: ["Do not send status in create body.", "Plan service limits are checked before create."],
            body: {
              name: "Brake inspection and pad replacement",
              category: "Brake System",
              durationMinutes: 90,
              price: 299,
              currency: "AED",
            },
          },
          {
            method: "PATCH",
            endpoint: "/api/v1/developer/garage/services/{id}",
            purpose: "Edit an existing garage service by id.",
            rules: ["Send only changed fields.", "Do not send status in edit body from this integration flow."],
            body: {
              name: "Brake inspection and front pad replacement",
              category: "Brake System",
              durationMinutes: 105,
              price: 349,
              currency: "AED",
            },
          },
          {
            method: "DELETE",
            endpoint: "/api/v1/developer/garage/services/{id}",
            purpose: "Delete a service that should no longer be bookable.",
            rules: ["Use the service id from the GET services response."],
            body: noBody,
          },
        ],
      },
      {
        title: "Appointments check, create, update",
        icon: CalendarCheck,
        summary: "Use this for offline/customer appointments created through a garage integration.",
        actions: [
          {
            method: "GET",
            endpoint: "/api/v1/developer/garage/bookings",
            purpose: "Check all garage appointments and their current status.",
            rules: ["Use serviceId and booking ids from this response for update flows."],
            body: noBody,
          },
          {
            method: "POST",
            endpoint: "/api/v1/developer/garage/bookings",
            purpose: "Create an appointment in a garage slot.",
            rules: ["bookingDate must be YYYY-MM-DD.", "bookingTime must be h:mm AM/PM and only 00, 15, 30, or 45 minutes.", "Backend rejects closed days and times outside configured garage opening hours.", "If 10:00 is booked, 10:10 is invalid because it is not a 15-minute slot and overlaps the 10:00 slot window."],
            body: {
              serviceId: "service_123",
              customerName: "Arman Sheikh",
              customerEmail: "arman@example.com",
              customerPhone: "+971501234567",
              vehicleYear: 2021,
              vehicleMake: "Toyota",
              vehicleModel: "Camry",
              vehicleVin: "1HGCM82633A004352",
              bookingDate: "2026-09-10",
              bookingTime: "10:30 AM",
              notes: "Customer reported brake noise.",
            },
          },
          {
            method: "PATCH",
            endpoint: "/api/v1/developer/garage/bookings/{id}",
            purpose: "Update appointment status after garage action.",
            rules: ["Allowed statuses: pending, confirmed, completed, cancelled.", "Completion can require completionOtp when the booking requires customer confirmation."],
            body: { status: "confirmed" },
          },
        ],
      },
    ],
  },
  {
    id: "fleet",
    label: "Fleet APIs",
    icon: Truck,
    description: "Profile, vehicles, RFQs, quote comparison, and bid acceptance for fleet accounts.",
    scopes: "account.profile.*, fleet.vehicles.* plus dashboard-auth RFQ/order actions",
    sections: [
      {
        title: "Profile update",
        icon: Truck,
        summary: "Keep fleet company and address details updated before creating RFQs.",
        fields: profileFields.fleet,
        actions: [
          { method: "GET", endpoint: "/api/v1/developer/account", purpose: "Read fleet profile fields.", rules: ["Use before PATCH to avoid overwriting fields with stale values."], body: noBody },
          {
            method: "PATCH",
            endpoint: "/api/v1/developer/account",
            purpose: "Update fleet profile fields.",
            rules: ["Verified email and mobile remain dashboard-controlled."],
            body: { companyName: "Metro Cold Chain Fleet", firstName: "Amit", lastName: "Verma", addressLine1: "Warehouse 14, Logistics District", city: "Dubai", state: "Dubai", country: "United Arab Emirates" },
          },
        ],
      },
      {
        title: "Vehicles create, edit, delete",
        icon: Car,
        summary: "Sync fleet vehicles so RFQs can use saved vehicle ids and VINs.",
        actions: [
          { method: "GET", endpoint: "/api/v1/developer/fleet/vehicles?page=1&pageSize=10", purpose: "List saved fleet vehicles.", rules: ["Use returned id as fleetVehicleId when a single vehicle RFQ is created."], body: noBody },
          {
            method: "POST",
            endpoint: "/api/v1/developer/fleet/vehicles",
            purpose: "Create one fleet vehicle.",
            rules: ["Do not send status in create body from this docs flow.", "VIN must be unique in the fleet."],
            body: { vehicleName: "Delivery Van 12", vin: "1FTBR1C82RKA12345", mileage: 48200, driver: "Ravi Sharma", year: 2024, make: "Ford", model: "Transit", trim: "Cargo", isPrimary: false },
          },
          {
            method: "PATCH",
            endpoint: "/api/v1/developer/fleet/vehicles/{id}",
            purpose: "Edit mileage, driver, or vehicle details.",
            rules: ["Send only changed fields.", "Do not send status in edit body from this docs flow."],
            body: { mileage: 50120, driver: "Arjun Mehta", vehicleName: "Delivery Van 12 - Route B", isPrimary: false },
          },
          { method: "DELETE", endpoint: "/api/v1/developer/fleet/vehicles/{id}", purpose: "Delete a vehicle from the fleet record.", rules: ["Use the vehicle id from the vehicle list response."], body: noBody },
        ],
      },
      {
        title: "RFQ create, single view, compare, accept",
        icon: FileCode2,
        summary: "RFQ routes are dashboard-auth APIs today. The flow is: create RFQ, list RFQs, open one RFQ by id, wait for ranked bids, accept one bid id.",
        actions: [
          {
            method: "POST",
            endpoint: "/api/v1/rfqs",
            purpose: "Create a multi-part fleet RFQ. Send multipart/form-data with a payload JSON field.",
            rules: ["One RFQ supports up to 100 parts.", "Each part can have its own vehicleVin."],
            body: {
              payload: {
                source: "fleet",
                fleetVehicleId: "veh_123_if_single_vehicle",
                projectName: "Q3 refrigerated van maintenance parts",
                description: "Brake and cooling parts for multiple vehicles.",
                responseDeadline: "2026-09-15T23:59:59.000Z",
                deliveryRequirement: "Standard Delivery",
                paymentTerms: "Net 30",
                companyName: "Metro Cold Chain Fleet",
                contactName: "Amit Verma",
                email: "fleet@example.com",
                phone: "+971501234567",
                vehicle: { vin: "1FTBR1C82RKA12345", year: 2024, make: "Ford", model: "Transit" },
                parts: [
                  { vehicleVin: "1FTBR1C82RKA12345", partName: "Front brake pad set", partNumber: "04465-33471", quantity: 2, targetPrice: "185.50", notes: "OEM or equivalent accepted" },
                  { vehicleVin: "WDBUF56X78B123456", partName: "Air intake assembly", partNumber: "A2710900382", quantity: 1, targetPrice: "900.00", notes: "New or remanufactured only" },
                ],
              },
            },
          },
          { method: "GET", endpoint: "/api/v1/rfqs?page=1&pageSize=20", purpose: "List fleet RFQs and get each rfq.id.", rules: ["The list response includes parts and visible ranked bids when they are ready."], body: noBody },
          { method: "GET", endpoint: "/api/v1/rfqs/{id}", purpose: "Open one RFQ by id and see which suppliers quoted it.", rules: ["Supplier bids become visible after the ranking window, currently around 30 minutes.", "Each returned bid has an id used for accept."], body: noBody },
          { method: "POST", endpoint: "/api/v1/rfqs/{id}/bids/{bidId}/accept", purpose: "Accept one supplier bid and create the order.", rules: ["If addressId is blank, backend uses the default delivery address.", "Accepting one bid rejects other submitted bids for the RFQ."], body: { addressId: "addr_123_delivery_location_optional" } },
        ],
      },
    ],
  },
  {
    id: "supplier",
    label: "Supplier APIs",
    icon: PackageSearch,
    description: "Profile, single-part upload/edit, RFQ quoting, received orders, and proof of delivery.",
    scopes: "account.profile.*, supplier.inventory.* plus dashboard-auth RFQ/order actions",
    sections: [
      {
        title: "Profile update",
        icon: PackageSearch,
        summary: "Update supplier business and contact details before inventory or quote work.",
        fields: profileFields.supplier,
        actions: [
          { method: "GET", endpoint: "/api/v1/developer/account", purpose: "Read supplier profile fields.", rules: ["Use before PATCH if you only sync changed fields."], body: noBody },
          { method: "PATCH", endpoint: "/api/v1/developer/account", purpose: "Update supplier profile fields.", rules: ["Banking, documents, verification, and compliance stay in dashboard settings."], body: { companyName: "Prime Auto Spares LLC", contactPerson: "Sara Khan", designation: "Sales Manager", addressLine1: "Spare Parts Market, Shop 22", city: "Sharjah", state: "Sharjah", country: "United Arab Emirates" } },
        ],
      },
      {
        title: "Single part upload and edit",
        icon: UploadCloud,
        summary: "Use the full product-master body when uploading one detailed supplier part. Edit uses the same structure or offer-update fields.",
        actions: [
          { method: "GET", endpoint: "/api/v1/developer/supplier/parts?page=1&pageSize=10&status=mapped", purpose: "List supplier parts by mapping status and search query.", rules: ["Use returned id for edit."], body: noBody },
          {
            method: "POST",
            endpoint: "/api/v1/developer/supplier/parts",
            purpose: "Upload one complete supplier product/part.",
            rules: ["This body supports product identity, category, brand, attributes, vehicle fitment, pricing, inventory, images, documents, cross references, bundle, shipping, compliance, and marketplace settings.", "Supplier catalog plan limits are checked before create."],
            body: {
              mode: "product_master_form",
              identity: { sku: "SKU-BRK-04465", productName: "Front Brake Pad Set", shortDescription: "Front brake pads for Toyota fleet vehicles", longDescription: "OEM quality ceramic brake pad set.", mpn: "04465-33471", status: "Active", grade: "A", condition: "New" },
              category: { name: "Brake System", parentId: null },
              brand: { name: "Toyota Genuine", productCategories: ["Brake System"], tier: "OEM" },
              attributes: { name: "Material", value: "Ceramic", detailed: "Low dust ceramic compound" },
              vehicle: { make: "Toyota", model: "Camry", yearStart: 2018, yearEnd: 2024, engine: "2.5L", trim: "All", driveType: "FWD", notes: "Front axle" },
              pricing: { basePrice: 199, discountPrice: 185.5, currency: "AED", taxClass: "standard", vat: "5", maxRetailPrice: 230, wholesaleDistributorPrice: 170, fleetPrice: 175 },
              inventory: { warehouseId: "main-warehouse", quantity: 18, leadTime: "2 days", lowStockThreshold: 3 },
              images: { primaryUrl: "https://example.com/brake-pad.jpg", galleryUrls: ["https://example.com/brake-pad-side.jpg"] },
              document: { type: "spec_sheet", url: "https://example.com/spec.pdf" },
              crossReferences: { oemNumber: "04465-33471", oemSupersessionNumbers: ["04465-33470"], competitorPartNumber: "D1210", competitorBrandName: "Aftermarket Pro", hsCode: "870830" },
              bundle: { componentSku: null, quantityInBundle: null, parentBundleSku: null, quantityAsComponent: null },
              shipping: { weightKg: 2.4, lengthCm: 24, widthCm: 18, heightCm: 8, hsCode: "870830", countryOfOrigin: "Japan" },
              compliance: { warrantyMonths: 12, certification: "ISO 9001" },
              marketplace: { allowBackorders: false, maxOrderQuantity: 20, isActive: true },
            },
          },
          {
            method: "PATCH",
            endpoint: "/api/v1/developer/supplier/parts/{id}",
            purpose: "Edit the uploaded part, including status, pricing, stock, condition, descriptions, and marketplace fields.",
            rules: ["Use the part id from the list response.", "Send either the same product_master_form structure or offer-update fields."],
            body: { vendorSku: "SKU-BRK-04465", productName: "Front Brake Pad Set", shortDescription: "Updated front brake pad listing", mpn: "04465-33471", status: "Active", grade: "A", condition: "New", category: "Brake System", basePrice: 199, discountPrice: 179, currency: "AED", stock: 12, price: 179, fleetPrice: 170 },
          },
        ],
      },
      {
        title: "RFQ quote submit",
        icon: FileCode2,
        summary: "Supplier users list RFQs, open one RFQ, then submit a quote against requested part ids.",
        actions: [
          { method: "GET", endpoint: "/api/v1/rfqs?page=1&pageSize=20", purpose: "List open RFQs available to quote.", rules: ["Supplier response shows requested parts and your existing bid if present."], body: noBody },
          { method: "GET", endpoint: "/api/v1/rfqs/{id}", purpose: "Open one RFQ before quoting.", rules: ["Copy each requested part id into quote items as rfqPartId."], body: noBody },
          { method: "POST", endpoint: "/api/v1/rfqs/{id}/bids", purpose: "Submit one supplier quote for one or more RFQ parts.", rules: ["Each item needs rfqPartId, unitPrice, partType, and deliveryOption.", "Delivery options: 24_hours, 48_hours, 72_hours, one_month, more_than_one_month.", "partType examples: New, Used, Refurbished, Remanufactured, Salvage."], body: { items: [{ rfqPartId: "rfq_part_123", unitPrice: "172.25", partType: "New", deliveryOption: "48_hours" }, { rfqPartId: "rfq_part_456", unitPrice: "820.00", partType: "Remanufactured", deliveryOption: "72_hours" }], validUntil: "2026-09-14", notes: "All items are available from UAE stock." } },
        ],
      },
      {
        title: "Orders received and delivery proof",
        icon: CheckCircle2,
        summary: "Do not send arbitrary order status. Supplier order status moves through specific actions: confirm received order, then submit proof for delivered items.",
        actions: [
          { method: "GET", endpoint: "/api/v1/orders?page=1&pageSize=10&status=pending", purpose: "List orders received by the supplier dashboard account.", rules: ["Use order.id and item ids from this response for confirm/proof flows."], body: noBody },
          { method: "PATCH", endpoint: "/api/v1/supplier/orders/{id}", purpose: "Confirm a paid pending order received by the supplier.", rules: ["No custom status body is accepted here.", "Backend sets status to confirmed and calculates expected delivery from quoted delivery options."], body: noBody },
          { method: "POST",
            endpoint: "/api/v1/supplier/orders/{id}",
            purpose: "Submit proof of delivery for one or more order items.",
            rules: ["Send multipart/form-data.", "proof must be JPG, PNG, or WebP up to 5 MB.", "If all items are delivered, backend marks order delivered; otherwise it marks processing."],
            body: { proof: "delivery-photo.jpg", itemIds: "[\"order_item_123\",\"order_item_456\"]", recipientName: "Amit Verma", note: "Delivered to warehouse security desk." },
          },
          { method: "GET", endpoint: "/api/v1/orders/{id}/proof?itemId=order_item_123", purpose: "Download/view submitted proof of delivery for an order item.", rules: ["Returns a short-lived signed proof URL when the requester owns the order."], body: noBody },
        ],
      },
    ],
  },
]

const errors = [
  ["400", "Bad request", "Body is missing, invalid, or failed validation."],
  ["401", "Unauthorized", "Missing session or API key."],
  ["403", "Forbidden", "Role, ownership, plan, or scope does not allow this action."],
  ["404", "Not found", "The requested record does not exist for this account."],
  ["429", "Rate limited", "Too many requests. Retry after the limit resets."],
]

function JsonBlock({ value }: { value: unknown }) {
  return (
    <pre className="max-h-[520px] overflow-x-auto rounded-xl border border-border bg-background p-4 text-xs leading-6 text-foreground">
      <code>{JSON.stringify(value, null, 2)}</code>
    </pre>
  )
}

export default async function DeveloperApiPage() {
  const apiBase = await baseUrl()

  return (
    <main className="bg-background text-foreground">
      <section className="border-b border-border bg-[radial-gradient(circle_at_top_left,rgba(220,38,38,0.24),transparent_32%),linear-gradient(180deg,#111111_0%,#0A0A0A_100%)] py-16">
        <div className="site-container space-y-5">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
            <FileCode2 className="h-4 w-4" /> Developer API documentation
          </div>
          <h1 className="max-w-4xl text-4xl font-bold tracking-tight text-white sm:text-5xl">Role-wise APIs for Garage, Fleet, and Supplier workflows.</h1>
          <p className="max-w-3xl text-lg leading-8 text-brand-muted">Click a role tab, then follow each API card in order. Every card explains what the API is for, the exact endpoint, validation rules, and the body for that specific method.</p>
        </div>
      </section>

      <section className="sticky top-0 z-20 border-b border-border bg-[#111111]/95 backdrop-blur">
        <div className="site-container flex gap-3 overflow-x-auto py-4">
          {roles.map((role) => {
            const Icon = role.icon
            return <Link key={role.id} href={`#${role.id}`} className="inline-flex min-w-max items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold text-brand-muted transition hover:border-primary hover:bg-primary/10 hover:text-white"><Icon className="h-4 w-4" /> {role.label}</Link>
          })}
        </div>
      </section>

      <section className="site-container grid gap-5 py-10 lg:grid-cols-[1.1fr_0.9fr]">
        <Card className="surface-card shadow-none">
          <CardHeader><CardTitle className="flex items-center gap-2 text-white"><KeyRound className="h-5 w-5 text-primary" /> Developer API-key auth</CardTitle><CardDescription className="text-brand-muted">Use for `/api/v1/developer/*` routes.</CardDescription></CardHeader>
          <CardContent className="space-y-4"><JsonBlock value={{ baseUrl: apiBase, headers: { Authorization: "Bearer app_live_xxx", "Content-Type": "application/json" } }} /><p className="text-sm text-brand-muted">Dashboard-auth APIs use the logged-in dashboard session, not a Developer API key.</p></CardContent>
        </Card>
        <Card className="surface-card shadow-none">
          <CardHeader><CardTitle className="flex items-center gap-2 text-white"><ShieldCheck className="h-5 w-5 text-primary" /> Access rules</CardTitle><CardDescription className="text-brand-muted">Backend verifies role, ownership, plan, limits, and API scopes.</CardDescription></CardHeader>
          <CardContent className="space-y-3 text-sm text-brand-muted"><p>Do not rely on frontend hiding for authorization.</p><p>Developer APIs are for external backend integrations. RFQ/order routes shown as dashboard-auth require logged-in Fleet or Supplier sessions.</p></CardContent>
        </Card>
      </section>

      <section className="site-container space-y-12 pb-14">
        {roles.map((role) => {
          const RoleIcon = role.icon
          return (
            <div key={role.id} id={role.id} className="scroll-mt-24 rounded-3xl border border-border bg-card p-5 sm:p-7">
              <div className="mb-7 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div className="max-w-3xl"><div className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-sm font-semibold text-primary"><RoleIcon className="h-4 w-4" /> {role.label}</div><h2 className="text-2xl font-bold tracking-tight text-white">{role.description}</h2></div>
                <div className="rounded-2xl border border-border bg-brand-surface p-4 text-xs text-brand-muted lg:w-96"><p className="mb-2 font-semibold text-white">Current access</p><p>{role.scopes}</p></div>
              </div>
              <div className="space-y-6">
                {role.sections.map((section) => {
                  const SectionIcon = section.icon
                  return (
                    <Card key={section.title} className="border-border bg-brand-panel shadow-none">
                      <CardHeader className="border-b border-border bg-brand-surface"><CardTitle className="flex items-center gap-2 text-xl text-white"><SectionIcon className="h-5 w-5 text-primary" /> {section.title}</CardTitle><CardDescription className="text-brand-muted">{section.summary}</CardDescription>{"fields" in section && Array.isArray(section.fields) ? <div className="flex flex-wrap gap-2 pt-2">{section.fields.map((field) => <span key={field} className="rounded-full border border-border bg-background px-2.5 py-1 text-xs text-brand-muted">{field}</span>)}</div> : null}</CardHeader>
                      <CardContent className="grid gap-4 p-5">
                        {section.actions.map((action) => (
                          <div key={`${action.method}-${action.endpoint}`} className="rounded-2xl border border-border bg-card p-4">
                            <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-start md:justify-between"><div><div className="mb-2 flex flex-wrap items-center gap-2"><span className="rounded-full bg-primary px-2.5 py-1 text-xs font-bold text-white">{action.method}</span><code className="break-all rounded-lg border border-border bg-background px-2.5 py-1 text-xs text-brand-muted">{action.endpoint}</code></div><p className="text-sm text-white">{action.purpose}</p></div></div>
                            <div className="grid gap-4 lg:grid-cols-[0.85fr_1.15fr]"><div><p className="mb-2 text-sm font-semibold text-white">Rules</p><ul className="space-y-2 text-sm text-brand-muted">{action.rules.map((rule) => <li key={rule} className="flex gap-2"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" /> <span>{rule}</span></li>)}</ul></div><div><p className="mb-2 text-sm font-semibold text-white">Request body</p><JsonBlock value={action.body} /></div></div>
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </div>
          )
        })}
      </section>

      <section className="site-container pb-16">
        <div className="mb-6 max-w-3xl"><h2 className="text-2xl font-semibold tracking-tight text-white">Error handling</h2><p className="mt-2 text-brand-muted">Use one response handling pattern across Garage, Fleet, and Supplier integrations.</p></div>
        <div className="overflow-hidden rounded-xl border border-border bg-card">
          <table className="w-full border-collapse text-sm"><thead className="bg-brand-surface text-left text-white"><tr><th className="p-4">Status</th><th className="p-4">Meaning</th><th className="p-4">Action</th></tr></thead><tbody>{errors.map(([status, meaning, action]) => <tr key={status} className="border-t border-border"><td className="p-4 font-mono text-brand-muted">{status}</td><td className="p-4 font-medium text-white">{meaning}</td><td className="p-4 text-brand-muted">{action}</td></tr>)}</tbody></table>
        </div>
      </section>
    </main>
  )
}
