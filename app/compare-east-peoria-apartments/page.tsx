import type { CSSProperties } from "react";

export const metadata = {
  title: "Compare East Peoria Apartments | The Current Apartments",
  description:
    "Cost-conscious comparison review version for The Current Apartments in East Peoria, focused on value, floor plans, location, and availability.",
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
    minHeight: "82vh",
    display: "grid",
    gridTemplateColumns: "minmax(0, 1fr) minmax(320px, 0.9fr)",
    gap: "46px",
    alignItems: "center",
    padding: "72px min(7vw, 96px)",
    background:
      "linear-gradient(135deg, rgba(34, 41, 37, 0.94), rgba(89, 67, 37, 0.88)), url('/assets/current-aerial.jpg') center/cover",
    color: "#ffffff",
  },
  eyebrow: {
    textTransform: "uppercase",
    letterSpacing: "0.16em",
    fontSize: "0.78rem",
    fontWeight: 900,
    color: "#d9b56d",
    marginBottom: "18px",
  },
  h1: {
    fontSize: "clamp(3rem, 7vw, 6.5rem)",
    lineHeight: 0.9,
    margin: "0 0 22px",
    letterSpacing: "-0.06em",
  },
  lead: {
    fontSize: "clamp(1.12rem, 2vw, 1.45rem)",
    lineHeight: 1.55,
    maxWidth: "760px",
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
    fontWeight: 900,
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
    fontWeight: 900,
    textDecoration: "none",
  },
  pricePanel: {
    background: "rgba(255,255,255,0.96)",
    color: "#1f2a2d",
    borderRadius: "32px",
    padding: "30px",
    boxShadow: "0 28px 80px rgba(0,0,0,0.35)",
  },
  panelTitle: {
    margin: "0 0 12px",
    fontSize: "1.9rem",
    letterSpacing: "-0.05em",
  },
  panelText: {
    margin: "0 0 24px",
    color: "#5c686a",
    lineHeight: 1.6,
  },
  statLine: {
    display: "grid",
    gridTemplateColumns: "1fr auto",
    gap: "16px",
    padding: "16px 0",
    borderTop: "1px solid rgba(31,42,45,0.12)",
    alignItems: "center",
  },
  statLabel: {
    color: "#5c686a",
  },
  statValue: {
    fontWeight: 900,
    color: "#1b5b62",
  },
  section: {
    padding: "70px min(7vw, 96px)",
  },
  sectionAlt: {
    padding: "70px min(7vw, 96px)",
    background: "#132f35",
    color: "#ffffff",
  },
  sectionHead: {
    maxWidth: "860px",
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
    maxWidth: "800px",
  },
  sectionCopyLight: {
    color: "rgba(255,255,255,0.78)",
    fontSize: "1.08rem",
    lineHeight: 1.65,
    maxWidth: "800px",
  },
  compareGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: "18px",
  },
  compareCard: {
    background: "#ffffff",
    borderRadius: "26px",
    padding: "26px",
    boxShadow: "0 16px 42px rgba(26,43,46,0.08)",
    border: "1px solid rgba(31,42,45,0.08)",
  },
  compareCardAlt: {
    background: "rgba(255,255,255,0.08)",
    borderRadius: "26px",
    padding: "26px",
    border: "1px solid rgba(255,255,255,0.13)",
  },
  compareLabel: {
    display: "inline-block",
    padding: "7px 11px",
    borderRadius: "999px",
    background: "#eaf1f0",
    color: "#1b5b62",
    fontWeight: 900,
    fontSize: "0.75rem",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    marginBottom: "16px",
  },
  compareLabelDark: {
    display: "inline-block",
    padding: "7px 11px",
    borderRadius: "999px",
    background: "rgba(217,181,109,0.16)",
    color: "#d9b56d",
    fontWeight: 900,
    fontSize: "0.75rem",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    marginBottom: "16px",
  },
  cardTitle: {
    margin: "0 0 10px",
    fontSize: "1.32rem",
    letterSpacing: "-0.035em",
  },
  cardText: {
    margin: 0,
    color: "#5c686a",
    lineHeight: 1.6,
  },
  cardTextLight: {
    margin: 0,
    color: "rgba(255,255,255,0.76)",
    lineHeight: 1.6,
  },
  imageBand: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: "20px",
  },
  imageCard: {
    background: "#ffffff",
    borderRadius: "28px",
    overflow: "hidden",
    border: "1px solid rgba(31,42,45,0.08)",
    boxShadow: "0 18px 45px rgba(26,43,46,0.08)",
  },
  image: {
    width: "100%",
    height: "230px",
    objectFit: "cover",
    display: "block",
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
  disclaimer: {
    marginTop: "28px",
    color: "#6d7779",
    fontSize: "0.92rem",
    lineHeight: 1.55,
  },
};

const priceRows = [
  ["Studio", "From $1,025*"],
  ["One Bedroom", "From $1,125*"],
  ["Two Bedroom", "From $1,175*"],
  ["Two Bedroom Suite", "Confirm"],
];

