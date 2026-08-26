import HealthCheck from './components/HealthCheck';
import { Layers, Sparkles, Database, Server, Globe } from 'lucide-react';
import './App.css';

export default function App() {
  return (
    <div className="page-container">
      <header className="navbar">
        <div className="logo-container">
          <Layers className="logo-icon" size={28} />
          <span className="logo-text">Pagecraft</span>
        </div>
        <div className="badge-env">MERN Stack • Base Setup</div>
      </header>

      <main className="main-content">
        <section className="hero-section">
          <div className="hero-badge">
            <Sparkles size={16} /> Base Project Initialized
          </div>
          <h1 className="hero-title">
            Pagecraft: Drag-and-Drop Portfolio Builder
          </h1>
          <p className="hero-description">
            A modular MERN-based web platform designed for building customizable, responsive personal portfolios and resumes with live preview, dynamic schema rendering, and PDF export.
          </p>

          <div className="stack-grid">
            <div className="stack-card">
              <div className="stack-header">
                <Database size={20} className="stack-icon mongo" />
                <span className="stack-title">MongoDB</span>
              </div>
              <p className="stack-desc">Flexible JSON document schema for dynamic block structures</p>
            </div>

            <div className="stack-card">
              <div className="stack-header">
                <Server size={20} className="stack-icon express" />
                <span className="stack-title">Express.js & Node.js</span>
              </div>
              <p className="stack-desc">Modular RESTful API with CORS, middleware, and health diagnostics</p>
            </div>

            <div className="stack-card">
              <div className="stack-header">
                <Globe size={20} className="stack-icon react" />
                <span className="stack-title">React & Vite</span>
              </div>
              <p className="stack-desc">Component-driven frontend UI with instant hot module reloading</p>
            </div>
          </div>
        </section>

        <section className="diagnostic-section">
          <h2>System Health & Connectivity</h2>
          <p className="diagnostic-desc">
            Verifying cross-origin communication between React frontend and Express backend.
          </p>
          <HealthCheck />
        </section>
      </main>

      <footer className="footer">
        <p>Pagecraft • Modular MERN Architecture • Internship Project</p>
      </footer>
    </div>
  );
}
