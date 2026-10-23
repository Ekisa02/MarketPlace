import HeroSection from '../components/common/HeroSection';
import TrustedBy from '../components/common/TrustedBy';
import CategoryGrid from '../components/common/CategoryGrid';
import AiScoping from '../components/common/AiScoping';
import HowItWorks from '../components/common/HowItWorks';
import InsightsPricing from '../components/common/InsightsPricing';
import FinalCTA from '../components/common/FinalCTA';

export default function Home() {
  return (
    <>
      <HeroSection />
      <TrustedBy />
      <CategoryGrid />
      <AiScoping />
      <HowItWorks />
      <InsightsPricing />
      <FinalCTA />
    </>
  );
}