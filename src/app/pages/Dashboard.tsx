import { TrendingUp, TrendingDown, MapPin, Building2, Bell } from 'lucide-react';
import { Link, useNavigate } from 'react-router';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Sidebar } from '../components/Sidebar';
import { TopBar } from '../components/TopBar';
import { useDashboardStats, useSavedProperties, useAlerts } from '../../services/hooks';
import { useAuthContext } from '../../services/authContext';

const priceData = [
  { month: 'Jan', price: 320 },
  { month: 'Feb', price: 335 },
  { month: 'Mar', price: 310 },
  { month: 'Apr', price: 345 },
  { month: 'May', price: 360 },
  { month: 'Jun', price: 355 },
];

export function Dashboard() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthContext();
  const { stats, loading: statsLoading } = useDashboardStats();
  const { properties: savedProperties, loading: propsLoading } = useSavedProperties();
  const { alerts, loading: alertsLoading } = useAlerts();

  if (!isAuthenticated) {
    navigate('/login');
    return null;
  }

  const recentAlerts = alerts.slice(0, 3);

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: '#F5F7FA' }}>
      <Sidebar />

      <main className="flex-1 overflow-auto">
        <TopBar title="Dashboard" subtitle="Welcome back! Here's your real estate overview." />

        <div className="p-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'rgba(46, 196, 199, 0.1)' }}>
                  <Building2 className="w-6 h-6" style={{ color: '#2EC4C7' }} />
                </div>
                <div className="flex items-center gap-1 text-sm" style={{ color: '#10B981' }}>
                  <TrendingUp className="w-4 h-4" />
                  <span>12%</span>
                </div>
              </div>
              <div className="text-3xl mb-1" style={{ color: '#1A1A1A' }}>{statsLoading ? '-' : stats?.saved_properties || 0}</div>
              <div className="text-sm" style={{ color: '#6B7280' }}>Saved Properties</div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'rgba(46, 196, 199, 0.1)' }}>
                  <Bell className="w-6 h-6" style={{ color: '#2EC4C7' }} />
                </div>
                <div className="flex items-center gap-1 text-sm" style={{ color: '#10B981' }}>
                  <TrendingUp className="w-4 h-4" />
                  <span>8%</span>
                </div>
              </div>
              <div className="text-3xl mb-1" style={{ color: '#1A1A1A' }}>{alertsLoading ? '-' : alerts.length}</div>
              <div className="text-sm" style={{ color: '#6B7280' }}>Active Alerts</div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'rgba(46, 196, 199, 0.1)' }}>
                  <TrendingDown className="w-6 h-6" style={{ color: '#2EC4C7' }} />
                </div>
                <div className="flex items-center gap-1 text-sm" style={{ color: '#EF4444' }}>
                  <TrendingDown className="w-4 h-4" />
                  <span>5%</span>
                </div>
              </div>
              <div className="text-3xl mb-1" style={{ color: '#1A1A1A' }}>
                {statsLoading ? '-' : `$${(stats?.avg_price_tracked / 1000).toFixed(0) || 0}K`}
              </div>
              <div className="text-sm" style={{ color: '#6B7280' }}>Avg. Price Tracked</div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'rgba(46, 196, 199, 0.1)' }}>
                  <MapPin className="w-6 h-6" style={{ color: '#2EC4C7' }} />
                </div>
                <div className="flex items-center gap-1 text-sm" style={{ color: '#10B981' }}>
                  <TrendingUp className="w-4 h-4" />
                  <span>15%</span>
                </div>
              </div>
              <div className="text-3xl mb-1" style={{ color: '#1A1A1A' }}>{statsLoading ? '-' : stats?.good_deals_found || 0}</div>
              <div className="text-sm" style={{ color: '#6B7280' }}>Good Deals Found</div>
            </div>
          </div>

          {/* Charts and Lists */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Price Trends */}
            <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg mb-1" style={{ color: '#1A1A1A' }}>Price Trends</h3>
                  <p className="text-sm" style={{ color: '#6B7280' }}>Average market price over time</p>
                </div>
                <div className="flex gap-2">
                  <button className="px-3 py-1 rounded-lg text-xs text-white" style={{ backgroundColor: '#2EC4C7' }}>6M</button>
                  <button className="px-3 py-1 rounded-lg text-xs" style={{ color: '#6B7280', backgroundColor: '#F5F7FA' }}>1Y</button>
                  <button className="px-3 py-1 rounded-lg text-xs" style={{ color: '#6B7280', backgroundColor: '#F5F7FA' }}>All</button>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={priceData}>
                  <defs>
                    <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                      <stop key="gradient-stop-start" offset="5%" stopColor="#2EC4C7" stopOpacity={0.3}/>
                      <stop key="gradient-stop-end" offset="95%" stopColor="#2EC4C7" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
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
                  <Area key="area" type="monotone" dataKey="price" stroke="#2EC4C7" strokeWidth={2} fillOpacity={1} fill="url(#colorPrice)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Market Insights */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg mb-4" style={{ color: '#1A1A1A' }}>Market Insights</h3>
              <div className="space-y-4">
                <div className="p-4 rounded-xl" style={{ backgroundColor: '#F5F7FA' }}>
                  <div className="flex items-start gap-3 mb-2">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)' }}>
                      <TrendingDown className="w-4 h-4" style={{ color: '#10B981' }} />
                    </div>
                    <div>
                      <div className="text-sm mb-1" style={{ color: '#1A1A1A' }}>Prices Dropping</div>
                      <div className="text-xs" style={{ color: '#6B7280' }}>Manhattan area down 5% this week</div>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-xl" style={{ backgroundColor: '#F5F7FA' }}>
                  <div className="flex items-start gap-3 mb-2">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'rgba(46, 196, 199, 0.1)' }}>
                      <Building2 className="w-4 h-4" style={{ color: '#2EC4C7' }} />
                    </div>
                    <div>
                      <div className="text-sm mb-1" style={{ color: '#1A1A1A' }}>New Listings</div>
                      <div className="text-xs" style={{ color: '#6B7280' }}>45 new properties match your criteria</div>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-xl" style={{ backgroundColor: '#F5F7FA' }}>
                  <div className="flex items-start gap-3 mb-2">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)' }}>
                      <TrendingUp className="w-4 h-4" style={{ color: '#EF4444' }} />
                    </div>
                    <div>
                      <div className="text-sm mb-1" style={{ color: '#1A1A1A' }}>Hot Market</div>
                      <div className="text-xs" style={{ color: '#6B7280' }}>Brooklyn demand increased 12%</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Saved Properties */}
          <div className="mt-8 bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg" style={{ color: '#1A1A1A' }}>Saved Properties</h3>
              <Link to="/properties" className="px-4 py-2 rounded-lg text-sm text-white" style={{ backgroundColor: '#2EC4C7' }}>
                View All
              </Link>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {propsLoading ? (
                <div style={{ color: '#6B7280' }}>Loading saved properties...</div>
              ) : savedProperties.length > 0 ? (
                savedProperties.slice(0, 3).map((property) => (
                  <Link key={property.id} to={`/property/${property.id}`}>
                    <div className="rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow">
                      <div className="h-48 bg-gradient-to-br from-teal-400 to-blue-500"></div>
                      <div className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h4 className="text-sm mb-1" style={{ color: '#1A1A1A' }}>{property.name}</h4>
                            <div className="flex items-center gap-1 text-xs" style={{ color: '#6B7280' }}>
                              <MapPin className="w-3 h-3" />
                              <span>{property.location}</span>
                            </div>
                          </div>
                          {property.status === 'good-deal' && (
                            <span className="px-2 py-1 rounded-lg text-xs" style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)', color: '#10B981' }}>
                              Good Deal
                            </span>
                          )}
                          {property.status === 'fair' && (
                            <span className="px-2 py-1 rounded-lg text-xs" style={{ backgroundColor: 'rgba(251, 191, 36, 0.1)', color: '#F59E0B' }}>
                              Fair
                            </span>
                          )}
                          {property.status === 'overpriced' && (
                            <span className="px-2 py-1 rounded-lg text-xs" style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', color: '#EF4444' }}>
                              Overpriced
                            </span>
                          )}
                        </div>
                        <div className="flex items-center justify-between mt-4">
                          <div className="text-lg" style={{ color: '#1A1A1A' }}>
                            ${(property.price / 1000).toFixed(0)}K
                          </div>
                          {property.price_change !== 0 && (
                            <div className={`flex items-center gap-1 text-xs ${property.price_change > 0 ? 'text-red-500' : 'text-green-500'}`}>
                              {property.price_change > 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                              <span>{Math.abs(property.price_change)}%</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <div style={{ color: '#6B7280' }}>No saved properties yet</div>
              )}
            </div>
          </div>

          {/* Recent Alerts */}
          <div className="mt-8 bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg mb-4" style={{ color: '#1A1A1A' }}>Recent Alerts</h3>
            <div className="space-y-3">
              {alertsLoading ? (
                <div style={{ color: '#6B7280' }}>Loading alerts...</div>
              ) : recentAlerts.length > 0 ? (
                recentAlerts.map((alert) => (
                  <div key={alert.id} className="flex items-center gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'rgba(46, 196, 199, 0.1)' }}>
                      <Bell className="w-5 h-5" style={{ color: '#2EC4C7' }} />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm mb-1" style={{ color: '#1A1A1A' }}>{alert.title}</div>
                      <div className="text-xs" style={{ color: '#6B7280' }}>{alert.message}</div>
                    </div>
                    <div className="text-xs" style={{ color: '#6B7280' }}>
                      {new Date(alert.created_at).toLocaleDateString()}
                    </div>
                  </div>
                ))
              ) : (
                <div style={{ color: '#6B7280' }}>No alerts yet</div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
