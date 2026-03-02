import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Home,
  ChevronRight,
  ChevronDown,
  Shield,
  Heart,
  Users,
  Accessibility,
  Calendar,
  BookOpen,
  MessageCircle,
  Newspaper,
  Briefcase,
  TrendingUp,
  AlertTriangle,
  Lock,
  FileText,
} from "lucide-react";

/* ─── Shared helpers ─── */
function Breadcrumbs({ title }) {
  return (
    <nav className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-6 flex-wrap">
      <Link to="/" className="flex items-center gap-1 hover:text-[#ff385c] transition-colors">
        <Home size={14} /> Home
      </Link>
      <ChevronRight size={14} />
      <span className="text-gray-900 dark:text-gray-100 font-medium">{title}</span>
    </nav>
  );
}

function PageShell({ title, icon: Icon, children }) {
  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <Breadcrumbs title={title} />
      <div className="flex items-center gap-3 mb-6">
        {Icon && <Icon size={28} className="text-[#ff385c]" />}
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">{title}</h1>
      </div>
      {children}
    </main>
  );
}

function Paragraph({ children }) {
  return <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">{children}</p>;
}

function SectionHeading({ children }) {
  return <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mt-8 mb-3">{children}</h2>;
}

function Card({ title, children }) {
  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-5 mb-4 bg-white dark:bg-gray-900">
      {title && <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">{title}</h3>}
      <div className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{children}</div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   1. HelpCentre
   ═══════════════════════════════════════════════════════════════ */
const faqs = [
  {
    q: "How do I book a property?",
    a: "Browse listings, select your dates and number of guests, then click 'Reserve'. You'll be guided through the payment process to confirm your booking.",
  },
  {
    q: "What is the cancellation policy?",
    a: "Cancellation policies vary by listing. Each property displays its policy (Flexible, Moderate, or Strict) on the listing page. Check before booking for specific refund timelines.",
  },
  {
    q: "What payment methods are accepted?",
    a: "We accept major credit and debit cards (Visa, Mastercard, Amex), UPI, net banking, and select digital wallets. All transactions are securely processed.",
  },
  {
    q: "How do I contact support?",
    a: "Visit the Help Centre and click 'Contact Us', or reach out via the in-app messaging feature. Our support team is available 24/7 for urgent issues.",
  },
  {
    q: "How do I update my account settings?",
    a: "Go to your Profile page, then click 'Account Settings'. From there you can update your personal information, notification preferences, and payment methods.",
  },
  {
    q: "What safety guidelines should I follow?",
    a: "Always communicate through the platform, verify host/guest identities, read reviews before booking, and familiarise yourself with the property's house rules and emergency exits.",
  },
];

export function HelpCentre() {
  const [open, setOpen] = useState(null);

  return (
    <PageShell title="Help Centre" icon={BookOpen}>
      <Paragraph>
        Find answers to common questions below. If you need further assistance, our support team is here to help around the clock.
      </Paragraph>
      <div className="space-y-3 mt-6">
        {faqs.map((faq, i) => (
          <div
            key={i}
            className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden bg-white dark:bg-gray-900"
          >
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full flex items-center justify-between px-5 py-4 text-left font-medium text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer"
            >
              {faq.q}
              <ChevronDown
                size={18}
                className={`shrink-0 transition-transform ${open === i ? "rotate-180" : ""}`}
              />
            </button>
            {open === i && (
              <div className="px-5 pb-4 text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </PageShell>
  );
}

/* ═══════════════════════════════════════════════════════════════
   2. AirCover
   ═══════════════════════════════════════════════════════════════ */
const airCoverFeatures = [
  { title: "Booking Protection Guarantee", desc: "If a host cancels within 30 days of check-in, we'll find you a similar or better home, or we'll refund you." },
  { title: "Check-In Guarantee", desc: "If you can't check in and the host can't resolve the issue, we'll find you a similar or better home for the length of your stay, or we'll refund you." },
  { title: "Get-What-You-Booked Guarantee", desc: "If at any time during your stay you find your listing isn't as advertised, you'll have three days to report it and we'll find a similar or better home, or we'll refund you." },
  { title: "24-Hour Safety Line", desc: "If you ever feel unsafe, you'll get priority access to specially trained safety agents, day or night." },
];

export function AirCover() {
  return (
    <PageShell title="AirCover" icon={Shield}>
      <Paragraph>
        AirCover is comprehensive protection included for free with every booking. It's the most comprehensive protection in travel — only on Airbnb.
      </Paragraph>
      <div className="grid gap-4 sm:grid-cols-2 mt-6">
        {airCoverFeatures.map((f, i) => (
          <Card key={i} title={f.title}>{f.desc}</Card>
        ))}
      </div>
    </PageShell>
  );
}

/* ═══════════════════════════════════════════════════════════════
   3. AntiDiscrimination
   ═══════════════════════════════════════════════════════════════ */
export function AntiDiscrimination() {
  return (
    <PageShell title="Anti-Discrimination Policy" icon={Heart}>
      <Paragraph>
        Airbnb is built on the foundation of inclusion and belonging. We are committed to ensuring that our platform is free from discrimination of any kind.
      </Paragraph>
      <SectionHeading>Our Commitment</SectionHeading>
      <Paragraph>
        We do not tolerate discrimination based on race, colour, ethnicity, national origin, religion, sexual orientation, gender identity, marital status, disability, or age. All community members — guests and hosts — must treat each other with respect and without judgement.
      </Paragraph>
      <SectionHeading>Reporting Discrimination</SectionHeading>
      <Paragraph>
        If you experience or witness discrimination on our platform, please report it immediately through the Help Centre. We investigate every report thoroughly and take swift action, including removal from the platform for policy violations.
      </Paragraph>
      <SectionHeading>Community Pledge</SectionHeading>
      <Paragraph>
        All users agree to our Community Commitment, pledging to treat everyone with respect regardless of background. Together, we can build a world where anyone can belong anywhere.
      </Paragraph>
    </PageShell>
  );
}

/* ═══════════════════════════════════════════════════════════════
   4. DisabilitySupport
   ═══════════════════════════════════════════════════════════════ */
export function DisabilitySupport() {
  return (
    <PageShell title="Disability Support" icon={Accessibility}>
      <Paragraph>
        We are dedicated to making travel accessible for everyone. Our accessibility features and support resources help guests with disabilities find and enjoy their perfect stay.
      </Paragraph>
      <SectionHeading>Accessibility Filters</SectionHeading>
      <Paragraph>
        Use our search filters to find properties with step-free access, wide doorways, accessible bathrooms, roll-in showers, and other accessibility features that meet your needs.
      </Paragraph>
      <SectionHeading>Adapted Properties</SectionHeading>
      <Paragraph>
        Many of our hosts offer fully adapted properties designed with accessibility in mind. Look for the accessibility badge on listings for verified accessible accommodations.
      </Paragraph>
      <SectionHeading>Dedicated Support</SectionHeading>
      <Paragraph>
        Our specialised accessibility support team is available to assist you with finding the right accommodation and addressing any accessibility concerns during your trip. Contact us anytime through the Help Centre.
      </Paragraph>
    </PageShell>
  );
}

/* ═══════════════════════════════════════════════════════════════
   5. CancellationOptions
   ═══════════════════════════════════════════════════════════════ */
const policies = [
  {
    name: "Flexible",
    colour: "border-green-400 dark:border-green-600",
    details: "Full refund if cancelled at least 24 hours before check-in. After that, the first night is non-refundable but 50% of remaining nights are refunded.",
  },
  {
    name: "Moderate",
    colour: "border-yellow-400 dark:border-yellow-600",
    details: "Full refund if cancelled at least 5 days before check-in. After that, 50% refund of the nightly rate for remaining nights.",
  },
  {
    name: "Strict",
    colour: "border-red-400 dark:border-red-600",
    details: "50% refund if cancelled at least 7 days before check-in. No refund if cancelled within 7 days of check-in.",
  },
];

export function CancellationOptions() {
  return (
    <PageShell title="Cancellation Options" icon={Calendar}>
      <Paragraph>
        We offer different cancellation policies so you can book with confidence. Each listing specifies which policy applies — check before you book.
      </Paragraph>
      <div className="space-y-4 mt-6">
        {policies.map((p) => (
          <div key={p.name} className={`border-l-4 ${p.colour} rounded-xl border border-gray-200 dark:border-gray-700 p-5 bg-white dark:bg-gray-900`}>
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">{p.name}</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">{p.details}</p>
          </div>
        ))}
      </div>
    </PageShell>
  );
}

/* ═══════════════════════════════════════════════════════════════
   6. AirCoverHosts
   ═══════════════════════════════════════════════════════════════ */
const hostCoverFeatures = [
  { title: "Host Damage Protection", desc: "Up to ₹25,00,000 in coverage for damage to your property and belongings caused by guests." },
  { title: "Host Liability Insurance", desc: "Up to ₹8,00,00,000 in coverage if a guest is injured or their belongings are damaged during a stay." },
  { title: "Pet Damage Protection", desc: "Coverage for damage caused by guests' pets, so you can welcome furry friends with confidence." },
  { title: "Deep Cleaning Protection", desc: "Reimbursement for extra cleaning costs if a guest leaves your place in need of deep cleaning beyond normal wear." },
  { title: "Income Loss Protection", desc: "Compensation for lost income if you need to cancel confirmed bookings due to covered guest damage." },
];

export function AirCoverHosts() {
  return (
    <PageShell title="AirCover for Hosts" icon={Shield}>
      <Paragraph>
        AirCover for Hosts provides top-to-bottom protection every time you host on Airbnb — always included, always free.
      </Paragraph>
      <div className="grid gap-4 sm:grid-cols-2 mt-6">
        {hostCoverFeatures.map((f, i) => (
          <Card key={i} title={f.title}>{f.desc}</Card>
        ))}
      </div>
    </PageShell>
  );
}

/* ═══════════════════════════════════════════════════════════════
   7. HostingResources
   ═══════════════════════════════════════════════════════════════ */
const resources = [
  { title: "Getting Started Guide", desc: "Everything you need to know to set up and publish your first listing." },
  { title: "Pricing Tips", desc: "Learn how to set competitive prices using Smart Pricing and market insights." },
  { title: "Photography Guide", desc: "Tips for taking beautiful photos that attract more guests to your listing." },
  { title: "Guest Communication", desc: "Best practices for messaging guests before, during, and after their stay." },
  { title: "Superhost Programme", desc: "Learn how to earn and maintain Superhost status for increased visibility and earnings." },
  { title: "Local Regulations", desc: "Understand the laws and regulations for short-term rentals in your area." },
];

export function HostingResources() {
  return (
    <PageShell title="Hosting Resources" icon={BookOpen}>
      <Paragraph>
        Whether you're a new host or a seasoned pro, these resources will help you provide exceptional experiences and grow your hosting business.
      </Paragraph>
      <div className="grid gap-4 sm:grid-cols-2 mt-6">
        {resources.map((r, i) => (
          <Card key={i} title={r.title}>{r.desc}</Card>
        ))}
      </div>
    </PageShell>
  );
}

/* ═══════════════════════════════════════════════════════════════
   8. CommunityForum
   ═══════════════════════════════════════════════════════════════ */
const forumTopics = [
  { title: "New Host Q&A", replies: 234, desc: "Ask questions and get advice from experienced hosts." },
  { title: "Tips for Five-Star Reviews", replies: 189, desc: "Share strategies for delivering amazing guest experiences." },
  { title: "Navigating Local Regulations", replies: 156, desc: "Discuss short-term rental laws in your area." },
  { title: "Design & Decor Inspiration", replies: 312, desc: "Show off your space and get styling ideas from the community." },
];

export function CommunityForum() {
  return (
    <PageShell title="Community Forum" icon={MessageCircle}>
      <Paragraph>
        Connect with hosts and guests around the world. Share experiences, ask questions, and learn from our vibrant community.
      </Paragraph>
      <div className="space-y-4 mt-6">
        {forumTopics.map((t, i) => (
          <div
            key={i}
            className="border border-gray-200 dark:border-gray-700 rounded-xl p-5 bg-white dark:bg-gray-900 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100">{t.title}</h3>
              <span className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 px-2 py-1 rounded-full">
                {t.replies} replies
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm">{t.desc}</p>
          </div>
        ))}
      </div>
    </PageShell>
  );
}

/* ═══════════════════════════════════════════════════════════════
   9. Newsroom
   ═══════════════════════════════════════════════════════════════ */
const newsItems = [
  { date: "June 10, 2025", title: "Airbnb Launches Enhanced AirCover", summary: "New protections for hosts and guests include expanded damage coverage and faster claims processing." },
  { date: "May 22, 2025", title: "Summer Travel Trends 2025", summary: "Data shows a 40% increase in rural bookings as travellers seek nature-immersive experiences this summer." },
  { date: "April 15, 2025", title: "Introducing Airbnb Rooms", summary: "A new category making it easier to find affordable private rooms, plus enhanced filters for budget-conscious travellers." },
  { date: "March 1, 2025", title: "Community Fund: ₹50 Crore for Local Tourism", summary: "Airbnb pledges ₹50 crore to support sustainable tourism initiatives in underserved communities across India." },
];

export function Newsroom() {
  return (
    <PageShell title="Newsroom" icon={Newspaper}>
      <Paragraph>
        Stay up to date with the latest Airbnb news, product announcements, and company updates.
      </Paragraph>
      <div className="space-y-4 mt-6">
        {newsItems.map((n, i) => (
          <div key={i} className="border border-gray-200 dark:border-gray-700 rounded-xl p-5 bg-white dark:bg-gray-900">
            <span className="text-xs text-[#ff385c] font-medium">{n.date}</span>
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 mt-1 mb-1">{n.title}</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">{n.summary}</p>
          </div>
        ))}
      </div>
    </PageShell>
  );
}

/* ═══════════════════════════════════════════════════════════════
   10. Careers
   ═══════════════════════════════════════════════════════════════ */
const jobs = [
  { role: "Senior Frontend Engineer", team: "Web Platform", location: "Bengaluru, India", type: "Full-time" },
  { role: "Product Designer", team: "Host Experience", location: "Remote — India", type: "Full-time" },
  { role: "Data Scientist", team: "Trust & Safety", location: "Gurugram, India", type: "Full-time" },
  { role: "Community Operations Lead", team: "Community Support", location: "Mumbai, India", type: "Full-time" },
  { role: "Marketing Manager", team: "Growth", location: "Remote — India", type: "Contract" },
];

export function Careers() {
  return (
    <PageShell title="Careers" icon={Briefcase}>
      <Paragraph>
        Join us in creating a world where anyone can belong anywhere. We're looking for talented people who share our passion for travel and community.
      </Paragraph>
      <div className="space-y-4 mt-6">
        {jobs.map((j, i) => (
          <div key={i} className="border border-gray-200 dark:border-gray-700 rounded-xl p-5 bg-white dark:bg-gray-900 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-gray-100">{j.role}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">{j.team} · {j.location}</p>
            </div>
            <span className="text-xs bg-[#ff385c]/10 text-[#ff385c] font-medium px-3 py-1 rounded-full w-fit">{j.type}</span>
          </div>
        ))}
      </div>
    </PageShell>
  );
}

/* ═══════════════════════════════════════════════════════════════
   11. Investors
   ═══════════════════════════════════════════════════════════════ */
export function Investors() {
  return (
    <PageShell title="Investors" icon={TrendingUp}>
      <Paragraph>
        Airbnb connects millions of hosts and travellers across 220+ countries and regions. Here you'll find key financial information and company updates for investors.
      </Paragraph>
      <SectionHeading>Key Metrics (FY 2024)</SectionHeading>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
        {[
          { label: "Revenue", value: "$10.8B" },
          { label: "Nights Booked", value: "500M+" },
          { label: "Active Listings", value: "7.7M" },
          { label: "Countries", value: "220+" },
        ].map((m) => (
          <div key={m.label} className="text-center border border-gray-200 dark:border-gray-700 rounded-xl p-4 bg-white dark:bg-gray-900">
            <p className="text-2xl font-bold text-[#ff385c]">{m.value}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{m.label}</p>
          </div>
        ))}
      </div>
      <SectionHeading>Shareholder Resources</SectionHeading>
      <Paragraph>
        Access annual reports, SEC filings, earnings call transcripts, and stock information through our investor relations portal. Quarterly earnings updates are published within 30 days of quarter end.
      </Paragraph>
    </PageShell>
  );
}

/* ═══════════════════════════════════════════════════════════════
   12. EmergencyStays
   ═══════════════════════════════════════════════════════════════ */
export function EmergencyStays() {
  return (
    <PageShell title="Emergency Stays" icon={AlertTriangle}>
      <Paragraph>
        In times of crisis, Airbnb works with hosts to provide emergency accommodation for displaced individuals, relief workers, and refugees.
      </Paragraph>
      <SectionHeading>How It Works</SectionHeading>
      <Paragraph>
        When a disaster strikes, our Open Homes programme activates. Hosts can offer their spaces for free or at reduced rates to those in need, while Airbnb waives all service fees for emergency bookings.
      </Paragraph>
      <SectionHeading>For Displaced Individuals</SectionHeading>
      <Paragraph>
        If you've been affected by a natural disaster or emergency, visit our emergency portal or contact support for immediate assistance with temporary housing.
      </Paragraph>
      <SectionHeading>For Hosts Who Want to Help</SectionHeading>
      <Paragraph>
        You can opt in to the Open Homes programme from your hosting dashboard. When emergencies occur in your area, you'll be notified and can choose to offer your space to those in need.
      </Paragraph>
    </PageShell>
  );
}

/* ═══════════════════════════════════════════════════════════════
   13. Privacy
   ═══════════════════════════════════════════════════════════════ */
export function Privacy() {
  return (
    <PageShell title="Privacy Policy" icon={Lock}>
      <Paragraph>
        Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your personal information when you use Airbnb.
      </Paragraph>
      <SectionHeading>Information We Collect</SectionHeading>
      <Paragraph>
        We collect information you provide directly (name, email, phone number, payment details) as well as usage data (search history, booking activity, device information) to improve your experience.
      </Paragraph>
      <SectionHeading>How We Use Your Information</SectionHeading>
      <Paragraph>
        Your information helps us process bookings, personalise recommendations, ensure platform safety, communicate important updates, and comply with legal obligations.
      </Paragraph>
      <SectionHeading>Data Sharing</SectionHeading>
      <Paragraph>
        We share necessary information with hosts/guests to facilitate bookings, with payment processors, and with legal authorities when required. We never sell your personal data to third-party advertisers.
      </Paragraph>
      <SectionHeading>Your Rights</SectionHeading>
      <Paragraph>
        You can access, correct, or delete your personal information at any time through your account settings. You may also request a copy of your data or opt out of marketing communications.
      </Paragraph>
    </PageShell>
  );
}

/* ═══════════════════════════════════════════════════════════════
   14. Terms
   ═══════════════════════════════════════════════════════════════ */
export function Terms() {
  return (
    <PageShell title="Terms of Service" icon={FileText}>
      <Paragraph>
        By using Airbnb, you agree to these Terms of Service. Please read them carefully before creating an account or making a booking.
      </Paragraph>
      <SectionHeading>Account Registration</SectionHeading>
      <Paragraph>
        You must be at least 18 years old to create an account. You are responsible for maintaining the security of your account credentials and for all activities that occur under your account.
      </Paragraph>
      <SectionHeading>Bookings & Payments</SectionHeading>
      <Paragraph>
        When you book a stay, you enter into a contract with the host. Airbnb facilitates the transaction and collects service fees. Payment is processed at the time of booking and released to hosts 24 hours after check-in.
      </Paragraph>
      <SectionHeading>Host Responsibilities</SectionHeading>
      <Paragraph>
        Hosts must provide accurate listing information, maintain safe and clean properties, comply with local laws and regulations, and honour confirmed reservations.
      </Paragraph>
      <SectionHeading>Prohibited Activities</SectionHeading>
      <Paragraph>
        Users may not engage in fraud, discrimination, harassment, property damage, or any activity that violates local laws. Violations may result in account suspension or permanent removal from the platform.
      </Paragraph>
      <SectionHeading>Limitation of Liability</SectionHeading>
      <Paragraph>
        Airbnb acts as a platform connecting hosts and guests. We are not liable for the condition of listings, actions of users, or any disputes arising between parties, except as covered by AirCover protections.
      </Paragraph>
    </PageShell>
  );
}
