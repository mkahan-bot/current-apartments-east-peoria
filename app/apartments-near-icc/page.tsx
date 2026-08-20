import type { CSSProperties } from "react";

export const metadata = {
  title: "Apartments Near ICC | The Current Apartments",
  description:
    "Student-oriented review version for The Current Apartments near Illinois Central College, I-74, the Levee District, and downtown Peoria.",
};

const styles: Record<string, CSSProperties> = {
  page: {
    background: "#f6f0e6",
    color: "#1f2a2d",
    minHeight: "100vh",
    fontFamily:
      "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },
  hero: {
    minHeight: "84vh",
    display: "grid",
    gridTemplateColumns: "minmax(0, 1.05fr) minmax(320px, 0.95fr)",
    gap: "48px",
    alignItems: "center",
    padding: "72px min(7vw, 96px)",
    background:
      "linear-gradient(135deg, rgba(19, 47, 53, 0.96), rgba(27, 91, 98, 0.90)), url('/assets/hero-aerial.jpg') center/cover",
    color: "#ffffff",
  },
  eyebrow: {
    textTransform: "uppercase",
    letterSpacing: "0.16em",
    fontSize: "0.78rem",
    fontWeight: 800,
    color: "#d9b56d",
    marginBottom: "18px",
  },
  h1: {
    fontSize: "clamp(3rem, 7vw, 6.8rem)",
    lineHeight: 0.9,
    margin: "0 0 22px",
    letterSpacing: "-0.06em",
  },
  lead: {
    fontSize: "clamp(1.12rem, 2vw, 1.45rem)",
    lineHeight: 1.55,
    maxWidth: "720px",
    margin: "0 0 28px",
    color: "rgba(255,255,255,0.88)",
  },
  actions: {
    display: "flex",
    gap: "14px",
    flexWrap: "wrap",
    marginTop: "28px",
  },
  primaryButton: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "14px 22px",
    borderRadius: "999px",
    background: "#d9b56d",
    color: "#16272b",
    fontWeight: 800,
    textDecoration: "none",
  },
  secondaryButton: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "13px 22px",
    borderRadius: "999px",
    border: "1px solid rgba(255,255,255,0.55)",
    color: "#ffffff",
    fontWeight: 800,
    textDecoration: "none",
  },
  heroCard: {
    background: "rgba(255,255,255,0.95)",
    color: "#1f2a2d",
    borderRadius: "30px",
    overflow: "hidden",
    boxShadow: "0 28px 80px rgba(0,0,0,0.35)",
  },
  heroImage: {
    width: "100%",
    minHeight: "280px",
    objectFit: "cover",
    display: "block",
  },
  cardBody: {
    padding: "28px",
  },
  cardTitle: {
    margin: "0 0 12px",
    fontSize: "1.8rem",
    letterSpacing: "-0.04em",
  },
  cardText: {
    margin: 0,
    color: "#5c686a",
    lineHeight: 1.6,
  },
  section: {
    padding: "70px min(7vw, 96px)",
  },
  sectionDark: {
    padding: "70px min(7vw, 96px)",
    background: "#132f35",
    color: "#ffffff",
  },
  sectionHead: {
    maxWidth: "840px",
    marginBottom: "34px",
  },
  h2: {
    fontSize: "clamp(2.2rem, 4.6vw, 4.5rem)",
    lineHeight: 0.98,
    letterSpacing: "-0.055em",
    margin: "0 0 18px",
  },
  sectionCopy: {
    color: "#5c686a",
    fontSize: "1.08rem",
    lineHeight: 1.65,
    maxWidth: "760px",
  },
  sectionCopyLight: {
    color: "rgba(255,255,255,0.78)",
    fontSize: "1.08rem",
    lineHeight: 1.65,
    maxWidth: "760px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: "18px",
  },
  featureCard: {
    background: "#ffffff",
    borderRadius: "24px",
    padding: "24px",
    boxShadow: "0 14px 35px rgba(26,43,46,0.08)",
    border: "1px solid rgba(31,42,45,0.08)",
  },
  featureCardDark: {
    background: "rgba(255,255,255,0.08)",
    borderRadius: "24px",
    padding: "24px",
    border: "1px solid rgba(255,255,255,0.13)",
  },
  metric: {
    display: "block",
    fontSize: "2rem",
    fontWeight: 900,
    letterSpacing: "-0.05em",
    color: "#1b5b62",
    marginBottom: "8px",
  },
  metricDark: {
    display: "block",
    fontSize: "2rem",
    fontWeight: 900,
    letterSpacing: "-0.05em",
    color: "#d9b56d",
    marginBottom: "8px",
  },
  cardHeading: {
    margin: "0 0 10px",
    fontSize: "1.25rem",
  },
  smallText: {
    margin: 0,
    color: "#5c686a",
    lineHeight: 1.6,
  },
  smallTextLight: {
    margin: 0,
    color: "rgba(255,255,255,0.76)",
    lineHeight: 1.6,
  },
  floorGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: "20px",
  },
  floorCard: {
    background: "#ffffff",
    borderRadius: "28px",
    overflow: "hidden",
    border: "1px solid rgba(31,42,45,0.08)",
    boxShadow: "0 18px 45px rgba(26,43,46,0.08)",
  },
  floorImage: {
    width: "100%",
    height: "220px",
    objectFit: "cover",
    display: "block",
    background: "#e9ddcb",
  },
  badge: {
    display: "inline-block",
    padding: "8px 12px",
    borderRadius: "999px",
    background: "#eaf1f0",
    color: "#1b5b62",
    fontSize: "0.78rem",
    fontWeight: 800,
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    marginBottom: "12px",
  },
  disclaimer: {
    marginTop: "28px",
    color: "#6d7779",
    fontSize: "0.92rem",
    lineHeight: 1.55,
  },
  footer: {
    padding: "36px min(7vw, 96px)",
    background: "#0f2428",
    color: "rgba(255,255,255,0.72)",
    display: "flex",
    justifyContent: "space-between",
    gap: "16px",
    flexWrap: "wrap",
  },
};

