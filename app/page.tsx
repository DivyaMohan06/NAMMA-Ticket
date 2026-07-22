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

const stopKannada: Record<string, string> = {
  "Majestic (Kempegowda Bus Station)": "ಮೆಜೆಸ್ಟಿಕ್ (ಕೆಂಪೇಗೌಡ ಬಸ್ ನಿಲ್ದಾಣ)", "Shivajinagar Bus Station": "ಶಿವಾಜಿನಗರ ಬಸ್ ನಿಲ್ದಾಣ", "K.R. Market": "ಕೆ.ಆರ್. ಮಾರುಕಟ್ಟೆ", "Indiranagar 100 Feet Road": "ಇಂದಿರಾನಗರ 100 ಅಡಿ ರಸ್ತೆ", "Koramangala Water Tank": "ಕೋರಮಂಗಲ ವಾಟರ್ ಟ್ಯಾಂಕ್", "Silk Board Junction": "ಸಿಲ್ಕ್ ಬೋರ್ಡ್ ಜಂಕ್ಷನ್", "Banashankari TTMC": "ಬನಶಂಕರಿ ಟಿಟಿಎಂಸಿ", "Whitefield (ITPL)": "ವೈಟ್‌ಫೀಲ್ಡ್ (ಐಟಿಪಿಎಲ್)", "Electronic City": "ಎಲೆಕ್ಟ್ರಾನಿಕ್ ಸಿಟಿ", "Yelahanka New Town": "ಯಲಹಂಕ ನ್ಯೂ ಟೌನ್"
};

const routeFamilies: Record<string, string[]> = {
  "Majestic (Kempegowda Bus Station)": ["335-E", "365", "500-K"], "Shivajinagar Bus Station": ["201", "G-10", "290-E"], "K.R. Market": ["215-H", "221-G", "45-G"], "Indiranagar 100 Feet Road": ["201-R", "314-A", "KIA-6"], "Koramangala Water Tank": ["171", "201-J", "500-A"], "Silk Board Junction": ["500-D", "600-F", "356-C"], "Banashankari TTMC": ["201", "210-P", "500-K"], "Whitefield (ITPL)": ["500-CA", "335-E", "V-500D"], "Electronic City": ["356-C", "360-B", "V-356N"], "Yelahanka New Town": ["401-K", "402-B", "KIA-9"]
};

