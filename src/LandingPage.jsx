import { useState } from 'react';
import lockIcon from './assets/wavsafe-logo.png';
import './LandingPage.css'; // 👈 import external CSS
import { supabase } from './supabaseClient';

function LandingPage() {
  const [email, setEmail] = useState('');
  const [socialHandle, setSocialHandle] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());


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

      {/* Scroll Button */}
      <button 
        className="fade-button"
        onClick={() => {
          const signupSection = document.getElementById('signup');
          if (signupSection) {
            signupSection.scrollIntoView({ behavior: 'smooth' });
          }
        }}
      >
        Get Early Access
      </button>



      {/* Email and Social Handle Signup Form */}
      <div id="signup" style={{
        marginTop: '20rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1rem'
      }}>

        {/* Heading */}
        <h3 style={{
          marginBottom: '2rem',
          fontSize: '1.4rem',
          color: '#fff',
          fontWeight: '500',
          textAlign: 'center',
        }}>
          Complete the form to reserve your spot!
        </h3>

        {/* Email Input */}
        <input 
          type="email" 
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            padding: '0.75rem 1rem',
            fontSize: '1rem',
            borderRadius: '8px',
            border: '1px solid #555',
            width: '300px',
            maxWidth: '90%',
            backgroundColor: '#222',
            color: '#fff',
            transition: 'border 0.3s ease, box-shadow 0.3s ease',
          }}
        />

        {/* Social Handle Input */}
        <input 
          type="text" 
          placeholder="Enter your @social handle"
          value={socialHandle}
          onChange={(e) => setSocialHandle(e.target.value)}
          style={{
            padding: '0.75rem 1rem',
            fontSize: '1rem',
            borderRadius: '8px',
            border: '1px solid #555',
            width: '300px',
            maxWidth: '90%',
            backgroundColor: '#222',
            color: '#fff',
            transition: 'border 0.3s ease, box-shadow 0.3s ease',
          }}
        />

        {/* Submit Button */}
        <button 
          onClick={async () => {
            if (email.trim() !== '' && socialHandle.trim() !== '') {
              const { data, error } = await supabase
                .from('signups') // <- your new table name
                .insert([
                  {
                    email: email.trim(),
                    social_handle: socialHandle.trim(),
                    created_at: new Date().toISOString(),
                  }
                ]);
          
              if (error) {
                console.error(error);
                setSuccessMessage('Error saving signup. Please try again.');
              } else {
                setSuccessMessage('Thanks for signing up, we\'ll be in touch soon!');
                setEmail('');
                setSocialHandle('');
              }
            } else {
              setSuccessMessage('Please enter both your email and social handle!');
            }
          }}
        >
          Submit
        </button>

        {/* Success/Error Message */}
        {successMessage && (
          <p style={{
            marginTop: '1rem',
            color: successMessage.includes('Thanks') ? '#00ffcc' : '#ff6666',
            fontSize: '1rem',
            textAlign: 'center',
            transition: 'opacity 0.5s ease-in-out',
          }}>
            {successMessage}
          </p>
        )}
      </div>

      
      <a 
        href="https://app.wavsafe.com"
        className="launch-app-button"
      >
        Launch WavSafe App
      </a>


      {/* Footer */}
      <footer className="fade-footer" style={{ marginTop: '20rem', textAlign: 'center' }}>
        <p>© 2025 WavSafe. All rights reserved.</p>
        <p>Privacy Policy | Terms of Service</p>
      </footer>

    </div>
  )
}

export default LandingPage;
