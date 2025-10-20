// MenuIcon.jsx
import './MenuIcon.css';

function MenuIcon({ onClick }) {
  return (
   <div className="menu-icon" onClick={onClick}>
  <div className="bar bar1"></div>
  <div className="bar bar2"></div>
</div>
  );
}

export default MenuIcon;
