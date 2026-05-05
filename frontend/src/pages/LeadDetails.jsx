import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import NotesList from '../components/NotesList';
import { leadsAPI, notesAPI } from '../services/api';
import './LeadDetails.css';

const getStatusBadgeClass = (status) => {
  const statusClass = {
    'New': 'badge-new',
    'Contacted': 'badge-contacted',
    'Qualified': 'badge-qualified',
    'Proposal Sent': 'badge-proposal',
    'Won': 'badge-won',
    'Lost': 'badge-lost'
  };
  return statusClass[status] || 'badge-new';
};

export default function LeadDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [lead, setLead] = useState(null);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      const [leadRes, notesRes] = await Promise.all([
        leadsAPI.getLeadById(id),
        notesAPI.getNotesByLeadId(id)
      ]);
      setLead(leadRes.data);
      setNotes(notesRes.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to load lead details');
      setLoading(false);
    }
  };

  const handleNotesChange = async () => {
    try {
      const { data } = await notesAPI.getNotesByLeadId(id);
      setNotes(data);
    } catch (err) {
      setError('Failed to update notes');
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
      <div className="lead-details-container">
        <div className="lead-details-header">
          <div>
            <h1>{lead?.leadName}</h1>
            <p className="company-name">{lead?.companyName}</p>
          </div>
          <div className="header-actions">
            <button
              onClick={() => navigate(`/leads/${id}/edit`)}
              className="btn-primary"
            >
              Edit Lead
            </button>
            <button
              onClick={() => {
                if (window.confirm('Delete this lead?')) {
                  leadsAPI.deleteLead(id).then(() => navigate('/leads'));
                }
              }}
              className="btn-danger"
            >
              Delete
            </button>
          </div>
        </div>

        <div className="details-content">
          <div className="details-main">
            <div className="details-card">
              <h2>Contact Information</h2>
              <div className="detail-item">
                <label>Email</label>
                <a href={`mailto:${lead?.email}`}>{lead?.email}</a>
              </div>
              <div className="detail-item">
                <label>Phone</label>
                <p>{lead?.phone || 'Not provided'}</p>
              </div>
              <div className="detail-item">
                <label>Lead Source</label>
                <p>{lead?.leadSource}</p>
              </div>
              <div className="detail-item">
                <label>Assigned Salesperson</label>
                <p>{lead?.assignedSalesperson}</p>
              </div>
            </div>

            <div className="details-card">
              <h2>Pipeline Information</h2>
              <div className="detail-item">
                <label>Status</label>
                <p>
                  <span className={`badge ${getStatusBadgeClass(lead?.status)}`}>
                    {lead?.status}
                  </span>
                </p>
              </div>
              <div className="detail-item">
                <label>Estimated Deal Value</label>
                <p className="deal-value">
                  ${(lead?.estimatedDealValue || 0).toLocaleString()}
                </p>
              </div>
              <div className="detail-item">
                <label>Created Date</label>
                <p>{new Date(lead?.createdAt).toLocaleDateString()}</p>
              </div>
              <div className="detail-item">
                <label>Last Updated</label>
                <p>{new Date(lead?.updatedAt).toLocaleDateString()}</p>
              </div>
            </div>
          </div>

          <div className="details-sidebar">
            <NotesList
              notes={notes}
              onNotesChange={handleNotesChange}
              leadId={id}
              currentUser={user.name}
            />
          </div>
        </div>
      </div>
    </>
  );
}
