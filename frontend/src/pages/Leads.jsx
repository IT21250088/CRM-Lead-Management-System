import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import LeadTable from '../components/LeadTable';
import { leadsAPI } from '../services/api';
import './Leads.css';

const STATUSES = ['All', 'New', 'Contacted', 'Qualified', 'Proposal Sent', 'Won', 'Lost'];
const LEAD_SOURCES = ['All', 'Website', 'LinkedIn', 'Referral', 'Cold Email', 'Event', 'Other'];
const SALESPEOPLE = ['All', 'Admin User'];

export default function Leads() {
  const navigate = useNavigate();
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [filters, setFilters] = useState({
    search: '',
    status: 'All',
    leadSource: 'All',
    assignedSalesperson: 'All'
  });

  useEffect(() => {
    fetchLeads();
  }, [filters]);

  const fetchLeads = async () => {
    try {
      setLoading(true);
      const query = {};

      if (filters.search) query.search = filters.search;
      if (filters.status !== 'All') query.status = filters.status;
      if (filters.leadSource !== 'All') query.leadSource = filters.leadSource;
      if (filters.assignedSalesperson !== 'All') {
        query.assignedSalesperson = filters.assignedSalesperson;
      }

      const { data } = await leadsAPI.getLeads(query);
      setLeads(data);
      setError('');
    } catch (err) {
      setError('Failed to load leads');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSearchChange = (e) => {
    setFilters(prev => ({
      ...prev,
      search: e.target.value
    }));
  };

  const handleDeleteLead = async (id) => {
    try {
      await leadsAPI.deleteLead(id);
      fetchLeads();
    } catch (err) {
      setError('Failed to delete lead');
    }
  };

  const handleEditLead = (id) => {
    navigate(`/leads/${id}/edit`);
  };

  const handleResetFilters = () => {
    setFilters({
      search: '',
      status: 'All',
      leadSource: 'All',
      assignedSalesperson: 'All'
    });
  };

  return (
    <>
      <Navbar />
      <div className="leads-container">
        <div className="leads-header">
          <h1>Leads Management</h1>
          <button
            onClick={() => navigate('/leads/new')}
            className="btn-primary"
          >
            + New Lead
          </button>
        </div>

        {error && <div className="error-message">{error}</div>}

        <div className="filters-section">
          <div className="filter-group">
            <input
              type="text"
              name="search"
              value={filters.search}
              onChange={handleSearchChange}
              placeholder="Search by name, company, or email..."
              className="search-input"
            />
          </div>

          <div className="filters-row">
            <div className="filter-group">
              <label>Status</label>
              <select
                name="status"
                value={filters.status}
                onChange={handleFilterChange}
              >
                {STATUSES.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label>Lead Source</label>
              <select
                name="leadSource"
                value={filters.leadSource}
                onChange={handleFilterChange}
              >
                {LEAD_SOURCES.map(source => (
                  <option key={source} value={source}>{source}</option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label>Salesperson</label>
              <select
                name="assignedSalesperson"
                value={filters.assignedSalesperson}
                onChange={handleFilterChange}
              >
                {SALESPEOPLE.map(person => (
                  <option key={person} value={person}>{person}</option>
                ))}
              </select>
            </div>

            <button
              onClick={handleResetFilters}
              className="btn-reset"
            >
              Reset Filters
            </button>
          </div>
        </div>

        {loading ? (
          <div className="loading">Loading leads...</div>
        ) : (
          <>
            <div className="leads-count">
              Found {leads.length} lead{leads.length !== 1 ? 's' : ''}
            </div>
            <LeadTable
              leads={leads}
              onDelete={handleDeleteLead}
              onEdit={handleEditLead}
            />
          </>
        )}
      </div>
    </>
  );
}
