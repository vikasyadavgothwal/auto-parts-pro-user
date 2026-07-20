import Link from "next/link";
import {
  AwardIcon,
  CalendarIcon,
  ChevronLeftIcon,
  CircleCheckBigIcon,
  ClockIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
  RatingStarIcon,
  ShieldIcon,
} from "@/components/icons/site-icons";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { formatGaragePrice } from "@/lib/public-garages";
import { galleryImages as fallbackGalleryImages } from "@/lib/data/service";
import type { GarageDayHours, PublicGarageDetail } from "@/types/site/garages";

type ServiceDetailPageProps = {
  garage: PublicGarageDetail;
};

const fallbackGarageImage =
  "https://plus.unsplash.com/premium_photo-1661373022510-dfd61512e080?q=80&w=2731&auto=format&fit=crop";

const formatAddress = (garage: PublicGarageDetail) =>
  [garage.address, garage.city, garage.state, garage.country, garage.pincode]
    .filter(Boolean)
    .join(", ");

const formatMinutes = (minutes: number) => {
  if (minutes < 60) return `${minutes} min`;
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return remainingMinutes ? `${hours}h ${remainingMinutes}m` : `${hours}h`;
};

const formatClock = (value: string) => {
  const [hours, minutes] = value.split(":").map(Number);
  if (!Number.isFinite(hours) || !Number.isFinite(minutes)) return value;
  const suffix = hours >= 12 ? "PM" : "AM";
  const normalizedHours = hours % 12 || 12;
  return `${normalizedHours}:${String(minutes).padStart(2, "0")} ${suffix}`;
};

const dayHours = (day: string, hours?: GarageDayHours) =>
  hours?.enabled && hours.open && hours.close
    ? `${formatClock(hours.open)} - ${formatClock(hours.close)}`
    : "Closed";

