import AnimatedLayout from "@/components/AnimatedLayout";
import HeroSection from "@/components/HeroSection";
import ServicesGrid from "@/components/ServicesGrid";
import TechStack from "@/components/TechStack";
import ProjectsShowcase from "@/components/ProjectsShowcase";
import TrustedBy from "@/components/TrustedBy";
import PricingSection from "@/components/PricingSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ProjectEstimator from "@/components/ProjectEstimator";
import InsightsSection from "@/components/InsightsSection";
import TeamSection from "@/components/TeamSection";
import FAQ from "@/components/FAQ";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <AnimatedLayout>
      <HeroSection />
      <ServicesGrid />
      <TechStack />
      <ProjectsShowcase />
      <TrustedBy />
      <PricingSection />
      <TestimonialsSection />
      <ProjectEstimator />
      <InsightsSection />
      <TeamSection />
      <FAQ />
      <ContactForm />
      <Footer />
    </AnimatedLayout>
  );
}
