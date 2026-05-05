import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { leadsAPI } from '../services/api';
import './LeadForm.css';

const STATUSES = ['New', 'Contacted', 'Qualified', 'Proposal Sent', 'Won', 'Lost'];
const LEAD_SOURCES = ['Website', 'LinkedIn', 'Referral', 'Cold Email', 'Event', 'Other'];

export default function LeadForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(!!id);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    leadName: '',
    companyName: '',
    email: '',
    phone: '',
    leadSource: 'Website',
    assignedSalesperson: 'Admin User',
    status: 'New',
    estimatedDealValue: ''
  });

  useEffect(() => {
    if (id) {
      fetchLead();
    }
  }, [id]);

  const fetchLead = async () => {
    try {
      const { data } = await leadsAPI.getLeadById(id);
      setFormData(data);
      setLoading(false);
    } catch (err) {
      setError('Failed to load lead');
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'estimatedDealValue' ? parseFloat(value) || '' : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      if (id) {
        await leadsAPI.updateLead(id, formData);
      } else {
        await leadsAPI.createLead(formData);
      }
      navigate('/leads');
    } catch (err) {
      setError(err.response?.data?.message || 'Error saving lead');
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="lead-form-container">
      <div className="form-card">
        <h1>{id ? 'Edit Lead' : 'Create New Lead'}</h1>
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit} className="form">
          <div className="form-row">
            <div className="form-group">
              <label>Lead Name *</label>
              <input
                type="text"
                name="leadName"
                value={formData.leadName}
                onChange={handleChange}
                required
                placeholder="e.g., John Smith"
              />
            </div>
            <div className="form-group">
              <label>Company Name *</label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                required
                placeholder="e.g., TechCorp Inc"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="john@example.com"
              />
            </div>
            <div className="form-group">
              <label>Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+1-555-0101"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Lead Source *</label>
              <select
                name="leadSource"
                value={formData.leadSource}
                onChange={handleChange}
                required
              >
                {LEAD_SOURCES.map(source => (
                  <option key={source} value={source}>{source}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Status *</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                required
              >
                {STATUSES.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Assigned Salesperson</label>
              <input
                type="text"
                name="assignedSalesperson"
                value={formData.assignedSalesperson}
                onChange={handleChange}
                placeholder="Admin User"
              />
            </div>
            <div className="form-group">
              <label>Estimated Deal Value ($)</label>
              <input
                type="number"
                name="estimatedDealValue"
                value={formData.estimatedDealValue}
                onChange={handleChange}
                placeholder="50000"
              />
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-primary">
              {id ? 'Update Lead' : 'Create Lead'}
            </button>
            <button
              type="button"
              className="btn-secondary"
              onClick={() => navigate('/leads')}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
