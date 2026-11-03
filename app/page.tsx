"use client";

import { FormEvent, useMemo, useState } from "react";
import AskKatieForm from "./ask-katie-form";

const plans = {
  studio: {
    name: "Studio", sf: "380", bed: "Studio", bath: "1 Bath",
    image3d: "/assets/studio-3d.jpg", image2d: "/assets/studio-2d.webp",
    blurb: "An efficient open studio where living and sleeping share one light-filled space: smart storage, full kitchen, and a walk-in shower.",
    features: ["Open 17′5″ × 13′3″ living area", "Full kitchen with breakfast bar", "Walk-in tiled shower", "Generous closet + mechanical closet"],
  },
  one: {
    name: "One Bedroom", sf: "530", bed: "1 Bed", bath: "1 Bath",
    image3d: "/assets/one-bedroom-3d.jpg", image2d: "/assets/one-bedroom-2d.webp",
    blurb: "A true one-bedroom with a separate bedroom suite, defined living room, and a kitchen that opens to the main space.",
    features: ["Separate bedroom, 11′2″ × 14′4″", "Living area 12′10″ × 15′2″", "Dedicated kitchen", "Full bath with linen storage"],
  },
  two: {
    name: "Two Bedroom", sf: "750", bed: "2 Bed", bath: "2 Bath",
    image3d: "/assets/two-bedroom-3d.jpg", image2d: "/assets/two-bedroom-2d.webp",
    blurb: "Two bedrooms on opposite ends for privacy, two full baths, and a central living + kitchen core, ideal for roommates or a work-from-home setup.",
    features: ["Split bedrooms for privacy", "Two full bathrooms", "Central living 11′7″ × 15′2″", "Each bedroom with its own bath"],
  },
  suite: {
    name: "Two Bedroom Suite", sf: "910", bed: "2 Bed", bath: "2 Bath",
    image3d: "/assets/two-bedroom-suite-3d.jpg", image2d: "/assets/two-bedroom-suite-2d.webp",
    blurb: "Our largest layout, with two oversized bedroom suites, an expansive living area, in-home washer/dryer nook, and dual bathrooms.",
    features: ["Expansive living 12′10″ × 18′6″", "In-home washer / dryer nook", "Two private bedroom suites", "Mechanical + walk-in closets"],
  },
} as const;

const places = [
  { name: "EastSide Centre", detail: "Recreation, fields & events", time: "8 min", image: "/assets/eastside-centre.jpg", position: "center 48%" },
  { name: "Riverfront & Levee District", detail: "Dining, shops & the marina", time: "10 min", image: "/assets/riverfront-levee.jpg", position: "center 55%" },
  { name: "Downtown Peoria", detail: "Across the bridge", time: "10 min", image: "/assets/downtown-peoria.jpg", position: "center 52%" },
  { name: "Grand Prairie Shopping", detail: "Retail & everyday essentials", time: "15 min", image: "/assets/grand-prairie.jpg", position: "center 55%" },
  { name: "Peoria Int’l Airport", detail: "PIA", time: "18 min", image: "/assets/peoria-airport.jpg", position: "center 55%" },
];

const amenityCards = [
  { title: "Dog Park", kicker: "Pet Friendly", detail: "A fully fenced, resident-only dog park with agility features and shaded seating.", image: "/assets/dog-park.jpg", className: "wide tall" },
  { title: "The Grille & Gazebo", kicker: "Gather", detail: "Covered grilling, fire-side lounge seating, and a shaded gazebo at the heart of the grounds.", image: "/assets/grille-gazebo.jpg", className: "tall" },
  { title: "Bocce Ball Courts", kicker: "Play", detail: "Twin tournament-length bocce courts set into the courtyard lawn.", image: "/assets/bocce-courts.jpg", className: "tall" },
  { title: "Screening Room", kicker: "Unwind", detail: "A comfortable space for movies, sports, and resident events.", image: "/assets/screening-room.jpg" },
  { title: "Library & Private Dining", kicker: "Gather", detail: "A warm reading library that doubles as a reservable private dining room.", image: "/assets/library-dining.jpg" },
  { title: "Covered Carports & Garages", kicker: "Park", detail: "Reserved covered parking and private detached garages available.", image: "/assets/covered-parking.jpg", className: "wide" },
];