const fitCards = [
  {
    metric: "ICC + I-74",
    title: "Practical campus access",
    text: "A simple East Peoria home base near Illinois Central College, major routes, shopping, and regional employers.",
  },
  {
    metric: "Studio-2BR",
    title: "Flexible layouts",
    text: "Studios, one-bedroom homes, two-bedroom homes, and larger two-bedroom suite options for different renter needs.",
  },
  {
    metric: "$1,025*",
    title: "Student-conscious entry point",
    text: "Prior marketing copy positioned studios from $1,025, subject to current confirmation and availability.",
  },
];

const floors = [
  {
    name: "Studio Apartments",
    image: "/assets/studio-3d.jpg",
    alt: "Studio apartment 3D floor plan",
    text: "Efficient layouts for renters who want location, value, and a modernized home base in East Peoria.",
    best: "Students, professionals, simplified living",
  },
  {
    name: "One Bedroom Apartments",
    image: "/assets/one-bedroom-3d.jpg",
    alt: "One bedroom apartment 3D floor plan",
    text: "A separate bedroom, defined living area, kitchen, and full bath for renters who want more privacy.",
    best: "Independent living, hybrid work, longer stays",
  },
  {
    name: "Two Bedroom Apartments",
    image: "/assets/two-bedroom-3d.jpg",
    alt: "Two bedroom apartment 3D floor plan",
    text: "Roommate-friendly layouts with two bedrooms and practical shared living space.",
    best: "Roommates, small households, study/work split",
  },
];

