
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Brand from './Brand';

function Sidebar() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const [loggingOut, setLoggingOut] = useState(false);
    const [error, setError] = useState('');

    const navigation = [
        { label: 'Overview', icon: '⌂', path: '/dashboard', active: true },
        { label: 'Password Vault', icon: '▣', comingSoon: true },
        { label: 'Security Awareness', icon: '◈', comingSoon: true },
        { label: 'Profile', icon: '○', comingSoon: true },
    ];

    const handleLogout = async () => {
        setLoggingOut(true);
        setError('');

        try {
            await logout();
            navigate('/login', { replace: true });
        } catch {
            setError('Unable to log out. Please try again.');
            setLoggingOut(false);
        }
    };

    return (
        <aside className="flex w-full flex-col border-r border-slate-200 bg-white md:min-h-screen md:w-64 md:shrink-0">

            <div className="border-b border-slate-200 px-6 py-5">
                <Brand />
            </div>

            <nav className="flex-1 px-4 py-6">
                <p className="mb-4 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Workspace
                </p>

                <div className="space-y-2">
                    {navigation.map((item) => (
                        <div
                            key={item.label}
                            className={`flex items-center justify-between rounded-lg px-3 py-3 ${
                                item.active
                                    ? 'bg-blue-50 font-semibold text-blue-700'
                                    : 'text-slate-500'
                            } ${item.comingSoon ? 'cursor-not-allowed opacity-60' : ''}`}
                            title={item.comingSoon ? 'Coming soon' : undefined}
                        >
                            <span className="flex items-center gap-3">
                                <span className="text-lg">{item.icon}</span>
                                <span className="text-sm">{item.label}</span>
                            </span>

                            {item.comingSoon && (
                                <span className="text-xs text-slate-400">
                                    Soon
                                </span>
                            )}
                        </div>
                    ))}
                </div>
            </nav>

            <div className="border-t border-slate-200 p-4">
                <div className="mb-4 rounded-lg bg-slate-50 p-3">
                    <p className="text-sm font-semibold text-slate-800">
                        {user?.name || 'Participant'}
                    </p>

                    <p className="mt-1 break-all text-xs text-slate-500">
                        {user?.email || 'No email available'}
                    </p>
                </div>

                {error && (
                    <p className="mb-3 text-xs text-red-600">
                        {error}
                    </p>
                )}

                <button
                    onClick={handleLogout}
                    disabled={loggingOut}
                    className="w-full rounded-lg px-3 py-3 text-left text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {loggingOut ? 'Logging out...' : '↪ Log Out'}
                </button>
            </div>
        </aside>
    );
}

export default Sidebar;
