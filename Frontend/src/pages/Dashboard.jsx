import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
  const { user, logout } = useAuth();

  return (
    <div className="page-container">
      <header className="navbar">
        <span className="logo-text">Pagecraft</span>
        <button className="refresh-btn" onClick={logout}>Log out</button>
      </header>
      <main className="main-content">
        <section className="diagnostic-section">
          <h2>Welcome, {user?.name}</h2>
          <p className="diagnostic-desc">
            This is a placeholder dashboard — portfolio list/create/duplicate (FR-10) lands here later.
          </p>
        </section>
      </main>
    </div>
  );
}