const comparisonCards = [
  {
    label: "Rent positioning",
    title: "Value plus transformation",
    text: "Lead with modernized apartments, location, and planned amenities while avoiding unsupported top-of-market or luxury language.",
  },
  {
    label: "Decision driver",
    title: "Floor plans and current availability",
    text: "Make it easy for renters to compare studio, one-bedroom, and two-bedroom options in one place.",
  },
  {
    label: "Location",
    title: "East Peoria access",
    text: "Connect the property to ICC, I-74, shopping, the Levee District, downtown Peoria, and regional employers.",
  },
  {
    label: "Compliance",
    title: "Neutral comparison copy",
    text: "Compare features, rents, and availability without making unsupported claims about competitors.",
  },
];

const highlights = [
  {
    image: "/assets/entrance-rendering.webp",
    title: "Reimagined arrival",
    text: "A refreshed entrance and improved first impression support the repositioning story.",
  },
  {
    image: "/assets/studio-3d.jpg",
    title: "Efficient layouts",
    text: "Studios and one-bedroom homes give cost-conscious renters a simpler entry point.",
  },
  {
    image: "/assets/dog-park.jpg",
    title: "Amenity growth",
    text: "The value story pairs rent positioning with a growing amenity package and outdoor features.",
  },
];

export default function CompareEastPeoriaApartmentsPage() {
  return (
    <main style={styles.page}>
      <section style={styles.hero}>
        <div>
          <p style={styles.eyebrow}>Cost-conscious review version</p>
          <h1 style={styles.h1}>Compare East Peoria apartments by value.</h1>
          <p style={styles.lead}>
            Looking at East Peoria apartments? Review The Current's floor plans,
            draft starting rents, location advantages, planned amenities, and
            current availability in one place.
          </p>
          <div style={styles.actions}>
            <a style={styles.primaryButton} href="/#leasing">
              Check Availability
            </a>
            <a style={styles.secondaryButton} href="/#residences">
              Compare Floor Plans
            </a>
          </div>
        </div>
        <aside style={styles.pricePanel}>
          <h2 style={styles.panelTitle}>Draft starting rents</h2>
          <p style={styles.panelText}>
            Review-price framing from the prior cost-conscious version. Confirm
            final rents, fees, and live availability before external launch.
          </p>
          {priceRows.map(([label, value]) => (
            <div key={label} style={styles.statLine}>
              <span style={styles.statLabel}>{label}</span>
              <strong style={styles.statValue}>{value}</strong>
            </div>
          ))}
        </aside>
      </section>

      <section style={styles.section}>
        <div style={styles.sectionHead}>
          <p style={styles.eyebrow}>Positioning</p>
          <h2 style={styles.h2}>Amenity-rich East Peoria living at a smarter price point.</h2>
          <p style={styles.sectionCopy}>
            This restored review page uses the prior cost-conscious positioning:
            modernized apartments, practical location, and amenities without
            relying on unsupported luxury or top-of-market rent language.
          </p>
        </div>
        <div style={styles.compareGrid}>
          {comparisonCards.map((card) => (
            <article key={card.title} style={styles.compareCard}>
              <span style={styles.compareLabel}>{card.label}</span>
              <h3 style={styles.cardTitle}>{card.title}</h3>
              <p style={styles.cardText}>{card.text}</p>
            </article>
          ))}
        </div>
        <p style={styles.disclaimer}>
          *Pricing, unit mix, concessions, fees, finishes, and availability are
          subject to confirmation or change. Equal Housing Opportunity.
        </p>
      </section>

      <section style={styles.sectionAlt}>
        <div style={styles.sectionHead}>
          <p style={styles.eyebrow}>Comparison framework</p>
          <h2 style={styles.h2}>A clearer alternative to generic apartment search.</h2>
          <p style={styles.sectionCopyLight}>
            The stronger message is not simply lower price. It is location plus
            transformation: homes at 500 Centennial Drive with access, plans,
            planned amenities, and a clear path to schedule a tour.
          </p>
        </div>
        <div style={styles.compareGrid}>
          {[
            ["Instead of", "Generic apartment living", "Too broad and gives renters no specific reason to choose the property."],
            ["Use", "Reimagined East Peoria apartments with views, value, and amenities", "Specific, location-aware, and aligned with renter decision-making."],
          ].map(([label, title, text]) => (
            <article key={title} style={styles.compareCardAlt}>
              <span style={styles.compareLabelDark}>{label}</span>
              <h3 style={styles.cardTitle}>{title}</h3>
              <p style={styles.cardTextLight}>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section style={styles.section}>
        <div style={styles.sectionHead}>
          <p style={styles.eyebrow}>What renters compare</p>
          <h2 style={styles.h2}>Price, layout, access, and confidence.</h2>
          <p style={styles.sectionCopy}>
            This version is designed to support cost-conscious renters who are
            comparing options and need fast answers before scheduling a tour.
          </p>
        </div>
        <div style={styles.imageBand}>
          {highlights.map((item) => (
            <article key={item.title} style={styles.imageCard}>
              <img src={item.image} alt="" style={styles.image} />
              <div style={{ padding: "24px" }}>
                <h3 style={styles.cardTitle}>{item.title}</h3>
                <p style={styles.cardText}>{item.text}</p>
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
