import FeaturesSection from "@/Components/FeatureSection/FeaturesSection";
import HeroSection from "@/Components/Hero/HeroSection";
import RecentJobs from "@/Components/jobs/RecentJobs";
export default function Home() {
  return (
    <div>
      <HeroSection />
      <RecentJobs />
      <FeaturesSection />
    </div>
  );
}
