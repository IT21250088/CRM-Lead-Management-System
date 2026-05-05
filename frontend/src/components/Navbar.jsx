import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/dashboard" className="navbar-logo">
          CRM Lead Manager
        </Link>
        <ul className="nav-menu">
          <li>
            <Link to="/dashboard" className="nav-link">Dashboard</Link>
          </li>
          <li>
            <Link to="/leads" className="nav-link">Leads</Link>
          </li>
          <li className="nav-right">
            <span className="user-name">{user.name}</span>
            <button onClick={handleLogout} className="btn-logout">Logout</button>
          </li>
        </ul>
      </div>
    </nav>
  );
}
