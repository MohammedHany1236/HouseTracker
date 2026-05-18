import { Home, LayoutDashboard, Building2, Bell, Settings, User } from 'lucide-react';
import { Link, useLocation } from 'react-router';

export function Sidebar() {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  return (
    <aside className="w-64 bg-white border-r border-gray-100 flex flex-col">
      <div className="p-6 border-b border-gray-100">
        <Link to="/" className="flex items-center gap-2">
          <Home className="w-6 h-6" style={{ color: '#2EC4C7' }} />
          <span className="text-xl" style={{ color: '#1A1A1A' }}>Houses Tracker</span>
        </Link>
      </div>

      <nav className="flex-1 p-4">
        <div className="space-y-2">
          <Link
            to="/dashboard"
            className={`flex items-center gap-3 px-4 py-3 rounded-xl ${
              isActive('/dashboard') ? '' : 'hover:bg-gray-50 transition-colors'
            }`}
            style={
              isActive('/dashboard')
                ? { background: 'linear-gradient(135deg, #0F4C5C 0%, #4FA3B1 100%)' }
                : {}
            }
          >
            <LayoutDashboard className={`w-5 h-5 ${isActive('/dashboard') ? 'text-white' : ''}`} style={!isActive('/dashboard') ? { color: '#6B7280' } : {}} />
            <span className={isActive('/dashboard') ? 'text-white' : ''} style={!isActive('/dashboard') ? { color: '#6B7280' } : {}}>Dashboard</span>
          </Link>

          <Link
            to="/properties"
            className={`flex items-center gap-3 px-4 py-3 rounded-xl ${
              isActive('/properties') || isActive('/property') ? '' : 'hover:bg-gray-50 transition-colors'
            }`}
            style={
              isActive('/properties') || isActive('/property')
                ? { background: 'linear-gradient(135deg, #0F4C5C 0%, #4FA3B1 100%)' }
                : {}
            }
          >
            <Building2 className={`w-5 h-5 ${isActive('/properties') || isActive('/property') ? 'text-white' : ''}`} style={!isActive('/properties') && !isActive('/property') ? { color: '#6B7280' } : {}} />
            <span className={isActive('/properties') || isActive('/property') ? 'text-white' : ''} style={!isActive('/properties') && !isActive('/property') ? { color: '#6B7280' } : {}}>Properties</span>
          </Link>

          <Link
            to="/alerts"
            className={`flex items-center gap-3 px-4 py-3 rounded-xl ${
              isActive('/alerts') ? '' : 'hover:bg-gray-50 transition-colors'
            }`}
            style={
              isActive('/alerts')
                ? { background: 'linear-gradient(135deg, #0F4C5C 0%, #4FA3B1 100%)' }
                : {}
            }
          >
            <Bell className={`w-5 h-5 ${isActive('/alerts') ? 'text-white' : ''}`} style={!isActive('/alerts') ? { color: '#6B7280' } : {}} />
            <span className={isActive('/alerts') ? 'text-white' : ''} style={!isActive('/alerts') ? { color: '#6B7280' } : {}}>Alerts</span>
            <span className="ml-auto w-5 h-5 rounded-full flex items-center justify-center text-xs text-white" style={{ backgroundColor: '#2EC4C7' }}>3</span>
          </Link>

          <Link
            to="/settings"
            className={`flex items-center gap-3 px-4 py-3 rounded-xl ${
              isActive('/settings') ? '' : 'hover:bg-gray-50 transition-colors'
            }`}
            style={
              isActive('/settings')
                ? { background: 'linear-gradient(135deg, #0F4C5C 0%, #4FA3B1 100%)' }
                : {}
            }
          >
            <Settings className={`w-5 h-5 ${isActive('/settings') ? 'text-white' : ''}`} style={!isActive('/settings') ? { color: '#6B7280' } : {}} />
            <span className={isActive('/settings') ? 'text-white' : ''} style={!isActive('/settings') ? { color: '#6B7280' } : {}}>Settings</span>
          </Link>
        </div>
      </nav>

      <div className="p-4 border-t border-gray-100">
        <div className="flex items-center gap-3 px-4 py-3">
          <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #0F4C5C 0%, #4FA3B1 100%)' }}>
            <User className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="text-sm" style={{ color: '#1A1A1A' }}>John Doe</div>
            <div className="text-xs" style={{ color: '#6B7280' }}>Premium Plan</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