export function ServiceDetailPage({ garage }: ServiceDetailPageProps) {
  const heroImage = garage.image || fallbackGarageImage;
  const address = formatAddress(garage);
  const certifications =
    garage.certifications.length > 0 ? garage.certifications : ["Verified Garage"];
  const services = garage.services;
  const ratingLabel = garage.reviewCount
    ? garage.ratingAverage.toFixed(1)
    : "New";
  const reviewCountLabel = `${garage.reviewCount} review${garage.reviewCount === 1 ? "" : "s"}`;
  const gallery =
    garage.galleryImages.length > 0
      ? garage.galleryImages.map((src, index) => ({
          src,
          alt: `${garage.name} gallery ${index + 1}`,
        }))
      : fallbackGalleryImages;

  return (
    <div className="min-h-screen bg-background">
      <div
        className="h-[260px] w-full overflow-hidden bg-cover bg-center sm:h-[320px] lg:h-[380px] xl:h-[420px]"
        style={{ backgroundImage: `url("${heroImage}")` }}
        aria-label={`${garage.name} garage image`}
      />

      <div className="mx-auto max-w-[1440px] px-4 pb-16 sm:px-6 lg:px-8">
        <div className="pt-6">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-sm text-brand-muted hover:text-foreground"
          >
            <ChevronLeftIcon className="h-4 w-4" />
            Back to garages
          </Link>
        </div>

        <div className="grid gap-8 pt-8 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <Card className="sticky top-28 rounded-2xl border border-border bg-card shadow-none">
              <CardContent className="p-6">
                <h3 className="mb-6 text-xl font-bold text-foreground">
                  Book a Service
                </h3>

                <div className="mb-6 rounded-xl border border-border bg-background p-4">
                  <div className="mb-3 flex items-center gap-3">
                    <PhoneIcon className="h-5 w-5 text-primary" />
                    <div>
                      <div className="text-xs text-brand-muted">Call Us</div>
                      {garage.mobile ? (
                        <a
                          href={`tel:${garage.mobile}`}
                          className="font-medium text-foreground hover:text-primary"
                        >
                          {garage.mobile}
                        </a>
                      ) : (
                        <span className="font-medium text-foreground">
                          Not added
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <MailIcon className="h-5 w-5 text-primary" />
                    <div>
                      <div className="text-xs text-brand-muted">Email</div>
                      {garage.email ? (
                        <a
                          href={`mailto:${garage.email}`}
                          className="text-sm font-medium text-foreground hover:text-primary"
                        >
                          {garage.email}
                        </a>
                      ) : (
                        <span className="text-sm font-medium text-foreground">
                          Not added
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="mb-3 text-sm font-semibold text-foreground">
                    Working Hours
                  </h4>

                  <div className="space-y-2">
                    {garage.workingDays.length ? (
                      garage.workingDays.map((day) => (
                        <div key={day} className="flex justify-between gap-4 text-sm">
                          <span className="text-brand-muted">{day}</span>
                          <span className="text-right font-medium text-foreground">
                            {dayHours(day, garage.workingHoursByDay[day])}
                          </span>
                        </div>
                      ))
                    ) : (
                      <div className="text-sm text-brand-muted">
                        Working hours not added
                      </div>
                    )}
                  </div>
                </div>

                <Link
                  href={`/booking?garageId=${encodeURIComponent(garage.id)}`}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-primary-foreground hover:bg-brand-primary-hover"
                >
                  <CalendarIcon className="h-5 w-5" />
                  Book Appointment
                </Link>

              </CardContent>
            </Card>
          </div>

          <div className="space-y-8 lg:col-span-2">
            <Card className="rounded-2xl border border-border bg-card shadow-none">
              <CardContent className="p-6 sm:p-8">
                <div className="mb-4 flex flex-col items-start justify-between sm:flex-row">
                  <div>
                    <h1 className="mb-3 text-3xl font-bold text-foreground sm:text-4xl">
                      {garage.name}
                    </h1>

                    <div className="mb-3 flex flex-wrap items-center gap-4">
                      <div className="flex flex-wrap items-center gap-2">
                        <RatingStarIcon
                          filled
                          className="h-6 w-6 text-brand-warning"
                        />
                        <span className="text-2xl font-bold text-foreground">
                          {ratingLabel}
                        </span>
                        <span className="text-brand-muted">
                          ({reviewCountLabel})
                        </span>
                      </div>

                      <Badge className="flex items-center gap-1 rounded-xl border border-brand-success/20 bg-brand-success/10 px-3 py-1 text-sm font-semibold text-brand-success hover:bg-brand-success/10">
                        <ShieldIcon className="h-4 w-4" />
                        Verified
                      </Badge>
                    </div>

                    <div className="mb-4 flex items-center gap-2 text-brand-muted">
                      <MapPinIcon className="h-5 w-5" />
                      <span>{address || "Location not added"}</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6 rounded-xl border border-border bg-background p-4 sm:grid-cols-3 sm:p-6">
                  <div className="text-center">
                    <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full border border-primary/20 bg-primary/10">
                      <CircleCheckBigIcon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="mb-1 text-2xl font-bold text-foreground">
                      {garage.jobCompletedNumber.toLocaleString()}
                    </div>
                    <div className="text-xs text-brand-muted">
                      Jobs Completed
                    </div>
                  </div>

                  <div className="text-center">
                    <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full border border-primary/20 bg-primary/10">
                      <AwardIcon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="mb-1 text-2xl font-bold text-foreground">
                      {garage.yearsExperience}
                    </div>
                    <div className="text-xs text-brand-muted">
                      Years in Business
                    </div>
                  </div>

                  <div className="text-center">
                    <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full border border-primary/20 bg-primary/10">
                      <ClockIcon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="mb-1 text-2xl font-bold text-foreground">
                      {garage.responseTime || "Contact"}
                    </div>
                    <div className="text-xs text-brand-muted">
                      Response Time
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="mb-3 text-sm font-medium text-brand-muted">
                    Certifications
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {certifications.map((item) => (
                      <Badge
                        key={item}
                        className="rounded-md border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-medium text-primary hover:bg-primary/10"
                      >
                        {item}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-2xl border border-border bg-card shadow-none">
              <CardContent className="p-6 sm:p-8">
                <h2 className="mb-4 text-2xl font-Inter text-foreground">
                  About
                </h2>
                <p className="leading-relaxed text-brand-muted">
                  {garage.about || "This garage has not added an about section yet."}
                </p>
              </CardContent>
            </Card>

            <Card className="rounded-2xl border border-border bg-card shadow-none">
              <CardContent className="p-6 sm:p-8">
                <h2 className="mb-6 text-2xl font-Inter text-foreground">
                  Services Offered
                </h2>

                {services.length ? (
                  <div className="space-y-4">
                    {services.map((service) => (
                      <div
                        key={service.id}
                        className="group rounded-xl border border-border bg-background p-4 transition-all hover:border-primary sm:p-6"
                      >
                        <div className="flex flex-col items-start justify-between sm:flex-row">
                          <div className="flex-1">
                            <div className="mb-2 flex items-center gap-3">
                              <h3 className="text-lg font-semibold text-foreground">
                                {service.name}
                              </h3>
                            </div>

                            <p className="mb-3 text-sm text-brand-muted">
                              {service.category}
                            </p>

                            <div className="flex items-center gap-4 text-sm">
                              <span className="flex items-center gap-1 text-brand-muted">
                                <ClockIcon className="h-4 w-4" />
                                {formatMinutes(service.durationMinutes)}
                              </span>
                            </div>
                          </div>

                          <div className="mt-4 w-full text-left sm:mt-0 sm:ml-6 sm:w-auto sm:text-right">
                            <div className="mb-3 text-2xl font-bold text-primary">
                              {formatGaragePrice(service.price, service.currency)}
                            </div>
                            <div className="flex flex-col gap-2 sm:items-end">
                              <Link
                                className="inline-flex w-full items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-brand-primary-hover sm:w-auto"
                                href={`/booking?garageId=${encodeURIComponent(garage.id)}&serviceId=${encodeURIComponent(service.id)}`}
                              >
                                Book Now
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-brand-muted">
                    No active services have been added yet.
                  </p>
                )}
              </CardContent>
            </Card>

            <Card className="rounded-2xl border border-border bg-card shadow-none">
              <CardContent className="p-6 sm:p-8">
                <h2 className="mb-6 text-2xl font-Inter text-foreground">
                  Customer Reviews
                </h2>

                <div className="space-y-6">
                  {garage.reviews.length ? garage.reviews.map((review) => (
                    <div
                      key={review.id}
                      className="border-b border-border pb-6 last:border-0"
                    >
                      <div className="mb-3 flex flex-col items-start justify-between sm:flex-row">
                        <div className="flex w-full flex-col md:flex-row md:justify-between">
                          <div className="mb-1 flex items-center gap-3">
                            <span className="font-semibold text-foreground">
                              {review.customerName}
                            </span>

                            <div className="flex">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <RatingStarIcon
                                  key={i}
                                  filled={i < review.rating}
                                  className={`h-4 w-4 ${
                                    i < review.rating
                                      ? "text-brand-warning"
                                      : "text-border"
                                  }`}
                                />
                              ))}
                            </div>
                          </div>

                          <div className="mb-2 text-sm text-brand-muted">
                            {review.serviceName} • {review.date}
                          </div>
                        </div>
                      </div>

                      <p className="mb-3 text-brand-muted">{review.comment}</p>
                    </div>
                  )) : (
                    <p className="text-brand-muted">
                      No customer reviews yet.
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-2xl border-none bg-transparent shadow-none">
              <CardContent className="p-6 sm:p-8">
                <h2 className="mb-6 text-2xl font-Inter text-foreground">
                  Gallery
                </h2>

                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                  {gallery.map((image) => (
                    <div
                      key={image.alt}
                      className="aspect-video overflow-hidden rounded-xl bg-cover bg-center"
                      style={{ backgroundImage: `url("${image.src}")` }}
                      aria-label={image.alt}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
