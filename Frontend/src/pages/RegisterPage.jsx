import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: '', email: '', password: '' });
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
      await register(form);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Registration failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="page-container">
      <main className="main-content" style={{ maxWidth: 420 }}>
        <section className="diagnostic-section">
          <h2>Create your Pagecraft account</h2>
          <p className="diagnostic-desc">Build your portfolio in minutes.</p>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label htmlFor="name" style={{ display: 'block', marginBottom: '0.35rem', fontSize: '0.85rem', color: '#94a3b8' }}>
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={form.name}
                onChange={handleChange}
                style={inputStyle}
              />
            </div>

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
                minLength={6}
                value={form.password}
                onChange={handleChange}
                style={inputStyle}
              />
              <p style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.3rem' }}>At least 6 characters.</p>
            </div>

            {error && (
              <div className="error-box">
                <p>{error}</p>
              </div>
            )}

            <button type="submit" disabled={submitting} className="refresh-btn" style={{ justifyContent: 'center' }}>
              {submitting ? 'Creating account...' : 'Register'}
            </button>
          </form>

          <p style={{ marginTop: '1.25rem', fontSize: '0.85rem', color: '#94a3b8' }}>
            Already have an account? <Link to="/login" style={{ color: '#818cf8' }}>Log in</Link>
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
