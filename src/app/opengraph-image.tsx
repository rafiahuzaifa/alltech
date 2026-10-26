import { ImageResponse } from "next/og";

export const alt = "All Tech Cloud Services — Buy, Sell & Lease IPv4 Addresses";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          backgroundColor: "#050a16",
          backgroundImage: "radial-gradient(circle at 20% 20%, #1d4ed8 0%, #050a16 55%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div style={{ width: 64, height: 64, borderRadius: 18, background: "linear-gradient(135deg,#2563eb,#22d3ee)", display: "flex" }} />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: 34, fontWeight: 800, letterSpacing: -1 }}>ALL TECH</span>
            <span style={{ fontSize: 16, letterSpacing: 6, color: "#67e8f9" }}>CLOUD SERVICES</span>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ fontSize: 76, fontWeight: 800, lineHeight: 1.05, letterSpacing: -2 }}>Buy, Sell &amp; Lease</span>
          <span style={{ fontSize: 76, fontWeight: 800, lineHeight: 1.05, letterSpacing: -2, color: "#67e8f9" }}>IPv4 Addresses</span>
          <span style={{ marginTop: 24, fontSize: 28, color: "#cbd5e1" }}>APNIC-registered IPv4 broker · ARIN · RIPE · APNIC · LACNIC · AFRINIC</span>
        </div>
        <span style={{ fontSize: 24, color: "#94a3b8" }}>alltechcloudservices.com</span>
      </div>
    ),
    size,
  );
}