function Mark({ inverse = false }: { inverse?: boolean }) {
  return (
    <span className={`brand ${inverse ? "inverse" : ""}`}>
      <img src={inverse ? "/assets/logo-white.png" : "/assets/logo-color.png"} alt="" />
      <span><strong>THE CURRENT</strong><small>APARTMENTS</small></span>
    </span>
  );
}

function CheckIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 6 9 17l-5-5" /></svg>;
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [before, setBefore] = useState(46);
  const [planKey, setPlanKey] = useState<keyof typeof plans>("studio");
  const [planView, setPlanView] = useState<"3d" | "2d">("3d");
  const [finish, setFinish] = useState<"classic" | "refreshed">("classic");
  const [placeIndex, setPlaceIndex] = useState(0);
  const [selectedUnits, setSelectedUnits] = useState<string[]>([]);
  const [formState, setFormState] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [formMessage, setFormMessage] = useState("");
  const plan = plans[planKey];
  const selectedPlace = places[placeIndex];

  const jsonLd = useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "ApartmentComplex",
    name: "The Current Apartments",
    description: "Modern apartments on the Illinois River in East Peoria, Illinois. Now pre-leasing.",
    url: "https://currentapartmentseastpeoria.com/",
    email: "jake@hapropertymanagement.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "500 Centennial Dr",
      addressLocality: "East Peoria",
      addressRegion: "IL",
      postalCode: "61611",
      addressCountry: "US",
    },
    numberOfAccommodationUnits: 246,
    amenityFeature: ["Pool", "Dog Park", "Fitness Studio", "Library", "Screening Room", "Covered Parking"].map((name) => ({ "@type": "LocationFeatureSpecification", name, value: true })),
  }), []);

  async function submitLead(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formElement = event.currentTarget;
    setFormState("submitting");
    setFormMessage("");
    const form = new FormData(formElement);
    const payload = Object.fromEntries(form.entries());
    payload.interestedIn = selectedUnits.join(", ");
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json() as { error?: string };
      if (!response.ok) throw new Error(result.error || "We could not submit the form.");
      setFormState("success");
      formElement.reset();
      setSelectedUnits([]);
    } catch (error) {
      setFormState("error");
      setFormMessage(error instanceof Error ? error.message : "Please try again or email our leasing team.");
    }
  }

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <header className="site-header">
        <a className="logo-link" href="#top" aria-label="The Current Apartments home"><Mark /></a>
        <nav className="desktop-nav" aria-label="Primary navigation">
          <a href="#story">Story</a><a href="#residences">Residences</a><a href="#amenities">Amenities</a><a href="#neighborhood">Neighborhood</a>
        </nav>
        <a className="header-cta" href="#leasing">Join the Interest List</a>
        <button className="menu-button" type="button" aria-expanded={menuOpen} aria-label="Open navigation" onClick={() => setMenuOpen(!menuOpen)}><span /><span /><span /></button>
        {menuOpen && <nav className="mobile-menu" aria-label="Mobile navigation"><a onClick={() => setMenuOpen(false)} href="#story">Story</a><a onClick={() => setMenuOpen(false)} href="#residences">Residences</a><a onClick={() => setMenuOpen(false)} href="#amenities">Amenities</a><a onClick={() => setMenuOpen(false)} href="#neighborhood">Neighborhood</a><a onClick={() => setMenuOpen(false)} href="#leasing">Join the Interest List</a></nav>}
      </header>

      <section id="top" className="hero">
        <img className="hero-image" src="/assets/hero-aerial.jpg" alt="Aerial view of The Current set into a wooded bluff above the Illinois River in East Peoria" />
        <div className="hero-scrim" />
        <div className="hero-copy">
          <span className="hero-kicker">A River Landmark Reborn</span>
          <h1>The Current</h1>
          <p>Honoring the past. Elevated for what comes next.</p>
          <div className="hero-actions"><a className="button light" href="#residences">Explore Residences</a><a className="button ghost" href="#leasing">Join the Interest List</a></div>
        </div>
        <div className="hero-meta"><span>500 Centennial Drive</span><span>East Peoria, Illinois</span><span>Now Pre-Leasing · Phase One</span></div>
      </section>

      <section id="story" className="section paper">
        <div className="split-grid story-grid">
          <div className="section-copy">
            <span className="eyebrow">The Story</span>
            <h2>A river landmark,<br />brought back to life.</h2>
            <p className="lead">For decades, 500 Centennial Drive watched over the Illinois River as a senior community. We’re giving it an honest second life—keeping the solid bones and bluff-top views, refreshing the essentials, and opening the doors as <em>The Current</em>: straightforward apartments for the way East Peoria lives now.</p>
            <p>Phase by phase, we’re opening a new entrance, tidying the grounds, and bringing homes online in batches, starting with the essentials and adding more over time. What you see today is the beginning of the current.</p>
            <a className="text-link" href="#river">See what makes it special →</a>
          </div>
          <div className="comparison" aria-label="Building today compared with the reimagined grounds">
            <img src="/assets/reimagined-aerial.webp" alt="The Current reimagined with new signage and refreshed grounds" />
            <div className="comparison-before" style={{ clipPath: `inset(0 ${100 - before}% 0 0)` }}><img src="/assets/current-aerial.jpg" alt="The building today" /></div>
            <input aria-label="Drag to compare today and reimagined" type="range" min="0" max="100" value={before} onChange={(e) => setBefore(Number(e.target.value))} />
            <span className="compare-label today">Today</span><span className="compare-label future">Reimagined</span>
            <span className="compare-line" style={{ left: `${before}%` }}><i>↔</i></span>
          </div>
        </div>
      </section>

      <section className="feature-banner">
        <img src="/assets/entrance-rendering.webp" alt="The Current apartments with refreshed entrance, signage, and landscaping" />
        <div><span className="eyebrow pale">A new arrival</span><h2>Familiar bones.<br />A fresh current.</h2><p>A renewed entrance, warm lighting, and refreshed landscaping signal the next chapter at 500 Centennial Drive.</p></div>
      </section>

      <section id="river" className="section river-section">
        <div className="section-heading centered"><span className="eyebrow pale">Named for the river</span><h2>The Illinois River doesn’t just<br />pass by. It defines us.</h2><p className="lead">East Peoria grew up on the water, and so did this place. The Current takes its name from the river below the bluff: a constant, living force that shapes the light, the views, and the rhythm of every day here.</p></div>
        <div className="pillars">
          {[['≈','A Fresh Perspective','Hilltop apartments that look out over the river and the Peoria skyline beyond.'],['⌁','A Sense of Direction','A connected address minutes from I-74, downtown, and the riverfront.'],['⌇','Natural Surroundings','Wrapped in mature woods, ravines, and walking paths on every side.'],['⌂','Modern Waterfront','Easy apartment living, just minutes from the river’s edge.'],['▥','Elevated Living','Six stories of light-filled apartments set high into the bluff.'],['☼','Connected to What Matters','Work, water, and weekend, all within a few minutes’ drive.']].map(([icon,title,copy]) => <article key={title}><span className="pillar-icon">{icon}</span><h3>{title}</h3><p>{copy}</p></article>)}
        </div>
        <div className="stat-row"><div><strong>4</strong><span>Home Layouts</span></div><div><strong>380–910</strong><span>Square Feet</span></div><div><strong>6</strong><span>Stories on the Bluff</span></div><div><strong>5</strong><span>Minutes to the River</span></div></div>
      </section>

      <section id="residences" className="section paper residences">
        <div className="section-intro"><div><span className="eyebrow">Residences</span><h2>Four ways to live<br />on the river.</h2></div><p className="lead">From an efficient studio to an expansive two-bedroom suite. Each apartment keeps its character, with the essentials freshened up. Select a layout to explore.</p></div>
        <div className="plan-tabs" role="tablist" aria-label="Floor plans">
          {(Object.keys(plans) as Array<keyof typeof plans>).map((key) => <button key={key} role="tab" aria-selected={planKey === key} onClick={() => setPlanKey(key)}><span>{plans[key].name}</span><small>{plans[key].sf} SF</small></button>)}
        </div>
        <div className="plan-panel">
          <div className="plan-stage"><div className="view-toggle"><button className={planView === "3d" ? "active" : ""} onClick={() => setPlanView("3d")}>3D</button><button className={planView === "2d" ? "active" : ""} onClick={() => setPlanView("2d")}>Plan</button></div><img key={`${planKey}-${planView}`} src={planView === "3d" ? plan.image3d : plan.image2d} alt={`${plan.name} ${planView === "3d" ? "3D" : "2D"} floor plan`} /></div>
          <div className="plan-meta"><span className="eyebrow">Floor Plan</span><h3>{plan.name}</h3><p>{plan.blurb}</p><div className="specs"><div><small>Square Feet</small><strong>{plan.sf}</strong></div><div><small>Bedrooms</small><strong>{plan.bed}</strong></div><div><small>Bathrooms</small><strong>{plan.bath}</strong></div><div><small>Status</small><strong>Pre-Leasing</strong></div></div><ul>{plan.features.map((feature) => <li key={feature}><CheckIcon />{feature}</li>)}</ul><a className="button dark" href="#leasing">Ask About This Apartment</a></div>
        </div>
      </section>

      <section id="finishes" className="section finishes">
        <div className="section-heading centered"><span className="eyebrow pale">Interiors</span><h2>Honest homes,<br />refreshed where it counts.</h2><p className="lead">We’re not gutting what doesn’t need it. The first homes keep their solid bones and good light, with the essentials freshened up: clean kitchens and baths, fresh paint, and updated floors, so rent stays attainable. Select homes get a fuller refresh over time.</p><div className="finish-toggle"><button className={finish === "classic" ? "active" : ""} onClick={() => setFinish("classic")}>As-Is</button><button className={finish === "refreshed" ? "active" : ""} onClick={() => setFinish("refreshed")}>Refreshed</button></div></div>
        <div className="finish-grid"><figure><img src={finish === "classic" ? "/assets/kitchen-classic.jpg" : "/assets/kitchen-refreshed.jpg"} alt={`${finish === "classic" ? "As-is" : "Refreshed"} kitchen`} /><figcaption>{finish === "classic" ? "As-Is" : "Refreshed"} Kitchen</figcaption></figure><figure><img src={finish === "classic" ? "/assets/bath-classic.jpg" : "/assets/bath-refreshed.jpg"} alt={`${finish === "classic" ? "As-is" : "Refreshed"} bathroom`} /><figcaption>{finish === "classic" ? "As-Is" : "Refreshed"} Bath</figcaption></figure></div>
        <p className="fine centered">Toggle to compare a home as-is with a refreshed one. Many first-phase homes start close to as-is; finishes shown are representative.</p>
      </section>

      <section id="amenities" className="section paper-soft">
        <div className="section-intro"><div><span className="eyebrow">Amenities</span><h2>Out on<br />the grounds.</h2></div><p className="lead">Built for the way a river community actually lives: outdoors, with neighbors, and with the dog. More opens up with each phase.</p></div>
        <div className="amenity-grid">{amenityCards.map((item) => <article key={item.title} className={item.className || ""}><img src={item.image} alt={item.title} /><div className="amenity-scrim" /><div><small>{item.kicker}</small><h3>{item.title}</h3><p>{item.detail}</p></div></article>)}<article className="planned"><small>Planned · Future Phase</small><h3>Fitness Studio</h3><p>Coming with a future phase. Image to follow.</p></article><article className="planned"><small>Planned · Future Phase</small><h3>Game & Music Rooms</h3><p>Dedicated spaces for billiards, cards, practice, and listening.</p></article></div>
      </section>

      <section id="neighborhood" className="section paper neighborhood">
        <div className="neighborhood-grid"><div><span className="eyebrow">The Neighborhood</span><h2>Downtown is just<br />across the water.</h2><p className="lead">East Peoria puts the riverfront, downtown, and the whole Peoria metro within a few minutes of your door. Approximate drive times:</p><div className="place-list">{places.map((place, index) => <button className={placeIndex === index ? "active" : ""} key={place.name} onClick={() => setPlaceIndex(index)}><span>{String(index + 1).padStart(2, "0")}</span><strong>{place.name}<small>{place.detail}</small></strong><b>{place.time}</b></button>)}</div></div><figure><img src={selectedPlace.image} style={{ objectPosition: selectedPlace.position }} alt={selectedPlace.name} /><figcaption>{selectedPlace.name} · approximately {selectedPlace.time} away</figcaption></figure></div>
      </section>

      <section id="leasing" className="section leasing">
        <div className="section-heading centered"><span className="eyebrow">Now Pre-Leasing · Phase One</span><h2>Join the founding residents.</h2><p className="lead">Be first in line as homes come online. Tell us what you’re looking for and we’ll reach out with availability, pricing, and a private first look.</p></div>
        <div className="leasing-card">
          <aside><img src="/assets/hero-aerial.jpg" alt="" /><div className="aside-scrim" /><Mark inverse /><div><h3>Your place on the river is forming.</h3><p>500 Centennial Dr · East Peoria, IL 61611</p><a href="mailto:jake@hapropertymanagement.com">jake@hapropertymanagement.com</a></div></aside>
          {formState === "success" ? <div className="form-success"><span>✓</span><h3>You’re on the list.</h3><p>Thank you. The leasing team will follow up as homes at The Current come online.</p><a className="button dark" href="#top">Return to the top</a></div> : <form onSubmit={submitLead}>
            <div className="form-row"><label>First Name<input name="firstName" autoComplete="given-name" required /></label><label>Last Name<input name="lastName" autoComplete="family-name" /></label></div>
            <label>Email<input name="email" type="email" autoComplete="email" required /></label>
            <label>Phone <small>(optional)</small><input name="phone" type="tel" autoComplete="tel" /></label>
            <fieldset><legend>Interested In</legend><div className="chips">{["Studio", "One Bedroom", "Two Bedroom", "Two Bedroom Suite"].map((unit) => <button key={unit} type="button" className={selectedUnits.includes(unit) ? "active" : ""} onClick={() => setSelectedUnits((current) => current.includes(unit) ? current.filter((item) => item !== unit) : [...current, unit])}>{unit}</button>)}</div></fieldset>
            <label>Target Move-In<select name="moveIn"><option value="">Select a timeframe</option><option>As soon as available</option><option>Next 1–3 months</option><option>3–6 months</option><option>Just exploring</option></select></label>
            <label>Anything else we should know? <small>(optional)</small><textarea name="message" rows={3} /></label>
            <label className="honeypot" aria-hidden="true">Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
            <label className="consent"><input name="consent" type="checkbox" value="yes" required /><span>I agree that The Current Apartments may contact me about leasing availability. Message and data rates may apply.</span></label>
            {formState === "error" && <p className="form-error">{formMessage} You can also email <a href="mailto:jake@hapropertymanagement.com">jake@hapropertymanagement.com</a>.</p>}
            <button className="button dark submit" type="submit" disabled={formState === "submitting"}>{formState === "submitting" ? "Submitting…" : "Join the Interest List"}</button>
            <p className="fine">No obligation. We’ll only use your details to share leasing availability at The Current.</p>
          </form>}
        </div>
      </section>

      <AskKatieForm />

      <footer><div className="footer-grid"><div><Mark inverse /><p>A river landmark reborn. Modern apartments on the Illinois River in East Peoria, Illinois.</p></div><div><h4>Explore</h4><a href="#story">Story</a><a href="#residences">Residences</a><a href="#amenities">Amenities</a><a href="#neighborhood">Neighborhood</a></div><div><h4>Visit</h4><a href="https://maps.google.com/?q=500+Centennial+Dr+East+Peoria+IL+61611" target="_blank" rel="noreferrer">500 Centennial Dr<br />East Peoria, IL 61611</a><a href="#leasing">Schedule a Tour</a></div><div><h4>Leasing</h4><a href="#leasing">Join the Interest List</a><a href="#ask-katie">Ask Katie a Question</a><a href="mailto:jake@hapropertymanagement.com">jake@hapropertymanagement.com</a><p>Now pre-leasing · Phase One</p></div></div><div className="footer-bottom"><span>© 2026 The Current Apartments · 500 Centennial LLC</span><span>Equal Housing Opportunity</span></div></footer>

      <nav className="mobile-dock" aria-label="Quick navigation"><a href="#residences">Homes</a><a href="#amenities">Amenities</a><a href="#neighborhood">Area</a><a className="active" href="#leasing">Tour</a></nav>
    </main>
  );
}
