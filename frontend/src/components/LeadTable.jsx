import { Link } from 'react-router-dom';
import './LeadTable.css';

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

export default function LeadTable({ leads, onDelete, onEdit }) {
  return (
    <div className="table-container">
      <table className="leads-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Company</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Status</th>
            <th>Source</th>
            <th>Deal Value</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {leads.length === 0 ? (
            <tr>
              <td colSpan="8" className="empty-message">No leads found</td>
            </tr>
          ) : (
            leads.map(lead => (
              <tr key={lead._id} className="lead-row">
                <td>
                  <Link to={`/leads/${lead._id}`} className="lead-link">
                    {lead.leadName}
                  </Link>
                </td>
                <td>{lead.companyName}</td>
                <td>{lead.email}</td>
                <td>{lead.phone || '-'}</td>
                <td>
                  <span className={`badge ${getStatusBadgeClass(lead.status)}`}>
                    {lead.status}
                  </span>
                </td>
                <td>{lead.leadSource}</td>
                <td className="currency">
                  {lead.estimatedDealValue ? `$${lead.estimatedDealValue.toLocaleString()}` : '-'}
                </td>
                <td>
                  <div className="actions">
                    <button
                      onClick={() => onEdit(lead._id)}
                      className="btn-small btn-primary"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm('Are you sure you want to delete this lead?')) {
                          onDelete(lead._id);
                        }
                      }}
                      className="btn-small btn-danger"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
