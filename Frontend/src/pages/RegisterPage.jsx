import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    
    if (form.password !== form.confirmPassword) {
      return setError('Passwords do not match');
    }

    setSubmitting(true);
    try {
      await register({ name: form.name, email: form.email, password: form.password });
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Registration failed. Is the database running?');
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
          <div style={{ width: '56px', height: '56px', background: 'rgba(236, 72, 153, 0.15)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem auto', boxShadow: '0 0 20px rgba(236, 72, 153, 0.2)' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ec4899" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><line x1="20" y1="8" x2="20" y2="14"></line><line x1="23" y1="11" x2="17" y2="11"></line></svg>
          </div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800 }}>Create your account</h2>
          <p className="diagnostic-desc">Build your portfolio in minutes.</p>

          <form onSubmit={handleSubmit} className="auth-form">
            <div>
              <label htmlFor="name" className="auth-label">Name</label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={form.name}
                onChange={handleChange}
                className="auth-input"
              />
            </div>

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
                minLength={6}
                value={form.password}
                onChange={handleChange}
                className="auth-input"
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="auth-label">Confirm Password</label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                minLength={6}
                value={form.confirmPassword}
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
              {submitting ? 'Creating account...' : 'Register'}
            </button>
          </form>

          <p className="auth-footer-text">
            Already have an account? <Link to="/login" className="auth-link">Log in</Link>
          </p>
        </section>
      </main>
    </div>
  );
}
