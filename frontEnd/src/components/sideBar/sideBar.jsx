// SideBar.jsx
import './SideBar.css';

function SideBar({ isOpen, onClose }) {
  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      {/* Close Button */}
      <button className="close-btn" onClick={onClose}>
        ✕
      </button>

      {/* Sidebar Content */}
      <ul className="highlight">
        <li>JASON DUVAL</li>
        <li>LUCIA CAMINOS</li>
        <li>CAL HAMPTON</li>
        <li>BOOBIE IKE</li>
        <li>DRE'QUAN PRIEST</li>
        <li>REAL DIMEZ</li>
        <li >RAUL BAUTISTA</li>
        <li>BRIAN HEDER</li>
      </ul>
    </div>
  );
}

export default SideBar;
