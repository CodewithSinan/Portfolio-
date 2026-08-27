import { useEffect, useState } from 'react';

const portfolio = {
  name: 'Muhammed Sinan',
  primaryRole: 'Lead Software Engineer',
  bio: 'Passionate self-taught developer, tech enthusiast, and public speaker using code to build scalable enterprise solutions.',
  secondaryRoles: ['Islamic Enthusiast', 'Full Stack Developer', 'Tech Leader'],
  social: {
    linkedin: 'https://www.linkedin.com/in/sinan-code',
    github: 'https://github.com/sinanx692',
    instagram: 'https://www.instagram.com/sinanx_99',
    youtube: '#'
  },
  navLinks: [
    ['about', 'About'], ['skills', 'Skills'], ['projects', 'Projects'], ['services', 'Services'], ['contact', 'Contact']
  ],
  skills: [
    ['fas fa-server', 'Backend', ['Node.js', 'Express', 'RestApi', 'PostgreSQL', 'MongoDB', 'Docker']],
    ['fas fa-laptop-code', 'Frontend', ['JavaScript (ES6+)', 'React.js', 'HTML5 & CSS3', 'Bootstrap', 'HTMX']],
    ['fas fa-tools', 'Tools & Concepts', ['Git & GitHub', 'CI/CD Pipelines', 'System Architecture', 'Agile Leadership', 'AWS / Cloud']]
  ],
  projects: [
    ['linear-gradient(45deg, #2b5876, #4e4376)', 'Enterprise ERP System', 'A comprehensive scalable ERP solution built with Django and React, handling complex business logic and real-time data processing.', ['Django', 'React', 'PostgreSQL']],
    ['linear-gradient(45deg, #cc2b5e, #753a88)', 'AI-Powered Analytics Dashboard', 'Data visualization platform integrating machine learning models for predictive analytics in real-time.', ['Python', 'FastAPI', 'D3.js']],
    ['linear-gradient(45deg, #11998e, #38ef7d)', 'E-Commerce Microservices', 'High-performance e-commerce backend architected with microservices for scalability and robustness.', ['Django', 'Docker', 'Kubernetes']]
  ],
  services: [
    ['fas fa-code', 'Full Stack Development', 'End-to-end web application development using Python, Django, and modern frontend frameworks.'],
    ['fas fa-network-wired', 'System Architecture', 'Designing scalable, secure, and efficient software architectures for enterprise needs.'],
    ['fas fa-users-cog', 'Technical Leadership', 'Leading dev teams, code reviews, and mentoring to ensure high-quality software delivery.']
  ]
};

function ThemeToggle() {
  const [light, setLight] = useState(() => localStorage.getItem('theme') === 'light');

  useEffect(() => {
    document.body.classList.toggle('light-theme', light);
    localStorage.setItem('theme', light ? 'light' : 'dark');
  }, [light]);

  return <button className="theme-btn" type="button" aria-label={light ? 'Switch to dark theme' : 'Switch to light theme'} title="Switch theme" onClick={() => setLight(!light)}>
    <i className={`fas fa-${light ? 'sun' : 'moon'}`} aria-hidden="true" />
  </button>;
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  return <nav className="navbar px-3 py-2 sm:px-5 lg:px-7">
    <div className="container nav-container mx-auto w-full max-w-7xl">
      <a href="#home" className="logo">Sinan<span className="accent">.</span></a>
      <ul className={`nav-links ${menuOpen ? 'mobile-open' : ''}`}>
        {portfolio.navLinks.map(([id, label]) => <li key={id}><a href={`#${id}`} className={id === 'contact' ? 'btn-primary btn-sm' : ''} onClick={() => setMenuOpen(false)}>{label}</a></li>)}
      </ul>
      <div className="nav-actions"><ThemeToggle /><button className={`hamburger ${menuOpen ? 'active' : ''}`} type="button" aria-label="Toggle navigation" onClick={() => setMenuOpen(!menuOpen)}><span className="bar" /><span className="bar" /><span className="bar" /></button></div>
    </div>
  </nav>;
}

