import { MapPin, Bed, Bath, Square, TrendingDown, Calendar, Heart, Share2, AlertCircle } from 'lucide-react';
import { Link, useParams, useNavigate } from 'react-router';
import { Sidebar } from '../components/Sidebar';
import { TopBar } from '../components/TopBar';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useState, useEffect } from 'react';
import { useProperties, useDeals } from '../../services/hooks';
import { useAuthContext } from '../../services/authContext';

const priceHistory = [
  { month: 'Dec', price: 325 },
  { month: 'Jan', price: 315 },
  { month: 'Feb', price: 305 },
  { month: 'Mar', price: 295 },
  { month: 'Apr', price: 290 },
  { month: 'May', price: 285 },
];

export function PropertyDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getProperty } = useProperties();
  const { isAuthenticated } = useAuthContext();
  const { createDeal } = useDeals();
  const [property, setProperty] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        if (!id) {
          setError('Property not found');
          return;
        }
        setLoading(true);
        const data = await getProperty(id);
        setProperty(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load property');
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id, getProperty]);

  const handleReviewDeal = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    if (id) {
      try {
        await createDeal(id);
        navigate(`/deal-review/${id}`);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to create deal');
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex" style={{ backgroundColor: '#F5F7FA' }}>
        <Sidebar />
        <main className="flex-1 overflow-auto">
          <TopBar title="Property Details" subtitle="View detailed information and AI insights" />
          <div className="p-8" style={{ color: '#6B7280' }}>Loading property details...</div>
        </main>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="min-h-screen flex" style={{ backgroundColor: '#F5F7FA' }}>
        <Sidebar />
        <main className="flex-1 overflow-auto">
          <TopBar title="Property Details" subtitle="View detailed information and AI insights" />
          <div className="p-8" style={{ color: '#EF4444' }}>Error: {error || 'Property not found'}</div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: '#F5F7FA' }}>
      <Sidebar />

      <main className="flex-1 overflow-auto">
        <TopBar title="Property Details" subtitle="View detailed information and AI insights" />

        <div className="p-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Images */}
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
                <div className="h-96 bg-gradient-to-br from-teal-400 to-blue-500"></div>
                <div className="grid grid-cols-4 gap-2 p-4">
                  <div className="h-24 bg-gradient-to-br from-teal-300 to-blue-400 rounded-lg"></div>
                  <div className="h-24 bg-gradient-to-br from-teal-300 to-blue-400 rounded-lg"></div>
                  <div className="h-24 bg-gradient-to-br from-teal-300 to-blue-400 rounded-lg"></div>
                  <div className="h-24 bg-gradient-to-br from-teal-300 to-blue-400 rounded-lg"></div>
                </div>
              </div>

              {/* Details */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="text-3xl mb-2" style={{ color: '#1A1A1A' }}>{property.name}</h1>
                    <div className="flex items-center gap-2 text-lg" style={{ color: '#6B7280' }}>
                      <MapPin className="w-5 h-5" />
                      <span>{property.location}</span>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button className="p-3 rounded-xl hover:bg-gray-50">
                      <Heart className="w-5 h-5" style={{ color: '#6B7280' }} />
                    </button>
                    <button className="p-3 rounded-xl hover:bg-gray-50">
                      <Share2 className="w-5 h-5" style={{ color: '#6B7280' }} />
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-6 mb-6">
                  <div className="flex items-center gap-2">
                    <Bed className="w-5 h-5" style={{ color: '#6B7280' }} />
                    <span style={{ color: '#1A1A1A' }}>{property.beds} Bedrooms</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Bath className="w-5 h-5" style={{ color: '#6B7280' }} />
                    <span style={{ color: '#1A1A1A' }}>{property.baths} Bathrooms</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Square className="w-5 h-5" style={{ color: '#6B7280' }} />
                    <span style={{ color: '#1A1A1A' }}>{property.sqft} sqft</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" style={{ color: '#6B7280' }} />
                    <span style={{ color: '#1A1A1A' }}>Listed 2024</span>
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-100">
                  <h3 className="text-lg mb-3" style={{ color: '#1A1A1A' }}>Description</h3>
                  <p style={{ color: '#6B7280', lineHeight: '1.7' }}>
                    {property.description || 'Beautiful property in a prime location. Features modern amenities, spacious rooms, and excellent neighborhood. Great investment opportunity with strong appreciation potential.'}
                  </p>
                </div>

                <div className="pt-6 border-t border-gray-100 mt-6">
                  <h3 className="text-lg mb-3" style={{ color: '#1A1A1A' }}>Features</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {['Hardwood Floors', 'Modern Kitchen', 'High Ceilings', 'Natural Light', 'Good Location', 'Well Maintained', 'Convenient Access', 'Great Views'].map((feature) => (
                      <div key={feature} className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#2EC4C7' }}></div>
                        <span style={{ color: '#6B7280' }}>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Price History */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="text-lg mb-4" style={{ color: '#1A1A1A' }}>Price History</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={priceHistory}>
                    <CartesianGrid key="grid" strokeDasharray="3 3" stroke="#E5E7EB" />
                    <XAxis key="xaxis" dataKey="month" stroke="#6B7280" style={{ fontSize: '12px' }} />
                    <YAxis key="yaxis" stroke="#6B7280" style={{ fontSize: '12px' }} />
                    <Tooltip
                      key="tooltip"
                      contentStyle={{
                        backgroundColor: 'white',
                        border: '1px solid #E5E7EB',
                        borderRadius: '8px',
                        fontSize: '12px'
                      }}
                    />
                    <Line key="line" type="monotone" dataKey="price" stroke="#2EC4C7" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Price & AI Evaluation */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="text-4xl mb-2" style={{ color: '#1A1A1A' }}>${(property.price / 1000).toFixed(0)}K</div>
                {property.price_change !== 0 && (
                  <div className={`flex items-center gap-2 mb-6 ${property.price_change > 0 ? 'text-red-500' : 'text-green-500'}`}>
                    <TrendingDown className="w-5 h-5" />
                    <span className="text-lg">{property.price_change > 0 ? 'Up' : 'Down'} {Math.abs(property.price_change)}% from listing</span>
                  </div>
                )}

                <div className={`p-4 rounded-xl mb-6 ${property.status === 'good-deal' ? 'border border-green-200' : property.status === 'overpriced' ? 'border border-red-200' : 'border border-yellow-200'}`}
                  style={{ backgroundColor: property.status === 'good-deal' ? 'rgba(16, 185, 129, 0.1)' : property.status === 'overpriced' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(251, 191, 36, 0.1)' }}>
                  <div className={`flex items-center gap-2 mb-2 ${property.status === 'good-deal' ? 'text-green-600' : property.status === 'overpriced' ? 'text-red-600' : 'text-yellow-600'}`}>
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${property.status === 'good-deal' ? 'bg-green-500' : property.status === 'overpriced' ? 'bg-red-500' : 'bg-yellow-500'}`}>
                      <AlertCircle className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-lg">{property.status === 'good-deal' ? 'Good Deal' : property.status === 'overpriced' ? 'Overpriced' : 'Fair Price'}</span>
                  </div>
                  <p className="text-sm" style={{ color: '#6B7280' }}>
                    {property.status === 'good-deal' ? 'Our analysis indicates this property is priced below market value.' : property.status === 'overpriced' ? 'This property appears to be priced above market value.' : 'This property is fairly priced for the market.'}
                  </p>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span style={{ color: '#6B7280' }}>Estimated Value</span>
                    <span style={{ color: '#1A1A1A' }}>${(property.price * 1.15 / 1000).toFixed(0)}K</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span style={{ color: '#6B7280' }}>Price per sqft</span>
                    <span style={{ color: '#1A1A1A' }}>${(property.price / property.sqft).toFixed(0)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span style={{ color: '#6B7280' }}>Market Status</span>
                    <span style={{ color: '#1A1A1A' }}>Active</span>
                  </div>
                </div>

                <button
                  onClick={handleReviewDeal}
                  className="w-full py-3 rounded-xl text-white mb-3" style={{ backgroundColor: '#2EC4C7' }}>
                  Review This Deal
                </button>
                <button className="w-full py-3 rounded-xl border border-gray-200" style={{ color: '#1A1A1A' }}>
                  Add to Watchlist
                </button>
              </div>

              {/* AI Insights */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="text-lg mb-4" style={{ color: '#1A1A1A' }}>AI Insights</h3>
                <div className="space-y-4">
                  <div className="p-3 rounded-lg" style={{ backgroundColor: '#F5F7FA' }}>
                    <div className="text-sm mb-1" style={{ color: '#1A1A1A' }}>Price Prediction</div>
                    <div className="text-xs" style={{ color: '#6B7280' }}>Expected to appreciate 5-8% over next year</div>
                  </div>
                  <div className="p-3 rounded-lg" style={{ backgroundColor: '#F5F7FA' }}>
                    <div className="text-sm mb-1" style={{ color: '#1A1A1A' }}>Market Comparison</div>
                    <div className="text-xs" style={{ color: '#6B7280' }}>
                      {property.status === 'good-deal' ? '10-15% below' : property.status === 'overpriced' ? '10-15% above' : 'At'} average for this area
                    </div>
                  </div>
                  <div className="p-3 rounded-lg" style={{ backgroundColor: '#F5F7FA' }}>
                    <div className="text-sm mb-1" style={{ color: '#1A1A1A' }}>Investment Score</div>
                    <div className="text-xs" style={{ color: '#6B7280' }}>
                      {property.status === 'good-deal' ? '85-90' : property.status === 'overpriced' ? '60-70' : '75-80'}/100 - {property.status === 'good-deal' ? 'Excellent' : property.status === 'overpriced' ? 'Fair' : 'Good'} opportunity
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Agent */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="text-lg mb-4" style={{ color: '#1A1A1A' }}>Contact Agent</h3>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full" style={{ background: 'linear-gradient(135deg, #0F4C5C 0%, #4FA3B1 100%)' }}></div>
                  <div>
                    <div className="text-sm" style={{ color: '#1A1A1A' }}>Real Estate Agent</div>
                    <div className="text-xs" style={{ color: '#6B7280' }}>Licensed Professional</div>
                  </div>
                </div>
                <button className="w-full py-3 rounded-xl border border-gray-200" style={{ color: '#1A1A1A' }}>
                  Schedule Viewing
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
