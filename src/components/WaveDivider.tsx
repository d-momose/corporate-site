export default function WaveDivider({
  topColor,
  bottomColor,
  height = 72,
}: {
  topColor: string;
  bottomColor: string;
  height?: number;
}) {
  return (
    <div
      style={{
        position: "relative",
        height,
        backgroundColor: bottomColor,
        overflow: "hidden",
      }}
    >
      {/* Back wave: opposite phase, smaller amplitude, slower */}
      <svg
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "200%",
          height: "100%",
          opacity: 0.4,
          animation: "waveScroll 12s linear infinite",
        }}
        viewBox="0 0 1440 72"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0,36 C120,54 240,54 360,36 C480,18 600,18 720,36 C840,54 960,54 1080,36 C1200,18 1320,18 1440,36 L1440,0 L0,0 Z"
          fill={topColor}
        />
      </svg>
      {/* Front wave: main, faster */}
      <svg
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "200%",
          height: "100%",
          animation: "waveScroll 8s linear infinite",
        }}
        viewBox="0 0 1440 72"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0,36 C120,10 240,10 360,36 C480,62 600,62 720,36 C840,10 960,10 1080,36 C1200,62 1320,62 1440,36 L1440,0 L0,0 Z"
          fill={topColor}
        />
      </svg>
    </div>
  );
}
