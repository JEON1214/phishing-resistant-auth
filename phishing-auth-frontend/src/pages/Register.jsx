
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Brand from '../components/Brand';

function Register() {
    const { register } = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setErrors({});
        setLoading(true);

        try {
            await register(formData);

            navigate('/login', {
                state: {
                    message: 'Registration successful! You may now log in.',
                },
            });
        } catch (error) {
            if (error.response?.status === 422) {
                setErrors(error.response.data.errors || {});
            } else {
                setErrors({
                    general: ['Unable to register. Please try again.'],
                });
            }
        } finally {
            setLoading(false);
        }
    };

    const inputClass =
        'w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100';

    return (
        <main className="min-h-screen flex items-center justify-center bg-slate-100 px-4 py-10">
            <div className="absolute top-4 left-4">
                <Brand />
            </div>
            <section className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold text-slate-800">
                        Create an Account
                    </h1>

                    <p className="mt-2 text-sm text-slate-500">
                        Register to access the participant dashboard.
                    </p>
                </div>

                {errors.general && (
                    <div className="mb-5 rounded-lg bg-red-50 p-3 text-sm text-red-700">
                        {errors.general[0]}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label htmlFor="name" className="mb-1 block text-sm font-medium text-slate-700">
                            Full Name
                        </label>

                        <input
                            id="name"
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            autoComplete="name"
                            maxLength={255}
                            required
                            className={inputClass}
                            placeholder="Your full name"
                        />

                        {errors.name && (
                            <p className="mt-1 text-sm text-red-600">
                                {errors.name[0]}
                            </p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="email" className="mb-1 block text-sm font-medium text-slate-700">
                            Email Address
                        </label>

                        <input
                            id="email"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            autoComplete="email"
                            maxLength={255}
                            required
                            className={inputClass}
                            placeholder="you@example.com"
                        />

                        {errors.email && (
                            <p className="mt-1 text-sm text-red-600">
                                {errors.email[0]}
                            </p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="password" className="mb-1 block text-sm font-medium text-slate-700">
                            Password
                        </label>

                        <input
                            id="password"
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            autoComplete="new-password"
                            minLength={8}
                            required
                            className={inputClass}
                            placeholder="At least 8 characters"
                        />

                        {errors.password && (
                            <p className="mt-1 text-sm text-red-600">
                                {errors.password[0]}
                            </p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="password_confirmation" className="mb-1 block text-sm font-medium text-slate-700">
                            Confirm Password
                        </label>

                        <input
                            id="password_confirmation"
                            type="password"
                            name="password_confirmation"
                            value={formData.password_confirmation}
                            onChange={handleChange}
                            autoComplete="new-password"
                            minLength={8}
                            required
                            className={inputClass}
                            placeholder="Re-enter your password"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {loading ? 'Registering...' : 'Create Account'}
                    </button>
                </form>

                <p className="mt-6 text-center text-sm text-slate-600">
                    Already have an account?{' '}
                    <Link
                        to="/login"
                        className="font-semibold text-blue-600 hover:text-blue-700"
                    >
                        Log in
                    </Link>
                </p>
            </section>
        </main>
    );
}

export default Register;
