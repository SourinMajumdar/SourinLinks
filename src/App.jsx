import { useState, useEffect } from 'react'
import { Instagram, Linkedin, Facebook, Github, Globe, Mail, Send, Heart, Check, X } from 'lucide-react'
import { FaRedditAlien, FaDiscord, FaLinkedinIn, FaFacebook, FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import emailjs from 'emailjs-com'
import { motion } from 'framer-motion'
import profileImage from './assets/mypic.jpg'
import './App.css'

const App = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [status, setStatus] = useState('')
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const socialLinks = [
    { icon: Instagram, label: 'Instagram', url: 'https://instagram.com/sourinsig', color: '#E4405F' },
    { icon: FaLinkedinIn, label: 'LinkedIn', url: 'https://linkedin.com/in/sourinmajumdar', color: '#0077B5' },
    { icon: FaFacebook , label: 'Facebook', url: 'https://facebook.com/sourin.majumdar/', color: '#1877F2' },
    { icon: FaGithub , label: 'GitHub', url: 'https://github.com/SourinMajumdar', color: '#dddddd' },
    { icon: FaRedditAlien, label: 'Reddit', url: 'https://reddit.com/u/sourin___69', color: '#FF4500' },
    { icon: Globe, label: 'Website', url: 'https://sourin.vercel.app', color: '#6366F1' },
    { icon: FaDiscord, label: 'Discord', url: 'https://discord.com/users/sourinuwu', color: '#633cff'},
    { icon: FaXTwitter , label: 'X (Twitter)', url: '', color: '#ffffff'}
  ]

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')

    try {
        const result = await emailjs.send(
        'sourinemail',  
        'template_p1qdf9p', 
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          to_email: 'sourin.mjmdr@gmail.com'
        },
        'PhbXpt3M0kVhOX8Q-'  
      )

      if (result.text === 'OK') {
        setStatus('success')
        setFormData({ name: '', email: '', message: '' })
        setTimeout(() => setStatus(''), 3000)
      }
    } catch (error) {
      console.error('Failed to send email:', error)
      setStatus('error')
      setTimeout(() => setStatus(''), 3000)
    }
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <div className="app-container">
      {/* Animated Stars Background */}
      <div className="stars-container">
        <div className="stars"></div>
        <div className="stars2"></div>
        <div className="stars3"></div>
      </div>

      {/* Content */}
      <div className="content">
        {/* Profile Section */}
        <div className="profile-section">
          <motion.div 
            className="profile-image-wrapper"
            initial={{ y: -200, opacity: 0 }}
            animate={isLoaded ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <img 
              src={profileImage} 
              alt="Sourin Majumdar" 
              className="profile-image"
            />
          </motion.div>
          <motion.h1 
            className="profile-name"
            initial={{ y: 50, opacity: 0 }}
            animate={isLoaded ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          >
            Sourin Majumdar
          </motion.h1>
        </div>

        {/* Social Links */}
        <motion.div 
          className="links-section"
          initial={{ y: 50, opacity: 0 }}
          animate={isLoaded ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
        >
          <div className="social-buttons">
            {socialLinks.map((link, index) => {
              const Icon = link.icon
              const isLucideIcon = link.icon !== FaRedditAlien
              return (
                <motion.a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-button"
                  style={{ '--hover-color': link.color }}
                  initial={{ y: 30, opacity: 0 }}
                  animate={isLoaded ? { y: 0, opacity: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1, ease: "easeOut" }}
                >
                  {isLucideIcon ? <Icon size={22} /> : <Icon style={{ fontSize: '22px' }} />}
                  <span>{link.label}</span>
                </motion.a>
              )
            })}
          </div>

          {/* Contact Form */}
          <motion.div 
            className="contact-form-wrapper"
            initial={{ y: 50, opacity: 0 }}
            animate={isLoaded ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 1.2, ease: "easeOut" }}
          >
            <h2 className="form-title">
              <Mail size={24} />
              Send me a message
            </h2>
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-row">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="form-input"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="form-input"
                />
              </div>
              <textarea
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="4"
                className="form-textarea"
              />
              <button 
                type="submit" 
                className={`submit-button ${status === 'success' ? 'success' : ''} ${status === 'error' ? 'error' : ''}`}
                disabled={status === 'sending'}
              >
                {status === 'sending' && (
                  <>
                    Sending...
                    <Send size={18} />
                  </>
                )}
                {status === 'success' && (
                  <>
                    Message Sent Successfully!
                    <Check size={18} />
                  </>
                )}
                {status === 'error' && (
                  <>
                    Failed to Send. Try Again
                    <X size={18} />
                  </>
                )}
                {!status && (
                  <>
                    Send Message
                    <Send size={18} />
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <p>
          Made with <span className="heart"><Heart size={13}/></span> by Sourin Majumdar
        </p>
        <p className="copyright">© 2026 All rights reserved</p>
      </footer>
    </div>
  )
}

export default App