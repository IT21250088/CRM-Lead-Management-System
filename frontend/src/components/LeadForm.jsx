import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { leadsAPI } from '../services/api';
import { validateLeadForm } from '../utils/validations';
import './LeadForm.css';

const STATUSES = ['New', 'Contacted', 'Qualified', 'Proposal Sent', 'Won', 'Lost'];
const LEAD_SOURCES = ['Website', 'LinkedIn', 'Referral', 'Cold Email', 'Event', 'Other'];

export default function LeadForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(!!id);
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
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
    setFieldErrors({});

    // Validate form
    const errors = validateLeadForm(formData);
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

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
                placeholder="Alex Johnson"
                className={fieldErrors.leadName ? 'input-error' : ''}
              />
              {fieldErrors.leadName && <span className="field-error">{fieldErrors.leadName}</span>}
            </div>
            <div className="form-group">
              <label>Company Name *</label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                placeholder="Acme Solutions"
                className={fieldErrors.companyName ? 'input-error' : ''}
              />
              {fieldErrors.companyName && <span className="field-error">{fieldErrors.companyName}</span>}
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
                placeholder="alex.johnson@company.com"
                className={fieldErrors.email ? 'input-error' : ''}
              />
              {fieldErrors.email && <span className="field-error">{fieldErrors.email}</span>}
            </div>
            <div className="form-group">
              <label>Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+94 123 456 789"
                className={fieldErrors.phone ? 'input-error' : ''}
              />
              {fieldErrors.phone && <span className="field-error">{fieldErrors.phone}</span>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Lead Source *</label>
              <select
                name="leadSource"
                value={formData.leadSource}
                onChange={handleChange}
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
                placeholder="John Doe"
              />
            </div>
            <div className="form-group">
              <label>Estimated Deal Value ($)</label>
              <input
                type="number"
                name="estimatedDealValue"
                value={formData.estimatedDealValue}
                onChange={handleChange}
                placeholder="100000"
                className={fieldErrors.estimatedDealValue ? 'input-error' : ''}
              />
              {fieldErrors.estimatedDealValue && <span className="field-error">{fieldErrors.estimatedDealValue}</span>}
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
