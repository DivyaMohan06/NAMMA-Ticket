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

const busPasses = [
  { name: "Ordinary Monthly Pass", price: 1050, validity: "30 days", details: "Unlimited travel on BMTC ordinary services" },
  { name: "Vajra Monthly Pass", price: 2363, validity: "30 days", details: "Travel on Vajra AC and ordinary BMTC services" },
  { name: "Student Smart Pass", price: 500, validity: "30 days", details: "Discounted city travel for verified students" },
];

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
  const [showWelcome, setShowWelcome] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const [loginStep, setLoginStep] = useState<"phone" | "otp">("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [loginError, setLoginError] = useState("");
  const [lang, setLang] = useState<"en" | "kn">("en");
  const t = translations[lang];
  const [from, setFrom] = useState("Majestic (Kempegowda Bus Station)");
  const [to, setTo] = useState("Koramangala Water Tank");
  const [passengers, setPassengers] = useState(1);
  const [supportOpen, setSupportOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [shaktiOpen, setShaktiOpen] = useState(false);
  const [aadhaar, setAadhaar] = useState("");
  const [aadhaarConsent, setAadhaarConsent] = useState(false);
  const [shaktiVerified, setShaktiVerified] = useState(false);
  const [shaktiCategory, setShaktiCategory] = useState<"" | "eligibleWoman" | "notEligible">("");
  const [verificationError, setVerificationError] = useState("");
  const [loyaltyPoints, setLoyaltyPoints] = useState(240);
  const [redeemPoints, setRedeemPoints] = useState(false);
  const [selectedPass, setSelectedPass] = useState<{name:string; price:number; validity:string; details:string} | null>(null);
  const [passPurchased, setPassPurchased] = useState(false);
  const [journeyTab, setJourneyTab] = useState<"active" | "past" | "refunds">("active");
  const [refundRequested, setRefundRequested] = useState(false);
  const [chatAnswer, setChatAnswer] = useState("Hi! I’m Namma AI. Choose a question below and I’ll help you right away.");
  const [step, setStep] = useState<"search" | "routes" | "payment" | "ticket">("search");
  const routes = useMemo(() => (routeFamilies[to] || routeFamilies[stops[4]]).map((bus, index) => ({ bus, time: `08:${String(42 + index * 8).padStart(2,"0")}`, minutes: 3 + index * 8, seats: index === 1 ? (lang === "en" ? "Standing likely" : "ನಿಲ್ಲಬೇಕಾಗಬಹುದು") : (lang === "en" ? "Seats available" : "ಆಸನಗಳು ಲಭ್ಯ"), tag: bus.startsWith("KIA") || bus.startsWith("V-") ? "Vayu Vajra" : "Ordinary" })), [to, lang]);
  const [selectedBusId, setSelectedBusId] = useState("");
  const selectedBus = routes.find(route => route.bus === selectedBusId) || routes[0];
  const regularFare = passengers * (18 + Math.max(1, Math.abs(stops.indexOf(from) - stops.indexOf(to))) * 4);
  const loyaltyDiscount = !shaktiVerified && redeemPoints ? Math.min(Math.floor(loyaltyPoints / 100) * 10, Math.floor(regularFare / 2)) : 0;
  const pointsToUse = loyaltyDiscount * 10;
  const fare = shaktiVerified ? 0 : regularFare - loyaltyDiscount;
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

  function downloadTicket() {
    const ticketHtml = `<!doctype html><html><head><meta charset="utf-8"><title>Namma Ticket NMT-2507-84K2</title><style>body{font-family:Arial,sans-serif;background:#f4f1e9;padding:40px;color:#102b28}.ticket{max-width:520px;margin:auto;background:white;border-radius:18px;overflow:hidden;box-shadow:0 15px 45px #0002}.head,.foot{padding:20px 28px;background:#0d765f;color:white}.route{display:flex;justify-content:space-between;padding:32px 28px;background:#f5f1e8}.details{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;padding:28px}.details small,.route small{display:block;color:#71807c;font-weight:bold;margin-bottom:8px}.id{padding:28px;border-top:1px dashed #ccd5d1}.foot{background:#102b28;font-size:12px}@media print{body{background:white}.ticket{box-shadow:none}}</style></head><body><div class="ticket"><div class="head"><b>Namma Ticket</b> &nbsp; • VALID</div><div class="route"><div><small>FROM</small><b>${from}</b></div><div>→</div><div><small>TO</small><b>${to}</b></div></div><div class="details"><div><small>ROUTE</small><b>${selectedBus.bus}</b></div><div><small>PASSENGERS</small><b>${passengers}</b></div><div><small>FARE PAID</small><b>₹${fare}</b></div></div><div class="id"><small>TICKET ID</small><h2>NMT-2507-84K2</h2><p>Valid for this journey only. Show this ticket to the conductor.</p></div><div class="foot">BMTC · Bengaluru</div></div></body></html>`;
    const url = URL.createObjectURL(new Blob([ticketHtml], { type: "text/html" }));
    const anchor = document.createElement("a"); anchor.href = url; anchor.download = "Namma-Ticket-NMT-2507-84K2.html"; anchor.style.display = "none"; document.body.appendChild(anchor); anchor.click(); anchor.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  function askBot(question: string) {
    const answers: Record<string, string> = {
      "How do I book a ticket?": "Choose your boarding and destination stops, select a bus, pay securely, and show the generated QR ticket to the conductor.",
      "Can I book after boarding?": "Yes. You can purchase a ticket after boarding, but please complete payment before the conductor checks your ticket.",
      "Where is my QR ticket?": "After a successful payment, your QR ticket appears immediately. You can also find it under My journeys → Active ticket.",
      "How do refunds work?": "Open My journeys → Refunds and choose Request refund for an eligible booking. Refunds normally return to the original payment method in 3–5 working days.",
      "My payment failed": "Check whether money was debited. If yes, wait 30 seconds and check Active tickets. Otherwise retry payment or contact Namma Support."
    };
    setChatAnswer(answers[question] || "Please contact Namma Support at 080-2248 3777 for more help.");
  }

  function verifyShaktiEligibility() {
    const digits = aadhaar.replace(/\D/g, "");
    if (shaktiCategory !== "eligibleWoman") { setVerificationError("Only eligible women passengers can claim the Shakti free-travel benefit."); return; }
    if (digits.length !== 12 || !aadhaarConsent) { setVerificationError("Enter a valid 12-digit Aadhaar number and accept the consent checkbox."); return; }
    setVerificationError(""); setShaktiVerified(true); setAadhaar("");
  }

  function continueLogin() {
    if (loginStep === "phone") { if (phone.length !== 10) { setLoginError("Enter a valid 10-digit mobile number."); return; } setLoginError(""); setLoginStep("otp"); return; }
    if (otp !== "1234") { setLoginError("For this prototype, enter demo OTP 1234."); return; }
    setLoginError(""); setLoggedIn(true);
  }

  function completeTicketPurchase() {
    setLoyaltyPoints(points => points - pointsToUse + Math.floor(fare / 10));
    setStep("ticket");
  }

  if (showWelcome) return <main className="welcome-page"><div className="welcome-orbit one"/><div className="welcome-orbit two"/><nav className="welcome-nav"><div className="brand"><span className="brand-mark">N</span><span>Namma <b>Ticket</b></span></div><span>BMTC · Bengaluru</span></nav><section className="welcome-content"><div className="welcome-badge">● NAMMA BENGALURU, NAMMA BUS</div><h1>Welcome aboard.<br/><em>Your city is one tap away.</em></h1><p>Book BMTC tickets before or after boarding, travel free when eligible under Shakti, and keep every journey in one simple place.</p><button className="welcome-cta" onClick={() => setShowWelcome(false)}>Start booking <span>→</span></button><div className="welcome-features"><span>✓ Instant QR tickets</span><span>✓ Shakti eligibility</span><span>✓ Kannada &amp; English</span></div></section><div className="welcome-ticket"><div><span className="brand-mark small">N</span><b>Namma Ticket</b><em>● READY</em></div><p>MAJESTIC <span>→</span> KORAMANGALA</p><small>Fast. Simple. Made for Bengaluru.</small></div><footer className="welcome-footer">Safe journeys start here · Namma Ticket</footer></main>;

  if (!loggedIn) return <main className="login-page"><section className="login-brand"><div className="brand"><span className="brand-mark">N</span><span>Namma <b>Ticket</b></span></div><div><span className="mini-label">WELCOME BACK</span><h1>Sign in and keep<br/><em>Bengaluru moving.</em></h1><p>Access your tickets, passes, Shakti eligibility, refunds, and Namma Rewards from any device.</p></div><div className="login-benefits"><span>✓ Secure OTP access</span><span>✓ Tickets synced to your number</span><span>✓ Earn rewards every ride</span></div></section><section className="login-card"><button className="login-back" onClick={() => setShowWelcome(true)}>← Back</button><div className="login-icon">ಜ</div><span className="mini-label">{loginStep === "phone" ? "SIGN IN OR CREATE ACCOUNT" : "VERIFY YOUR NUMBER"}</span><h2>{loginStep === "phone" ? "Your journeys await." : "Enter the 4-digit OTP."}</h2><p>{loginStep === "phone" ? "Use your mobile number to continue securely." : `A demo OTP was sent to +91 ${phone}.`}</p>{loginStep === "phone" ? <label className="login-field"><span>MOBILE NUMBER</span><div><b>+91</b><input value={phone} onChange={event => setPhone(event.target.value.replace(/\D/g, "").slice(0,10))} inputMode="tel" placeholder="98765 43210" autoFocus/></div></label> : <label className="login-field"><span>ONE-TIME PASSWORD</span><input className="otp-input" value={otp} onChange={event => setOtp(event.target.value.replace(/\D/g, "").slice(0,4))} inputMode="numeric" placeholder="• • • •" autoFocus/><small>Demo OTP: 1234</small></label>}{loginError && <p className="login-error">{loginError}</p>}<button className="primary full" onClick={continueLogin}>{loginStep === "phone" ? "Send OTP →" : "Verify & continue →"}</button>{loginStep === "otp" && <button className="change-number" onClick={() => { setLoginStep("phone"); setOtp(""); setLoginError(""); }}>Change mobile number</button>}<small className="login-terms">Prototype login only. No mobile number or OTP is transmitted or stored.</small></section></main>;

  return (
    <main>
      <nav className="nav">
        <button className="brand" onClick={startOver} aria-label="Namma Ticket home">
          <span className="brand-mark">N</span>
          <span>Namma <b>Ticket</b></span>
        </button>
        <div className="nav-links"><a href="#how">{t.how}</a><button className="nav-support" onClick={() => setSupportOpen(true)}>◌ {t.support}</button><button className="lang" onClick={() => setLang(lang === "en" ? "kn" : "en")} aria-label="Change language"><b>{lang === "en" ? "ಕನ್ನಡ" : "English"}</b> <span>⇄</span></button><button className="profile" aria-label="Profile">ಜ</button></div>
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

        <section className={`shakti-section ${shaktiVerified ? "verified" : ""}`}>
          <div className="shakti-mark">ಶ</div><div><span className="mini-label">SHAKTI FREE TRAVEL</span><h2>{shaktiVerified ? "Your Shakti eligibility is verified." : "Eligible women travel free."}</h2><p>{shaktiVerified ? "Your eligible BMTC journeys will automatically show a ₹0 fare. Keep an original government ID available during travel." : "Verify your identity once to apply eligible free-travel benefits to BMTC ordinary services."}</p><small>Prototype only · Aadhaar details are not saved on this device.</small></div><button className={shaktiVerified ? "verified-button" : "shakti-button"} onClick={() => setShaktiOpen(true)}>{shaktiVerified ? "✓ Verified" : "Verify eligibility →"}</button>
        </section>

        <section className="passes-section" id="passes">
          <div className="passes-head"><div><span className="mini-label">BMTC BUS PASSES</span><h2>One pass. A month of Bengaluru.</h2><p>Choose the pass that fits your daily travel and keep it alongside your tickets.</p></div><div className="rewards-balance"><small>NAMMA REWARDS</small><b>{loyaltyPoints} points</b><span>Earn more every ride</span></div></div>
          <div className="pass-grid">{busPasses.map((pass, index) => <article className={index === 1 ? "featured" : ""} key={pass.name}>{index === 1 && <span className="popular">MOST POPULAR</span>}<div className="pass-icon">{index === 2 ? "S" : "N"}</div><span>{pass.validity.toUpperCase()}</span><h3>{pass.name}</h3><p>{pass.details}</p><div className="pass-price"><b>₹{pass.price.toLocaleString("en-IN")}</b><small> / month</small></div><button onClick={() => { setSelectedPass(pass); setPassPurchased(false); }}>Buy this pass →</button></article>)}</div>
        </section>

        <section className="how" id="how">
          <div><span className="mini-label">EASY AS 1, 2, 3</span><h2>From stop to seat,<br/>without the wait.</h2></div>
          <div className="steps"><article><b>01</b><div className="step-icon">⌖</div><h3>Choose your route</h3><p>Pick where you’re boarding and where you’re headed.</p></article><article><b>02</b><div className="step-icon">₹</div><h3>Pay your way</h3><p>Use any UPI app or card. It’s fast and secure.</p></article><article><b>03</b><div className="step-icon">▦</div><h3>Show &amp; ride</h3><p>Show your QR ticket when the conductor asks. Done.</p></article></div>
        </section>

        <section className="journeys" id="journeys">
          <div className="journeys-head"><div><span className="mini-label">MY JOURNEYS</span><h2>Your tickets, all in one place.</h2><p>View active rides, past bookings, and refund updates.</p></div><div className="journey-tabs" role="tablist"><button className={journeyTab === "active" ? "active" : ""} onClick={() => setJourneyTab("active")}>Active tickets <b>1</b></button><button className={journeyTab === "past" ? "active" : ""} onClick={() => setJourneyTab("past")}>Past bookings</button><button className={journeyTab === "refunds" ? "active" : ""} onClick={() => setJourneyTab("refunds")}>Refunds</button></div></div>
          <div className="journey-panel">
            {journeyTab === "active" && <article className="journey-row"><span className="journey-status live">● ACTIVE</span><div><small>TODAY · 08:42 AM</small><h3>Majestic <em>→</em> Koramangala</h3><p>Route 171 · 1 passenger</p></div><div className="journey-fare"><small>FARE PAID</small><b>₹34</b></div><button onClick={() => { setFrom(stops[0]); setTo(stops[4]); setSelectedBusId("171"); setStep("ticket"); window.scrollTo({top:0,behavior:"smooth"}); }}>View QR ticket →</button></article>}
            {journeyTab === "past" && <><article className="journey-row muted"><span className="journey-status">COMPLETED</span><div><small>18 JUL · 06:15 PM</small><h3>Indiranagar <em>→</em> Whitefield</h3><p>Route 335-E · 1 passenger</p></div><div className="journey-fare"><small>FARE PAID</small><b>₹30</b></div><button onClick={() => setJourneyTab("refunds")}>Get help →</button></article><article className="journey-row muted"><span className="journey-status">COMPLETED</span><div><small>12 JUL · 09:05 AM</small><h3>Banashankari <em>→</em> K.R. Market</h3><p>Route 210-P · 2 passengers</p></div><div className="journey-fare"><small>FARE PAID</small><b>₹52</b></div><button onClick={() => setJourneyTab("refunds")}>Get help →</button></article></>}
            {journeyTab === "refunds" && <article className="refund-card"><div className="refund-icon">↺</div><div><h3>{refundRequested ? "Refund request received" : "Need to cancel an eligible booking?"}</h3><p>{refundRequested ? "Your request RF-20481 is being reviewed. The amount will return to your original payment method in 3–5 working days." : "Select an eligible recent booking to request a refund. Completed journeys are reviewed before approval."}</p></div><button className="secondary" disabled={refundRequested} onClick={() => setRefundRequested(true)}>{refundRequested ? "Request submitted ✓" : "Request refund"}</button></article>}
          </div>
        </section>

      </>}

      {step === "routes" && <section className="flow-page">
        <button className="back" onClick={() => setStep("search")}>← {t.change}</button>
        <div className="flow-title"><div><span className="mini-label">YOUR ROUTE</span><h1>{t.choose}</h1><p>{stopName(from)} <b>→</b> {stopName(to)}</p></div><div className="fare-pill"><span>{t.fare}</span><b>₹{fare}</b></div></div>
        <div className="route-list">{routes.map((route, index) => <button key={route.bus} className={`route-card ${selectedBus.bus === route.bus ? "selected" : ""}`} onClick={() => setSelectedBusId(route.bus)}><span className="bus-icon">BUS</span><span className="route-number"><small>{t.route}</small><b>{route.bus}</b><em>{route.tag}</em></span><span className="time"><small>{t.arrives}</small><b>{route.time}</b><em>{route.minutes} min away</em></span><span className={`availability ${index === 1 ? "busy" : ""}`}>● {route.seats}</span><span className="radio">{selectedBus.bus === route.bus ? "●" : "○"}</span></button>)}</div>
        <div className="flow-action"><div><span>{shaktiVerified ? "Shakti free-travel benefit applied" : `Total for ${passengers} passenger${passengers > 1 ? "s" : ""}`}</span><b>{shaktiVerified ? "FREE" : `₹${fare}`}</b></div><button className="primary" onClick={() => setStep(shaktiVerified ? "ticket" : "payment")}>{shaktiVerified ? "Get free ticket" : t.continue} <span>→</span></button></div>
      </section>}

      {step === "payment" && <section className="flow-page payment-page">
        <button className="back" onClick={() => setStep("routes")}>← Back to buses</button>
        <div className="payment-grid"><div><span className="mini-label">SECURE PAYMENT</span><h1>Almost there.</h1><p className="sub">Choose how you’d like to pay.</p><div className={`loyalty-card ${redeemPoints ? "applied" : ""}`}><div className="rewards-mark">N</div><div><b>Namma Rewards</b><small>{loyaltyPoints} points available · Earn 1 point per ₹10</small></div><button disabled={loyaltyPoints < 100} onClick={() => setRedeemPoints(!redeemPoints)}>{redeemPoints ? `✓ ₹${loyaltyDiscount} off` : "Redeem points"}</button></div><div className="pay-options"><label className="pay-option active"><input type="radio" name="pay" defaultChecked/><span className="pay-logo upi">UPI</span><span><b>UPI</b><small>Google Pay, PhonePe, Paytm &amp; more</small></span><em>●</em></label><label className="pay-option"><input type="radio" name="pay"/><span className="pay-logo">▭</span><span><b>Credit / Debit card</b><small>Visa, Mastercard, RuPay</small></span><em>○</em></label></div><button className="primary full" onClick={completeTicketPurchase}>Pay ₹{fare} securely <span>→</span></button><p className="secure">⌾ 256-bit encrypted · Your payment is protected</p></div><aside className="summary"><span className="mini-label">JOURNEY SUMMARY</span><div className="summary-route"><i/><div><small>FROM</small><b>{from}</b></div><i className="end"/><div><small>TO</small><b>{to}</b></div></div><hr/><div className="bus-summary"><span className="bus-icon">BUS</span><div><small>ROUTE</small><b>{selectedBus.bus} · {selectedBus.time}</b></div></div>{loyaltyDiscount > 0 && <div className="discount-row"><span>Rewards discount ({pointsToUse} points)</span><b>−₹{loyaltyDiscount}</b></div>}<div className="summary-total"><span>{passengers} passenger{passengers > 1 ? "s" : ""}</span><b>₹{fare}</b></div></aside></div>
      </section>}

      {step === "ticket" && <section className="ticket-page">
        <div className="success-badge">✓</div><span className="mini-label">PAYMENT SUCCESSFUL</span><h1>You’re ready to ride!</h1><p>Show this QR code to the conductor when asked.</p>
        <article className="ticket"><div className="ticket-top"><div><span className="brand-mark small">N</span><b>Namma Ticket</b></div><span className="valid">● VALID</span></div>{shaktiVerified && <div className="shakti-ticket-badge">ಶ Shakti free-travel ticket · Aadhaar ending ••••</div>}<div className="ticket-route"><div><small>FROM</small><b>{from.split(" (")[0]}</b></div><span>→</span><div><small>TO</small><b>{to}</b></div></div><div className="ticket-details"><div><small>ROUTE</small><b>{selectedBus.bus}</b></div><div><small>PASSENGERS</small><b>{passengers}</b></div><div><small>FARE PAID</small><b>{shaktiVerified ? "FREE" : `₹${fare}`}</b></div></div><div className="qr-wrap"><QRCode/><div><small>TICKET ID</small><b>NMT-2507-84K2</b><p>Valid for this journey only</p></div></div><div className="ticket-footer"><span>Purchased at 08:39 AM</span><span>BMTC · Bengaluru</span></div></article>
        <div className="ticket-actions"><button className="secondary" onClick={downloadTicket}>↓ Download ticket</button><button className="primary" onClick={startOver}>Book another ride</button></div><p className="help">Need help? Call BMTC at <b>080-2248 3777</b></p>
      </section>}

      <button className="support-fab" onClick={() => setSupportOpen(true)} aria-label={t.support}>?</button>
      <button className="chat-fab" onClick={() => setChatOpen(!chatOpen)} aria-label="Open Namma AI assistant">AI</button>
      {selectedPass && <div className="pass-modal" role="dialog" aria-modal="true" aria-label="Purchase a BMTC bus pass" onClick={() => setSelectedPass(null)}><div onClick={event => event.stopPropagation()}><button className="modal-close" onClick={() => setSelectedPass(null)} aria-label="Close bus pass purchase">×</button>{passPurchased ? <div className="pass-success"><span>✓</span><h2>Your pass is ready.</h2><p><b>{selectedPass.name}</b> is now active for {selectedPass.validity}. You can show its digital QR from My Journeys.</p><div className="pass-reward-earned">+{Math.floor(selectedPass.price / 50)} Namma Rewards points earned</div><button className="primary full" onClick={() => setSelectedPass(null)}>Done</button></div> : <><span className="mini-label">BMTC BUS PASS</span><h2>{selectedPass.name}</h2><p>{selectedPass.details}</p><div className="pass-checkout"><div><small>VALIDITY</small><b>{selectedPass.validity}</b></div><div><small>PASS PRICE</small><b>₹{selectedPass.price.toLocaleString("en-IN")}</b></div></div><p className="pass-note">This prototype purchase creates a demo digital pass. Production use requires BMTC identity verification and a payment provider.</p><button className="primary full" onClick={() => { setLoyaltyPoints(points => points + Math.floor(selectedPass.price / 50)); setPassPurchased(true); }}>Purchase pass securely →</button></>}</div></div>}
      {shaktiOpen && <div className="shakti-modal" role="dialog" aria-modal="true" aria-label="Shakti Aadhaar verification" onClick={() => setShaktiOpen(false)}><div onClick={event => event.stopPropagation()}><button className="modal-close" onClick={() => setShaktiOpen(false)} aria-label="Close verification">×</button>{shaktiVerified ? <div className="verification-success"><span>✓</span><h2>Eligibility verified</h2><p>Free-travel fares will be applied automatically to eligible BMTC ordinary bus journeys in this prototype.</p><button className="primary" onClick={() => setShaktiOpen(false)}>Continue booking</button><button className="remove-verification" onClick={() => { setShaktiVerified(false); setShaktiCategory(""); setAadhaarConsent(false); setShaktiOpen(false); }}>Remove verification</button></div> : <><span className="mini-label">SHAKTI FREE TRAVEL</span><h2>Verify your eligibility</h2><p className="privacy-note">The free-travel claim is available only to women who meet the applicable Shakti scheme rules. Aadhaar information is never saved or sent in this prototype.</p><div className="eligibility-choice"><button className={shaktiCategory === "eligibleWoman" ? "selected" : ""} onClick={() => { setShaktiCategory("eligibleWoman"); setVerificationError(""); }}><b>Woman eligible under Shakti</b><small>Continue to Aadhaar verification</small></button><button className={shaktiCategory === "notEligible" ? "selected ineligible" : ""} onClick={() => { setShaktiCategory("notEligible"); setShaktiVerified(false); setVerificationError("Free travel can only be claimed by eligible women passengers."); }}><b>I am not eligible</b><small>Continue with regular paid booking</small></button></div>{shaktiCategory === "eligibleWoman" && <><label className="aadhaar-field"><span>AADHAAR NUMBER</span><input value={aadhaar} onChange={event => setAadhaar(event.target.value.replace(/\D/g, "").slice(0,12))} inputMode="numeric" autoComplete="off" placeholder="0000 0000 0000"/><small>{aadhaar.length}/12 digits</small></label><label className="consent"><input type="checkbox" checked={aadhaarConsent} onChange={event => setAadhaarConsent(event.target.checked)}/><span>I confirm that I am an eligible woman passenger and consent to identity verification for the Shakti travel benefit.</span></label></>}{verificationError && <p className="verification-error">{verificationError}</p>}{shaktiCategory === "eligibleWoman" && <button className="primary full" onClick={verifyShaktiEligibility}>Verify securely →</button>}{shaktiCategory === "notEligible" && <button className="secondary full" onClick={() => setShaktiOpen(false)}>Continue with regular fare</button>}<div className="data-safety">⌾ No Aadhaar data is stored · Authorized verification required for production</div></>}</div></div>}
      {chatOpen && <aside className="chatbot" aria-label="Namma AI assistant"><div className="chat-head"><span className="bot-avatar">N</span><div><b>Namma AI</b><small>Passenger assistant · Online</small></div><button onClick={() => setChatOpen(false)} aria-label="Close Namma AI">×</button></div><div className="chat-body"><div className="bot-message">{chatAnswer}</div><p>POPULAR QUESTIONS</p><div className="question-chips">{["How do I book a ticket?","Can I book after boarding?","Where is my QR ticket?","How do refunds work?","My payment failed"].map(question => <button key={question} onClick={() => askBot(question)}>{question}<span>→</span></button>)}</div></div><div className="chat-foot"><span>AI answers general questions. For account help, use Support.</span></div></aside>}
      {supportOpen && <div className="support-modal" role="dialog" aria-modal="true" aria-label={t.support} onClick={() => setSupportOpen(false)}><div onClick={event => event.stopPropagation()}><button className="modal-close" onClick={() => setSupportOpen(false)} aria-label="Close support">×</button><span className="mini-label">NAMMA SUPPORT</span><h2>{t.helpTitle}</h2><p>{t.helpText}</p><div className="modal-actions"><a href="tel:08022483777"><i>☎</i><span><b>{t.call}</b><small>6 AM – 11 PM · 080-2248 3777</small></span><em>→</em></a><a href="mailto:support@nammaticket.in"><i>✉</i><span><b>{t.chat}</b><small>support@nammaticket.in</small></span><em>→</em></a><a href="tel:08022952522"><i>ⓘ</i><span><b>BMTC Control Room</b><small>Lost property &amp; emergencies</small></span><em>080-2295 2522</em></a></div><div className="faq-box"><b>{lang === "en" ? "Payment successful, but ticket is missing?" : "ಪಾವತಿಯಾಗಿದೆ, ಆದರೆ ಟಿಕೆಟ್ ಕಾಣುತ್ತಿಲ್ಲವೇ?"}</b><p>{lang === "en" ? "Wait 30 seconds and check recent tickets. If it is still missing, contact us with your payment reference." : "30 ಸೆಕೆಂಡ್ ಕಾಯಿರಿ ಮತ್ತು ಇತ್ತೀಚಿನ ಟಿಕೆಟ್ ಪರಿಶೀಲಿಸಿ. ಇನ್ನೂ ಕಾಣದಿದ್ದರೆ ಪಾವತಿ ಉಲ್ಲೇಖದೊಂದಿಗೆ ನಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸಿ."}</p></div></div></div>}
      <footer><div className="brand"><span className="brand-mark">N</span><span>Namma <b>Ticket</b></span></div><p>{t.made}</p><span>© 2026 Namma Ticket · A BMTC travel experience</span></footer>
    </main>
  );
}
