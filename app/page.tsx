"use client";

import { useMemo, useState } from "react";

const stops = [
  "Majestic (Kempegowda Bus Station)",
  "Shivajinagar Bus Station",
  "K.R. Market",
  "Indiranagar 100 Feet Road",
  "Koramangala Water Tank",
  "Silk Board Junction",
  "Banashankari TTMC",
  "Whitefield (ITPL)",
  "Electronic City",
  "Yelahanka New Town",
];

const routes = [
  { bus: "500-D", time: "08:42", minutes: 3, seats: "Seats available", tag: "Vayu Vajra" },
  { bus: "500-CA", time: "08:49", minutes: 10, seats: "Standing likely", tag: "Ordinary" },
  { bus: "500-A", time: "08:58", minutes: 19, seats: "Seats available", tag: "Ordinary" },
];

function QRCode() {
  const cells = useMemo(() => Array.from({ length: 289 }, (_, i) => {
    const x = i % 17;
    const y = Math.floor(i / 17);
    const finder = (x < 5 && y < 5) || (x > 11 && y < 5) || (x < 5 && y > 11);
    const finderInner = ((x === 1 || x === 3) && y > 0 && y < 4) || ((y === 1 || y === 3) && x > 0 && x < 4);
    return finder ? !finderInner : ((x * 7 + y * 11 + x * y) % 5 < 2);
  }), []);

  return <div className="qr" aria-label="Ticket QR code">{cells.map((on, i) => <i key={i} className={on ? "on" : ""} />)}</div>;
}

