import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          position: "relative",
          overflow: "hidden",
          background:
            "linear-gradient(135deg, #fefce8 0%, #ecfdf5 45%, #dbeafe 100%)",
          color: "#0f172a",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at top left, rgba(34,197,94,0.22), transparent 32%), radial-gradient(circle at bottom right, rgba(251,191,36,0.24), transparent 30%)",
          }}
        />

        <div
          style={{
            display: "flex",
            width: "100%",
            height: "100%",
            padding: "54px 60px",
            justifyContent: "space-between",
            alignItems: "stretch",
            gap: "32px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              width: "68%",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  fontSize: 24,
                  color: "#047857",
                  fontWeight: 700,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                }}
              >
                <span>Universo Nahiara</span>
                <span>•</span>
                <span>21 June 2026</span>
              </div>
              <div
                style={{
                  fontSize: 66,
                  lineHeight: 1.02,
                  fontWeight: 800,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <span>Día de Todos</span>
                <span>los Polinizadores</span>
              </div>
              <div
                style={{
                  fontSize: 34,
                  lineHeight: 1.2,
                  color: "#334155",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <span>All Pollinators Day</span>
                <span>“Draw the flower and its pollinator”</span>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                fontSize: 25,
                color: "#334155",
              }}
            >
              <span>La Blanca, Sardina del Sur · Gran Canaria</span>
              <span>Permanent bilingual event page for Scientix</span>
            </div>
          </div>

          <div
            style={{
              width: "32%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "34px",
              border: "1px solid rgba(255,255,255,0.7)",
              background: "rgba(255,255,255,0.65)",
              boxShadow: "0 20px 50px rgba(15, 23, 42, 0.08)",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "18px",
              }}
            >
              <div style={{ fontSize: 108 }}>🌸</div>
              <div style={{ fontSize: 92 }}>🐝</div>
              <div
                style={{
                  fontSize: 24,
                  color: "#047857",
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                }}
              >
                STE(A)M
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
