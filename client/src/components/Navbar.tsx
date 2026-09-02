import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShieldCheck, Menu, X, ArrowRight, Smartphone } from 'lucide-react';

interface NavItem {
  label: string;
  href: string;
  badge?: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'All Products', href: '/' },
  { label: 'iPhone 17 Pro', href: '/products/iphone-17-pro' },
  { label: 'vivo X300 Ultra', href: '/products/vivo-x300-ultra' },
  { label: 'OnePlus 12 5G', href: '/products/oneplus-12' },
];

export const Navbar: React.FC = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Track scroll position for transparent to solid frosted transition
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-white/90 backdrop-blur-xl border-b border-slate-200/80 shadow-xs'
          : 'bg-white/70 backdrop-blur-md border-b border-slate-200/40'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          {/* Brand Logo */}
          <div className="flex items-center space-x-8">
            <Link
              to="/"
              className="flex items-center space-x-3 group focus-visible:rounded-xl"
              aria-label="1Fi Mutual Fund EMI Home"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-700 via-blue-600 to-indigo-600 flex items-center justify-center shadow-md shadow-blue-500/25 group-hover:scale-105 transition-transform duration-200">
                <span className="text-white font-black text-xl tracking-tighter">1Fi</span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center space-x-1.5">
                  <span className="font-extrabold text-xl text-slate-950 tracking-tight leading-none">
                    1Fi
                  </span>
                  <span className="text-[10px] font-bold text-blue-700 bg-blue-50 border border-blue-200/70 px-1.5 py-0.5 rounded-sm uppercase tracking-wide">
                    Fintech
                  </span>
                </div>
                <span className="text-[10px] font-medium text-slate-500 tracking-wider uppercase mt-0.5">
                  Mutual Fund EMI
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-1" aria-label="Main Navigation">
              {NAV_ITEMS.map((item) => {
                const isActive =
                  item.href === '/'
                    ? location.pathname === '/' || location.pathname === '/smartphones'
                    : location.pathname === item.href;

                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    className={`relative px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? 'text-blue-700 bg-blue-50/90 font-semibold'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                    }`}
                  >
                    {item.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-3.5 right-3.5 h-0.5 bg-blue-600 rounded-full animate-fade-in" />
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Right Trust Badge & Action */}
          <div className="hidden sm:flex items-center space-x-3">
            <div className="hidden xl:flex items-center space-x-2 bg-emerald-50 text-emerald-800 px-3.5 py-1.5 rounded-full border border-emerald-200/80 text-xs font-semibold">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>0% EMI Backed by Mutual Funds</span>
            </div>

            <a
              href="/#phones"
              className="inline-flex items-center space-x-2 text-sm font-semibold text-white bg-slate-900 hover:bg-blue-600 px-4 py-2 rounded-xl shadow-xs transition-colors duration-200 group"
            >
              <Smartphone className="w-4 h-4 text-slate-300 group-hover:text-white transition-colors" />
              <span>Explore Phones</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 group-hover:text-white transition-all" />
            </a>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex items-center sm:hidden">
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              className="p-2.5 rounded-xl text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors focus-visible:ring-2 focus-visible:ring-blue-600"
              aria-label={isMobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Animated Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="sm:hidden fixed inset-x-0 top-16 bg-white/95 backdrop-blur-2xl border-b border-slate-200 shadow-xl p-4 transition-all duration-300 animate-fade-in z-50">
          <nav className="flex flex-col space-y-1.5" aria-label="Mobile Navigation">
            {NAV_ITEMS.map((item) => {
              const isActive =
                item.href === '/'
                  ? location.pathname === '/' || location.pathname === '/smartphones'
                  : location.pathname === item.href;

              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`px-4 py-3 rounded-xl text-base font-semibold flex items-center justify-between transition-colors ${
                    isActive
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <span>{item.label}</span>
                  <ArrowRight className={`w-4 h-4 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
                </Link>
              );
            })}

            <div className="pt-3 mt-2 border-t border-slate-100">
              <div className="flex items-center space-x-2 bg-emerald-50 text-emerald-800 px-3.5 py-2 rounded-xl text-xs font-semibold">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>0% EMI Backed by Mutual Funds</span>
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
