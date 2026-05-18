import { Home, Search, Filter, MapPin, TrendingUp, TrendingDown, Bed, Bath, Square } from 'lucide-react';
import { Link } from 'react-router';
import { Sidebar } from '../components/Sidebar';
import { TopBar } from '../components/TopBar';
import { useState } from 'react';
import { useProperties } from '../../services/hooks';

export function Properties() {
  const { properties, loading, error } = useProperties();
  const [priceRange, setPriceRange] = useState('all');
  const [propertyType, setPropertyType] = useState('all');
  const [location, setLocation] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProperties = properties.filter(prop => {
    // Search filter
    if (searchTerm && !prop.name.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !prop.location.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }

    // Location filter
    if (location !== 'all' && !prop.location.toLowerCase().includes(location.toLowerCase())) {
      return false;
    }

    // Price range filter
    if (priceRange !== 'all') {
      const price = prop.price;
      if (priceRange === '0-300k' && price > 300000) return false;
      if (priceRange === '300k-500k' && (price < 300000 || price > 500000)) return false;
      if (priceRange === '500k+' && price < 500000) return false;
    }

    return true;
  });

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: '#F5F7FA' }}>
      <Sidebar />

      <main className="flex-1 overflow-auto">
        <TopBar title="Properties" subtitle="Browse and manage your saved properties" />

        <div className="p-8">
          {/* Search and Filters */}
          <div className="bg-white rounded-2xl p-6 shadow-sm mb-8">
            <div className="grid md:grid-cols-4 gap-4">
              <div className="md:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" style={{ color: '#6B7280' }} />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search properties..."
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-2"
                    style={{ borderColor: '#E5E7EB' }}
                  />
                </div>
              </div>

              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="px-4 py-3 rounded-xl border border-gray-200 focus:outline-none"
                style={{ color: '#1A1A1A' }}
              >
                <option value="all">All Prices</option>
                <option value="0-300k">$0 - $300K</option>
                <option value="300k-500k">$300K - $500K</option>
                <option value="500k+">$500K+</option>
              </select>

              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="px-4 py-3 rounded-xl border border-gray-200 focus:outline-none"
                style={{ color: '#1A1A1A' }}
              >
                <option value="all">All Locations</option>
                <option value="manhattan">Manhattan</option>
                <option value="brooklyn">Brooklyn</option>
                <option value="queens">Queens</option>
              </select>
            </div>

            <div className="flex gap-3 mt-4">
              <button className="px-4 py-2 rounded-lg text-sm text-white" style={{ backgroundColor: '#2EC4C7' }}>
                All Properties
              </button>
              <button className="px-4 py-2 rounded-lg text-sm" style={{ color: '#6B7280', backgroundColor: '#F5F7FA' }}>
                Good Deals
              </button>
              <button className="px-4 py-2 rounded-lg text-sm" style={{ color: '#6B7280', backgroundColor: '#F5F7FA' }}>
                New Listings
              </button>
              <button className="px-4 py-2 rounded-lg text-sm" style={{ color: '#6B7280', backgroundColor: '#F5F7FA' }}>
                Price Drops
              </button>
            </div>
          </div>

          {/* Properties Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? (
              <div style={{ color: '#6B7280' }}>Loading properties...</div>
            ) : error ? (
              <div style={{ color: '#EF4444' }}>Error loading properties: {error}</div>
            ) : filteredProperties.length > 0 ? (
              filteredProperties.map((property) => (
                <Link key={property.id} to={`/property/${property.id}`}>
                  <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow cursor-pointer">
                    <div className="h-56 bg-gradient-to-br from-teal-400 to-blue-500 relative">
                      {property.status === 'good-deal' && (
                        <div className="absolute top-3 left-3 px-3 py-1 rounded-lg text-xs" style={{ backgroundColor: 'rgba(16, 185, 129, 0.9)', color: 'white' }}>
                          Good Deal
                        </div>
                      )}
                      {property.status === 'overpriced' && (
                        <div className="absolute top-3 left-3 px-3 py-1 rounded-lg text-xs" style={{ backgroundColor: 'rgba(239, 68, 68, 0.9)', color: 'white' }}>
                          Overpriced
                        </div>
                      )}
                      {property.status === 'fair' && (
                        <div className="absolute top-3 left-3 px-3 py-1 rounded-lg text-xs" style={{ backgroundColor: 'rgba(251, 191, 36, 0.9)', color: 'white' }}>
                          Fair Price
                        </div>
                      )}
                    </div>
                    <div className="p-5">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="text-lg mb-1" style={{ color: '#1A1A1A' }}>{property.name}</h4>
                          <div className="flex items-center gap-1 text-sm" style={{ color: '#6B7280' }}>
                            <MapPin className="w-4 h-4" />
                            <span>{property.location}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 mb-4 text-sm" style={{ color: '#6B7280' }}>
                        <div className="flex items-center gap-1">
                          <Bed className="w-4 h-4" />
                          <span>{property.beds}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Bath className="w-4 h-4" />
                          <span>{property.baths}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Square className="w-4 h-4" />
                          <span>{property.sqft} sqft</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <div className="text-2xl" style={{ color: '#1A1A1A' }}>
                          ${(property.price / 1000).toFixed(0)}K
                        </div>
                        {property.price_change !== 0 && (
                          <div className={`flex items-center gap-1 text-sm ${property.price_change > 0 ? 'text-red-500' : 'text-green-500'}`}>
                            {property.price_change > 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                            <span>{Math.abs(property.price_change)}%</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div style={{ color: '#6B7280' }}>No properties found matching your filters</div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
