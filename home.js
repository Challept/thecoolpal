import { useState } from 'react';
import { ChevronDown, ArrowRight, Star, Shield, Settings, Server, Menu, X, ArrowDown } from 'lucide-react';

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-blue-950 to-black text-white">
      {/* Header */}
      <nav className="fixed w-full z-50 bg-black/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-blue-400">WebStay</div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8">
              <a href="#" className="hover:text-blue-400 transition-colors">Hem</a>
              <a href="#" className="hover:text-blue-400 transition-colors">Funktioner</a>
              <a href="#" className="hover:text-blue-400 transition-colors">Priser</a>
              <a href="#" className="hover:text-blue-400 transition-colors">Kontakt</a>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden py-4 space-y-4">
              <a href="#" className="block hover:text-blue-400 transition-colors">Hem</a>
              <a href="#" className="block hover:text-blue-400 transition-colors">Funktioner</a>
              <a href="#" className="block hover:text-blue-400 transition-colors">Priser</a>
              <a href="#" className="block hover:text-blue-400 transition-colors">Kontakt</a>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative min-h-screen flex items-center justify-center text-white">
        <div className="absolute inset-0 bg-black/70 z-10"></div>
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/video1.mp4" type="video/mp4" />
        </video>
        
        <div className="relative z-20 text-center max-w-4xl mx-auto px-4">
          <h1 className="text-7xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
            Framtidens E-handel
          </h1>
          <p className="text-2xl mb-12 text-blue-100">
            Skapa din egen professionella webbshop med WebStay
          </p>
          <div className="space-x-6">
            <a 
              href="https://admin.webstay.se" 
              className="inline-block px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-all hover:scale-105 hover:shadow-lg hover:shadow-blue-500/20"
            >
              Admin Portal
            </a>
            <a 
              href="https://webstay.se/order" 
              className="inline-block px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg font-semibold transition-all hover:scale-105"
            >
              Beställ Nu
            </a>
          </div>
        </div>
        
        <ArrowDown 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-12 h-12 animate-bounce text-white z-20"
        />
      </header>

      {/* Tutorial Sections */}
      {[
        {
          title: "Hur skapar man en butik?",
          description: "Lär dig steg för steg hur du bygger upp din egen professionella webbshop med vårt enkla gränssnitt.",
          videoSrc: "/video2.mp4"
        },
        {
          title: "Hantera produkter och lager",
          description: "Se hur enkelt det är att lägga till produkter, hantera lager och kategorisera ditt sortiment.",
          videoSrc: "/video3.mp4"
        },
        {
          title: "Optimera för försäljning",
          description: "Upptäck våra kraftfulla verktyg för att öka din försäljning och nå fler kunder.",
          videoSrc: "/video4.mp4"
        }
      ].map((section, index) => (
        <section 
          key={index}
          className={`py-32 ${index % 2 === 0 ? 'bg-blue-950/30' : 'bg-black/50'}`}
        >
          <div className="max-w-6xl mx-auto px-4">
            <div className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${index % 2 === 0 ? '' : 'lg:flex-row-reverse'}`}>
              <div className="space-y-6">
                <h2 className="text-4xl font-bold text-blue-400">{section.title}</h2>
                <p className="text-xl text-blue-100">{section.description}</p>
                <button 
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition-all hover:scale-105"
                  onClick={() => setActiveSection(index)}
                >
                  Lär dig mer
                </button>
              </div>
              <div className="relative aspect-video rounded-xl overflow-hidden shadow-2xl shadow-blue-500/10">
                <video
                  className="absolute inset-0 w-full h-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                >
                  <source src={section.videoSrc} type="video/mp4" />
                </video>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Pricing Section */}
      <section className="py-32 bg-gradient-to-b from-blue-950/50 to-black">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-5xl font-bold text-center mb-16">
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
              Välj din plan
            </span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Start",
                desc: "Enkel och pålitlig",
                price: "299",
                monthly: "9",
                features: ["1 GB lagring", "5 produkter", "Grundläggande support"]
              },
              {
                title: "Premium",
                desc: "Mest valda paketet",
                price: "399",
                monthly: "49",
                features: ["5 GB lagring", "50 produkter", "Prioriterad support"]
              },
              {
                title: "Ultimate",
                desc: "Full kontroll och alla funktioner",
                price: "999",
                monthly: "99",
                features: ["20 GB lagring", "Obegränsat antal produkter", "24/7 support"]
              },
              {
                title: "Exclusive",
                desc: "Vi bygger din hemsida åt dig!",
                price: "1999",
                monthly: "199",
                features: ["100 GB lagring", "Skräddarsydd design", "Dedikerad projektledare"]
              }
            ].map((plan, index) => (
              <div
                key={plan.title}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-blue-400 to-purple-500 rounded-xl blur opacity-20 group-hover:opacity-30 transition-opacity"></div>
                <div className="relative bg-blue-950/50 rounded-xl p-8 backdrop-blur-sm hover:transform hover:scale-105 transition-all duration-300 h-full flex flex-col">
                  <h3 className="text-2xl font-bold text-blue-400 mb-2">{plan.title}</h3>
                  <p className="text-blue-200 mb-6">{plan.desc}</p>
                  <div className="text-white mb-6">
                    <span className="text-4xl font-bold">{plan.price} kr</span>
                    <span className="text-blue-200"> engångsavgift</span>
                    <br />
                    <span className="text-2xl">+{plan.monthly} kr</span>
                    <span className="text-blue-200">/månad</span>
                  </div>
                  <ul className="space-y-3 mb-8 text-blue-100">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center">
                        <Star className="w-5 h-5 text-blue-400 mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <button className="mt-auto w-full py-4 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-all">
                    Välj Plan <ArrowRight className="inline ml-2" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-32 bg-black/50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              { icon: Star, title: "Toppkvalitet", desc: "Professionell design och funktionalitet i världsklass" },
              { icon: Shield, title: "Säkerhet", desc: "Fullständigt skydd för din och dina kunders data" },
              { icon: Settings, title: "Support", desc: "Experthjälp tillgänglig dygnet runt" },
              { icon: Server, title: "Prestanda", desc: "Blixtsnabba servrar för optimal upplevelse" }
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="text-center group">
                <div className="relative">
                  <div className="absolute inset-0 bg-blue-400 blur-xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
                  <Icon className="w-16 h-16 mx-auto mb-6 text-blue-400 group-hover:scale-110 transition-transform" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-blue-400">{title}</h3>
                <p className="text-blue-200">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
