import { Users, Briefcase, Globe, Mail } from "lucide-react"
import "./about.css"
import world from "../../media/world.jpg"


export default function About() {
  return (
    <div className="about-container">
      {/* Hero Section */}
      <section className="hero-section"
      style={{ backgroundImage: `url(${world})`}}>
        <div className="hero-content">
          <h1>Connecting Talent With Opportunity</h1>
          <p>Your trusted partner in career growth and professional development</p>
        </div>
      </section>

      {/* Company Overview */}
      <section className="overview-section">
        <div className="section-content">
          <h2>About JobConnect</h2>
          <p>
            Founded in 2020, JobConnect has been at the forefront of revolutionizing how job seekers and employers
            connect. Our platform combines cutting-edge technology with a human-centric approach to make job searching
            and recruitment more efficient and effective.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2>Why Choose Us</h2>
        <div className="features-grid">
          <div className="feature-card">
            <Users className="feature-icon" />
            <h3>Vast Network</h3>
            <p>Connect with thousands of employers and job seekers worldwide</p>
          </div>
          <div className="feature-card">
            <Briefcase className="feature-icon" />
            <h3>Smart Matching</h3>
            <p>AI-powered job matching for better career opportunities</p>
          </div>
          <div className="feature-card">
            <Globe className="feature-icon" />
            <h3>Global Reach</h3>
            <p>Access opportunities from around the world</p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <h2>Meet Our Team</h2>
        <div className="team-grid">
          {[
            {
              name: "John Smith",
              role: "CEO & Founder",
              image: "/placeholder.svg?height=200&width=200",
            },
            {
              name: "Sarah Johnson",
              role: "Head of Operations",
              image: "/placeholder.svg?height=200&width=200",
            },
            {
              name: "Mike Wilson",
              role: "Tech Lead",
              image: "/placeholder.svg?height=200&width=200",
            },
          ].map((member, index) => (
            <div key={index} className="team-card">
              <img src={member.image || "/placeholder.svg"} alt={member.name} />
              <h3>{member.name}</h3>
              <p>{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-section">
        <div className="contact-content">
          <h2>Ready to Get Started?</h2>
          <p>Join thousands of successful professionals who found their dream jobs through JobConnect</p>
          <div className="contact-buttons">
            <button className="primary-button">Sign Up Now</button>
            <button 
              className="secondary-button"
              onClick={() => window.location.href = "mailto:1shubham1256@gmail.com"}
            >
              <Mail className="button-icon" />
              Contact Us
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

