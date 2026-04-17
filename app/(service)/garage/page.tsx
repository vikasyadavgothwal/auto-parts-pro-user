import Image from "next/image";
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
  ShieldIcon,
  RatingStarIcon,
} from "@/components/icons/site-icons";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
const services = [
  {
    title: "Oil Change & Filter",
    description: "Complete oil change with premium synthetic oil and new filter",
    duration: "30 min",
    price: "$49.99",
    popular: true,
  },
  {
    title: "Brake Pad Replacement",
    description: "Front or rear brake pad replacement with inspection",
    duration: "2 hours",
    price: "$199.99",
    popular: true,
  },
  {
    title: "Tire Rotation & Balance",
    description: "Four-wheel rotation and computerized balancing",
    duration: "45 min",
    price: "$69.99",
    popular: false,
  },
  {
    title: "Engine Diagnostics",
    description: "Comprehensive computer diagnostics with detailed report",
    duration: "1 hour",
    price: "$89.99",
    popular: true,
  },
  {
    title: "Battery Service",
    description: "Battery testing, cleaning, and replacement if needed",
    duration: "30 min",
    price: "$129.99",
    popular: false,
  },
  {
    title: "AC Service & Recharge",
    description: "Complete AC system check and refrigerant recharge",
    duration: "1.5 hours",
    price: "$149.99",
    popular: false,
  },
];
const reviews = [
  {
    name: "John Smith",
    service: "Brake Pad Replacement",
    date: "March 15, 2026",
    rating: 5,
    content:
      "Excellent service! The team was professional and completed the work ahead of schedule. My car drives like new. Highly recommend!",
    helpful: 24,
  },
  {
    name: "Sarah Johnson",
    service: "Oil Change & Filter",
    date: "March 10, 2026",
    rating: 5,
    content:
      "Fast and efficient. They explained everything clearly and the waiting area was comfortable. Will definitely come back.",
    helpful: 18,
  },
  {
    name: "Michael Chen",
    service: "Engine Diagnostics",
    date: "March 5, 2026",
    rating: 4,
    content:
      "Good diagnostic service. Found the issue quickly and provided detailed explanation. Only minor wait time.",
    helpful: 12,
  },
];
const certifications = ["ASE Certified", "AAA Approved", "Bosch Service"];
const galleryImages = [
  {
    src: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=400&h=300&fit=crop",
    alt: "Gallery 1",
  },
  {
    src: "https://images.unsplash.com/photo-1625047509248-ec889cbff17f?w=400&h=300&fit=crop",
    alt: "Gallery 2",
  },
  {
    src: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400&h=300&fit=crop",
    alt: "Gallery 3",
  },
];

