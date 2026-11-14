
import { useAuth } from '../context/AuthContext';
import Sidebar from '../components/Sidebar';

function Dashboard() {
    const { user } = useAuth();

    return (
        <main className="min-h-screen bg-slate-100 md:flex">

            <Sidebar />

            <section className="min-w-0 flex-1">
                <header className="border-b border-slate-200 bg-white px-6 py-5">
                    <h1 className="text-xl font-bold text-slate-800">
                        Overview
                    </h1>

                    <p className="mt-1 text-sm text-slate-500">
                        Welcome to your Vaultify workspace.
                    </p>
                </header>

                <div className="mx-auto max-w-7xl p-6 md:p-10">

                    <div className="rounded-2xl bg-white p-8 shadow-sm">
                        <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
                            Participant Dashboard
                        </p>

                        <h2 className="mt-3 text-3xl font-bold text-slate-900">
                            Welcome, {user?.name || 'Participant'}!
                        </h2>

                        <p className="mt-3 max-w-2xl leading-relaxed text-slate-600">
                            Manage your security learning experience and
                            explore the tools and resources available in
                            Vaultify.
                        </p>
                    </div>

                    <div className="mt-8">
                        <h2 className="text-lg font-bold text-slate-800">
                            Your Workspace
                        </h2>

                        <p className="mt-1 text-sm text-slate-500">
                            Explore the different areas of Vaultify.
                        </p>

                        <div className="mt-5 grid gap-5 md:grid-cols-2 xl:grid-cols-3">

                            <article className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                                <h3 className="font-bold text-slate-800">
                                    Password Vault
                                </h3>

                                <p className="mt-2 text-sm text-slate-500">
                                    A future space for organizing and managing
                                    password information.
                                </p>

                                <span className="mt-5 inline-block text-xs font-semibold text-slate-400">
                                    Coming Soon
                                </span>
                            </article>

                            <article className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                                <h3 className="font-bold text-slate-800">
                                    Security Awareness
                                </h3>

                                <p className="mt-2 text-sm text-slate-500">
                                    Learn about phishing, suspicious links,
                                    and safer online practices.
                                </p>

                                <span className="mt-5 inline-block text-xs font-semibold text-slate-400">
                                    Coming Soon
                                </span>
                            </article>

                            <article className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                                <h3 className="font-bold text-slate-800">
                                    Account Profile
                                </h3>

                                <p className="mt-2 text-sm text-slate-500">
                                    Review your participant account information.
                                </p>

                                <span className="mt-5 inline-block text-xs font-semibold text-slate-400">
                                    Coming Soon
                                </span>
                            </article>

                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default Dashboard;
