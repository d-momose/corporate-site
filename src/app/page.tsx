import HeroCanvasLoader from "@/components/HeroCanvasLoader";
import HeroSection from "@/components/HeroSection";
import StrengthSection from "@/components/StrengthSection";
import BusinessSection from "@/components/BusinessSection";
import MessageSection from "@/components/MessageSection";
import NewsSection from "@/components/NewsSection";
import CompanySection from "@/components/CompanySection";
import WaveDivider from "@/components/WaveDivider";
import SphereOverlay from "@/components/SphereOverlay";

export default function Home() {
  return (
    <main>
      {/* position:fixed で全画面に固定されたThree.jsキャンバス */}
      <HeroCanvasLoader />
      <SphereOverlay />
      <HeroSection />
      <BusinessSection />
      <WaveDivider topColor="#e8eef5" bottomColor="#b88080" />
      <StrengthSection />
      <WaveDivider topColor="#b88080" bottomColor="#ffffff" />
      <MessageSection />
      <WaveDivider topColor="#ffffff" bottomColor="#eef4fb" />
      <NewsSection />
      <WaveDivider topColor="#eef4fb" bottomColor="#0f172a" />
      <CompanySection />
    </main>
  );
}
