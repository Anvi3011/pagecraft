import { Link } from 'react-router-dom';
import { Layers, Layout, Move, Eye, Globe, ChevronRight, CheckCircle2, Star } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="page-container">
      {/* Background Animated Orbs */}
      <div className="background-orbs">
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>
      </div>

      {/* Navigation */}
      <header className="navbar">
        <div className="logo-container">
          <Layers className="logo-icon" size={28} />
          <span className="logo-text">Pagecraft</span>
        </div>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <a href="#about" className="refresh-btn" style={{ border: 'none', background: 'transparent', boxShadow: 'none', textDecoration: 'none' }}>
            About
          </a>
          <Link to="/login" className="refresh-btn" style={{ border: 'none', background: 'transparent', boxShadow: 'none' }}>
            Log in
          </Link>
          <Link to="/register" className="refresh-btn primary" style={{ textDecoration: 'none' }}>
            Get Started
          </Link>
        </div>
      </header>

      <main className="main-content" style={{ maxWidth: '1200px', padding: '5rem 2rem 0 2rem' }}>
        {/* Hero Section */}
        <section style={{ textAlign: 'center', marginBottom: '8rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ 
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.4rem 1.2rem', 
            background: 'rgba(168, 85, 247, 0.1)', color: '#d8b4fe', borderRadius: '999px', 
            fontSize: '0.85rem', fontWeight: 600, border: '1px solid rgba(168, 85, 247, 0.2)', marginBottom: '2rem' 
          }}>
            <Layers size={16} /> The Premier No-Code Portfolio Builder
          </div>
          <h1 style={{ 
            fontSize: '4.5rem', fontWeight: 800, lineHeight: 1.1, marginBottom: '1.5rem', 
            color: '#fafafa', letterSpacing: '-0.04em', maxWidth: '800px'
          }}>
            Build a professional <br/>
            <span style={{ 
              background: 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)', 
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
            }}>portfolio</span> in minutes.
          </h1>
          <p style={{ fontSize: '1.25rem', color: '#a1a1aa', maxWidth: '650px', margin: '0 auto 2.5rem auto', lineHeight: 1.6 }}>
            Pagecraft is the enterprise-grade drag-and-drop web builder for professionals. Assemble your resume, showcase your projects, and publish to the web without writing a single line of code.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <Link to="/register" className="refresh-btn primary" style={{ fontSize: '1.1rem', padding: '0.85rem 1.75rem', textDecoration: 'none' }}>
              Start Building Free <ChevronRight size={18} style={{ marginLeft: '0.2rem' }} />
            </Link>
          </div>
          
          {/* Unique Live App Preview Window */}
          <div className="hero-mockup">
            <div className="mockup-header">
              <div className="mockup-dot red"></div>
              <div className="mockup-dot yellow"></div>
              <div className="mockup-dot green"></div>
              <div style={{ flex: 1, textAlign: 'center', fontSize: '0.8rem', color: '#71717a' }}>app.pagecraft.io/builder</div>
            </div>
            <div className="mockup-body">
              <div className="mockup-sidebar">
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#fafafa', letterSpacing: '0.05em' }}>COMPONENTS</span>
                <div className="mockup-block"><Layout size={14} style={{ marginRight: '0.5rem' }}/> Hero Section</div>
                <div className="mockup-block"><Star size={14} style={{ marginRight: '0.5rem' }}/> Skills Grid</div>
                <div className="mockup-block"><Move size={14} style={{ marginRight: '0.5rem' }}/> Projects Slider</div>
                <div className="mockup-block"><CheckCircle2 size={14} style={{ marginRight: '0.5rem' }}/> Experience</div>
              </div>
              <div className="mockup-canvas">
                <div className="mockup-element" style={{ padding: '2.5rem', textAlign: 'center', border: '2px solid rgba(168, 85, 247, 0.4)' }}>
                  <div className="mockup-skeleton-title" style={{ margin: '0 auto 1rem auto', height: '32px' }}></div>
                  <div className="mockup-skeleton-text" style={{ margin: '0 auto 0.5rem auto', width: '80%' }}></div>
                  <div className="mockup-skeleton-text" style={{ margin: '0 auto 2rem auto', width: '60%' }}></div>
                  <div style={{ width: '120px', height: '36px', background: '#a855f7', borderRadius: '6px', margin: '0 auto' }}></div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                  <div className="mockup-element">
                    <div className="mockup-skeleton-title" style={{ width: '40%' }}></div>
                    <div className="mockup-skeleton-text"></div>
                    <div className="mockup-skeleton-text"></div>
                  </div>
                  <div className="mockup-element">
                    <div className="mockup-skeleton-title" style={{ width: '40%' }}></div>
                    <div className="mockup-skeleton-text"></div>
                    <div className="mockup-skeleton-text"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" style={{ marginBottom: '8rem', padding: '4rem 0' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>
            <div>
              <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#fafafa', letterSpacing: '-0.03em', marginBottom: '1.5rem' }}>
                Your career deserves a <span style={{ color: '#a855f7' }}>better canvas.</span>
              </h2>
              <p style={{ fontSize: '1.15rem', color: '#a1a1aa', lineHeight: 1.7, marginBottom: '2rem' }}>
                We believe building a stunning portfolio shouldn't require a degree in computer science. Pagecraft was built from the ground up for professionals who want to stand out in a competitive job market without wrestling with complex code or restrictive templates.
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <CheckCircle2 color="#34d399" size={22} style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span style={{ color: '#e4e4e7', fontSize: '1.05rem', lineHeight: 1.5 }}><strong>Zero Code Required:</strong> Focus entirely on your content while our engine handles the responsive design.</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <CheckCircle2 color="#34d399" size={22} style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span style={{ color: '#e4e4e7', fontSize: '1.05rem', lineHeight: 1.5 }}><strong>Total Creative Freedom:</strong> Instantly switch themes and layouts without losing any data.</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                  <CheckCircle2 color="#34d399" size={22} style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span style={{ color: '#e4e4e7', fontSize: '1.05rem', lineHeight: 1.5 }}><strong>Lightning Fast:</strong> Go from a blank canvas to a published, world-class portfolio in under 10 minutes.</span>
                </li>
              </ul>
            </div>
            <div style={{ 
              background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.2) 0%, rgba(236, 72, 153, 0.2) 100%)', 
              borderRadius: '24px', padding: '2px', 
              boxShadow: '0 20px 40px -10px rgba(168, 85, 247, 0.15)' 
            }}>
              <div style={{ background: '#18181b', borderRadius: '22px', padding: '3rem', height: '100%' }}>
                <div style={{ width: '48px', height: '48px', background: 'rgba(168,85,247,0.15)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                  <Layers size={24} color="#a855f7" />
                </div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#fafafa', marginBottom: '1rem' }}>The Pagecraft Advantage</h3>
                <p style={{ color: '#a1a1aa', lineHeight: 1.7, marginBottom: 0 }}>
                  Whether you're a developer showcasing GitHub projects, a designer presenting case studies, or a marketer highlighting campaigns, Pagecraft adapts to your unique narrative. Stop blending in with generic resumes. Start crafting your digital legacy today.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features / How it works */}
        <section style={{ marginBottom: '8rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#fafafa', letterSpacing: '-0.03em', marginBottom: '1rem' }}>
              Everything you need to stand out
            </h2>
            <p style={{ fontSize: '1.15rem', color: '#a1a1aa', maxWidth: '600px', margin: '0 auto' }}>
              We provide all the tools you need to create a stunning, responsive portfolio that gets you hired.
            </p>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
            
            {/* Feature 1 */}
            <div className="diagnostic-section" style={{ padding: '2.5rem 2rem' }}>
              <div style={{ background: 'rgba(168, 85, 247, 0.1)', width: '56px', height: '56px', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                <Move size={28} color="#a855f7" />
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem', color: '#fafafa', fontWeight: 700 }}>Intuitive Builder</h3>
              <p style={{ color: '#a1a1aa', lineHeight: 1.6, fontSize: '1rem', margin: 0 }}>
                Choose from a library of professional section blocks. Drag them onto your canvas and reorder them freely.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="diagnostic-section" style={{ padding: '2.5rem 2rem' }}>
              <div style={{ background: 'rgba(5, 150, 105, 0.1)', width: '56px', height: '56px', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                <Eye size={28} color="#34d399" />
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem', color: '#fafafa', fontWeight: 700 }}>Live Inline Editing</h3>
              <p style={{ color: '#a1a1aa', lineHeight: 1.6, fontSize: '1rem', margin: 0 }}>
                Click on any text, image, or skill tag to edit it instantly. See exactly what your visitors will see in real-time.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="diagnostic-section" style={{ padding: '2.5rem 2rem' }}>
              <div style={{ background: 'rgba(217, 119, 6, 0.1)', width: '56px', height: '56px', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                <Layout size={28} color="#fbbf24" />
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem', color: '#fafafa', fontWeight: 700 }}>Instant Theming</h3>
              <p style={{ color: '#a1a1aa', lineHeight: 1.6, fontSize: '1rem', margin: 0 }}>
                Switch fonts, colors, and layout templates with a single click. Your content adapts automatically without data loss.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="diagnostic-section" style={{ padding: '2.5rem 2rem' }}>
              <div style={{ background: 'rgba(236, 72, 153, 0.1)', width: '56px', height: '56px', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                <Globe size={28} color="#f472b6" />
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem', color: '#fafafa', fontWeight: 700 }}>Publish & Export</h3>
              <p style={{ color: '#a1a1aa', lineHeight: 1.6, fontSize: '1rem', margin: 0 }}>
                Publish your portfolio to a public URL to share with recruiters, or export it as a clean, formatted PDF resume.
              </p>
            </div>

          </div>
        </section>

        {/* Testimonials */}
        <section style={{ marginBottom: '8rem', background: '#18181b', padding: '4rem', borderRadius: '24px', border: '1px solid #27272a', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.2)' }}>
          <h2 style={{ textAlign: 'center', fontSize: '2.25rem', fontWeight: 800, color: '#fafafa', letterSpacing: '-0.03em', marginBottom: '3rem' }}>
            Loved by job seekers
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
            <div>
              <div style={{ display: 'flex', gap: '0.2rem', color: '#fbbf24', marginBottom: '1rem' }}>
                <Star fill="currentColor" size={20} /><Star fill="currentColor" size={20} /><Star fill="currentColor" size={20} /><Star fill="currentColor" size={20} /><Star fill="currentColor" size={20} />
              </div>
              <p style={{ fontSize: '1.1rem', color: '#e4e4e7', lineHeight: 1.6, marginBottom: '1.5rem', fontStyle: 'italic' }}>
                "Pagecraft completely changed how I present myself to employers. I built a stunning portfolio in 20 minutes and landed three interviews the next week."
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#3f3f46' }}></div>
                <div>
                  <h4 style={{ margin: 0, color: '#fafafa', fontWeight: 600 }}>Sarah Jenkins</h4>
                  <p style={{ margin: 0, color: '#a1a1aa', fontSize: '0.9rem' }}>Senior Product Designer</p>
                </div>
              </div>
            </div>
            <div>
              <div style={{ display: 'flex', gap: '0.2rem', color: '#fbbf24', marginBottom: '1rem' }}>
                <Star fill="currentColor" size={20} /><Star fill="currentColor" size={20} /><Star fill="currentColor" size={20} /><Star fill="currentColor" size={20} /><Star fill="currentColor" size={20} />
              </div>
              <p style={{ fontSize: '1.1rem', color: '#e4e4e7', lineHeight: 1.6, marginBottom: '1.5rem', fontStyle: 'italic' }}>
                "The PDF export feature alone is worth it. Being able to maintain a single source of truth for both my web portfolio and my printable resume is a game-changer."
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#3f3f46' }}></div>
                <div>
                  <h4 style={{ margin: 0, color: '#fafafa', fontWeight: 600 }}>Michael Chen</h4>
                  <p style={{ margin: 0, color: '#a1a1aa', fontSize: '0.9rem' }}>Software Engineer</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section style={{ textAlign: 'center', marginBottom: '5rem', padding: '4rem 2rem', background: 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)', borderRadius: '24px', color: 'white', boxShadow: '0 10px 30px -5px rgba(236, 72, 153, 0.3)' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '1.5rem', letterSpacing: '-0.02em', color: '#ffffff' }}>Ready to boost your career?</h2>
          <p style={{ fontSize: '1.15rem', color: 'rgba(255,255,255,0.9)', maxWidth: '600px', margin: '0 auto 2.5rem auto' }}>
            Join thousands of professionals who have accelerated their career with a Pagecraft portfolio.
          </p>
          <Link to="/register" className="refresh-btn" style={{ fontSize: '1.1rem', padding: '0.85rem 2rem', textDecoration: 'none', color: '#a855f7', background: '#ffffff', border: 'none', fontWeight: 700 }}>
            Create Your Free Account
          </Link>
          <ul style={{ display: 'flex', justifyContent: 'center', gap: '2rem', listStyle: 'none', padding: 0, marginTop: '2.5rem', color: 'rgba(255,255,255,0.9)', fontSize: '0.95rem' }}>
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CheckCircle2 size={18} /> No credit card required</li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CheckCircle2 size={18} /> Setup in minutes</li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CheckCircle2 size={18} /> Free forever plan</li>
          </ul>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-grid">
          <div className="footer-col" style={{ gridColumn: 'span 2' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
              <Layers size={24} color="#a855f7" />
              <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fafafa' }}>Pagecraft</span>
            </div>
            <p style={{ color: '#a1a1aa', lineHeight: 1.6, maxWidth: '300px' }}>
              The modern platform for building professional portfolios and resumes without coding.
            </p>
          </div>
          <div className="footer-col">
            <h4>Product</h4>
            <ul>
              <li><Link to="/">Features</Link></li>
              <li><Link to="/">Templates</Link></li>
              <li><Link to="/">Pricing</Link></li>
              <li><Link to="/">Showcase</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Resources</h4>
            <ul>
              <li><Link to="/">Documentation</Link></li>
              <li><Link to="/">Blog</Link></li>
              <li><Link to="/">Career Guide</Link></li>
              <li><Link to="/">Help Center</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Company</h4>
            <ul>
              <li><Link to="/">About Us</Link></li>
              <li><Link to="/">Careers</Link></li>
              <li><Link to="/">Privacy Policy</Link></li>
              <li><Link to="/">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Pagecraft. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
