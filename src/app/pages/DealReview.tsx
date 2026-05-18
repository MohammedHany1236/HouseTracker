import { CheckCircle, XCircle, AlertCircle, TrendingDown, MapPin, Bed, Bath, Square } from 'lucide-react';
import { Link, useParams, useNavigate } from 'react-router';
import { Sidebar } from '../components/Sidebar';
import { TopBar } from '../components/TopBar';
import { useState, useEffect } from 'react';
import { useDeals, useProperties } from '../../services/hooks';
import { useAuthContext } from '../../services/authContext';

export function DealReview() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthContext();
  const { deals, updateDeal } = useDeals();
  const { getProperty } = useProperties();
  const [notes, setNotes] = useState('');
  const [property, setProperty] = useState<any>(null);
  const [deal, setDeal] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    const loadData = async () => {
      try {
        setLoading(true);
        if (!id) {
          setError('Deal not found');
          return;
        }

        // Get property data
        const propData = await getProperty(id);
        setProperty(propData);

        // Find deal in deals list
        const dealData = deals.find((d: any) => d.property_id === parseInt(id));
        setDeal(dealData);
        if (dealData) {
          setNotes(dealData.notes || '');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load deal');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [id, deals, getProperty, isAuthenticated, navigate]);

  const handleApprove = async () => {
    try {
      if (deal) {
        await updateDeal(deal.id, 'approved', notes);
        navigate('/properties');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to approve deal');
    }
  };

  const handleReject = async () => {
    try {
      if (deal) {
        await updateDeal(deal.id, 'rejected', notes);
        navigate('/properties');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to reject deal');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex" style={{ backgroundColor: '#F5F7FA' }}>
        <Sidebar />
        <main className="flex-1 overflow-auto">
          <TopBar title="Review Deal" subtitle="Approve or reject this investment opportunity" />
          <div className="p-8" style={{ color: '#6B7280' }}>Loading deal details...</div>
        </main>
      </div>
    );
  }

  if (error || !property || !deal) {
    return (
      <div className="min-h-screen flex" style={{ backgroundColor: '#F5F7FA' }}>
        <Sidebar />
        <main className="flex-1 overflow-auto">
          <TopBar title="Review Deal" subtitle="Approve or reject this investment opportunity" />
          <div className="p-8" style={{ color: '#EF4444' }}>Error: {error || 'Deal not found'}</div>
        </main>
      </div>
    );
  }

  const isGoodDeal = property.status === 'good-deal';
  const investmentScore = isGoodDeal ? 92 : property.status === 'overpriced' ? 65 : 78;

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: '#F5F7FA' }}>
      <Sidebar />

      <main className="flex-1 overflow-auto">
        <TopBar title="Review Deal" subtitle="Approve or reject this investment opportunity" />

        <div className="p-8 max-w-5xl mx-auto">
          {/* Property Summary */}
          <div className="bg-white rounded-2xl p-8 shadow-sm mb-6">
            <div className="flex items-start gap-6 mb-6">
              <div className="w-64 h-48 rounded-xl bg-gradient-to-br from-teal-400 to-blue-500 flex-shrink-0"></div>
              <div className="flex-1">
                <h1 className="text-3xl mb-3" style={{ color: '#1A1A1A' }}>{property.name}</h1>
                <div className="flex items-center gap-2 text-lg mb-4" style={{ color: '#6B7280' }}>
                  <MapPin className="w-5 h-5" />
                  <span>{property.location}</span>
                </div>
                <div className="flex items-center gap-6 mb-4">
                  <div className="flex items-center gap-2">
                    <Bed className="w-5 h-5" style={{ color: '#6B7280' }} />
                    <span style={{ color: '#1A1A1A' }}>{property.beds} Beds</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Bath className="w-5 h-5" style={{ color: '#6B7280' }} />
                    <span style={{ color: '#1A1A1A' }}>{property.baths} Baths</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Square className="w-5 h-5" style={{ color: '#6B7280' }} />
                    <span style={{ color: '#1A1A1A' }}>{property.sqft} sqft</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-4xl" style={{ color: '#1A1A1A' }}>${(property.price / 1000).toFixed(0)}K</div>
                  {isGoodDeal && (
                    <div className="flex items-center gap-2 px-3 py-1 rounded-lg" style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)', color: '#10B981' }}>
                      <TrendingDown className="w-4 h-4" />
                      <span>Below market</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* AI Analysis */}
          <div className="bg-white rounded-2xl p-8 shadow-sm mb-6">
            <div className="flex items-center gap-3 mb-6">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${isGoodDeal ? 'bg-green-100' : 'bg-yellow-100'}`}>
                <AlertCircle className={`w-6 h-6 ${isGoodDeal ? 'text-green-600' : 'text-yellow-600'}`} />
              </div>
              <div>
                <h2 className="text-2xl" style={{ color: '#1A1A1A' }}>
                  AI Recommendation: {isGoodDeal ? 'Good Deal' : 'Fair Opportunity'}
                </h2>
                <p style={{ color: '#6B7280' }}>Confidence score: {investmentScore}/100</p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="p-5 rounded-xl" style={{ backgroundColor: '#F5F7FA' }}>
                <div className="text-sm mb-2" style={{ color: '#6B7280' }}>Price vs Market</div>
                <div className={`text-2xl mb-1 ${isGoodDeal ? 'text-green-600' : 'text-yellow-600'}`}>
                  {isGoodDeal ? '10-15% Below' : 'Fair Price'}
                </div>
                <div className="text-xs" style={{ color: '#6B7280' }}>Market value: ${(property.price * 1.15 / 1000).toFixed(0)}K</div>
              </div>

              <div className="p-5 rounded-xl" style={{ backgroundColor: '#F5F7FA' }}>
                <div className="text-sm mb-2" style={{ color: '#6B7280' }}>Investment Score</div>
                <div className="text-2xl mb-1" style={{ color: '#1A1A1A' }}>{investmentScore}/100</div>
                <div className="text-xs" style={{ color: '#6B7280' }}>
                  {isGoodDeal ? 'Excellent opportunity' : 'Good opportunity'}
                </div>
              </div>

              <div className="p-5 rounded-xl" style={{ backgroundColor: '#F5F7FA' }}>
                <div className="text-sm mb-2" style={{ color: '#6B7280' }}>Projected Growth</div>
                <div className={`text-2xl mb-1 ${isGoodDeal ? 'text-green-600' : 'text-blue-600'}`}>
                  +{isGoodDeal ? '8' : '5'}%
                </div>
                <div className="text-xs" style={{ color: '#6B7280' }}>Over next 12 months</div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-lg mb-3" style={{ color: '#1A1A1A' }}>Highlights</h3>
                <ul className="space-y-2">
                  <li className="flex gap-3">
                    <CheckCircle className="w-5 h-5 flex-shrink-0" style={{ color: '#10B981' }} />
                    <span style={{ color: '#6B7280' }}>
                      {isGoodDeal
                        ? 'Price is 10-15% below comparable properties in the area'
                        : 'Property is fairly priced for the market'}
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <CheckCircle className="w-5 h-5 flex-shrink-0" style={{ color: '#10B981' }} />
                    <span style={{ color: '#6B7280' }}>Property is listed in a desirable area with growth potential</span>
                  </li>
                  <li className="flex gap-3">
                    <CheckCircle className="w-5 h-5 flex-shrink-0" style={{ color: '#10B981' }} />
                    <span style={{ color: '#6B7280' }}>
                      {property.beds} beds, {property.baths} baths configuration appeals to wide range of buyers
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <CheckCircle className="w-5 h-5 flex-shrink-0" style={{ color: '#10B981' }} />
                    <span style={{ color: '#6B7280' }}>Strong rental income potential in this neighborhood</span>
                  </li>
                </ul>
              </div>

              {!isGoodDeal && (
                <div>
                  <h3 className="text-lg mb-3" style={{ color: '#1A1A1A' }}>Points to Consider</h3>
                  <ul className="space-y-2">
                    <li className="flex gap-3">
                      <AlertCircle className="w-5 h-5 flex-shrink-0" style={{ color: '#F59E0B' }} />
                      <span style={{ color: '#6B7280' }}>Price may be at or above market average - negotiate for better terms</span>
                    </li>
                    <li className="flex gap-3">
                      <AlertCircle className="w-5 h-5 flex-shrink-0" style={{ color: '#F59E0B' }} />
                      <span style={{ color: '#6B7280' }}>Recommend scheduling property inspection before committing</span>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Your Decision */}
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <h2 className="text-2xl mb-4" style={{ color: '#1A1A1A' }}>Your Decision</h2>
            <p className="mb-6" style={{ color: '#6B7280' }}>
              Review the AI analysis and add your own notes before approving or rejecting this deal.
            </p>

            <div className="mb-6">
              <label className="block text-sm mb-2" style={{ color: '#1A1A1A' }}>
                Notes (Optional)
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add your thoughts, questions, or action items..."
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-2 resize-none"
                rows={4}
                style={{ borderColor: '#E5E7EB' }}
              />
            </div>

            <div className="flex gap-4">
              <button
                onClick={handleApprove}
                className="flex-1 py-4 rounded-xl text-white flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                style={{ backgroundColor: '#10B981' }}
              >
                <CheckCircle className="w-5 h-5" />
                <span>Approve Deal</span>
              </button>
              <button
                onClick={handleReject}
                className="flex-1 py-4 rounded-xl text-white flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                style={{ backgroundColor: '#EF4444' }}
              >
                <XCircle className="w-5 h-5" />
                <span>Reject Deal</span>
              </button>
            </div>

            <Link to={`/property/${id}`}>
              <button className="w-full mt-3 py-3 rounded-xl border border-gray-200" style={{ color: '#6B7280' }}>
                View Full Property Details
              </button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
