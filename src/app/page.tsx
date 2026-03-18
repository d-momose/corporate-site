import HeroCanvasLoader from "@/components/HeroCanvasLoader";
import HeroSection from "@/components/HeroSection";
import StrengthSection from "@/components/StrengthSection";
import BusinessSection from "@/components/BusinessSection";
import MessageSection from "@/components/MessageSection";
import NewsSection from "@/components/NewsSection";
import CompanySection from "@/components/CompanySection";
import CTASection from "@/components/CTASection";
import WaveDivider from "@/components/WaveDivider";
import SphereOverlay from "@/components/SphereOverlay";
import MessageParticles from "@/components/MessageParticles";

export default function Home() {
  return (
    <main>
      {/* position:fixed で全画面に固定されたThree.jsキャンバス */}
      <HeroCanvasLoader />
      <SphereOverlay />
      <HeroSection />
      <BusinessSection />
      <WaveDivider topColor="#ffffff" bottomColor="#E67376" />
      <StrengthSection />
      <WaveDivider topColor="#E67376" bottomColor="#ffffff" />
      <div style={{ position: "relative", background: "#ffffff" }}>
        <MessageParticles />
        <MessageSection />
        <CTASection />
      </div>
      <WaveDivider topColor="#ffffff" bottomColor="#fdf8d6" />
      <NewsSection />
      <WaveDivider topColor="#fdf8d6" bottomColor="#2d0a0b" />
      <CompanySection />
    </main>
  );
}
