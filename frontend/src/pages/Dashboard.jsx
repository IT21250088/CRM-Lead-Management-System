import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { dashboardAPI } from '../services/api';
import './Dashboard.css';

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const { data } = await dashboardAPI.getStats();
      setStats(data);
      setLoading(false);
    } catch (err) {
      setError('Failed to load dashboard');
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="loading">Loading...</div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <div className="error-message">{error}</div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="dashboard-container">
        <h1>Dashboard</h1>
        <p className="dashboard-subtitle">Overview of your sales pipeline</p>

        <div className="stats-grid">
          <div className="stat-card">
            <h3 className="stat-value">{stats?.totalLeads || 0}</h3>
            <p className="stat-label">Total Leads</p>
          </div>

          <div className="stat-card stat-new">
            <h3 className="stat-value">{stats?.newLeads || 0}</h3>
            <p className="stat-label">New Leads</p>
          </div>

          <div className="stat-card stat-qualified">
            <h3 className="stat-value">{stats?.qualifiedLeads || 0}</h3>
            <p className="stat-label">Qualified Leads</p>
          </div>

          <div className="stat-card stat-won">
            <h3 className="stat-value">{stats?.wonLeads || 0}</h3>
            <p className="stat-label">Won Deals</p>
          </div>

          <div className="stat-card stat-lost">
            <h3 className="stat-value">{stats?.lostLeads || 0}</h3>
            <p className="stat-label">Lost Deals</p>
          </div>
        </div>

        <div className="revenue-section">
          <div className="revenue-card">
            <h3>Total Pipeline Value</h3>
            <p className="revenue-amount">
              ${(stats?.totalEstimatedValue || 0).toLocaleString()}
            </p>
          </div>

          <div className="revenue-card revenue-won">
            <h3>Won Deals Value</h3>
            <p className="revenue-amount">
              ${(stats?.totalWonValue || 0).toLocaleString()}
            </p>
          </div>
        </div>

        <div className="insights">
          <h2>Pipeline Insights</h2>
          <div className="insight-cards">
            <div className="insight-card">
              <span className="icon">📈</span>
              <p>
                {stats?.wonLeads === 0
                  ? 'Start closing deals to build your sales momentum'
                  : `You have ${stats?.wonLeads} closed deals worth $${(stats?.totalWonValue || 0).toLocaleString()}`}
              </p>
            </div>

            <div className="insight-card">
              <span className="icon">🎯</span>
              <p>
                {stats?.qualifiedLeads === 0
                  ? 'Qualify leads to move them through your pipeline'
                  : `${stats?.qualifiedLeads} leads are ready for proposals`}
              </p>
            </div>

            <div className="insight-card">
              <span className="icon">⏱️</span>
              <p>
                {stats?.newLeads === 0
                  ? 'No new leads yet. Start adding leads to grow your pipeline'
                  : `Follow up with ${stats?.newLeads} new lead${stats?.newLeads !== 1 ? 's' : ''}`}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
