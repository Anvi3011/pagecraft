import { useState, useEffect } from 'react';
import { checkHealth } from '../services/api';
import { CheckCircle2, XCircle, RefreshCw } from 'lucide-react';

export default function HealthCheck() {
  const [healthData, setHealthData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStatus = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await checkHealth();
      setHealthData(data);
    } catch (err) {
      setError(err.message || 'Failed to connect to backend');
      setHealthData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatus();
  }, []);

  return (
    <div className="health-card">
      <div className="health-header">
        <div className="status-indicator">
          {loading ? (
            <RefreshCw className="icon spin" size={20} />
          ) : error ? (
            <XCircle className="icon error" size={20} />
          ) : (
            <CheckCircle2 className="icon success" size={20} />
          )}
          <span className="status-title">
            Backend Status:{' '}
            <strong>
              {loading ? 'Checking...' : error ? 'Offline / Error' : 'Connected'}
            </strong>
          </span>
        </div>
        <button
          className="refresh-btn"
          onClick={fetchStatus}
          disabled={loading}
          title="Re-check backend status"
        >
          <RefreshCw size={14} className={loading ? 'spin' : ''} />
          <span>Refresh</span>
        </button>
      </div>

      <div className="health-details">
        {loading && <p className="health-text">Testing connection to backend API...</p>}
        {error && (
          <div className="error-box">
            <p><strong>Error:</strong> {error}</p>
            <p className="hint">Ensure the backend server is running on port 5000 (`npm run dev:backend`).</p>
          </div>
        )}
        {healthData && (
          <div className="health-grid">
            <div className="health-item">
              <span className="label">Status:</span>
              <span className="value badge success">{healthData.status}</span>
            </div>
            <div className="health-item">
              <span className="label">Message:</span>
              <span className="value">{healthData.message}</span>
            </div>
            <div className="health-item">
              <span className="label">Database:</span>
              <span className={`value badge ${healthData.services?.database === 'connected' ? 'success' : 'warning'}`}>
                {healthData.services?.database || 'unknown'}
              </span>
            </div>
            <div className="health-item">
              <span className="label">Uptime:</span>
              <span className="value">{healthData.uptime}</span>
            </div>
            <div className="health-item">
              <span className="label">Timestamp:</span>
              <span className="value timestamp">{new Date(healthData.timestamp).toLocaleTimeString()}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
