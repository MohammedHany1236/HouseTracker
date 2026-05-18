import { Bell, TrendingDown, Building2, AlertCircle, Trash2, Check } from 'lucide-react';
import { Sidebar } from '../components/Sidebar';
import { TopBar } from '../components/TopBar';
import { useState, useEffect } from 'react';
import { useAlerts } from '../../services/hooks';
import { useAuthContext } from '../../services/authContext';
import { useNavigate } from 'react-router';

export function Alerts() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthContext();
  const { alerts, loading, error, deleteAlert, markAsRead } = useAlerts();
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex" style={{ backgroundColor: '#F5F7FA' }}>
        <Sidebar />
        <main className="flex-1 overflow-auto">
          <TopBar title="Alerts" subtitle="Stay updated with price changes and new listings" />
          <div className="p-8" style={{ color: '#6B7280' }}>Loading alerts...</div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex" style={{ backgroundColor: '#F5F7FA' }}>
        <Sidebar />
        <main className="flex-1 overflow-auto">
          <TopBar title="Alerts" subtitle="Stay updated with price changes and new listings" />
          <div className="p-8" style={{ color: '#EF4444' }}>Error: {error}</div>
        </main>
      </div>
    );
  }

  const getAlertType = (alert: any) => {
    if (alert.message?.includes('drop')) return 'price-drop';
    if (alert.message?.includes('market')) return 'market-insight';
    return 'new-listing';
  };

  const filteredAlerts = alerts.filter((alert: any) => {
    if (filter === 'unread') return !alert.is_read;
    if (filter === 'price-drop') return getAlertType(alert) === 'price-drop';
    if (filter === 'new-listing') return getAlertType(alert) === 'new-listing';
    return true;
  });

  const handleMarkAsRead = async (id: number) => {
    try {
      await markAsRead(id);
    } catch (err) {
      console.error('Failed to mark as read:', err);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteAlert(id);
    } catch (err) {
      console.error('Failed to delete alert:', err);
    }
  };

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: '#F5F7FA' }}>
      <Sidebar />

      <main className="flex-1 overflow-auto">
        <TopBar title="Alerts" subtitle="Stay updated with price changes and new listings" />

        <div className="p-8 max-w-4xl mx-auto">
          {/* Quick Actions */}
          <div className="flex gap-4 mb-6 flex-wrap">
            {['all', 'unread', 'price-drop', 'new-listing'].map((filterOption) => (
              <button
                key={filterOption}
                onClick={() => setFilter(filterOption)}
                className={`px-4 py-2 rounded-lg text-sm ${
                  filter === filterOption
                    ? 'text-white'
                    : 'border border-gray-200'
                }`}
                style={{
                  backgroundColor: filter === filterOption ? '#2EC4C7' : 'white',
                  color: filter === filterOption ? 'white' : '#6B7280'
                }}
              >
                {filterOption === 'all' && 'All Alerts'}
                {filterOption === 'unread' && 'Unread Only'}
                {filterOption === 'price-drop' && 'Price Drops'}
                {filterOption === 'new-listing' && 'New Listings'}
              </button>
            ))}
          </div>

          {/* Alerts List */}
          {filteredAlerts.length === 0 ? (
            <div className="text-center py-12" style={{ color: '#6B7280' }}>
              <Bell className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p className="text-lg">No alerts found</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredAlerts.map((alert: any) => {
                const type = getAlertType(alert);
                return (
                  <div
                    key={alert.id}
                    className={`bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow ${!alert.is_read ? 'border-l-4' : ''}`}
                    style={!alert.is_read ? { borderColor: '#2EC4C7' } : {}}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{
                          backgroundColor:
                            type === 'price-drop'
                              ? 'rgba(16, 185, 129, 0.1)'
                              : type === 'new-listing'
                              ? 'rgba(46, 196, 199, 0.1)'
                              : 'rgba(251, 191, 36, 0.1)'
                        }}
                      >
                        {type === 'price-drop' && <TrendingDown className="w-6 h-6" style={{ color: '#10B981' }} />}
                        {type === 'new-listing' && <Building2 className="w-6 h-6" style={{ color: '#2EC4C7' }} />}
                        {type === 'market-insight' && <AlertCircle className="w-6 h-6" style={{ color: '#F59E0B' }} />}
                      </div>

                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="text-lg mb-1" style={{ color: '#1A1A1A' }}>
                              {type === 'price-drop' && 'Price Drop Alert'}
                              {type === 'new-listing' && 'New Match Found'}
                              {type === 'market-insight' && 'Market Insight'}
                            </h3>
                            <p className="text-sm mb-2" style={{ color: '#6B7280' }}>{alert.message}</p>
                            {alert.property_name && (
                              <div className="inline-block px-3 py-1 rounded-lg text-xs" style={{ backgroundColor: '#F5F7FA', color: '#6B7280' }}>
                                {alert.property_name}
                              </div>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            {!alert.is_read && (
                              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#2EC4C7' }}></div>
                            )}
                            <span className="text-xs" style={{ color: '#6B7280' }}>
                              {new Date(alert.created_at).toLocaleDateString()}
                            </span>
                          </div>
                        </div>

                        <div className="flex gap-3 mt-4">
                          {!alert.is_read && (
                            <button
                              onClick={() => handleMarkAsRead(alert.id)}
                              className="px-4 py-2 rounded-lg text-sm flex items-center gap-2"
                              style={{ color: '#2EC4C7', backgroundColor: '#F5F7FA' }}
                            >
                              <Check className="w-4 h-4" />
                              Mark Read
                            </button>
                          )}
                          <button
                            onClick={() => handleDelete(alert.id)}
                            className="px-4 py-2 rounded-lg text-sm flex items-center gap-2"
                            style={{ color: '#6B7280', backgroundColor: '#F5F7FA' }}
                          >
                            <Trash2 className="w-4 h-4" />
                            Dismiss
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