export default function ServiceDetailPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-[1440px] px-4 py-6 sm:px-6 lg:px-8">
        <Button
          asChild
          variant="ghost"
          className="gap-2 px-0 text-brand-muted hover:bg-transparent hover:text-foreground"
        >
          <Link href="/services">
            <ChevronLeftIcon className="h-4 w-4" />
            <span className="text-sm">Back to services</span>
          </Link>
        </Button>
      </div>

      <div className="relative h-64 overflow-hidden sm:h-80 lg:h-96">
        <Image
          src="https://plus.unsplash.com/premium_photo-1661373022510-dfd61512e080?q=80&w=2731&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Premium Auto Care"
          fill
          className="object-cover"
          priority
          sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
      </div>

      <div className="mx-auto max-w-[1440px] px-4 pb-16 sm:px-6 lg:px-8">
        <div className="relative z-10 -mt-24 grid gap-8 sm:-mt-32 lg:grid-cols-3">
          <div className="space-y-8 lg:col-span-2">
            <Card className="rounded-2xl border border-border bg-card shadow-none">
              <CardContent className="p-6 sm:p-8">
                <div className="mb-4 flex flex-col items-start justify-between sm:flex-row">
                  <div>
                    <h1 className="mb-3 text-3xl font-bold text-foreground sm:text-4xl">
                      Premium Auto Care
                    </h1>

                    <div className="mb-3 flex flex-wrap items-center gap-4">
                      <div className="flex flex-wrap items-center gap-2">
                        <RatingStarIcon
                          filled
                          className="h-6 w-6 text-brand-warning"
                        />
                        <span className="text-2xl font-bold text-foreground">4.9</span>
                        <span className="text-brand-muted">(328 reviews)</span>
                      </div>

                      <Badge className="flex items-center gap-1 rounded-lg border border-brand-success/20 bg-brand-success/10 px-3 py-1 text-sm font-semibold text-brand-success hover:bg-brand-success/10">
                        <ShieldIcon className="h-4 w-4" />
                        Verified
                      </Badge>
                    </div>

                    <div className="mb-4 flex items-center gap-2 text-brand-muted">
                      <MapPinIcon className="h-5 w-5" />
                      <span>1234 Main St, San Francisco, CA 94102</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6 rounded-xl border border-border bg-background p-4 sm:grid-cols-3 sm:p-6">
                  <div className="text-center">
                    <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full border border-primary/20 bg-primary/10">
                      <CircleCheckBigIcon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="mb-1 text-2xl font-bold text-foreground">2,340</div>
                    <div className="text-xs text-brand-muted">Jobs Completed</div>
                  </div>

                  <div className="text-center">
                    <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full border border-primary/20 bg-primary/10">
                      <AwardIcon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="mb-1 text-2xl font-bold text-foreground">12</div>
                    <div className="text-xs text-brand-muted">Years in Business</div>
                  </div>

                  <div className="text-center">
                    <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full border border-primary/20 bg-primary/10">
                      <ClockIcon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="mb-1 text-2xl font-bold text-foreground">
                      &lt; 15 min
                    </div>
                    <div className="text-xs text-brand-muted">Response Time</div>
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
                        className="rounded-lg border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-medium text-primary hover:bg-primary/10"
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
                <h2 className="mb-4 text-2xl font-bold text-foreground">About</h2>
                <p className="leading-relaxed text-brand-muted">
                  Premium Auto Care has been serving the San Francisco community
                  for over 12 years. Our ASE-certified technicians use
                  state-of-the-art diagnostic equipment and genuine OEM parts to
                  ensure your vehicle receives the highest quality service.
                </p>
              </CardContent>
            </Card>

            <Card className="rounded-2xl border border-border bg-card shadow-none">
              <CardContent className="p-6 sm:p-8">
                <h2 className="mb-6 text-2xl font-bold text-foreground">
                  Services Offered
                </h2>

                <div className="space-y-4">
                  {services.map((service) => (
                    <div
                      key={service.title}
                      className="group rounded-xl border border-border bg-background p-4 transition-all hover:border-primary sm:p-6"
                    >
                      <div className="flex flex-col items-start justify-between sm:flex-row">
                        <div className="flex-1">
                          <div className="mb-2 flex items-center gap-3">
                            <h3 className="text-lg font-semibold text-foreground">
                              {service.title}
                            </h3>

                            {service.popular && (
                              <Badge className="rounded bg-primary px-2 py-1 text-xs font-semibold text-primary-foreground hover:bg-primary">
                                POPULAR
                              </Badge>
                            )}
                          </div>

                          <p className="mb-3 text-sm text-brand-muted">
                            {service.description}
                          </p>

                          <div className="flex items-center gap-4 text-sm">
                            <span className="flex items-center gap-1 text-brand-muted">
                              <ClockIcon className="h-4 w-4" />
                              {service.duration}
                            </span>
                          </div>
                        </div>

                        <div className="mt-4 w-full text-left sm:mt-0 sm:ml-6 sm:w-auto sm:text-right">
                          <div className="mb-3 text-2xl font-bold text-primary">
                            {service.price}
                          </div>
                          <Button className="w-full bg-primary text-sm font-medium text-primary-foreground hover:bg-brand-primary-hover sm:w-auto">
                            Book Now
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-2xl border border-border bg-card shadow-none">
              <CardContent className="p-6 sm:p-8">
                <h2 className="mb-6 text-2xl font-bold text-foreground">
                  Customer Reviews
                </h2>

                <div className="space-y-6">
                  {reviews.map((review, index) => (
                    <div
                      key={`${review.name}-${index}`}
                      className="border-b border-border pb-6 last:border-0"
                    >
                      <div className="mb-3 flex flex-col items-start justify-between sm:flex-row">
                        <div>
                          <div className="mb-1 flex items-center gap-3">
                            <span className="font-semibold text-foreground">
                              {review.name}
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
                            {review.service} • {review.date}
                          </div>
                        </div>
                      </div>

                      <p className="mb-3 text-brand-muted">{review.content}</p>

                      <Button
                        variant="ghost"
                        className="h-auto p-0 text-sm text-brand-muted hover:bg-transparent hover:text-foreground"
                      >
                        Helpful ({review.helpful})
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-2xl border border-border bg-card shadow-none">
              <CardContent className="p-6 sm:p-8">
                <h2 className="mb-6 text-2xl font-bold text-foreground">Gallery</h2>

                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                  {galleryImages.map((image) => (
                    <div
                      key={image.alt}
                      className="relative aspect-video overflow-hidden rounded-xl"
                    >
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

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
                      <a
                        href="tel:+1 (555) 123-4567"
                        className="font-medium text-foreground hover:text-primary"
                      >
                        +1 (555) 123-4567
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <MailIcon className="h-5 w-5 text-primary" />
                    <div>
                      <div className="text-xs text-brand-muted">Email</div>
                      <a
                        href="mailto:contact@premiumautocare.com"
                        className="text-sm font-medium text-foreground hover:text-primary"
                      >
                        contact@premiumautocare.com
                      </a>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="mb-3 text-sm font-semibold text-foreground">
                    Working Hours
                  </h4>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-brand-muted">Monday - Friday</span>
                      <span className="font-medium text-foreground">
                        8:00 AM - 6:00 PM
                      </span>
                    </div>

                    <div className="flex justify-between text-sm">
                      <span className="text-brand-muted">Saturday</span>
                      <span className="font-medium text-foreground">
                        9:00 AM - 4:00 PM
                      </span>
                    </div>

                    <div className="flex justify-between text-sm">
                      <span className="text-brand-muted">Sunday</span>
                      <span className="font-medium text-foreground">Closed</span>
                    </div>
                  </div>
                </div>

                <Link href="/booking" className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 text-primary-foreground hover:bg-brand-primary-hover">
                  <CalendarIcon className="h-5 w-5" />
                  Book Appointment
                </Link>

                <div className="mt-4 text-center">
                  <Button
                    variant="ghost"
                    className="text-sm text-brand-muted hover:bg-transparent hover:text-foreground"
                  >
                    Request Custom Quote
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
