import React from "react";
import { Globe, Menu, User, Search } from "lucide-react";

/* ---------------- DATA ---------------- */

const listings = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
    title: "Luxury Stay",
    description: "Entire villa in Goa",
    price: "₹3,200",
    rating: 4.9,
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=800&q=80",
    title: "Beach Villa",
    description: "Private beach access",
    price: "₹5,500",
    rating: 4.8,
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80",
    title: "City Apartment",
    description: "Heart of Mumbai",
    price: "₹2,100",
    rating: 4.5,
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=800&q=80",
    title: "Forest Cabin",
    description: "Secluded getaway",
    price: "₹4,200",
    rating: 4.95
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=800&q=80",
    title: "Modern Loft",
    description: "Artist studio",
    price: "₹3,800",
    rating: 4.7
  },
];

/* ---------------- HEADER ---------------- */

const Header = () => (
  <header className="sticky top-0 z-50 bg-white border-b px-6 py-4 flex justify-between items-center">
    <span className="text-[#ff385c] text-2xl font-bold">airbnb</span>

    <div className="hidden md:flex items-center border rounded-full px-4 py-2 shadow-sm hover:shadow-md transition">
      <span className="px-3 border-r text-sm font-medium">Anywhere</span>
      <span className="px-3 border-r text-sm font-medium">Any week</span>
      <span className="px-3 text-gray-500 text-sm">Add guests</span>
      <div className="bg-[#ff385c] p-2 rounded-full text-white ml-2">
        <Search size={14} />
      </div>
    </div>

    <div className="flex items-center gap-3">
      <span className="hidden sm:block text-sm font-medium hover:bg-gray-100 px-4 py-2 rounded-full cursor-pointer">
        Airbnb your home
      </span>
      <div className="hover:bg-gray-100 p-2 rounded-full cursor-pointer transition-colors">
        <Globe size={18} />
      </div>
      <div className="flex items-center gap-2 border rounded-full px-3 py-1 hover:shadow-md cursor-pointer ml-1">
        <Menu size={18} />
        <div className="bg-gray-500 text-white rounded-full p-1">
          <User size={18} fill="white" />
        </div>
      </div>
    </div>
  </header>
);

/* ---------------- CARD ---------------- */

const Card = ({ image, title, description, price, rating }) => (
  <div className="w-[280px] flex-shrink-0 cursor-pointer transition-transform hover:-translate-y-2 duration-300">
    <div className="relative overflow-hidden rounded-xl h-64 bg-gray-200">
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover hover:scale-105 transition duration-500"
      />
       <div className="absolute top-3 right-3">
          <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style={{display: 'block', fill: 'rgba(0, 0, 0, 0.5)', height: '24px', width: '24px', stroke: 'white', strokeWidth: 2, overflow: 'visible'}}>
            <path d="m16 28c7-4.733 14-10 14-17 0-1.792-.683-3.583-2.05-4.95-1.367-1.366-3.158-2.05-4.95-2.05-1.791 0-3.583.684-4.949 2.05l-2.051 2.051-2.05-2.051c-1.367-1.366-3.158-2.05-4.95-2.05-1.791 0-3.583.684-4.949 2.05-1.367 1.367-2.051 3.158-2.051 4.95 0 7 7 12.267 14 17z"></path>
          </svg>
        </div>
    </div>

    <div className="flex justify-between mt-2 items-start">
      <h4 className="font-semibold text-gray-900">{title}</h4>
      <div className="flex items-center gap-1 text-sm">
        <span>★</span> {rating}
      </div>
    </div>
    <p className="text-gray-500 text-sm">{description}</p>
    <div className="mt-1 flex items-baseline gap-1">
      <span className="font-semibold text-gray-900">{price}</span>
      <span className="text-gray-900 text-sm">night</span>
    </div>
  </div>
);

/* ---------------- SECTION ---------------- */

const Section = ({ title, items }) => (
  <section className="py-8 px-6 sm:px-10 border-b border-gray-100 last:border-0">
    <h2 className="text-2xl font-semibold mb-6 text-gray-900">{title}</h2>
    <div className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide -mx-6 px-6 sm:mx-0 sm:px-0">
      {items.map((item) => (
        <Card key={item.id} {...item} />
      ))}
      {items.map((item, i) => (
        <Card key={`dup-${i}`} {...item} />
      ))}
    </div>
  </section>
);

/* ---------------- FOOTER ---------------- */

const Footer = () => (
  <footer className="bg-[#f7f7f7] border-t mt-16 px-6 py-12 text-sm text-gray-700">
    <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">

      <div>
        <h4 className="font-semibold mb-4 text-gray-900">Support</h4>
        {["Help Centre","AirCover","Anti-discrimination","Disability support","Cancellation options"].map(item=>(
          <p key={item} className="hover:underline cursor-pointer mb-3 text-gray-600">{item}</p>
        ))}
      </div>

      <div>
        <h4 className="font-semibold mb-4 text-gray-900">Hosting</h4>
        {["Airbnb your home","AirCover for Hosts","Hosting resources","Community forum"].map(item=>(
          <p key={item} className="hover:underline cursor-pointer mb-3 text-gray-600">{item}</p>
        ))}
      </div>

      <div>
        <h4 className="font-semibold mb-4 text-gray-900">Airbnb</h4>
        {["Newsroom","Careers","Investors","Emergency stays"].map(item=>(
          <p key={item} className="hover:underline cursor-pointer mb-3 text-gray-600">{item}</p>
        ))}
      </div>

      <div>
        <h4 className="font-semibold mb-4 text-gray-900">Inspiration</h4>
        {["Nashville","Kyoto","Brooklyn","Maui","San Diego"].map(item=>(
          <p key={item} className="hover:underline cursor-pointer mb-3 text-gray-600">{item}</p>
        ))}
      </div>
    </div>

    <div className="max-w-7xl mx-auto border-t border-gray-200 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
      <div className="flex gap-2">
         <p>© 2025 Airbnb, Inc</p>
         <span>·</span>
         <a href="#" className="hover:underline">Privacy</a>
         <span>·</span>
         <a href="#" className="hover:underline">Terms</a>
      </div>
      <div className="flex items-center gap-6 font-medium text-gray-900">
        <div className="flex items-center gap-2 cursor-pointer hover:underline">
             <Globe size={16} />
            <span>English (IN)</span>
        </div>
        <div className="cursor-pointer hover:underline">
             <span>₹ INR</span>
        </div>
      </div>
    </div>
  </footer>
);

/* ---------------- APP ---------------- */

export default function App() {
  return (
    <div className="font-sans min-h-screen text-gray-900">
      <Header />
      <main className="max-w-[1600px] mx-auto">
        <Section title="Popular homes" items={listings} />
        <Section title="Trending stays" items={listings} />
        <Section title="Top rated" items={listings} />
      </main>
      <Footer />
    </div>
  );
}