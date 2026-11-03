"use client";

import { FormEvent, useState } from "react";

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "gclid", "fbclid"];

function readUtm() {
  const params = new URLSearchParams(window.location.search);
  const utm: Record<string, string> = {};
  for (const key of UTM_KEYS) {
    const value = params.get(key);
    if (value) utm[key] = value;
  }
  return utm;
}

/** "Ask Katie" — for prospects not ready to apply or tour. Posts structured JSON to /api/questions. */
export default function AskKatieForm() {
  const [state, setState] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formElement = event.currentTarget;
    setState("submitting");
    setMessage("");
    const form = Object.fromEntries(new FormData(formElement).entries());
    try {
      const response = await fetch("/api/questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, pageUrl: window.location.href, referrer: document.referrer, utm: readUtm() }),
      });
      const result = await response.json() as { error?: string };
      if (!response.ok) throw new Error(result.error || "We could not send your question.");
      setState("success");
      formElement.reset();
    } catch (error) {
      setState("error");
      setMessage(error instanceof Error ? error.message : "Please try again.");
    }
  }

  return (
    <section id="ask-katie" className="section paper ask-katie">
      <div className="ask-katie-grid">
        <div className="section-copy">
          <span className="eyebrow">Not ready to apply or tour?</span>
          <h2>Ask Katie<br />anything.</h2>
          <p className="lead">Have a question about pets, parking, utilities, move-in timing, or anything else? Send it to Katie on our leasing team and you’ll get an answer by email. No application, no appointment.</p>
          <p className="fine">Prefer to talk? Call <a href="tel:+13092105904">309-210-5904</a>, 10 a.m.–5 p.m.</p>
        </div>
        <div className="leasing-card ask-katie-card">
          {state === "success" ? (
            <div className="form-success"><span>✓</span><h3>Question sent.</h3><p>Thanks for reaching out. Katie will reply to the email you gave us.</p><button className="button dark" type="button" onClick={() => setState("idle")}>Ask another question</button></div>
          ) : (
            <form onSubmit={submit} aria-label="Ask Katie a question">
              <div className="form-row"><label>First Name<input name="firstName" autoComplete="given-name" required maxLength={80} /></label><label>Last Name<input name="lastName" autoComplete="family-name" required maxLength={80} /></label></div>
              <label>Email<input name="email" type="email" autoComplete="email" required maxLength={180} /></label>
              <label>Phone <small>(optional)</small><input name="phone" type="tel" autoComplete="tel" maxLength={40} /></label>
              <label>Your Question<textarea name="question" rows={5} required minLength={3} maxLength={2000} placeholder="e.g. Are cats allowed? What utilities are included?" /></label>
              <label className="honeypot" aria-hidden="true">Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
              <label className="consent"><input name="consent" type="checkbox" value="yes" required /><span>I agree that The Current Apartments may reply to my question and follow up about leasing by email, or by phone if I provided one.</span></label>
              {state === "error" && <p className="form-error" role="alert">{message}</p>}
              <button className="button dark submit" type="submit" disabled={state === "submitting"}>{state === "submitting" ? "Sending…" : "Send My Question"}</button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