export default function ApartmentsNearIccPage() {
  return (
    <main style={styles.page}>
      <section style={styles.hero}>
        <div>
          <p style={styles.eyebrow}>Student / ICC review version</p>
          <h1 style={styles.h1}>Apartments near ICC and I-74.</h1>
          <p style={styles.lead}>
            Reimagined East Peoria apartments with practical access to Illinois
            Central College, I-74, the Levee District, downtown Peoria, and
            everyday shopping.
          </p>
          <div style={styles.actions}>
            <a style={styles.primaryButton} href="/#leasing">
              Check Availability
            </a>
            <a style={styles.secondaryButton} href="/#residences">
              View Floor Plans
            </a>
          </div>
        </div>
        <aside style={styles.heroCard}>
          <img
            src="/assets/hero-aerial.jpg"
            alt="Aerial view of The Current Apartments at 500 Centennial Drive in East Peoria"
            style={styles.heroImage}
          />
          <div style={styles.cardBody}>
            <h2 style={styles.cardTitle}>500 Centennial Drive</h2>
            <p style={styles.cardText}>
              A hilltop East Peoria address for students and renters who want a
              practical, modernized home base near campus access, commuting
              routes, and daily conveniences.
            </p>
          </div>
        </aside>
      </section>

      <section style={styles.section}>
        <div style={styles.sectionHead}>
          <p style={styles.eyebrow}>Why this version</p>
          <h2 style={styles.h2}>Built around student-renter search intent.</h2>
          <p style={styles.sectionCopy}>
            This restored review page focuses on the prior ICC/student angle:
            location, efficient floor plans, value, parking, and direct tour or
            availability conversion.
          </p>
        </div>
        <div style={styles.grid}>
          {fitCards.map((card) => (
            <article key={card.title} style={styles.featureCard}>
              <span style={styles.metric}>{card.metric}</span>
              <h3 style={styles.cardHeading}>{card.title}</h3>
              <p style={styles.smallText}>{card.text}</p>
            </article>
          ))}
        </div>
        <p style={styles.disclaimer}>
          *Pricing, unit mix, finishes, fees, and availability must be confirmed
          before publishing externally. Equal Housing Opportunity.
        </p>
      </section>

      <section style={styles.sectionDark}>
        <div style={styles.sectionHead}>
          <p style={styles.eyebrow}>Good fit for</p>
          <h2 style={styles.h2}>Students, professionals, and simplified living.</h2>
          <p style={styles.sectionCopyLight}>
            The prior student-oriented version emphasized simple apartment
            choices, location value, and a modernized home base without relying
            on unsupported luxury claims.
          </p>
        </div>
        <div style={styles.grid}>
          {["Near Illinois Central College", "Convenient to I-74 and regional employers", "Short drive to the Levee District and downtown Peoria", "Scenic Centennial Hill setting with planned amenities"].map(
            (item) => (
              <article key={item} style={styles.featureCardDark}>
                <span style={styles.metricDark}>+</span>
                <h3 style={styles.cardHeading}>{item}</h3>
                <p style={styles.smallTextLight}>
                  Clear, practical search copy designed for renters comparing
                  East Peoria options.
                </p>
              </article>
            ),
          )}
        </div>
      </section>

      <section style={styles.section}>
        <div style={styles.sectionHead}>
          <p style={styles.eyebrow}>Floor plans</p>
          <h2 style={styles.h2}>Start with the right amount of space.</h2>
          <p style={styles.sectionCopy}>
            The student version gives priority to efficient layouts and easy
            comparison across studio, one-bedroom, and two-bedroom homes.
          </p>
        </div>
        <div style={styles.floorGrid}>
          {floors.map((floor) => (
            <article key={floor.name} style={styles.floorCard}>
              <img src={floor.image} alt={floor.alt} style={styles.floorImage} />
              <div style={styles.cardBody}>
                <span style={styles.badge}>Availability: confirm</span>
                <h3 style={styles.cardHeading}>{floor.name}</h3>
                <p style={styles.smallText}>{floor.text}</p>
                <p style={{ ...styles.smallText, marginTop: "14px" }}>
                  <strong>Best for:</strong> {floor.best}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <footer style={styles.footer}>
        <span>The Current Apartments · 500 Centennial Drive · East Peoria, IL</span>
        <a style={{ color: "#d9b56d", textDecoration: "none", fontWeight: 800 }} href="/">
          Back to main site
        </a>
      </footer>
    </main>
  );
}
