import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: 8,
          background: "linear-gradient(135deg, #ff5c2b 0%, #ff9a3c 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span
          style={{
            color: "white",
            fontSize: 22,
            fontWeight: 800,
            fontFamily: "serif",
            lineHeight: 1,
            marginTop: 1,
          }}
        >
          D
        </span>
      </div>
    ),
    { ...size }
  );
}
