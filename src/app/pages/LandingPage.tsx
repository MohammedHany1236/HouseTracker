import { Home, TrendingUp, Bell, BarChart3, Search, MapPin, DollarSign, Shield, Clock, Users } from 'lucide-react';
import { Link } from 'react-router';

export function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Home className="w-6 h-6" style={{ color: '#2EC4C7' }} />
            <span className="text-xl" style={{ color: '#1A1A1A' }}>Houses Tracker</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm" style={{ color: '#6B7280' }}>Features</a>
            <a href="#how-it-works" className="text-sm" style={{ color: '#6B7280' }}>How It Works</a>
            <a href="#benefits" className="text-sm" style={{ color: '#6B7280' }}>Benefits</a>
            <Link to="/login">
              <button className="px-6 py-2 rounded-xl text-sm" style={{ color: '#6B7280' }}>
                Sign In
              </button>
            </Link>
            <Link to="/signup">
              <button className="px-6 py-2 rounded-xl text-white" style={{ background: 'linear-gradient(135deg, #0F4C5C 0%, #4FA3B1 100%)' }}>
                Get Started
              </button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6" style={{ background: 'linear-gradient(135deg, #0F4C5C 0%, #1F7A8C 50%, #4FA3B1 100%)' }}>
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-block px-4 py-2 rounded-full mb-6" style={{ backgroundColor: 'rgba(46, 196, 199, 0.2)' }}>
              <span className="text-sm" style={{ color: '#2EC4C7' }}>🤖 AI-Powered Real Estate</span>
            </div>
            <h1 className="text-5xl mb-6 text-white leading-tight">
              Intelligent Real Estate Monitoring
            </h1>
            <p className="text-xl mb-8" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
              Never miss the perfect property deal. Track market trends, get AI-powered insights, and receive instant alerts when prices drop.
            </p>
            <div className="flex gap-4">
              <Link to="/signup">
                <button className="px-8 py-4 rounded-2xl text-white shadow-lg hover:shadow-xl transition-shadow" style={{ backgroundColor: '#2EC4C7' }}>
                  Start Free Trial
                </button>
              </Link>
              <button className="px-8 py-4 rounded-2xl bg-white/10 text-white backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-colors">
                Watch Demo
              </button>
            </div>
            <div className="flex gap-8 mt-12">
              <div>
                <div className="text-3xl text-white">50K+</div>
                <div className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Properties Tracked</div>
              </div>
              <div>
                <div className="text-3xl text-white">10K+</div>
                <div className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Active Users</div>
              </div>
              <div>
                <div className="text-3xl text-white">98%</div>
                <div className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Accuracy Rate</div>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="relative">
              <div className="absolute inset-0 bg-white/10 backdrop-blur-xl rounded-3xl transform rotate-3"></div>
              <div className="relative bg-white rounded-3xl shadow-2xl p-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg" style={{ color: '#1A1A1A' }}>Price Alert</h3>
                  <Bell className="w-5 h-5" style={{ color: '#2EC4C7' }} />
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-4 rounded-xl" style={{ backgroundColor: '#F5F7FA' }}>
                    <div className="w-16 h-16 rounded-lg" style={{ background: 'linear-gradient(135deg, #0F4C5C 0%, #4FA3B1 100%)' }}></div>
                    <div className="flex-1">
                      <div className="text-sm" style={{ color: '#1A1A1A' }}>Downtown Apartment</div>
                      <div className="text-xs" style={{ color: '#6B7280' }}>Price dropped 12%</div>
                    </div>
                    <div className="text-lg" style={{ color: '#2EC4C7' }}>$285K</div>
                  </div>
                  <div className="flex items-center gap-3 p-4 rounded-xl" style={{ backgroundColor: '#F5F7FA' }}>
                    <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-teal-400 to-blue-500"></div>
                    <div className="flex-1">
                      <div className="text-sm" style={{ color: '#1A1A1A' }}>Suburban House</div>
                      <div className="text-xs" style={{ color: '#6B7280' }}>New listing match</div>
                    </div>
                    <div className="text-lg" style={{ color: '#2EC4C7' }}>$420K</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6" style={{ backgroundColor: '#F5F7FA' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 rounded-full mb-4" style={{ backgroundColor: 'rgba(46, 196, 199, 0.1)' }}>
              <span className="text-sm" style={{ color: '#2EC4C7' }}>Features</span>
            </div>
            <h2 className="text-4xl mb-4" style={{ color: '#1A1A1A' }}>
              Everything You Need to Track Real Estate
            </h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: '#6B7280' }}>
              Powerful tools to monitor the market, analyze trends, and make informed decisions
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6" style={{ background: 'linear-gradient(135deg, #0F4C5C 0%, #4FA3B1 100%)' }}>
                <TrendingUp className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl mb-3" style={{ color: '#1A1A1A' }}>Market Monitoring</h3>
              <p style={{ color: '#6B7280' }}>
                Track real-time price changes across thousands of properties. Get instant updates when market conditions shift.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6" style={{ background: 'linear-gradient(135deg, #0F4C5C 0%, #4FA3B1 100%)' }}>
                <BarChart3 className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl mb-3" style={{ color: '#1A1A1A' }}>AI Analysis</h3>
              <p style={{ color: '#6B7280' }}>
                Our AI evaluates every property to determine if it's a good deal, fair price, or overpriced based on market data.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6" style={{ background: 'linear-gradient(135deg, #0F4C5C 0%, #4FA3B1 100%)' }}>
                <Bell className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl mb-3" style={{ color: '#1A1A1A' }}>Smart Notifications</h3>
              <p style={{ color: '#6B7280' }}>
                Receive personalized alerts for price drops, new listings, and market opportunities that match your criteria.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Problem & Solution */}
      <section id="how-it-works" className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl mb-6" style={{ color: '#1A1A1A' }}>
              The Problem with Traditional House Hunting
            </h2>
            <div className="space-y-4 mb-8">
              <div className="flex gap-3">
                <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-1" style={{ backgroundColor: 'rgba(220, 38, 38, 0.1)' }}>
                  <span className="text-xs">✕</span>
                </div>
                <p style={{ color: '#6B7280' }}>
                  Manual searches across multiple platforms waste hours every day
                </p>
              </div>
              <div className="flex gap-3">
                <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-1" style={{ backgroundColor: 'rgba(220, 38, 38, 0.1)' }}>
                  <span className="text-xs">✕</span>
                </div>
                <p style={{ color: '#6B7280' }}>
                  Missing out on great deals because you didn't check at the right time
                </p>
              </div>
              <div className="flex gap-3">
                <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-1" style={{ backgroundColor: 'rgba(220, 38, 38, 0.1)' }}>
                  <span className="text-xs">✕</span>
                </div>
                <p style={{ color: '#6B7280' }}>
                  No way to know if a property is actually a good deal or overpriced
                </p>
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-4xl mb-6" style={{ color: '#1A1A1A' }}>
              Our Solution
            </h2>
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-1" style={{ backgroundColor: 'rgba(46, 196, 199, 0.2)' }}>
                  <span className="text-xs" style={{ color: '#2EC4C7' }}>✓</span>
                </div>
                <p style={{ color: '#6B7280' }}>
                  Automated 24/7 monitoring of all major real estate platforms
                </p>
              </div>
              <div className="flex gap-3">
                <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-1" style={{ backgroundColor: 'rgba(46, 196, 199, 0.2)' }}>
                  <span className="text-xs" style={{ color: '#2EC4C7' }}>✓</span>
                </div>
                <p style={{ color: '#6B7280' }}>
                  Instant alerts sent directly to your phone when opportunities arise
                </p>
              </div>
              <div className="flex gap-3">
                <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-1" style={{ backgroundColor: 'rgba(46, 196, 199, 0.2)' }}>
                  <span className="text-xs" style={{ color: '#2EC4C7' }}>✓</span>
                </div>
                <p style={{ color: '#6B7280' }}>
                  AI-powered analysis that evaluates every property against market data
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section id="benefits" className="py-20 px-6" style={{ backgroundColor: '#F5F7FA' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl mb-4" style={{ color: '#1A1A1A' }}>
              Why Choose Houses Tracker?
            </h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: '#6B7280' }}>
              Join thousands of smart property buyers who are making better decisions
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-2xl p-6 text-center">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: 'rgba(46, 196, 199, 0.1)' }}>
                <Clock className="w-6 h-6" style={{ color: '#2EC4C7' }} />
              </div>
              <h3 className="text-lg mb-2" style={{ color: '#1A1A1A' }}>Save Time</h3>
              <p className="text-sm" style={{ color: '#6B7280' }}>
                Stop wasting hours searching. Let AI do the work for you.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 text-center">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: 'rgba(46, 196, 199, 0.1)' }}>
                <DollarSign className="w-6 h-6" style={{ color: '#2EC4C7' }} />
              </div>
              <h3 className="text-lg mb-2" style={{ color: '#1A1A1A' }}>Save Money</h3>
              <p className="text-sm" style={{ color: '#6B7280' }}>
                Identify undervalued properties and negotiate better deals.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 text-center">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: 'rgba(46, 196, 199, 0.1)' }}>
                <Shield className="w-6 h-6" style={{ color: '#2EC4C7' }} />
              </div>
              <h3 className="text-lg mb-2" style={{ color: '#1A1A1A' }}>Make Confident Decisions</h3>
              <p className="text-sm" style={{ color: '#6B7280' }}>
                Backed by data and AI insights you can trust.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 text-center">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: 'rgba(46, 196, 199, 0.1)' }}>
                <Users className="w-6 h-6" style={{ color: '#2EC4C7' }} />
              </div>
              <h3 className="text-lg mb-2" style={{ color: '#1A1A1A' }}>Join the Community</h3>
              <p className="text-sm" style={{ color: '#6B7280' }}>
                Connect with 10K+ users finding their dream homes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl mb-4" style={{ color: '#1A1A1A' }}>
              How It Works
            </h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: '#6B7280' }}>
              Get started in minutes with our simple 3-step process
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6" style={{ background: 'linear-gradient(135deg, #0F4C5C 0%, #4FA3B1 100%)' }}>
                <Search className="w-8 h-8 text-white" />
              </div>
              <div className="text-sm mb-2" style={{ color: '#2EC4C7' }}>Step 1</div>
              <h3 className="text-xl mb-3" style={{ color: '#1A1A1A' }}>Set Your Criteria</h3>
              <p style={{ color: '#6B7280' }}>
                Tell us what you're looking for: location, price range, property type, and must-have features.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6" style={{ background: 'linear-gradient(135deg, #0F4C5C 0%, #4FA3B1 100%)' }}>
                <BarChart3 className="w-8 h-8 text-white" />
              </div>
              <div className="text-sm mb-2" style={{ color: '#2EC4C7' }}>Step 2</div>
              <h3 className="text-xl mb-3" style={{ color: '#1A1A1A' }}>AI Does the Work</h3>
              <p style={{ color: '#6B7280' }}>
                Our AI monitors the market 24/7, analyzing thousands of properties and tracking price changes.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6" style={{ background: 'linear-gradient(135deg, #0F4C5C 0%, #4FA3B1 100%)' }}>
                <Bell className="w-8 h-8 text-white" />
              </div>
              <div className="text-sm mb-2" style={{ color: '#2EC4C7' }}>Step 3</div>
              <h3 className="text-xl mb-3" style={{ color: '#1A1A1A' }}>Get Notified</h3>
              <p style={{ color: '#6B7280' }}>
                Receive instant alerts when we find perfect matches or when prices drop on your saved properties.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-6" style={{ background: 'linear-gradient(135deg, #0F4C5C 0%, #1F7A8C 50%, #4FA3B1 100%)' }}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl mb-6 text-white">
            Ready to Find Your Dream Property?
          </h2>
          <p className="text-xl mb-8" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
            Join thousands of smart buyers who are using AI to make better real estate decisions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/signup">
              <button className="px-10 py-4 rounded-2xl text-white shadow-lg hover:shadow-xl transition-shadow" style={{ backgroundColor: '#2EC4C7' }}>
                Start Free Trial
              </button>
            </Link>
            <button className="px-10 py-4 rounded-2xl bg-white/10 text-white backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-colors">
              Schedule Demo
            </button>
          </div>
          <p className="mt-6 text-sm" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
            No credit card required • 14-day free trial • Cancel anytime
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Home className="w-5 h-5" style={{ color: '#2EC4C7' }} />
                <span style={{ color: '#1A1A1A' }}>Houses Tracker</span>
              </div>
              <p className="text-sm" style={{ color: '#6B7280' }}>
                AI-powered real estate monitoring platform helping buyers make smarter decisions.
              </p>
            </div>
            <div>
              <h4 className="mb-4" style={{ color: '#1A1A1A' }}>Product</h4>
              <ul className="space-y-2 text-sm" style={{ color: '#6B7280' }}>
                <li><a href="#" className="hover:opacity-70">Features</a></li>
                <li><a href="#" className="hover:opacity-70">Pricing</a></li>
                <li><a href="#" className="hover:opacity-70">API</a></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4" style={{ color: '#1A1A1A' }}>Company</h4>
              <ul className="space-y-2 text-sm" style={{ color: '#6B7280' }}>
                <li><a href="#" className="hover:opacity-70">About</a></li>
                <li><a href="#" className="hover:opacity-70">Blog</a></li>
                <li><a href="#" className="hover:opacity-70">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4" style={{ color: '#1A1A1A' }}>Support</h4>
              <ul className="space-y-2 text-sm" style={{ color: '#6B7280' }}>
                <li><a href="#" className="hover:opacity-70">Help Center</a></li>
                <li><a href="#" className="hover:opacity-70">Contact</a></li>
                <li><a href="#" className="hover:opacity-70">Privacy</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-gray-100 text-center text-sm" style={{ color: '#6B7280' }}>
            © 2026 Houses Tracker. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
