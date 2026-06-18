import { Hero } from "@/components/sections/Hero";
import { TrustBar } from "@/components/sections/TrustBar";
import { Services } from "@/components/sections/Services";
import { BeforeAfter } from "@/components/sections/BeforeAfter";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { About } from "@/components/sections/About";
import { Projects } from "@/components/sections/Projects";
import { ServiceAreas } from "@/components/sections/ServiceAreas";
import { Reviews } from "@/components/sections/Reviews";
import { Guarantees } from "@/components/sections/Guarantees";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Faq } from "@/components/sections/Faq";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";
import { JsonLd } from "@/components/JsonLd";
import { faqSchema } from "@/lib/schema";

export default function HomePage() {
  return (
    <>
      <JsonLd data={faqSchema()} />
      <Hero />
      <TrustBar />
      <Services />
      <BeforeAfter />
      <WhyChooseUs />
      <About />
      <Projects />
      <ServiceAreas />
      <Reviews />
      <Guarantees />
      <FinalCTA />
      <Faq />
      <Contact />
      <Footer />
    </>
  );
}