function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  useEffect(() => { const timer = setInterval(() => setRoleIndex((index) => (index + 1) % portfolio.secondaryRoles.length), 2400); return () => clearInterval(timer); }, []);
  return <header className="hero min-h-[clamp(680px,100vh,900px)] px-3 sm:px-5 lg:px-8" id="home"><div className="container hero-container mx-auto w-full max-w-7xl"><div className="row align-items-center"><div className="col-lg-7 col-md-12 hero-content mb-5 mb-lg-0 text-center text-lg-start"><span className="greeting">Hello, I'm</span><h1 className="name text-4xl xs:text-5xl sm:text-6xl lg:text-7xl">{portfolio.name}</h1><h2 className="title text-2xl sm:text-3xl lg:text-4xl">{portfolio.primaryRole}<br /><span className="typing-text">{portfolio.secondaryRoles[roleIndex]}</span></h2><p className="bio mx-auto max-w-2xl text-base sm:text-lg lg:text-xl mx-lg-0">{portfolio.bio}</p><div className="hero-btns d-flex flex-column flex-xs-row flex-sm-row justify-content-center justify-content-lg-start gap-3"><a href="#projects" className="btn-primary w-full text-center xs:w-auto">View My Work</a><a href="#contact" className="btn-secondary w-full text-center xs:w-auto">Let's Talk</a></div><div className="social-links d-flex justify-content-center justify-content-lg-start mt-4">{Object.entries(portfolio.social).map(([network, url]) => <a href={url} target="_blank" rel="noreferrer" key={network} aria-label={network}><i className={`fab fa-${network === 'linkedin' ? 'linkedin-in' : network}`} /></a>)}</div></div><div className="col-lg-5 col-md-12 hero-visual d-flex justify-content-center mt-5 mt-lg-0"><div className="profile-card glass"><div className="code-badge"><i className="fas fa-code" /></div><img src="/images/profile-pic.png" alt={portfolio.name} className="profile-img img-fluid" /><div className="exp-badge"><span className="years">5+</span><span className="text">Years Exp.</span></div></div></div></div></div></header>;
}

function About() { return <section id="about" className="section about px-3 sm:px-5 lg:px-8"><div className="container mx-auto w-full max-w-7xl"><h2 className="section-title text-center">About Me</h2><div className="row align-items-center g-5 about-grid"><div className="col-lg-6"><div className="about-text glass p-4 p-md-5 h-100"><p>I am a Lead Software Engineer with deep expertise in node.js full-stack development. My journey is defined by a relentless passion for technology and self-driven learning.</p><p>Beyond the code, I am an active public speaker, sharing knowledge on tech trends, software architecture, and developer growth. I believe in building not just software, but scalable solutions that drive real value.</p><div className="stats d-flex flex-wrap gap-4 mt-4"><div className="stat-item"><span className="stat-num">50+</span><span className="stat-desc">Projects Completed</span></div><div className="stat-item"><span className="stat-num">20+</span><span className="stat-desc">Tech Talks</span></div></div></div></div><div className="col-lg-6"><div className="about-visual"><div className="code-block glass"><div className="window-header"><span className="dot red" /><span className="dot yellow" /><span className="dot green" /><span className="window-title">about_me.js</span></div><pre className="m-0"><code>{`class Developer:\n    constructor(self):\n        this.name = "Muhammed Sinan"\n        this.role = "Lead Engineer"\n        this.passion = ["Coding", "Speaking"]\n\n    buildfuture(self):\n        return "Innovation"`}</code></pre></div></div></div></div></div></section>; }

