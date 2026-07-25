import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/sections/hero";
import { Marquee } from "@/components/sections/marquee";
import { Pillars } from "@/components/sections/pillars";
import { Statement } from "@/components/sections/statement";
import { Labs } from "@/components/sections/labs";
import { CaseStudies } from "@/components/sections/case-studies";
import { Process } from "@/components/sections/process";
import { Testimonials } from "@/components/sections/testimonials";
import { Faq } from "@/components/sections/faq";
import { Cta } from "@/components/sections/cta";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="top">
        <Hero />
        <Marquee />
        <Pillars />
        <Statement />
        <Labs />
        <CaseStudies />
        <Process />
        <Testimonials />
        <Faq />
        <Cta />
      </main>
      <Footer />
    </>
  );
}