export default function Home() {
  const [from, setFrom] = useState("Majestic (Kempegowda Bus Station)");
  const [to, setTo] = useState("Koramangala Water Tank");
  const [passengers, setPassengers] = useState(1);
  const [step, setStep] = useState<"search" | "routes" | "payment" | "ticket">("search");
  const [selectedBus, setSelectedBus] = useState(routes[0]);
  const fare = passengers * 28;

  function swapStops() {
    setFrom(to);
    setTo(from);
  }

  function startOver() {
    setStep("search");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <main>
      <nav className="nav">
        <button className="brand" onClick={startOver} aria-label="Namma Ticket home">
          <span className="brand-mark">N</span>
          <span>Namma <b>Ticket</b></span>
        </button>
        <div className="nav-links"><a href="#how">How it works</a><button className="lang">ಕನ್ನಡ <span>⌄</span></button><button className="profile" aria-label="Profile">ಜ</button></div>
      </nav>

      {step === "search" && <>
        <section className="hero">
          <div className="hero-copy">
            <div className="eyebrow"><span>●</span> Bengaluru moves smarter</div>
            <h1>Your bus ticket.<br/><em>Before the bus arrives.</em></h1>
            <p>Skip the queue, board with confidence. Book your BMTC ticket before or after boarding and simply show your QR to the conductor.</p>
            <div className="trust-row"><span>✓ Instant QR ticket</span><span>✓ Secure UPI payments</span><span>✓ No app needed</span></div>
          </div>

          <section className="booking-card" aria-label="Book a bus ticket">
            <div className="booking-head"><div><span className="mini-label">BOOK YOUR JOURNEY</span><h2>Where are you going?</h2></div><span className="live"><i/> BMTC Live</span></div>
            <div className="route-fields">
              <label><span>FROM</span><b className="pin orange">●</b><select value={from} onChange={e => setFrom(e.target.value)}>{stops.map(s => <option key={s}>{s}</option>)}</select></label>
              <button className="swap" onClick={swapStops} aria-label="Swap boarding and destination stops">↕</button>
              <label><span>TO</span><b className="pin green">●</b><select value={to} onChange={e => setTo(e.target.value)}>{stops.map(s => <option key={s}>{s}</option>)}</select></label>
            </div>
            <div className="passenger-row">
              <div><span className="mini-label">PASSENGERS</span><div className="counter"><button onClick={() => setPassengers(Math.max(1, passengers - 1))}>−</button><strong>{passengers}</strong><button onClick={() => setPassengers(Math.min(6, passengers + 1))}>+</button></div></div>
              <button className="primary" onClick={() => setStep("routes")}>Find my bus <span>→</span></button>
            </div>
            <p className="booking-note">You can book before boarding or while you’re already on the bus.</p>
          </section>
        </section>

        <section className="stats"><div><b>1.2M+</b><span>daily BMTC commuters</span></div><div><b>&lt; 30 sec</b><span>to book your ticket</span></div><div><b>0 queues</b><span>just scan &amp; ride</span></div></section>

        <section className="how" id="how">
          <div><span className="mini-label">EASY AS 1, 2, 3</span><h2>From stop to seat,<br/>without the wait.</h2></div>
          <div className="steps"><article><b>01</b><div className="step-icon">⌖</div><h3>Choose your route</h3><p>Pick where you’re boarding and where you’re headed.</p></article><article><b>02</b><div className="step-icon">₹</div><h3>Pay your way</h3><p>Use any UPI app or card. It’s fast and secure.</p></article><article><b>03</b><div className="step-icon">▦</div><h3>Show &amp; ride</h3><p>Show your QR ticket when the conductor asks. Done.</p></article></div>
        </section>
      </>}

      {step === "routes" && <section className="flow-page">
        <button className="back" onClick={() => setStep("search")}>← Change journey</button>
        <div className="flow-title"><div><span className="mini-label">YOUR ROUTE</span><h1>Choose your bus</h1><p>{from.split(" (")[0]} <b>→</b> {to}</p></div><div className="fare-pill"><span>FARE FROM</span><b>₹{fare}</b></div></div>
        <div className="route-list">{routes.map((route, index) => <button key={route.bus} className={`route-card ${selectedBus.bus === route.bus ? "selected" : ""}`} onClick={() => setSelectedBus(route)}><span className="bus-icon">BUS</span><span className="route-number"><small>ROUTE</small><b>{route.bus}</b><em>{route.tag}</em></span><span className="time"><small>ARRIVES AT</small><b>{route.time}</b><em>{route.minutes} min away</em></span><span className={`availability ${index === 1 ? "busy" : ""}`}>● {route.seats}</span><span className="radio">{selectedBus.bus === route.bus ? "●" : "○"}</span></button>)}</div>
        <div className="flow-action"><div><span>Total for {passengers} passenger{passengers > 1 ? "s" : ""}</span><b>₹{fare}</b></div><button className="primary" onClick={() => setStep("payment")}>Continue to pay <span>→</span></button></div>
      </section>}

      {step === "payment" && <section className="flow-page payment-page">
        <button className="back" onClick={() => setStep("routes")}>← Back to buses</button>
        <div className="payment-grid"><div><span className="mini-label">SECURE PAYMENT</span><h1>Almost there.</h1><p className="sub">Choose how you’d like to pay.</p><div className="pay-options"><label className="pay-option active"><input type="radio" name="pay" defaultChecked/><span className="pay-logo upi">UPI</span><span><b>UPI</b><small>Google Pay, PhonePe, Paytm &amp; more</small></span><em>●</em></label><label className="pay-option"><input type="radio" name="pay"/><span className="pay-logo">▭</span><span><b>Credit / Debit card</b><small>Visa, Mastercard, RuPay</small></span><em>○</em></label></div><button className="primary full" onClick={() => setStep("ticket")}>Pay ₹{fare} securely <span>→</span></button><p className="secure">⌾ 256-bit encrypted · Your payment is protected</p></div><aside className="summary"><span className="mini-label">JOURNEY SUMMARY</span><div className="summary-route"><i/><div><small>FROM</small><b>{from}</b></div><i className="end"/><div><small>TO</small><b>{to}</b></div></div><hr/><div className="bus-summary"><span className="bus-icon">BUS</span><div><small>ROUTE</small><b>{selectedBus.bus} · {selectedBus.time}</b></div></div><div className="summary-total"><span>{passengers} passenger{passengers > 1 ? "s" : ""}</span><b>₹{fare}</b></div></aside></div>
      </section>}

      {step === "ticket" && <section className="ticket-page">
        <div className="success-badge">✓</div><span className="mini-label">PAYMENT SUCCESSFUL</span><h1>You’re ready to ride!</h1><p>Show this QR code to the conductor when asked.</p>
        <article className="ticket"><div className="ticket-top"><div><span className="brand-mark small">N</span><b>Namma Ticket</b></div><span className="valid">● VALID</span></div><div className="ticket-route"><div><small>FROM</small><b>{from.split(" (")[0]}</b></div><span>→</span><div><small>TO</small><b>{to}</b></div></div><div className="ticket-details"><div><small>ROUTE</small><b>{selectedBus.bus}</b></div><div><small>PASSENGERS</small><b>{passengers}</b></div><div><small>FARE PAID</small><b>₹{fare}</b></div></div><div className="qr-wrap"><QRCode/><div><small>TICKET ID</small><b>NMT-2507-84K2</b><p>Valid for this journey only</p></div></div><div className="ticket-footer"><span>Purchased at 08:39 AM</span><span>BMTC · Bengaluru</span></div></article>
        <div className="ticket-actions"><button className="secondary">↓ Download ticket</button><button className="primary" onClick={startOver}>Book another ride</button></div><p className="help">Need help? Call BMTC at <b>080-2248 3777</b></p>
      </section>}

      <footer><div className="brand"><span className="brand-mark">N</span><span>Namma <b>Ticket</b></span></div><p>Made for Bengaluru. Built to keep the city moving.</p><span>© 2026 Namma Ticket · A BMTC travel experience</span></footer>
    </main>
  );
}
