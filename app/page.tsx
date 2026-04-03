import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/landing/HeroSection";
import ProblemSection from "@/components/landing/ProblemSection";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import ChannelsSection from "@/components/landing/ChannelsSection";
import PricingSection from "@/components/landing/PricingSection";
import StatsSection from "@/components/landing/StatsSection";
import CtaSection from "@/components/landing/CtaSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-white overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <StatsSection />
      <ProblemSection />
      <HowItWorksSection />
      <FeaturesSection />
      <ChannelsSection />
      <PricingSection />
      <CtaSection />
      <Footer />
    </main>
  );
}
