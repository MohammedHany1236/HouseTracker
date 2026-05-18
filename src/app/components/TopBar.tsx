import { Bell } from 'lucide-react';
import { Link } from 'react-router';

interface TopBarProps {
  title: string;
  subtitle: string;
}

export function TopBar({ title, subtitle }: TopBarProps) {
  return (
    <header className="bg-white border-b border-gray-100 px-8 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl" style={{ color: '#1A1A1A' }}>{title}</h1>
          <p className="text-sm" style={{ color: '#6B7280' }}>{subtitle}</p>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/alerts">
            <button className="p-2 rounded-lg hover:bg-gray-50 relative">
              <Bell className="w-5 h-5" style={{ color: '#6B7280' }} />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full" style={{ backgroundColor: '#2EC4C7' }}></span>
            </button>
          </Link>
          <Link to="/">
            <button className="px-4 py-2 rounded-lg text-sm" style={{ color: '#6B7280' }}>
              Back to Home
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
}
