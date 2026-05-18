import { Home, Mail, Lock, User, Eye, EyeOff } from 'lucide-react';
import { Link, useNavigate } from 'react-router';
import { useState } from 'react';
import { useAuthContext } from '../../services/authContext';

export function SignUp() {
  const navigate = useNavigate();
  const { signup, loading, error: authError } = useAuthContext();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
  });

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match!');
      return;
    }
    if (!formData.agreeToTerms) {
      setError('Please agree to the terms and conditions');
      return;
    }

    try {
      await signup(formData.email, formData.password, formData.firstName, formData.lastName);
      navigate('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Signup failed');
    }
  };

  const displayError = error || authError;

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: '#F5F7FA' }}>
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 p-12 flex-col justify-between" style={{ background: 'linear-gradient(135deg, #0F4C5C 0%, #1F7A8C 50%, #4FA3B1 100%)' }}>
        <Link to="/" className="flex items-center gap-2">
          <Home className="w-8 h-8 text-white" />
          <span className="text-2xl text-white">Houses Tracker</span>
        </Link>

        <div>
          <h1 className="text-5xl text-white mb-6 leading-tight">
            Start Your Journey Today
          </h1>
          <p className="text-xl text-white/90 mb-8">
            Join thousands of smart buyers who are finding their dream properties with AI-powered insights.
          </p>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'rgba(46, 196, 199, 0.2)' }}>
                <span className="text-2xl">✨</span>
              </div>
              <div>
                <div className="text-white">Free 14-Day Trial</div>
                <div className="text-white/70 text-sm">No credit card required</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'rgba(46, 196, 199, 0.2)' }}>
                <span className="text-2xl">🎯</span>
              </div>
              <div>
                <div className="text-white">Smart Matching</div>
                <div className="text-white/70 text-sm">Find properties that fit your criteria</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'rgba(46, 196, 199, 0.2)' }}>
                <span className="text-2xl">💰</span>
              </div>
              <div>
                <div className="text-white">Save Money</div>
                <div className="text-white/70 text-sm">Identify undervalued properties</div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-8 text-white/70 text-sm">
          <div>
            <div className="text-3xl text-white mb-1">50K+</div>
            <div>Properties Tracked</div>
          </div>
          <div>
            <div className="text-3xl text-white mb-1">10K+</div>
            <div>Happy Users</div>
          </div>
          <div>
            <div className="text-3xl text-white mb-1">98%</div>
            <div>Satisfaction Rate</div>
          </div>
        </div>
      </div>

      {/* Right Side - Sign Up Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-8">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <Home className="w-6 h-6" style={{ color: '#2EC4C7' }} />
              <span className="text-xl" style={{ color: '#1A1A1A' }}>Houses Tracker</span>
            </Link>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl mb-2" style={{ color: '#1A1A1A' }}>Create Account</h2>
            <p style={{ color: '#6B7280' }}>Start tracking properties for free</p>
          </div>

          <form onSubmit={handleSignUp} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-2" style={{ color: '#1A1A1A' }}>
                  First Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" style={{ color: '#6B7280' }} />
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    placeholder="John"
                    required
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-2"
                    style={{ borderColor: '#E5E7EB' }}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm mb-2" style={{ color: '#1A1A1A' }}>
                  Last Name
                </label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  placeholder="Doe"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-2"
                  style={{ borderColor: '#E5E7EB' }}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm mb-2" style={{ color: '#1A1A1A' }}>
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" style={{ color: '#6B7280' }} />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="john@example.com"
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-2"
                  style={{ borderColor: '#E5E7EB' }}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm mb-2" style={{ color: '#1A1A1A' }}>
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" style={{ color: '#6B7280' }} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="••••••••"
                  required
                  minLength={8}
                  className="w-full pl-10 pr-12 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-2"
                  style={{ borderColor: '#E5E7EB' }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" style={{ color: '#6B7280' }} />
                  ) : (
                    <Eye className="w-5 h-5" style={{ color: '#6B7280' }} />
                  )}
                </button>
              </div>
              <p className="text-xs mt-1" style={{ color: '#6B7280' }}>Must be at least 8 characters</p>
            </div>

            <div>
              <label className="block text-sm mb-2" style={{ color: '#1A1A1A' }}>
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" style={{ color: '#6B7280' }} />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  placeholder="••••••••"
                  required
                  className="w-full pl-10 pr-12 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-2"
                  style={{ borderColor: '#E5E7EB' }}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-5 h-5" style={{ color: '#6B7280' }} />
                  ) : (
                    <Eye className="w-5 h-5" style={{ color: '#6B7280' }} />
                  )}
                </button>
              </div>
            </div>

            <div>
              <label className="flex items-start gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.agreeToTerms}
                  onChange={(e) => setFormData({ ...formData, agreeToTerms: e.target.checked })}
                  className="w-4 h-4 rounded mt-0.5"
                  style={{ accentColor: '#2EC4C7' }}
                  required
                />
                <span className="text-sm" style={{ color: '#6B7280' }}>
                  I agree to the{' '}
                  <a href="#" style={{ color: '#2EC4C7' }}>Terms of Service</a>
                  {' '}and{' '}
                  <a href="#" style={{ color: '#2EC4C7' }}>Privacy Policy</a>
                </span>
              </label>
            </div>

            {displayError && (
              <div className="p-3 rounded-lg text-sm text-white" style={{ backgroundColor: '#EF4444' }}>
                {displayError}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl text-white disabled:opacity-50"
              style={{ background: 'linear-gradient(135deg, #0F4C5C 0%, #4FA3B1 100%)' }}
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white" style={{ color: '#6B7280' }}>Or sign up with</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                className="py-3 rounded-xl border border-gray-200 flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span style={{ color: '#1A1A1A' }}>Google</span>
              </button>
              <button
                type="button"
                className="py-3 rounded-xl border border-gray-200 flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors"
              >
                <svg className="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                <span style={{ color: '#1A1A1A' }}>Facebook</span>
              </button>
            </div>

            <div className="text-center text-sm" style={{ color: '#6B7280' }}>
              Already have an account?{' '}
              <Link to="/login" style={{ color: '#2EC4C7' }}>
                Sign in
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
