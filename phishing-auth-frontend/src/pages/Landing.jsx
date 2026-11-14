
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Brand from '../components/Brand';

function Landing() {
    const { isAuthenticated } = useAuth();

    const features = [
        {
            number: '01',
            title: 'Password Management',
            description:
                'Keep your password management organized with a centralized place for your account information.',
        },
        {
            number: '02',
            title: 'Phishing Awareness',
            description:
                'Learn how to recognize suspicious websites, deceptive messages, and common phishing techniques.',
        },
        {
            number: '03',
            title: 'Security Awareness',
            description:
                'Build better digital security habits through practical learning and awareness activities.',
        },
    ];

    return (
        <main className="min-h-screen bg-slate-50 text-slate-800">
            {/* Navigation */}
            <header className="border-b border-slate-200 bg-white">
                <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
                    <Link to="/" aria-label="Vaultify homepage">
                        <Brand />
                    </Link>

                    <div className="flex items-center gap-3">
                        {isAuthenticated ? (
                            <Link
                                to="/dashboard"
                                className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    className="rounded-lg px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                                >
                                    Log In
                                </Link>

                                <Link
                                    to="/register"
                                    className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
                                >
                                    Get Started
                                </Link>
                            </>
                        )}
                    </div>
                </nav>
            </header>

            {/* Hero Section */}
            <section className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-24 md:grid-cols-2">
                <div>
                    <p className="mb-4 text-sm font-bold uppercase tracking-widest text-blue-600">
                        Digital Security Awareness
                    </p>

                    <h1 className="text-4xl font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
                        Take control of your
                        <span className="text-blue-600"> digital security.</span>
                    </h1>

                    <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-600">
                        Vaultify helps you understand password security,
                        recognize phishing threats, and develop safer
                        online habits.
                    </p>

                    <div className="mt-8 flex flex-wrap gap-4">
                        <Link
                            to={isAuthenticated ? '/dashboard' : '/register'}
                            className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white shadow-sm transition hover:bg-blue-700"
                        >
                            {isAuthenticated ? 'Go to Dashboard' : 'Get Started'}
                        </Link>

                        <a
                            href="#features"
                            className="rounded-lg border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-100"
                        >
                            Explore Features
                        </a>
                    </div>
                </div>

                {/* Hero Illustration Placeholder */}
                <div className="flex min-h-80 items-center justify-center rounded-3xl border border-slate-200 bg-white p-10 shadow-sm">
                    <div className="text-center">
                        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-2xl bg-blue-50">
                            <svg
                                viewBox="0 0 48 48"
                                className="h-14 w-14"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M24 4L40 10V21C40 32 33 40 24 44C15 40 8 32 8 21V10L24 4Z"
                                    stroke="#2563EB"
                                    strokeWidth="2.8"
                                    strokeLinejoin="round"
                                />
                                <circle cx="24" cy="20" r="4" fill="#2563EB" />
                                <path
                                    d="M22 23H26L28 33H20L22 23Z"
                                    fill="#2563EB"
                                />
                            </svg>
                        </div>

                        <h2 className="mt-6 text-2xl font-bold text-slate-800">
                            Your Security Matters
                        </h2>

                        <p className="mt-2 text-sm text-slate-500">
                            Stay informed. Stay protected.
                        </p>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="border-y border-slate-200 bg-white">
                <div className="mx-auto max-w-7xl px-6 py-20">
                    <div className="mx-auto mb-12 max-w-2xl text-center">
                        <p className="text-sm font-bold uppercase tracking-widest text-blue-600">
                            What Vaultify Offers
                        </p>

                        <h2 className="mt-3 text-3xl font-bold text-slate-900">
                            A smarter approach to online security
                        </h2>

                        <p className="mt-4 text-slate-600">
                            Explore the essential areas of password
                            management and phishing awareness.
                        </p>
                    </div>

                    <div className="grid gap-6 md:grid-cols-3">
                        {features.map((feature) => (
                            <article
                                key={feature.number}
                                className="rounded-2xl border border-slate-200 bg-slate-50 p-7 transition hover:-translate-y-1 hover:shadow-md"
                            >
                                <span className="text-sm font-bold text-blue-600">
                                    {feature.number}
                                </span>

                                <h3 className="mt-5 text-xl font-bold text-slate-800">
                                    {feature.title}
                                </h3>

                                <p className="mt-3 leading-relaxed text-slate-600">
                                    {feature.description}
                                </p>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="mx-auto max-w-7xl px-6 py-20">
                <div className="rounded-3xl bg-slate-900 px-8 py-14 text-center text-white sm:px-14">
                    <h2 className="text-3xl font-bold">
                        Make security a habit.
                    </h2>

                    <p className="mx-auto mt-4 max-w-xl text-slate-300">
                        Start exploring practical ways to improve your
                        awareness of online threats.
                    </p>

                    <Link
                        to={isAuthenticated ? '/dashboard' : '/register'}
                        className="mt-8 inline-block rounded-lg bg-blue-500 px-6 py-3 font-semibold text-white transition hover:bg-blue-400"
                    >
                        {isAuthenticated ? 'Open Dashboard' : 'Create an Account'}
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-slate-200 bg-white">
                <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-8 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
                    <Brand compact />

                    <p>
                        © {new Date().getFullYear()} Vaultify. All rights reserved.
                    </p>
                </div>
            </footer>
        </main>
    );
}

export default Landing;
