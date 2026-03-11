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
      <WaveDivider topColor="#ffffff" bottomColor="#e8eef5" />
      <BusinessSection />
      <WaveDivider topColor="#e8eef5" bottomColor="#CDD2D7" />
      <StrengthSection />
      <WaveDivider topColor="#CDD2D7" bottomColor="#ffffff" />
      <MessageSection />
      <WaveDivider topColor="#ffffff" bottomColor="#fff8f8" />
      <NewsSection />
      <WaveDivider topColor="#fff8f8" bottomColor="#0f172a" />
      <CompanySection />
    </main>
  );
}
