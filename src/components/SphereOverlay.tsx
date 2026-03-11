"use client";

import { useEffect, useState } from "react";

export default function SphereOverlay() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const show = () => setVisible(true);
    const hide = () => setVisible(false);

    window.addEventListener("sphereOverlayShow", show);
    window.addEventListener("sphereOverlayHide", hide);

    return () => {
      window.removeEventListener("sphereOverlayShow", show);
      window.removeEventListener("sphereOverlayHide", hide);
    };
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(80, 80, 80, 0.85)",
        zIndex: 40,
        pointerEvents: "none",
        opacity: visible ? 1 : 0,
        transition: "opacity 0.7s ease",
      }}
    />
  );
}
