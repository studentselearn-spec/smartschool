import { useState } from "react";
import { Link } from "react-router-dom";
import BrandingFooter from "@/components/BrandingFooter";
import { BrandLogo } from "@/components/BrandLogo";

export default function Landing() {
  const [showDemoForm, setShowDemoForm] = useState(false);
  const [showJoinForm, setShowJoinForm] = useState(false);
  const [submitted, setSubmitted] = useState<null | string>(null);

  function DemoForm({ onClose }: { onClose: () => void }) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
        <div className="w-full max-w-md bg-white rounded-xl p-6 shadow-xl">
          <h3 className="text-lg font-semibold mb-2">Request a Demo</h3>
          <p className="text-sm text-muted-foreground mb-4">Tell us a bit about your school and we'll be in touch.</p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted("demo");
              onClose();
            }}
            className="space-y-3"
          >
            <input required placeholder="School name" className="w-full border rounded-md px-3 py-2" />
            <input required placeholder="Contact name" className="w-full border rounded-md px-3 py-2" />
            <input required type="email" placeholder="Your email" className="w-full border rounded-md px-3 py-2" />
            <div className="flex gap-2 justify-end">
              <button type="button" onClick={onClose} className="px-4 py-2 rounded-md border">
                Cancel
              </button>
              <button className="px-4 py-2 rounded-md bg-blue-600 text-white">Request Demo</button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  function JoinForm({ onClose }: { onClose: () => void }) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
        <div className="w-full max-w-md bg-white rounded-xl p-6 shadow-xl">
          <h3 className="text-lg font-semibold mb-2">Join as a Founding Partner</h3>
          <p className="text-sm text-muted-foreground mb-4">Apply to become a founding partner school and get exclusive benefits.</p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted("join");
              onClose();
            }}
            className="space-y-3"
          >
            <input required placeholder="School name" className="w-full border rounded-md px-3 py-2" />
            <input required placeholder="Headteacher name" className="w-full border rounded-md px-3 py-2" />
            <input required type="email" placeholder="Email" className="w-full border rounded-md px-3 py-2" />
            <div className="flex gap-2 justify-end">
              <button type="button" onClick={onClose} className="px-4 py-2 rounded-md border">
                Cancel
              </button>
              <button className="px-4 py-2 rounded-md bg-blue-600 text-white">Apply</button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="flex items-center justify-between px-6 py-4 max-w-6xl mx-auto w-full">
        <BrandLogo name="Samuel Marketplace" logoUrl={null} />
        <nav className="flex items-center gap-4">
          <Link to="/demo" className="text-sm text-slate-700 hover:underline">
            Login to Demo School
          </Link>
          <button
            onClick={() => setShowDemoForm(true)}
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-md bg-blue-600 text-white"
          >
            Request a Demo
          </button>
        </nav>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1400&q=60')",
            }}
          />
          <div className="relative z-10 bg-gradient-to-b from-black/20 to-white/60">
            <div className="max-w-6xl mx-auto px-6 py-24 flex flex-col lg:flex-row items-center gap-10">
              <div className="w-full lg:w-1/2 text-white lg:text-left text-center">
                <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-4">
                  Empower Your School with Smart Digital Management.
                </h1>
                <p className="text-lg text-white/90 mb-6">
                  A white-label school management platform for Botswana schools — fees, attendance, reports, and parent communication in one place.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                  <button onClick={() => setShowDemoForm(true)} className="px-6 py-3 rounded-md bg-white text-blue-700 font-semibold">
                    Request a Demo
                  </button>
                  <Link to="/demo" className="px-6 py-3 rounded-md border border-white text-white/90">
                    Login to Demo School
                  </Link>
                </div>
              </div>
              <div className="w-full lg:w-1/2">
                <div className="bg-white/90 rounded-xl p-4 shadow-lg">
                  <h4 className="font-semibold">Founding Partner Offer</h4>
                  <p className="text-sm text-muted-foreground">Join as a founding partner and get 10% revenue share for referrals.</p>
                  <div className="mt-4 flex gap-2">
                    <img src="/placeholder.svg" alt="partner" className="h-12 w-12 rounded-md" />
                    <div>
                      <div className="font-semibold">Greenhill Academy</div>
                      <div className="text-xs text-muted-foreground">Partner School</div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <button onClick={() => setShowJoinForm(true)} className="w-full rounded-md bg-blue-600 text-white px-4 py-2">Become a Partner</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About */}
        <section className="max-w-6xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl font-semibold mb-3">About SmartSchool</h2>
              <p className="text-muted-foreground mb-4">
                SmartSchool is a digital system that helps schools automate fee management, track attendance, generate reports, and engage parents — all under your own school domain and logo.
              </p>
              <div className="flex items-center gap-4 mt-4">
                <img src="/placeholder.svg" alt="partner" className="h-10 w-10 rounded-md" />
                <img src="/placeholder.svg" alt="partner" className="h-10 w-10 rounded-md" />
                <img src="/placeholder.svg" alt="partner" className="h-10 w-10 rounded-md" />
              </div>
            </div>
            <div>
              <div className="rounded-xl bg-blue-50 p-6 shadow-inner">
                <h3 className="font-semibold mb-2">Core Benefits</h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  <li className="rounded-md bg-white p-3">Automate fees & reminders</li>
                  <li className="rounded-md bg-white p-3">Track attendance in minutes</li>
                  <li className="rounded-md bg-white p-3">MOE-compliant reports</li>
                  <li className="rounded-md bg-white p-3">Multi-campus support</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="bg-slate-50 py-12">
          <div className="max-w-6xl mx-auto px-6">
            <h3 className="text-xl font-semibold mb-6">Features</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <FeatureCard title="Student & Attendance Tracking" />
              <FeatureCard title="Fee Management & Reminders" />
              <FeatureCard title="MOE-Compliant Reports" />
              <FeatureCard title="Multi-Campus Dashboard" />
              <FeatureCard title="Offline Sync" />
              <FeatureCard title="Custom Domain & Branding" />
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="max-w-6xl mx-auto px-6 py-16">
          <h3 className="text-xl font-semibold mb-6">How it works</h3>
          <ol className="space-y-4">
            <li className="p-4 rounded-md bg-white shadow">1. Book a Demo</li>
            <li className="p-4 rounded-md bg-white shadow">2. We Set Up Your Branded Version</li>
            <li className="p-4 rounded-md bg-white shadow">3. Go Live in 7 Days</li>
          </ol>
        </section>

        {/* Pricing */}
        <section className="bg-white py-16">
          <div className="max-w-6xl mx-auto px-6">
            <h3 className="text-xl font-semibold mb-6">Simple yearly plans for every school size</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <PricingCard title="Lite (for Crèches)" price="P2,000/year" />
              <PricingCard title="Pro (for Primary Schools)" price="P5,000/year" />
              <PricingCard title="Enterprise (for Multi-Campus)" price="P10,000/year" />
            </div>
            <div className="mt-4 text-sm text-muted-foreground">Founding Partner School gets 10% revenue share for referrals.</div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="max-w-6xl mx-auto px-6 py-16">
          <h3 className="text-xl font-semibold mb-6">What Headteachers Say</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Testimonial name="Mrs. K. Molefe" role="Headteacher, Greenhill Academy" />
            <Testimonial name="Mr. L. Kgosi" role="Principal, Sunrise Primary" />
            <Testimonial name="Ms. R. Dube" role="School Owner, Little Stars" />
          </div>
        </section>

        {/* CTA */}
        <section className="bg-blue-600 text-white py-12">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <h3 className="text-2xl font-semibold mb-4">Become a Founding Partner School in Botswana.</h3>
            <p className="mb-6">Join a select group of schools shaping the future of education in Botswana.</p>
            <div className="flex gap-3 justify-center">
              <button onClick={() => setShowJoinForm(true)} className="px-6 py-3 rounded-md bg-white text-blue-700">
                Join Partnership
              </button>
              <button className="px-6 py-3 rounded-md border border-white/30">Contact Sales</button>
            </div>
          </div>
        </section>

        <div className="h-8" />
      </main>

      <BrandingFooter />

      {showDemoForm && <DemoForm onClose={() => setShowDemoForm(false)} />}
      {showJoinForm && <JoinForm onClose={() => setShowJoinForm(false)} />}

      {submitted && (
        <div className="fixed bottom-6 right-6 bg-green-600 text-white px-4 py-2 rounded-md shadow">Request sent — we'll contact you soon.</div>
      )}
    </div>
  );
}

