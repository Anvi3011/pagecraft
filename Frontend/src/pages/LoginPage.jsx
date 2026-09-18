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
      setError(err.message || 'Login failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="page-container">
      <main className="main-content" style={{ maxWidth: 420 }}>
        <section className="diagnostic-section">
          <h2>Log in to Pagecraft</h2>
          <p className="diagnostic-desc">Welcome back — enter your details to continue.</p>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label htmlFor="email" style={{ display: 'block', marginBottom: '0.35rem', fontSize: '0.85rem', color: '#94a3b8' }}>
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={form.email}
                onChange={handleChange}
                style={inputStyle}
              />
            </div>

            <div>
              <label htmlFor="password" style={{ display: 'block', marginBottom: '0.35rem', fontSize: '0.85rem', color: '#94a3b8' }}>
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={form.password}
                onChange={handleChange}
                style={inputStyle}
              />
            </div>

            {error && (
              <div className="error-box">
                <p>{error}</p>
              </div>
            )}

            <button type="submit" disabled={submitting} className="refresh-btn" style={{ justifyContent: 'center' }}>
              {submitting ? 'Logging in...' : 'Log in'}
            </button>
          </form>

          <p style={{ marginTop: '1.25rem', fontSize: '0.85rem', color: '#94a3b8' }}>
            Don&apos;t have an account? <Link to="/register" style={{ color: '#818cf8' }}>Register</Link>
          </p>
        </section>
      </main>
    </div>
  );
}

const inputStyle = {
  width: '100%',
  padding: '0.6rem 0.75rem',
  borderRadius: '8px',
  border: '1px solid #334155',
  background: '#0f172a',
  color: '#f8fafc',
  fontSize: '0.9rem',
};