const translations = {
  en: { how:"How it works", support:"Support", smart:"Bengaluru moves smarter", title:"Your bus ticket.", subtitle:"Before the bus arrives.", intro:"Skip the queue, board with confidence. Book your BMTC ticket before or after boarding and simply show your QR to the conductor.", book:"BOOK YOUR JOURNEY", where:"Where are you going?", from:"FROM", to:"TO", passengers:"PASSENGERS", find:"Find my bus", choose:"Choose your bus", change:"Change journey", fare:"FARE FROM", route:"ROUTE", arrives:"ARRIVES AT", continue:"Continue to pay", helpTitle:"Support for every journey.", helpText:"Get quick help with bookings, payments, refunds, or a ticket that won’t scan.", call:"Call support", chat:"Chat with us", answers:"Quick answers", made:"Made for Bengaluru. Built to keep the city moving." },
  kn: { how:"ಇದು ಹೇಗೆ ಕೆಲಸ ಮಾಡುತ್ತದೆ", support:"ಸಹಾಯ", smart:"ಬೆಂಗಳೂರು ಇನ್ನಷ್ಟು ಚುರುಕಾಗಿ ಚಲಿಸುತ್ತದೆ", title:"ನಿಮ್ಮ ಬಸ್ ಟಿಕೆಟ್.", subtitle:"ಬಸ್ ಬರುವ ಮೊದಲೇ.", intro:"ಸರತಿ ಸಾಲನ್ನು ತಪ್ಪಿಸಿ, ಆತ್ಮವಿಶ್ವಾಸದಿಂದ ಬಸ್ ಹತ್ತಿ. ಹತ್ತುವ ಮೊದಲು ಅಥವಾ ನಂತರ ಬಿಎಂಟಿಸಿ ಟಿಕೆಟ್ ಬುಕ್ ಮಾಡಿ ಮತ್ತು ಕಂಡಕ್ಟರ್‌ಗೆ ಕ್ಯೂಆರ್ ತೋರಿಸಿ.", book:"ನಿಮ್ಮ ಪ್ರಯಾಣ ಬುಕ್ ಮಾಡಿ", where:"ನೀವು ಎಲ್ಲಿಗೆ ಹೋಗುತ್ತಿದ್ದೀರಿ?", from:"ಎಲ್ಲಿಂದ", to:"ಎಲ್ಲಿಗೆ", passengers:"ಪ್ರಯಾಣಿಕರು", find:"ನನ್ನ ಬಸ್ ಹುಡುಕಿ", choose:"ನಿಮ್ಮ ಬಸ್ ಆಯ್ಕೆಮಾಡಿ", change:"ಪ್ರಯಾಣ ಬದಲಿಸಿ", fare:"ದರ", route:"ಮಾರ್ಗ", arrives:"ಬರುವ ಸಮಯ", continue:"ಪಾವತಿಗೆ ಮುಂದುವರಿಯಿರಿ", helpTitle:"ಪ್ರತಿ ಪ್ರಯಾಣಕ್ಕೂ ಸಹಾಯ.", helpText:"ಬುಕಿಂಗ್, ಪಾವತಿ, ಮರುಪಾವತಿ ಅಥವಾ ಸ್ಕ್ಯಾನ್ ಆಗದ ಟಿಕೆಟ್‌ಗೆ ತ್ವರಿತ ಸಹಾಯ ಪಡೆಯಿರಿ.", call:"ಸಹಾಯವಾಣಿಗೆ ಕರೆ ಮಾಡಿ", chat:"ನಮ್ಮೊಂದಿಗೆ ಚಾಟ್ ಮಾಡಿ", answers:"ತ್ವರಿತ ಉತ್ತರಗಳು", made:"ಬೆಂಗಳೂರಿಗಾಗಿ ನಿರ್ಮಿಸಲಾಗಿದೆ. ನಗರವನ್ನು ಚಲಿಸುವಂತೆ ಮಾಡಲು." }
};

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
  const [lang, setLang] = useState<"en" | "kn">("en");
  const t = translations[lang];
  const [from, setFrom] = useState("Majestic (Kempegowda Bus Station)");
  const [to, setTo] = useState("Koramangala Water Tank");
  const [passengers, setPassengers] = useState(1);
  const [supportOpen, setSupportOpen] = useState(false);
  const [step, setStep] = useState<"search" | "routes" | "payment" | "ticket">("search");
  const routes = useMemo(() => (routeFamilies[to] || routeFamilies[stops[4]]).map((bus, index) => ({ bus, time: `08:${String(42 + index * 8).padStart(2,"0")}`, minutes: 3 + index * 8, seats: index === 1 ? (lang === "en" ? "Standing likely" : "ನಿಲ್ಲಬೇಕಾಗಬಹುದು") : (lang === "en" ? "Seats available" : "ಆಸನಗಳು ಲಭ್ಯ"), tag: bus.startsWith("KIA") || bus.startsWith("V-") ? "Vayu Vajra" : "Ordinary" })), [to, lang]);
  const [selectedBusId, setSelectedBusId] = useState("");
  const selectedBus = routes.find(route => route.bus === selectedBusId) || routes[0];
  const fare = passengers * (18 + Math.max(1, Math.abs(stops.indexOf(from) - stops.indexOf(to))) * 4);
  const stopName = (stop: string) => lang === "kn" ? stopKannada[stop] : stop;

  function swapStops() {
    setFrom(to);
    setTo(from);
    setSelectedBusId("");
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
        <div className="nav-links"><a href="#how">{t.how}</a><a href="#support">{t.support}</a><button className="lang" onClick={() => setLang(lang === "en" ? "kn" : "en")} aria-label="Change language"><b>{lang === "en" ? "ಕನ್ನಡ" : "English"}</b> <span>⇄</span></button><button className="profile" aria-label="Profile">ಜ</button></div>
      </nav>

      {step === "search" && <>
        <section className="hero">
          <div className="hero-copy">
            <div className="eyebrow"><span>●</span> {t.smart}</div>
            <h1>{t.title}<br/><em>{t.subtitle}</em></h1>
            <p>{t.intro}</p>
            <div className="trust-row"><span>✓ Instant QR ticket</span><span>✓ Secure UPI payments</span><span>✓ No app needed</span></div>
          </div>

          <section className="booking-card" aria-label="Book a bus ticket">
            <div className="booking-head"><div><span className="mini-label">{t.book}</span><h2>{t.where}</h2></div><span className="live"><i/> BMTC Live</span></div>
            <div className="route-fields">
              <label><span>{t.from}</span><b className="pin orange">●</b><select value={from} onChange={e => { setFrom(e.target.value); setSelectedBusId(""); }}>{stops.filter(s => s !== to).map(s => <option key={s} value={s}>{stopName(s)}</option>)}</select></label>
              <button className="swap" onClick={swapStops} aria-label="Swap boarding and destination stops">↕</button>
              <label><span>{t.to}</span><b className="pin green">●</b><select value={to} onChange={e => { setTo(e.target.value); setSelectedBusId(""); }}>{stops.filter(s => s !== from).map(s => <option key={s} value={s}>{stopName(s)}</option>)}</select></label>
            </div>
            <div className="passenger-row">
              <div><span className="mini-label">{t.passengers}</span><div className="counter"><button onClick={() => setPassengers(Math.max(1, passengers - 1))}>−</button><strong>{passengers}</strong><button onClick={() => setPassengers(Math.min(6, passengers + 1))}>+</button></div></div>
              <button className="primary" onClick={() => { setSelectedBusId(routes[0].bus); setStep("routes"); }}>{t.find} <span>→</span></button>
            </div>
            <p className="booking-note">You can book before boarding or while you’re already on the bus.</p>
          </section>
        </section>

        <section className="stats"><div><b>1.2M+</b><span>daily BMTC commuters</span></div><div><b>&lt; 30 sec</b><span>to book your ticket</span></div><div><b>0 queues</b><span>just scan &amp; ride</span></div></section>

        <section className="how" id="how">
          <div><span className="mini-label">EASY AS 1, 2, 3</span><h2>From stop to seat,<br/>without the wait.</h2></div>
          <div className="steps"><article><b>01</b><div className="step-icon">⌖</div><h3>Choose your route</h3><p>Pick where you’re boarding and where you’re headed.</p></article><article><b>02</b><div className="step-icon">₹</div><h3>Pay your way</h3><p>Use any UPI app or card. It’s fast and secure.</p></article><article><b>03</b><div className="step-icon">▦</div><h3>Show &amp; ride</h3><p>Show your QR ticket when the conductor asks. Done.</p></article></div>
        </section>

        <section className="support-section" id="support">
          <div className="support-copy"><span className="mini-label">NAMMA SUPPORT</span><h2>{t.helpTitle}</h2><p>{t.helpText}</p><div className="control-room">ⓘ BMTC Control Room<br/><b>080-2295 2522</b></div></div>
          <div className="support-cards"><a href="tel:08022483777"><i>☎</i><span><b>{t.call}</b><small>6 AM – 11 PM · 080-2248 3777</small></span><em>→</em></a><button onClick={() => setSupportOpen(true)}><i>◌</i><span><b>{t.chat}</b><small>Average reply in under 2 minutes</small></span><em>→</em></button><button onClick={() => setSupportOpen(true)}><i>?</i><span><b>{t.answers}</b><small>Tickets, refunds and QR help</small></span><em>→</em></button></div>
        </section>
      </>}

      {step === "routes" && <section className="flow-page">
        <button className="back" onClick={() => setStep("search")}>← {t.change}</button>
        <div className="flow-title"><div><span className="mini-label">YOUR ROUTE</span><h1>{t.choose}</h1><p>{stopName(from)} <b>→</b> {stopName(to)}</p></div><div className="fare-pill"><span>{t.fare}</span><b>₹{fare}</b></div></div>
        <div className="route-list">{routes.map((route, index) => <button key={route.bus} className={`route-card ${selectedBus.bus === route.bus ? "selected" : ""}`} onClick={() => setSelectedBusId(route.bus)}><span className="bus-icon">BUS</span><span className="route-number"><small>{t.route}</small><b>{route.bus}</b><em>{route.tag}</em></span><span className="time"><small>{t.arrives}</small><b>{route.time}</b><em>{route.minutes} min away</em></span><span className={`availability ${index === 1 ? "busy" : ""}`}>● {route.seats}</span><span className="radio">{selectedBus.bus === route.bus ? "●" : "○"}</span></button>)}</div>
        <div className="flow-action"><div><span>Total for {passengers} passenger{passengers > 1 ? "s" : ""}</span><b>₹{fare}</b></div><button className="primary" onClick={() => setStep("payment")}>{t.continue} <span>→</span></button></div>
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

      <button className="support-fab" onClick={() => setSupportOpen(true)} aria-label={t.support}>?</button>
      {supportOpen && <div className="support-modal" role="dialog" aria-modal="true"><div><button className="modal-close" onClick={() => setSupportOpen(false)}>×</button><span className="mini-label">NAMMA SUPPORT</span><h2>{t.helpTitle}</h2><p>{t.helpText}</p><a href="tel:08022483777">☎ {t.call}: <b>080-2248 3777</b></a><a href="mailto:support@nammaticket.in">✉ support@nammaticket.in</a><div className="faq-box"><b>{lang === "en" ? "Payment successful, but ticket is missing?" : "ಪಾವತಿಯಾಗಿದೆ, ಆದರೆ ಟಿಕೆಟ್ ಕಾಣುತ್ತಿಲ್ಲವೇ?"}</b><p>{lang === "en" ? "Wait 30 seconds and check recent tickets. If it is still missing, contact us with your payment reference." : "30 ಸೆಕೆಂಡ್ ಕಾಯಿರಿ ಮತ್ತು ಇತ್ತೀಚಿನ ಟಿಕೆಟ್ ಪರಿಶೀಲಿಸಿ. ಇನ್ನೂ ಕಾಣದಿದ್ದರೆ ಪಾವತಿ ಉಲ್ಲೇಖದೊಂದಿಗೆ ನಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸಿ."}</p></div></div></div>}
      <footer><div className="brand"><span className="brand-mark">N</span><span>Namma <b>Ticket</b></span></div><p>{t.made}</p><span>© 2026 Namma Ticket · A BMTC travel experience</span></footer>
    </main>
  );
}
