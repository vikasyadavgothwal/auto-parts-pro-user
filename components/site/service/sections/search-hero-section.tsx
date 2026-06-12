import {
  MapPinIcon,
  WrenchIcon,
} from "@/components/icons/site-icons"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { PublicSectionIntro } from "@/components/site/public-content/public-section-intro"
export function SearchHeroSection() {
  return (
    <section className="bg-gradient-to-b from-brand-panel to-brand-surface py-16">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <PublicSectionIntro
          slug="services"
          wrapperClassName="mb-8 text-center"
          headingClassName="mb-4 text-4xl font-bold text-white sm:text-5xl"
          subheadingClassName="text-lg text-brand-muted sm:text-xl"
        />
        <div className="mx-auto max-w-4xl">
          <Card className="flex flex-col gap-2 p-2 md:flex-row  md:rounded-full">
            <div className="flex flex-1 items-center gap-3 px-4">
              <WrenchIcon className="h-5 w-5 text-brand-muted" />
              <Input
                type="text"
                placeholder="What service do you need?"
                className="h-auto border-none bg-transparent px-0 shadow-none focus-visible:ring-0"
              />
            </div>
            <div className="flex flex-1 items-center gap-3 border-t border-border px-4 pt-2 md:border-l md:border-t-0 md:pt-0">
              <MapPinIcon className="h-5 w-5 text-brand-muted" />
              <Input
                type="text"
                placeholder="Enter ZIP code or city"
                className="h-auto border-none bg-transparent px-0 shadow-none focus-visible:ring-0"
              />
            </div>
            <Button className="h-auto rounded-full px-8 py-3 font-medium hover:bg-brand-primary-hover">
              {/* <SearchIcon className="h-4 w-4" /> */}
              Search
            </Button>
          </Card>
        </div>
      </div>
    </section>
  )
}