function Cards() { return <><section id="skills" className="section skills px-3 sm:px-5 lg:px-8"><div className="container mx-auto w-full max-w-7xl"><h2 className="section-title text-center">Expertise & Skills</h2><div className="row g-4 skills-grid">{portfolio.skills.map(([icon, title, skills]) => <div className="col-12 col-md-6 col-lg-4" key={title}><div className="skill-category glass h-100 p-4"><h3><i className={icon} /> {title}</h3><ul className="skill-list d-flex flex-wrap gap-2 ps-0 mb-0">{skills.map((skill) => <li key={skill}>{skill}</li>)}</ul></div></div>)}</div></div></section><section id="projects" className="section projects px-3 sm:px-5 lg:px-8"><div className="container mx-auto w-full max-w-7xl"><h2 className="section-title text-center">Featured Projects</h2><div className="row g-4 projects-grid">{portfolio.projects.map(([gradient, title, description, tech]) => <div className="col-12 col-md-6 col-lg-4" key={title}><article className="project-card glass h-100 d-flex flex-column"><div className="project-img"><div className="img-placeholder w-100 h-100" style={{ background: gradient }} /></div><div className="project-info p-4 flex-grow-1 d-flex flex-column"><h3>{title}</h3><p className="flex-grow-1">{description}</p><div className="tech-stack d-flex flex-wrap gap-2">{tech.map((item) => <span key={item}>{item}</span>)}</div></div></article></div>)}</div></div></section><section id="services" className="section services px-3 sm:px-5 lg:px-8"><div className="container mx-auto w-full max-w-7xl"><h2 className="section-title text-center">My Services</h2><div className="row g-4 services-grid">{portfolio.services.map(([icon, title, description]) => <div className="col-12 col-md-6 col-lg-4" key={title}><div className="service-card glass h-100 p-4 text-center"><i className={`${icon} service-icon mb-3`} /><h3>{title}</h3><p className="mb-0">{description}</p></div></div>)}</div></div></section></>; }

function Contact() { const [status, setStatus] = useState(null); const [sending, setSending] = useState(false); const submit = async (event) => { event.preventDefault(); setSending(true); setStatus(null); const form = new FormData(event.currentTarget); try { const response = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(Object.fromEntries(form)) }); const result = await response.json(); setStatus({ type: result.success ? 'success' : 'error', message: result.message || 'Please check the form and try again.' }); if (result.success) event.currentTarget.reset(); } catch { setStatus({ type: 'error', message: 'An error occurred. Please try again later.' }); } finally { setSending(false); } }; return <section id="contact" className="section contact px-3 sm:px-5 lg:px-8"><div className="container mx-auto w-full max-w-7xl"><h2 className="section-title text-center">Get In Touch</h2><div className="row g-0 contact-wrapper glass overflow-hidden rounded-4"><div className="col-lg-5"><div className="contact-info h-100 p-4 p-md-5"><h3 className="mb-3">Lets Build Something Amazing</h3><p className="mb-4">Have a project in mind or want to invite me for a talk? Feel free to reach out.</p><div className="contact-info-item d-flex gap-3 mb-4"><i className="fas fa-envelope mt-1 text-info" /><div><strong className="d-block">Email</strong><p className="mb-0">hello@example.com</p></div></div><div className="contact-info-item d-flex gap-3 mb-4"><i className="fas fa-map-marker-alt mt-1 text-info" /><div><strong className="d-block">Location</strong><p className="mb-0">Remote / Worldwide</p></div></div><div className="contact-info-item d-flex gap-3"><i className="fas fa-phone mt-1 text-info" /><div><strong className="d-block">Response Time</strong><p className="mb-0">Within 24 hours</p></div></div></div></div><div className="col-lg-7"><form className="contact-form h-100 p-4 p-md-5 d-flex flex-column gap-3" onSubmit={submit}><label>Full Name *<input type="text" name="name" placeholder="Enter Your Name" required minLength="2" /></label><label>Email Address *<input type="email" name="email" placeholder="Enter your Email" required /></label><label>Phone Number<input type="tel" name="phone" placeholder="Enter your Phone no" /></label><label>Subject *<input type="text" name="subject" placeholder="Project Inquiry" required minLength="3" /></label><label>Message *<textarea name="message" placeholder="Tell me about your project..." rows="5" required minLength="10" /></label><button type="submit" className="btn-primary mt-3 w-full border-0 rounded-pill py-2 sm:w-auto" disabled={sending}>{sending ? 'Sending...' : 'Send Message'}</button>{status && <div className={`form-message ${status.type}`}>{status.message}</div>}</form></div></div></div></section>; }

export default function App() { useEffect(() => { const reveal = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add('reveal')), { threshold: 0.1 }); document.querySelectorAll('.section').forEach((section) => reveal.observe(section)); return () => reveal.disconnect(); }, []); return <><div className="cursor" /><div className="cursor2" /><div className="background-glob" /><div className="background-glob-2" /><Header /><main><Hero /><About /><Cards /><Contact /></main></>; }
