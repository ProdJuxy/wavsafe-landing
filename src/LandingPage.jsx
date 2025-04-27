import lockIcon from './assets/wavsafe-logo.png';
import './LandingPage.css'; // 👈 import external CSS

function LandingPage() {
  return (
    <div className="landing-wrapper">
      
      {/* Logo */}
      <div className="fade-logo">
        <img 
          src={lockIcon} 
          alt="Lock Icon" 
          className="logo-image"
        />
      </div>

      {/* Tagline */}
      <h2 className="fade-tagline">
        Secure Your Sound.
      </h2>

      {/* Button */}
      <button className="fade-button">
        Get Early Access
      </button>

    </div>
  )
}

export default LandingPage;
