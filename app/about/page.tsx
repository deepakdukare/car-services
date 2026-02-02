
import AboutHero from "../components/AboutHero";
import AboutHighlights from "../components/AboutHighlights";
import OurCommitment from "../components/OurCommitment";
import WhyChooseUs from "../components/WhyChooseUs";
import TestimonialsAndTeam from "../components/TestimonialsAndTeam";
import OurClients from "../components/OurClients";
export default function AboutPage() {
  return (
    <main>
      {/* HERO SECTION */}
      <AboutHero title="About Us" breadcrumb="About Us" />
      <AboutHighlights />
      <OurCommitment />
      <WhyChooseUs />
      <TestimonialsAndTeam />
      <OurClients />

      {/* NEXT SECTIONS WILL COME HERE */}
    </main>
  );
}
