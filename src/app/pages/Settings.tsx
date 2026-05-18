import { User, Bell, DollarSign, MapPin, Save } from 'lucide-react';
import { Sidebar } from '../components/Sidebar';
import { TopBar } from '../components/TopBar';
import { useState, useEffect } from 'react';
import { useAuthContext } from '../../services/authContext';
import { useNavigate } from 'react-router';

export function Settings() {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '+1 (555) 123-4567',
    minPrice: '200000',
    maxPrice: '600000',
    locations: ['Manhattan', 'Brooklyn'],
    bedrooms: '2',
    propertyType: 'all',
    emailAlerts: true,
    smsAlerts: true,
    priceDrops: true,
    newListings: true,
    marketInsights: false,
  });

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (user) {
      setFormData((prev) => ({
        ...prev,
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
      }));
    }
  }, [user, isAuthenticated, navigate]);

  const handleSave = async () => {
    setLoading(true);
    setMessage(null);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setMessage('Settings saved successfully!');
      setTimeout(() => setMessage(null), 3000);
    } catch (err) {
      setMessage(err instanceof Error ? err.message : 'Failed to save settings');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: '#F5F7FA' }}>
      <Sidebar />

      <main className="flex-1 overflow-auto">
        <TopBar title="Settings" subtitle="Manage your profile and preferences" />

        <div className="p-8 max-w-4xl mx-auto">
          {message && (
            <div
              className="mb-6 p-4 rounded-xl text-white"
              style={{
                backgroundColor: message.includes('Failed') ? '#EF4444' : '#10B981'
              }}
            >
              {message}
            </div>
          )}

          {/* Profile Information */}
          <div className="bg-white rounded-2xl p-8 shadow-sm mb-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'rgba(46, 196, 199, 0.1)' }}>
                <User className="w-5 h-5" style={{ color: '#2EC4C7' }} />
              </div>
              <h2 className="text-2xl" style={{ color: '#1A1A1A' }}>Profile Information</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm mb-2" style={{ color: '#1A1A1A' }}>First Name</label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-2"
                  style={{ borderColor: '#E5E7EB' }}
                />
              </div>

              <div>
                <label className="block text-sm mb-2" style={{ color: '#1A1A1A' }}>Last Name</label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-2"
                  style={{ borderColor: '#E5E7EB' }}
                />
              </div>

              <div>
                <label className="block text-sm mb-2" style={{ color: '#1A1A1A' }}>Email</label>
                <input
                  type="email"
                  value={formData.email}
                  disabled
                  className="w-full px-4 py-3 rounded-xl border border-gray-200"
                  style={{ borderColor: '#E5E7EB', backgroundColor: '#F5F7FA' }}
                />
                <p className="text-xs mt-2" style={{ color: '#6B7280' }}>Email cannot be changed</p>
              </div>

              <div>
                <label className="block text-sm mb-2" style={{ color: '#1A1A1A' }}>Phone</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-2"
                  style={{ borderColor: '#E5E7EB' }}
                />
              </div>
            </div>
          </div>

          {/* Search Preferences */}
          <div className="bg-white rounded-2xl p-8 shadow-sm mb-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'rgba(46, 196, 199, 0.1)' }}>
                <MapPin className="w-5 h-5" style={{ color: '#2EC4C7' }} />
              </div>
              <h2 className="text-2xl" style={{ color: '#1A1A1A' }}>Search Preferences</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm mb-2" style={{ color: '#1A1A1A' }}>Minimum Price</label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" style={{ color: '#6B7280' }} />
                  <input
                    type="number"
                    value={formData.minPrice}
                    onChange={(e) => setFormData({ ...formData, minPrice: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-2"
                    style={{ borderColor: '#E5E7EB' }}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm mb-2" style={{ color: '#1A1A1A' }}>Maximum Price</label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" style={{ color: '#6B7280' }} />
                  <input
                    type="number"
                    value={formData.maxPrice}
                    onChange={(e) => setFormData({ ...formData, maxPrice: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-2"
                    style={{ borderColor: '#E5E7EB' }}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm mb-2" style={{ color: '#1A1A1A' }}>Minimum Bedrooms</label>
                <select
                  value={formData.bedrooms}
                  onChange={(e) => setFormData({ ...formData, bedrooms: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200"
                  style={{ color: '#1A1A1A' }}
                >
                  <option value="1">1+</option>
                  <option value="2">2+</option>
                  <option value="3">3+</option>
                  <option value="4">4+</option>
                </select>
              </div>

              <div>
                <label className="block text-sm mb-2" style={{ color: '#1A1A1A' }}>Property Type</label>
                <select
                  value={formData.propertyType}
                  onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200"
                  style={{ color: '#1A1A1A' }}
                >
                  <option value="all">All Types</option>
                  <option value="apartment">Apartment</option>
                  <option value="house">House</option>
                  <option value="condo">Condo</option>
                  <option value="townhouse">Townhouse</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm mb-2" style={{ color: '#1A1A1A' }}>Preferred Locations</label>
              <div className="flex flex-wrap gap-3">
                {['Manhattan', 'Brooklyn', 'Queens', 'Bronx', 'Staten Island'].map((location) => (
                  <button
                    key={location}
                    onClick={() => {
                      if (formData.locations.includes(location)) {
                        setFormData({ ...formData, locations: formData.locations.filter(l => l !== location) });
                      } else {
                        setFormData({ ...formData, locations: [...formData.locations, location] });
                      }
                    }}
                    className="px-4 py-2 rounded-lg text-sm"
                    style={
                      formData.locations.includes(location)
                        ? { backgroundColor: '#2EC4C7', color: 'white' }
                        : { backgroundColor: '#F5F7FA', color: '#6B7280' }
                    }
                  >
                    {location}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Notification Preferences */}
          <div className="bg-white rounded-2xl p-8 shadow-sm mb-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'rgba(46, 196, 199, 0.1)' }}>
                <Bell className="w-5 h-5" style={{ color: '#2EC4C7' }} />
              </div>
              <h2 className="text-2xl" style={{ color: '#1A1A1A' }}>Notification Preferences</h2>
            </div>

            <div className="space-y-4">
              {[
                { key: 'emailAlerts', title: 'Email Alerts', desc: 'Receive notifications via email' },
                { key: 'smsAlerts', title: 'SMS Alerts', desc: 'Receive notifications via text message' },
                { key: 'priceDrops', title: 'Price Drops', desc: 'Get notified when prices drop' },
                { key: 'newListings', title: 'New Listings', desc: 'Get notified about new matching properties' },
                { key: 'marketInsights', title: 'Market Insights', desc: 'Receive weekly market analysis' },
              ].map(({ key, title, desc }) => (
                <div key={key} className="flex items-center justify-between p-4 rounded-xl" style={{ backgroundColor: '#F5F7FA' }}>
                  <div>
                    <div className="text-sm mb-1" style={{ color: '#1A1A1A' }}>{title}</div>
                    <div className="text-xs" style={{ color: '#6B7280' }}>{desc}</div>
                  </div>
                  <button
                    onClick={() => setFormData({ ...formData, [key]: !(formData as any)[key] })}
                    className="w-12 h-6 rounded-full relative transition-colors"
                    style={{ backgroundColor: (formData as any)[key] ? '#2EC4C7' : '#CBD5E1' }}
                  >
                    <div
                      className="w-5 h-5 rounded-full bg-white absolute top-0.5 transition-all"
                      style={{ left: (formData as any)[key] ? '26px' : '2px' }}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Save Button */}
          <button
            onClick={handleSave}
            disabled={loading}
            className="w-full py-4 rounded-xl text-white flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50"
            style={{ backgroundColor: '#2EC4C7' }}
          >
            <Save className="w-5 h-5" />
            <span>{loading ? 'Saving...' : 'Save Settings'}</span>
          </button>
        </div>
      </main>
    </div>
  );
}
