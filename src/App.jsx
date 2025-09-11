import React, { useEffect, useState } from "react";
import logo from "./assets/images/logo.svg";

/**
 * ATN SOLUTiONS - Coming Soon Page
 * - Countdown target is configurable below (default: 2026-01-01T00:00:00Z)
 * - Subscribe stores email in localStorage (simple client-only fallback)
 */

const TARGET_DATE = new Date("2026-01-01T00:00:00Z").getTime(); // change this to your launch date

const Button = ({ children, className = "", ...props }) => (
  <button
    {...props}
    className={`bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition ${className}`}
  >
    {children}
  </button>
);

export default function ComingSoon() {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(
    Boolean(localStorage.getItem("atn_subscribed"))
  );
  const [error, setError] = useState("");

  useEffect(() => {
    const t = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);
    return () => clearInterval(t);
  }, []);

  function getTimeLeft() {
    const now = Date.now();
    const diff = Math.max(0, TARGET_DATE - now);
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);
    return { days, hours, minutes, seconds, isDone: diff === 0 };
  }

  function validateEmail(e) {
    // simple email regex
    return /\S+@\S+\.\S+/.test(e);
  }

  function handleSubscribe(e) {
    e.preventDefault();
    setError("");
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    // store subscription locally (replace with an API or email provider later)
    const existing = JSON.parse(localStorage.getItem("atn_subscribers") || "[]");
    if (!existing.includes(email)) {
      existing.push(email);
      localStorage.setItem("atn_subscribers", JSON.stringify(existing));
    }
    localStorage.setItem("atn_subscribed", "true");
    setSubscribed(true);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 via-white to-blue-50 px-6">
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="md:flex">
          {/* Left: content */}
          <div className="w-full md:w-2/3 p-8 md:p-12">
            <header className="flex items-center gap-4 mb-6">
              <img src={logo} alt="ATN SOLUTiONS" className="h-12 w-auto" />
              <div>
                <h1 className="text-xl font-bold">ATN SOLUTiONS</h1>
                <p className="text-sm text-gray-500">Transforming Ideas into Scalable Software</p>
              </div>
            </header>

            <main>
              <h2 className="text-3xl md:text-4xl font-extrabold mb-3">
                We’re launching soon.
              </h2>
              <p className="text-gray-600 mb-6">
                ATN SOLUTiONS is building software solutions, consultancy, and product engineering
                to help businesses innovate and grow. Leave your email and we’ll let you know when
                we go live.
              </p>

              {/* Countdown */}
              <div className="flex gap-3 mb-6 flex-wrap">
                <CountBox label="Days" value={timeLeft.days} />
                <CountBox label="Hours" value={timeLeft.hours} />
                <CountBox label="Minutes" value={timeLeft.minutes} />
                <CountBox label="Seconds" value={timeLeft.seconds} />
              </div>

              {/* Subscribe form */}
              {!subscribed ? (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                  <label htmlFor="email" className="sr-only">Email address</label>
                  <input
                    id="email"
                    type="email"
                    placeholder="you@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200"
                    aria-label="Email address"
                  />
                  <Button type="submit" className="whitespace-nowrap">Notify Me</Button>
                </form>
              ) : (
                <div className="bg-green-50 border border-green-100 p-3 rounded-md text-green-700">
                  Thanks — you’re on the list! We’ll email you when we launch.
                </div>
              )}

              {error && <p className="text-sm text-red-600 mt-2">{error}</p>}

              {/* Optional quick links / contact */}
              <div className="mt-6 text-sm text-gray-500">
                <p>
                  Need to reach us? <a href="mailto:hello@atnsolutions.co.za" className="text-blue-600 hover:underline">info@atn-solutions.co.za</a>
                </p>
                <p className="mt-2">Follow us: <a className="text-blue-600 hover:underline" href="https://www.linkedin.com/company/atn-solutions-pty-ltd/?lipi=urn%3Ali%3Apage%3Ad_flagship3_search_srp_all%3Bt1hMs52JRAOEaIJrBKyOSA%3D%3D">LinkedIn</a> • <a className="text-blue-600 hover:underline" href="#">GitHub</a></p>
              </div>
            </main>
          </div>

          {/* Right: marketing panel */}
          <aside className="hidden md:block md:w-1/3 bg-gradient-to-b from-blue-600 to-blue-500 text-white p-8">
            <div className="h-full flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-bold mb-2">What we do</h3>
                <ul className="space-y-3 text-sm">
                  <li>• Web Development</li>
                  <li>• Web Redesign</li>
                  <li>• SEO</li>
                  <li>• Mobile Applications</li>
                  <li>• IT & Product Consultancy</li>
                </ul>
              </div>

              <div className="mt-6">
                <p className="text-sm opacity-90 mb-3">Want early access to demos and case studies?</p>
                <a className="inline-block bg-white text-blue-600 px-4 py-2 rounded-md font-semibold hover:opacity-95" href="#contact">
                  Request Demo
                </a>
              </div>
            </div>
          </aside>
        </div>

        {/* Footer small */}
        <div className="border-t border-gray-100 p-4 text-xs text-gray-500 text-center">
          © {new Date().getFullYear()} ATN SOLUTiONS (PTY) LTD — Building solutions that scale.
        </div>
      </div>
    </div>
  );
}

/* small helper component */
function CountBox({ label, value }) {
  return (
    <div className="bg-white border rounded-lg px-4 py-3 text-center shadow-sm w-24">
      <div className="text-2xl font-bold">{String(value).padStart(2, "0")}</div>
      <div className="text-xs text-gray-500">{label}</div>
    </div>
  );
}
