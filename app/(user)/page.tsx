
import {Hero} from "@/components/site/user/main/hero";
import Search from "@/components/site/user/main/Search";
import {Benefit} from "@/components/site/user/main/benifit";
import {CategoryType} from "@/components/site/user/main/category_type";
import {Featured} from "@/components/site/user/main/featured";
import {Process} from "@/components/site/user/main/process";
import {Business} from "@/components/site/user/main/business";
import {CTASection} from "@/components/site/user/main/cta";
export default function UserPage() {
  return (
    <>
    <Hero />
    <Search />
    <Benefit />
    <CategoryType />
    <Featured />
    <Process />
    <Business />
    <CTASection />
    </>
  );
}
