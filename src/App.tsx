/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useMemo, useRef } from 'react';
import { 
  Menu as MenuIcon, 
  X, 
  ShoppingCart, 
  MapPin, 
  Clock, 
  Phone, 
  ChevronRight, 
  ChevronLeft, 
  Star, 
  ArrowRight,
  Info,
  CheckCircle2,
  TrendingUp,
  Award,
  Users,
  Flame,
  ArrowUp,
  Search,
  ChevronDown
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { LOCATIONS, MENU_ITEMS, DEALS, REVIEWS } from './data';

// --- Types ---
interface MenuItem {
  id: string;
  name: string;
  price: number;
  category: string;
  description: string;
  image: string;
}

interface CartItem extends MenuItem {
  quantity: number;
}

interface Location {
  id: number;
  name: string;
  address: string;
  phone: string;
  lat: number;
  lng: number;
  hours: string;
  startHour: number;
  endHour: number;
  dineIn: boolean;
  driveThru: boolean;
  delivery: boolean;
}

// --- Components ---

const Button = ({ 
  children, 
  variant = 'primary', 
  className = '', 
  onClick, 
  disabled = false,
  type = 'button'
}: any) => {
  const baseClass = "btn-popeyes";
  const variants: any = {
    primary: "btn-primary",
    outline: "btn-outline",
    ghost: "text-popeyes-orange hover:bg-popeyes-orange/10 px-4 py-2"
  };

  return (
    <button 
      type={type}
      onClick={onClick} 
      disabled={disabled}
      className={`${baseClass} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

const Section = ({ children, id, className = "" }: any) => (
  <section id={id} className={`w-full ${className}`}>
    <div className="section-padding">
      {children}
    </div>
  </section>
);

const Badge = ({ children, className = "" }: any) => (
  <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${className}`}>
    {children}
  </span>
);

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [cateringSubmitted, setCateringSubmitted] = useState(false);
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);
  const [activeReviewIndex, setActiveReviewIndex] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);

  // --- Effects ---
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveReviewIndex((prev) => (prev + 1) % REVIEWS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // --- Helpers ---
  const addToCart = (item: MenuItem | any) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
    if (cart.length === 0) setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart((prev) => {
      return prev.map((item) => {
        if (item.id === id) {
          const newQty = Math.max(1, item.quantity + delta);
          return { ...item, quantity: newQty };
        }
        return item;
      });
    });
  };

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const tax = subtotal * 0.085;
  const total = subtotal + tax;

  const filteredMenu = activeCategory === 'All' 
    ? MENU_ITEMS 
    : MENU_ITEMS.filter(item => item.category === activeCategory);

  const filteredLocations = LOCATIONS.filter(loc => 
    loc.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    loc.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const isOpen = (loc: Location) => {
    const hour = currentTime.getHours();
    return hour >= loc.startHour && hour < loc.endHour;
  };

  const getTimeRemaining = () => {
    const now = new Date();
    const midnight = new Date();
    midnight.setHours(24, 0, 0, 0);
    const diff = midnight.getTime() - now.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setIsMobileMenuOpen(false);
  };

  // --- Render Functions ---
  return (
    <div className="relative min-h-screen">
      {/* 1. STICKY NAVIGATION BAR */}
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b ${isScrolled ? 'bg-popeyes-black shadow-lg py-2 border-white/10' : 'bg-transparent py-4 border-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-10 h-10 bg-popeyes-orange rounded-full flex items-center justify-center text-white font-display text-2xl font-bold border-2 border-white/20 shadow-sm">P</div>
            <span className="font-display text-2xl font-bold tracking-tight text-popeyes-orange">POPEYES</span>
          </div>

          {/* Nav Links - Desktop */}
          <div className="hidden md:flex items-center gap-8 font-display text-sm font-semibold uppercase tracking-widest text-white/70">
            {['Menu', 'Locations', 'Deals', 'Catering', 'Story'].map((link) => (
              <button 
                key={link} 
                className="hover:text-popeyes-orange transition-colors relative group"
                onClick={() => scrollToSection(link.toLowerCase())}
              >
                {link}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-popeyes-orange transition-all group-hover:w-full"></span>
              </button>
            ))}
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            <button 
              className={`relative p-2 rounded-full transition-colors ${isScrolled ? 'text-popeyes-black hover:bg-gray-100' : 'text-white hover:bg-white/10'}`}
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingCart size={24} />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">
                  {cart.reduce((a, b) => a + b.quantity, 0)}
                </span>
              )}
            </button>
            <Button className="hidden md:block" onClick={() => scrollToSection('menu')}>Order Now</Button>
            <button 
              className={`md:hidden p-2 ${isScrolled ? 'text-popeyes-black' : 'text-white'}`}
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <MenuIcon size={28} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[60] bg-popeyes-orange text-white p-8"
          >
            <button className="absolute top-6 right-6 p-2" onClick={() => setIsMobileMenuOpen(false)}>
              <X size={32} />
            </button>
            <div className="flex flex-col gap-8 mt-16 font-display text-4xl uppercase">
              {['Menu', 'Locations', 'Deals', 'Catering', 'Story'].map((link) => (
                <button key={link} onClick={() => scrollToSection(link.toLowerCase())} className="text-left hover:translate-x-4 transition-transform">
                  {link}
                </button>
              ))}
              <Button variant="outline" className="text-white border-white hover:bg-white hover:text-popeyes-orange mt-8" onClick={() => scrollToSection('menu')}>Order Now</Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. HERO SECTION */}
      <section className="relative h-screen flex items-center bg-popeyes-black overflow-hidden pt-20">
        {/* Dynamic Background */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute -left-20 top-20 w-80 h-[120%] bg-popeyes-orange rotate-12 transform blur-[80px]"></div>
        </div>
        
        {/* Spice particles */}
        {[...Array(12)].map((_, i) => (
          <div 
            key={i}
            className="spice-particle"
            style={{ 
              left: `${Math.random() * 100}%`, 
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              transform: `scale(${0.5 + Math.random()})`
            }}
          />
        ))}

        <div className="section-padding grid md:grid-cols-2 gap-12 items-center relative z-10 w-full">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-popeyes-orange font-display uppercase tracking-[0.3em] font-bold text-lg mb-4 block">Est. 1972</span>
            <h1 className="text-white text-7xl md:text-9xl leading-[0.85] mb-6 uppercase">
              Louisiana <br />
              <span className="text-popeyes-orange">Fast.</span> <br /> Good.
            </h1>
            <p className="text-white/60 text-lg md:text-xl max-w-md mb-10 leading-relaxed font-medium">
              Bold flavors. Real recipes. Straight from the bayou. Experience the crunch that conquered the world.
            </p>
            <div className="flex flex-wrap gap-4 mb-12">
              <Button onClick={() => scrollToSection('menu')} className="px-10 py-5">Start Your Order</Button>
              <Button variant="outline" onClick={() => scrollToSection('menu')} className="px-10 py-5">View Menu</Button>
            </div>
            
            {/* Trust Stats Integrated */}
            <div className="grid grid-cols-2 gap-8 border-t border-white/10 pt-8 max-w-sm">
              <div className="flex flex-col">
                <span className="text-4xl font-display font-bold">3,700+</span>
                <span className="text-[10px] text-white/40 uppercase tracking-[0.2em] font-bold">Locations Worldwide</span>
              </div>
              <div className="flex flex-col">
                <span className="text-4xl font-display font-bold text-popeyes-orange">4.7 ★</span>
                <span className="text-[10px] text-white/40 uppercase tracking-[0.2em] font-bold">Customer Rating</span>
              </div>
            </div>
          </motion.div>

          {/* CSS Illustrated Chicken Sandwich */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="hidden md:flex justify-center relative"
          >
            <div className="relative w-96 h-96">
              {/* Bun Top */}
              <div className="absolute top-10 left-1/2 -translate-x-1/2 w-80 h-32 bg-[#D9A066] rounded-[50%_50%_10%_10%] shadow-inner border-b-4 border-[#B07B4D]" />
              {/* Seeds */}
              {[...Array(15)].map((_, i) => (
                <div 
                  key={i} 
                  className="absolute w-2 h-1 bg-[#FFF8CC] rounded-full" 
                  style={{ top: 20 + Math.random() * 10, left: 100 + Math.random() * 180 }} 
                />
              ))}
              {/* Chicken */}
              <div className="absolute top-28 left-1/2 -translate-x-1/2 w-84 h-36 bg-[#8B4513] rounded-3xl border-4 border-[#5D2E0B] shadow-2xl flex items-center justify-center">
                <div className="w-full h-full bg-[radial-gradient(circle_at_30%_30%,#C0501A_0%,transparent_70%)] opacity-40 rounded-3xl" />
              </div>
              {/* Pickles */}
              <div className="absolute top-36 left-20 w-16 h-16 bg-[#4A6D26] rounded-full border-2 border-[#2D4517] rotate-[-20deg]" />
              <div className="absolute top-40 left-40 w-16 h-16 bg-[#4A6D26] rounded-full border-2 border-[#2D4517] rotate-[10deg]" />
              <div className="absolute top-36 left-60 w-16 h-16 bg-[#4A6D26] rounded-full border-2 border-[#2D4517] rotate-[25deg]" />
              {/* Bun Bottom */}
              <div className="absolute top-52 left-1/2 -translate-x-1/2 w-80 h-16 bg-[#D9A066] rounded-[10%_10%_50%_50%] border-t-2 border-[#B07B4D]" />
              
              {/* Steam Lines */}
              {[...Array(3)].map((_, i) => (
                <motion.div 
                  key={i}
                  animate={{ y: [-20, -60], opacity: [0, 0.5, 0] }}
                  transition={{ repeat: Infinity, duration: 2, delay: i * 0.6 }}
                  className="absolute top-0 bg-white/20 w-1 h-12 rounded-full blur-sm"
                  style={{ left: 140 + i * 50 }}
                />
              ))}
            </div>
            
            {/* Glowing Ring */}
            <div className="absolute inset-0 bg-popeyes-orange/20 blur-[100px] rounded-full -z-10 animate-pulse" />
          </motion.div>
        </div>
      </section>

      {/* 3. TRUST BAR */}
      <div className="bg-popeyes-orange w-full py-6 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center md:justify-between items-center gap-8 text-white font-display text-lg md:text-2xl uppercase font-bold tracking-tighter">
          <div className="flex items-center gap-3 animate-fade-in"><MapPin /> 3,700+ Locations</div>
          <div className="hidden sm:block opacity-30">|</div>
          <div className="flex items-center gap-3"><Clock /> 50+ Years of Bold Flavor</div>
          <div className="hidden sm:block opacity-30">|</div>
          <div className="flex items-center gap-3"><Star /> 4.7★ Customer Rating</div>
          <div className="hidden sm:block opacity-30">|</div>
          <div className="flex items-center gap-3"><Award /> Best Chicken Sandwich 2024</div>
        </div>
      </div>

      {/* 4. MENU SECTION */}
      <Section id="menu" className="bg-popeyes-black border-t border-white/10">
        <div className="text-center mb-16">
          <span className="text-popeyes-orange font-display uppercase tracking-widest font-bold mb-2 block">Our Classics</span>
          <h2 className="text-6xl md:text-8xl mb-4">The Menu</h2>
          <div className="w-24 h-1.5 bg-popeyes-orange mx-auto rounded-full" />
        </div>

        {/* Filter Tabs */}
        <div className="flex overflow-x-auto pb-4 justify-start md:justify-center gap-3 mb-12 no-scrollbar">
          {['All', 'Chicken', 'Sandwiches', 'Sides', 'Drinks', 'Desserts'].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-8 py-3 rounded-md font-display text-lg uppercase tracking-widest whitespace-nowrap transition-all border ${
                activeCategory === cat 
                  ? 'bg-popeyes-orange text-white border-popeyes-orange shadow-lg' 
                  : 'bg-white/5 text-white/60 border-white/10 hover:border-white/30'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredMenu.map((item) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                key={item.id}
                className="glass-card overflow-hidden group flex flex-col h-full hover:border-white/30 transition-all duration-500"
              >
                <div className="h-56 bg-white/5 flex items-center justify-center text-7xl relative group-hover:scale-105 transition-transform duration-700">
                  {item.image}
                  {/* Category tag */}
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-popeyes-orange text-white">{item.category}</Badge>
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-2xl uppercase tracking-tighter">{item.name}</h3>
                    <span className="text-popeyes-orange font-display font-bold text-xl">
                      ${item.price}
                    </span>
                  </div>
                  <p className="text-white/40 text-sm mb-8 flex-grow leading-relaxed">{item.description}</p>
                  <Button 
                    className="w-full bg-white/10 py-4 hover:bg-popeyes-orange" 
                    onClick={() => addToCart(item)}
                  >
                    Quick Add
                  </Button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </Section>

      {/* 5. CART / ORDER SIDEBAR */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100]" 
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-popeyes-black border-l border-white/10 shadow-2xl z-[101] flex flex-col"
            >
              <div className="p-8 border-b border-white/10 flex items-center justify-between sticky top-0 z-10">
                <h2 className="text-3xl font-display flex items-center gap-3">
                  <ShoppingCart className="text-popeyes-orange" /> My Bag
                </h2>
                <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                  <X size={28} />
                </button>
              </div>

              <div className="flex-grow overflow-y-auto p-8 space-y-8">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center">
                    <div className="w-32 h-32 bg-white/5 rounded-full flex items-center justify-center mb-6 border border-white/10">
                      <ShoppingCart size={48} className="text-white/20" />
                    </div>
                    <p className="text-2xl font-display uppercase tracking-widest text-white/40">Bag is empty</p>
                    <button onClick={() => setIsCartOpen(false)} className="text-popeyes-orange underline mt-4 font-bold uppercase text-sm tracking-widest">Start Browsing</button>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div key={item.id} className="flex gap-6 group items-center">
                      <div className="w-24 h-24 bg-white/5 rounded-2xl flex items-center justify-center text-4xl shrink-0 border border-white/10">
                        {item.image}
                      </div>
                      <div className="flex-grow">
                        <div className="flex justify-between items-start mb-1">
                          <h4 className="text-xl font-display uppercase tracking-tight">{item.name}</h4>
                          <button onClick={() => removeFromCart(item.id)} className="text-white/20 hover:text-red-500 transition-colors">
                            <X size={20} />
                          </button>
                        </div>
                        <p className="text-popeyes-orange font-display text-xl mb-4">${(item.price * item.quantity).toFixed(2)}</p>
                        <div className="flex items-center gap-4">
                          <button 
                            onClick={() => updateQuantity(item.id, -1)}
                            className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/20 transition-all"
                          >
                            -
                          </button>
                          <span className="font-bold w-4 text-center text-lg">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, 1)}
                            className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/20 transition-all"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {cart.length > 0 && (
                <div className="p-8 bg-white/5 border-t border-white/10 space-y-6">
                  <div className="space-y-2">
                    <div className="flex justify-between text-white/50 text-sm uppercase tracking-widest">
                      <span>Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-white/50 text-sm uppercase tracking-widest">
                      <span>Tax (8.5%)</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                  </div>
                  <div className="flex justify-between text-3xl font-display uppercase py-4 border-t border-white/10">
                    <span>Total</span>
                    <span className="text-popeyes-orange">${total.toFixed(2)}</span>
                  </div>
                  <Button 
                    className="w-full text-xl py-6 tracking-widest" 
                    onClick={() => {
                      alert("Order Placed! 🎉 Your order will be ready in 15–20 minutes.");
                      setCart([]);
                      setIsCartOpen(false);
                    }}
                  >
                    Proceed to Checkout
                  </Button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* 6. DEALS & LIMITED TIME OFFERS */}
      <Section id="deals" className="bg-popeyes-black border-t border-white/10">
        <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8">
          <div>
            <h2 className="text-6xl md:text-8xl">Hot Deals.</h2>
            <h2 className="text-4xl md:text-6xl text-popeyes-orange">Limited Time.</h2>
          </div>
          <p className="text-white/40 max-w-sm font-medium leading-relaxed">Get 'em while they're hot! These exclusive online-only deals won't last forever.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {DEALS.map((deal) => (
            <div key={deal.id} className="relative bg-white/5 rounded-3xl overflow-hidden border border-white/5 flex flex-col group hover:border-white/20 transition-all duration-300">
              <div className="h-2 bg-gradient-to-r from-popeyes-orange to-popeyes-dark-orange w-full" />
              <div className="p-10 flex flex-col h-full">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-2.5 h-2.5 bg-popeyes-orange rounded-full animate-pulse shadow-[0_0_10px_#F26722]" />
                  <span className="text-popeyes-orange font-bold uppercase tracking-[0.2em] text-[10px]">Active Promo</span>
                </div>
                <h3 className="text-3xl mb-4 leading-tight group-hover:text-popeyes-orange transition-colors uppercase tracking-tight">{deal.name}</h3>
                <p className="text-white/40 mb-10 flex-grow text-sm leading-relaxed">{deal.description}</p>
                
                <div className="mb-10 flex items-center justify-between">
                  <div>
                    <p className="text-white/20 text-[10px] uppercase tracking-widest font-bold mb-1">Ends In:</p>
                    <div className="flex gap-2 text-2xl font-display font-bold text-white">
                      <span>{deal.expiresHours}h</span>
                      <span className="text-white/20">00m</span>
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-white/5 rounded-full border border-white/10 flex items-center justify-center font-display font-bold text-popeyes-orange">
                    +
                  </div>
                </div>

                <Button className="w-full py-4 tracking-widest" onClick={() => addToCart({ ...deal, category: "Deal" })}>Claim Deal</Button>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* 7. WHY POPEYES SECTION */}
      <Section id="story" className="bg-popeyes-black text-white relative overflow-hidden">
        {/* Subtle texture background */}
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#F26722 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }} />
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 relative z-10">
          {[
            { icon: <TrendingUp size={40} />, title: "Real Louisiana Recipes", desc: "Authentic bayou flavors passed down through generations." },
            { icon: <Flame size={40} />, title: "Never Frozen Chicken", desc: "Quality you can taste in every single crunch." },
            { icon: <Clock size={40} />, title: "Marinated 12 Hours", desc: "Every piece is soaked for half a day in our signature seasoning." },
            { icon: <Users size={40} />, title: "Family-Style Portions", desc: "Big helpings that bring everyone to the table." },
          ].map((feature, i) => (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              key={i} 
              className="text-center"
            >
              <div className="text-popeyes-orange mb-6 flex justify-center">{feature.icon}</div>
              <h4 className="text-2xl mb-3">{feature.title}</h4>
              <p className="text-gray-400 text-sm leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* 8. LOCATION FINDER */}
      <Section id="locations" className="bg-popeyes-black border-t border-white/10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-popeyes-orange font-display uppercase tracking-[0.3em] font-bold text-sm mb-2 block">Find Us</span>
            <h2 className="text-6xl md:text-8xl mb-4">Locations</h2>
            <p className="text-white/40 max-w-xl mx-auto font-medium">Craving the crunch? Enter your city or zip code to find the nearest flavor dashboard.</p>
          </div>

          <div className="flex gap-4 mb-20 max-w-2xl mx-auto">
            <div className="relative flex-grow">
              <Search className="absolute left-6 h-full text-white/20" size={20} />
              <input 
                type="text" 
                placeholder="Enter city, state or zip code..."
                className="w-full pl-16 pr-8 py-5 rounded-md border border-white/10 bg-white/5 focus:border-popeyes-orange focus:bg-white/10 outline-none transition-all text-lg font-medium placeholder:text-white/10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button className="rounded-md px-12 md:block hidden tracking-widest">Search</Button>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {filteredLocations.map((loc) => {
              const open = isOpen(loc);
              return (
                <div key={loc.id} className="bg-white/5 rounded-3xl p-10 border border-white/5 hover:border-white/10 transition-all duration-300 flex flex-col group">
                  <div className="flex justify-between items-start mb-8">
                    <div>
                      <h3 className="text-3xl leading-none uppercase tracking-tight mb-2 group-hover:text-popeyes-orange transition-colors">{loc.name}</h3>
                      <p className="text-xs text-white/20 uppercase tracking-[0.2em] font-bold">0.2 miles away</p>
                    </div>
                    <span className={`text-[10px] font-bold px-3 py-1 rounded border ${open ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-red-500/10 text-red-400 border-red-500/20'} uppercase tracking-[0.2em]`}>
                      {open ? 'Open Now' : 'Closed'}
                    </span>
                  </div>
                  <div className="space-y-5 mb-10 text-white/60">
                    <p className="flex items-start gap-4 text-sm font-medium"><MapPin className="text-popeyes-orange shrink-0 mt-0.5" size={20} /> {loc.address}</p>
                    <p className="flex items-center gap-4 text-sm font-medium"><Phone className="text-popeyes-orange shrink-0" size={20} /> {loc.phone}</p>
                    <p className="flex items-start gap-4 text-sm font-medium"><Clock className="text-popeyes-orange shrink-0 mt-0.5" size={20} /> {loc.hours}</p>
                  </div>
                  
                  <div className="flex gap-2 mb-10 flex-wrap">
                    {loc.dineIn && <Badge className="bg-white/10 text-white/40 border border-white/5 tracking-widest">Dine-In</Badge>}
                    {loc.driveThru && <Badge className="bg-white/10 text-white/40 border border-white/5 tracking-widest">Drive-Thru</Badge>}
                    {loc.delivery && <Badge className="bg-white/10 text-white/40 border border-white/5 tracking-widest">Delivery</Badge>}
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-auto">
                    <a 
                      href={`https://maps.google.com/?q=${loc.lat},${loc.lng}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-popeyes border border-white/10 bg-white/5 text-white/70 hover:bg-white/10 text-sm flex items-center justify-center gap-2 uppercase tracking-widest font-bold"
                    >
                      Directions
                    </a>
                    <Button variant="primary" className="text-sm tracking-widest py-4" onClick={() => setIsCartOpen(true)}>Pickup Here</Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Section>

      {/* 9. CATERING SECTION */}
      <Section id="catering" className="bg-popeyes-black border-t border-white/10">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-popeyes-orange font-display uppercase tracking-widest font-bold mb-4 block">Event Services</span>
            <h2 className="text-6xl md:text-8xl mb-8">Feed the <br /><span className="text-popeyes-orange">Whole Crew.</span></h2>
            <p className="text-lg text-white/40 mb-10 leading-relaxed font-medium">
              Popeyes catering serves groups of 10 to 500+. Perfect for game days, office events, and celebrations. Make your next gathering legendary.
            </p>
            <ul className="space-y-6">
              {[
                "Minimum 10 people",
                "48-hour advance notice",
                "Delivery available",
                "Custom menu options"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-4 text-sm font-display uppercase tracking-widest font-bold text-white/80">
                  <CheckCircle2 className="text-popeyes-orange" size={20} /> {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white/5 rounded-[40px] p-12 border border-white/10 relative overflow-hidden backdrop-blur-md">
             {cateringSubmitted ? (
               <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
               >
                 <div className="w-20 h-20 bg-popeyes-orange rounded-full flex items-center justify-center text-white mx-auto mb-6 shadow-[0_0_30px_#F26722]">
                   <CheckCircle2 size={40} />
                 </div>
                 <h3 className="text-3xl mb-4 uppercase tracking-tight">Request Sent!</h3>
                 <p className="text-white/40 font-medium">A catering specialist will contact you within 24 hours.</p>
               </motion.div>
             ) : (
               <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  setCateringSubmitted(true);
                }}
                className="space-y-6"
               >
                 <h3 className="text-3xl mb-8 text-center uppercase tracking-tight">Catering Inquiry</h3>
                 <div className="grid grid-cols-2 gap-4">
                    <input required type="text" placeholder="Name" className="w-full bg-white/5 border border-white/10 rounded-lg px-6 py-4 outline-none focus:border-popeyes-orange text-white placeholder:text-white/10" />
                    <input required type="email" placeholder="Email" className="w-full bg-white/5 border border-white/10 rounded-lg px-6 py-4 outline-none focus:border-popeyes-orange text-white placeholder:text-white/10" />
                 </div>
                 <input required type="tel" placeholder="Phone Number" className="w-full bg-white/5 border border-white/10 rounded-lg px-6 py-4 outline-none focus:border-popeyes-orange text-white placeholder:text-white/10" />
                 <div className="grid grid-cols-2 gap-4">
                    <input required type="date" className="w-full bg-white/5 border border-white/10 rounded-lg px-6 py-4 outline-none focus:border-popeyes-orange text-white placeholder:text-white/10" style={{ colorScheme: 'dark' }} />
                    <input required type="number" placeholder="Guest Count" className="w-full bg-white/5 border border-white/10 rounded-lg px-6 py-4 outline-none focus:border-popeyes-orange text-white placeholder:text-white/10" />
                 </div>
                 <textarea required placeholder="Special Requirements" className="w-full bg-white/5 border border-white/10 rounded-lg px-6 py-4 outline-none focus:border-popeyes-orange text-white placeholder:text-white/10 h-32"></textarea>
                 <Button type="submit" className="w-full text-xl py-5 tracking-widest">Send Request</Button>
               </form>
             )}
          </div>
        </div>
      </Section>

      {/* 10. TESTIMONIALS CAROUSEL */}
      <section className="bg-popeyes-black text-white py-24 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="flex justify-center flex-col items-center mb-16">
            <h2 className="text-5xl md:text-7xl mb-4 text-center">Real Fans. <br className="md:hidden" /> Real Talk.</h2>
          </div>

          <div className="relative max-w-4xl mx-auto h-[300px] flex items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeReviewIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                className="text-center px-12"
              >
                <div className="flex justify-center gap-1 mb-8">
                  {[...Array(5)].map((_, i) => <Star key={i} fill="#FFD700" className="text-popeyes-gold" size={32} />)}
                </div>
                <blockquote className="text-2xl md:text-4xl italic mb-8 font-serif">
                  "{REVIEWS[activeReviewIndex].text}"
                </blockquote>
                <cite className="font-display text-2xl uppercase tracking-widest text-popeyes-orange not-italic">
                  — {REVIEWS[activeReviewIndex].name}, {REVIEWS[activeReviewIndex].city}
                </cite>
              </motion.div>
            </AnimatePresence>

            {/* Navigation arrows */}
            <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between pointer-events-none">
              <button 
                onClick={() => setActiveReviewIndex((prev) => (prev - 1 + REVIEWS.length) % REVIEWS.length)}
                className="pointer-events-auto p-4 bg-white/5 hover:bg-popeyes-orange rounded-full transition-all"
              >
                <ChevronLeft size={32} />
              </button>
              <button 
                onClick={() => setActiveReviewIndex((prev) => (prev + 1) % REVIEWS.length)}
                className="pointer-events-auto p-4 bg-white/5 hover:bg-popeyes-orange rounded-full transition-all"
              >
                <ChevronRight size={32} />
              </button>
            </div>
            
            {/* Dot indicators */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-2">
              {REVIEWS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveReviewIndex(i)}
                  className={`w-3 h-3 rounded-full transition-all ${i === activeReviewIndex ? 'bg-popeyes-orange w-8' : 'bg-white/20'}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 11. APP DOWNLOAD SECTION */}
      <section className="bg-popeyes-orange py-24 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center gap-16">
          <div className="md:w-1/2 text-white">
            <h2 className="text-6xl md:text-8xl mb-6">Order Smarter.</h2>
            <p className="text-xl md:text-2xl mb-12 opacity-90 font-display uppercase tracking-widest leading-none">Earn points, unlock rewards, and skip the line with the Popeyes App.</p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-black text-white px-8 py-4 rounded-xl flex items-center gap-3 hover:scale-105 transition-transform border-t border-white/20">
                <div className="w-10 h-10 flex items-center justify-center border-2 border-white rounded-md">A</div>
                <div className="text-left leading-tight">
                  <p className="text-[10px] uppercase opacity-60">Download on the</p>
                  <p className="text-lg font-bold">App Store</p>
                </div>
              </button>
              <button className="bg-black text-white px-8 py-4 rounded-xl flex items-center gap-3 hover:scale-105 transition-transform border-t border-white/20">
                <div className="w-10 h-10 flex items-center justify-center border-2 border-white rounded-md">P</div>
                <div className="text-left leading-tight">
                  <p className="text-[10px] uppercase opacity-60">Get it on</p>
                  <p className="text-lg font-bold">Google Play</p>
                </div>
              </button>
            </div>
          </div>
          
          <div className="md:w-1/2 flex justify-center relative">
            {/* CSS Phone Mockup */}
            <div className="relative w-72 h-[550px] bg-popeyes-black rounded-[50px] border-8 border-gray-800 shadow-2xl p-4 overflow-hidden">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-gray-800 rounded-b-2xl z-10" />
              <div className="bg-white h-full rounded-[30px] p-4 flex flex-col">
                <div className="bg-popeyes-orange/10 p-3 rounded-2xl mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[10px] font-bold text-popeyes-orange">MY REWARDS</span>
                    <span className="text-[10px] font-bold text-gray-500">2,450 PTS</span>
                  </div>
                  <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-popeyes-orange w-3/4 h-full" />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="h-24 bg-gray-50 rounded-2xl border border-dashed border-gray-200" />
                  <div className="h-24 bg-gray-50 rounded-2xl border border-dashed border-gray-200" />
                  <div className="h-24 bg-gray-50 rounded-2xl border border-dashed border-gray-200" />
                </div>
                <div className="mt-auto flex justify-between p-2 opacity-30">
                  <div className="w-8 h-8 rounded-full bg-gray-200" />
                  <div className="w-8 h-8 rounded-full bg-gray-200" />
                  <div className="w-8 h-8 rounded-full bg-gray-200" />
                </div>
              </div>
            </div>
            {/* Decorative background circle */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/20 rounded-full -z-10 blur-xl" />
          </div>
        </div>
      </section>

      {/* 12. NEWSLETTER SIGNUP */}
      <section className="bg-[#1A1A1A] py-20 border-y border-white/10">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="text-center md:text-left">
            <span className="text-popeyes-orange font-display uppercase tracking-widest font-bold mb-3 block">Stay Informed</span>
            <h3 className="text-white text-5xl font-display uppercase tracking-tight mb-4">Get the Hottest Deals.</h3>
            <p className="text-white/40 text-lg font-medium">Join our community and get exclusive offers sent direct.</p>
          </div>
          
          <div className="w-full max-w-lg">
            {newsletterSubscribed ? (
               <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-popeyes-orange font-bold text-2xl flex items-center gap-4 bg-white/5 p-8 rounded-2xl border border-white/10">
                 <CheckCircle2 size={32} /> You're on the list! Welcome to the fam.
               </motion.div>
            ) : (
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  setNewsletterSubscribed(true);
                }}
                className="flex flex-col sm:flex-row gap-3"
              >
                <input 
                  required
                  type="email" 
                  placeholder="Enter your email address" 
                  className="bg-white/5 border border-white/10 text-white rounded-md px-8 py-5 outline-none focus:border-popeyes-orange flex-grow transition-all text-lg font-medium placeholder:text-white/10"
                />
                <Button type="submit" className="px-12 py-5 tracking-widest">Join</Button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* 13. FOOTER */}
      <footer className="bg-popeyes-black text-white pt-24 pb-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 flex flex-col gap-16">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-12">
            <div className="col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-popeyes-orange rounded-full flex items-center justify-center text-white font-display text-2xl font-bold border-2 border-white/20 shadow-sm">P</div>
                <span className="font-display text-3xl font-bold tracking-tighter text-popeyes-orange">POPEYES</span>
              </div>
              <p className="text-white/40 max-w-sm mb-8 leading-loose font-medium">
                Bold flavor since 1972. From New Orleans to the world, we bring the authentic Louisiana taste that turns every meal into a celebration.
              </p>
              <div className="flex gap-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="w-10 h-10 rounded-md bg-white/5 border border-white/10 flex items-center justify-center hover:bg-popeyes-orange hover:text-white transition-all cursor-pointer">
                    <TrendingUp size={20} className="opacity-40 hover:opacity-100" />
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-display uppercase tracking-[0.2em] mb-6 text-popeyes-orange">Explore</h4>
              <ul className="space-y-4 text-white/40 font-medium">
                {['Menu', 'Deals', 'Catering', 'Locations'].map(link => (
                  <li key={link}>
                    <button className="hover:text-white transition-colors" onClick={() => scrollToSection(link.toLowerCase())}>{link}</button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-display uppercase tracking-[0.2em] mb-6 text-popeyes-orange">Company</h4>
              <ul className="space-y-4 text-white/40 font-medium">
                {['Our Story', 'Careers', 'Press', 'Investors'].map(link => <li key={link}><a href="#" className="hover:text-white transition-colors">{link}</a></li>)}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-display uppercase tracking-[0.2em] mb-6 text-popeyes-orange">Support</h4>
              <ul className="space-y-4 text-white/40 font-medium">
                {['FAQ', 'Contact Us', 'Accessibility', 'Gift Cards'].map(link => <li key={link}><a href="#" className="hover:text-white transition-colors">{link}</a></li>)}
              </ul>
            </div>
          </div>

          <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 text-[10px] text-white/20 uppercase tracking-[0.2em] font-bold">
            <p>© 2026 Popeyes Louisiana Kitchen. All rights reserved.</p>
            <div className="flex gap-8">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Use</a>
            </div>
          </div>
        </div>
      </footer>

      {/* FLOATING ELEMENTS */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-24 right-8 z-40 w-12 h-12 bg-popeyes-orange text-white rounded-md flex items-center justify-center shadow-lg hover:bg-popeyes-dark-orange transition-all"
          >
            <ArrowUp size={24} />
          </motion.button>
        )}
      </AnimatePresence>

      <div className="md:hidden fixed bottom-0 left-0 w-full z-[100] p-4 bg-white/80 backdrop-blur-md border-t border-gray-100">
        <Button className="w-full rounded-2xl shadow-popeyes-orange/50 py-4" onClick={() => scrollToSection('menu')}>
          Order Now
        </Button>
      </div>

    </div>
  );
}