function FeatureCard({ title }: { title: string }) {
  return (
    <div className="rounded-lg bg-white p-4 shadow-sm flex items-start gap-3">
      <div className="h-12 w-12 rounded-md bg-blue-50 flex items-center justify-center text-blue-700 font-semibold">✓</div>
      <div>
        <div className="font-semibold">{title}</div>
        <div className="text-sm text-muted-foreground">Modern, reliable and easy to use.</div>
      </div>
    </div>
  );
}

function PricingCard({ title, price }: { title: string; price: string }) {
  return (
    <div className="rounded-lg border bg-white p-6 shadow-sm text-center">
      <div className="text-sm text-muted-foreground">{title}</div>
      <div className="mt-3 text-2xl font-bold">{price}</div>
      <div className="mt-4">
        <button className="px-4 py-2 rounded-md bg-blue-600 text-white">Choose</button>
      </div>
    </div>
  );
}

function Testimonial({ name, role }: { name: string; role: string }) {
  return (
    <div className="rounded-lg bg-white p-4 shadow-sm">
      <div className="text-sm italic">“A transformative platform — our attendance and fees are simpler than ever.”</div>
      <div className="mt-3 font-semibold">{name}</div>
      <div className="text-xs text-muted-foreground">{role}</div>
    </div>
  );
}
