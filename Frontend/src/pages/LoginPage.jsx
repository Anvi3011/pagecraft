import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await login(form);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Login failed. Is the database running?');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="page-container">
      {/* Background Animated Orbs */}
      <div className="background-orbs">
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>
      </div>

      <header className="navbar" style={{ borderBottom: 'none', background: 'transparent' }}>
        <div className="logo-container">
          <Link to="/" className="nav-logo-link">
            <span className="logo-text">Pagecraft</span>
          </Link>
        </div>
        <div>
          <Link to="/" className="refresh-btn" style={{ border: 'none', background: 'transparent', boxShadow: 'none' }}>
            &larr; Back to Home
          </Link>
        </div>
      </header>
      <main className="main-content" style={{ maxWidth: 420, marginTop: '2rem' }}>
        <section className="diagnostic-section" style={{ textAlign: 'center' }}>
          <div style={{ width: '56px', height: '56px', background: 'rgba(168, 85, 247, 0.15)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem auto', boxShadow: '0 0 20px rgba(168, 85, 247, 0.2)' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
          </div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800 }}>Welcome back</h2>
          <p className="diagnostic-desc">Enter your details to continue.</p>

          <form onSubmit={handleSubmit} className="auth-form">
            <div>
              <label htmlFor="email" className="auth-label">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={form.email}
                onChange={handleChange}
                className="auth-input"
              />
            </div>

            <div>
              <label htmlFor="password" className="auth-label">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={form.password}
                onChange={handleChange}
                className="auth-input"
              />
            </div>

            {error && (
              <div className="error-box" style={{ color: '#ef4444', background: 'rgba(239, 68, 68, 0.1)', padding: '0.75rem', borderRadius: '8px', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
                <p style={{ margin: 0, fontSize: '0.9rem' }}>{error}</p>
              </div>
            )}

            <button type="submit" disabled={submitting} className="refresh-btn auth-submit">
              {submitting ? 'Logging in...' : 'Log in'}
            </button>
          </form>

          <p className="auth-footer-text">
            Don&apos;t have an account? <Link to="/register" className="auth-link">Register</Link>
          </p>
        </section>
      </main>
    </div>
  );
}
