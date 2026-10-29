import { useEffect, useState, useRef } from 'react';

const portfolio = {
  name: 'Muhammed Sinan',
  primaryRole: 'Lead Software Engineer',
  bio: 'Self-taught developer, software architect, and tech speaker passionate about engineering scalable distributed systems, high-performance web applications, and developer leadership.',
  secondaryRoles: [
    'Full Stack Architect',
    'System Designer',
    'Tech Speaker & Mentor',
    'Open Source Enthusiast'
  ],
  social: {
    linkedin: { url: 'https://www.linkedin.com/in/sinan-code', icon: 'fab fa-linkedin-in', label: 'LinkedIn' },
    github: { url: 'https://github.com/sinanx692', icon: 'fab fa-github', label: 'GitHub' },
    instagram: { url: 'https://www.instagram.com/sinanx_99', icon: 'fab fa-instagram', label: 'Instagram' },
    email: { url: 'mailto:muhammedsinan22273@gmail.com', icon: 'fas fa-envelope', label: 'Email' }
  },
  navLinks: [
    ['home', 'Home'],
    ['about', 'About'],
    ['skills', 'Skills'],
    ['projects', 'Projects'],
    ['services', 'Services'],
    ['contact', 'Contact']
  ],
  stats: [
    { number: '5+', label: 'Years Experience' },
    { number: '50+', label: 'Projects Shipped' },
    { number: '20+', label: 'Tech Talks' },
    { number: '99.9%', label: 'Uptime Built' }
  ],
  skills: [
    {
      category: 'Backend & Cloud',
      icon: 'fas fa-server',
      items: ['Node.js', 'Express', 'REST APIs', 'PostgreSQL', 'MongoDB', 'Docker', 'Redis', 'AWS']
    },
    {
      category: 'Frontend Engineering',
      icon: 'fas fa-laptop-code',
      items: ['JavaScript (ES6+)', 'React.js', 'TailwindCSS', 'Bootstrap', 'HTML5 & CSS3', 'HTMX', 'Vite']
    },
    {
      category: 'DevOps & Architecture',
      icon: 'fas fa-cubes',
      items: ['System Architecture', 'Microservices', 'Git & GitHub', 'CI/CD Pipelines', 'Agile Leadership', 'Linux']
    }
  ],
  projects: [
    {
      title: 'Enterprise ERP System',
      description: 'A comprehensive scalable enterprise resource planning platform handling complex workflows, inventory pipelines, and multi-tenant reporting with real-time sync.',
      gradient: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
      tech: ['React', 'Node.js', 'PostgreSQL', 'Docker'],
      demoUrl: 'https://github.com/sinanx692',
      githubUrl: 'https://github.com/sinanx692'
    },
    {
      title: 'AI Analytics & Metrics Dashboard',
      description: 'High-throughput visual telemetry dashboard integrating machine learning anomaly detection and streaming analytics with interactive data visualizations.',
      gradient: 'linear-gradient(135deg, #833ab4 0%, #fd1d1d 50%, #fcb045 100%)',
      tech: ['React', 'Python', 'FastAPI', 'Chart.js'],
      demoUrl: 'https://github.com/sinanx692',
      githubUrl: 'https://github.com/sinanx692'
    },
    {
      title: 'E-Commerce Microservices Engine',
      description: 'Distributed microservices architecture built for high concurrency, order orchestration, automated queue workers, and resilient fault isolation.',
      gradient: 'linear-gradient(135deg, #0ba360 0%, #3cba92 100%)',
      tech: ['Node.js', 'Express', 'MongoDB', 'Docker', 'Redis'],
      demoUrl: 'https://github.com/sinanx692',
      githubUrl: 'https://github.com/sinanx692'
    },
    {
      title: 'Real-Time Collaboration Platform',
      description: 'WebSocket-powered collaborative workspace enabling live document synchronization, granular team permissions, and end-to-end event logging.',
      gradient: 'linear-gradient(135deg, #0052d4 0%, #4364f7 50%, #6fb1fc 100%)',
      tech: ['React', 'Socket.io', 'Node.js', 'PostgreSQL'],
      demoUrl: 'https://github.com/sinanx692',
      githubUrl: 'https://github.com/sinanx692'
    }
  ],
  services: [
    {
      icon: 'fas fa-code',
      title: 'Full Stack Development',
      description: 'End-to-end modern web applications built for reliability, clean architecture, and seamless user experiences across mobile and desktop.'
    },
    {
      icon: 'fas fa-network-wired',
      title: 'System Architecture',
      description: 'Designing robust, secure, and horizontally scalable backends, database models, and cloud-ready microservices.'
    },
    {
      icon: 'fas fa-users-cog',
      title: 'Technical Leadership',
      description: 'Mentoring engineering talent, running code reviews, establishing CI/CD practices, and driving high-velocity delivery standards.'
    }
  ],
  contact: {
    email: 'muhammedsinan22273@gmail.com',
    location: 'Remote / Worldwide',
    responseTime: 'Within 24 hours'
  }
};

function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [trail, setTrail] = useState({ x: -100, y: -100 });
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);
  const posRef = useRef({ x: -100, y: -100 });

  useEffect(() => {
    // Only enable custom cursor if fine pointer (mouse)
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) return;

    const onMouseMove = (e) => {
      posRef.current = { x: e.clientX, y: e.clientY };
      setPos({ x: e.clientX, y: e.clientY });
      setVisible(true);
    };

    const onMouseOver = (e) => {
      if (e.target.closest('a, button, input, textarea, .project-card, .service-card, .skill-category')) {
        setHovered(true);
      } else {
        setHovered(false);
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseover', onMouseOver);

    let animId;
    const animateTrail = () => {
      setTrail((prev) => ({
        x: prev.x + (posRef.current.x - prev.x) * 0.22,
        y: prev.y + (posRef.current.y - prev.y) * 0.22
      }));
      animId = requestAnimationFrame(animateTrail);
    };
    animId = requestAnimationFrame(animateTrail);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
      cancelAnimationFrame(animId);
    };
  }, []);

  if (!visible) return null;

  return (
    <>
      <div
        className="cursor"
        style={{
          left: `${pos.x}px`,
          top: `${pos.y}px`,
          transform: `translate(-50%, -50%) scale(${hovered ? 1.6 : 1})`,
          transition: 'transform 0.15s ease'
        }}
      />
      <div
        className="cursor2"
        style={{
          left: `${trail.x}px`,
          top: `${trail.y}px`,
          transform: `translate(-50%, -50%) scale(${hovered ? 1.4 : 1})`,
          borderColor: hovered ? 'var(--accent-color)' : 'rgba(0, 210, 255, 0.45)',
          transition: 'border-color 0.2s ease, transform 0.2s ease'
        }}
      />
    </>
  );
}

function ThemeToggle() {
  const [light, setLight] = useState(() => {
    try {
      return localStorage.getItem('theme') === 'light';
    } catch {
      return false;
    }
  });

  useEffect(() => {
    document.body.classList.toggle('light-theme', light);
    try {
      localStorage.setItem('theme', light ? 'light' : 'dark');
    } catch (e) {
      console.warn(e);
    }
  }, [light]);

  return (
    <button
      className="theme-btn"
      type="button"
      aria-label={light ? 'Switch to dark theme' : 'Switch to light theme'}
      title={light ? 'Switch to dark theme' : 'Switch to light theme'}
      onClick={() => setLight(!light)}
    >
      <i className={`fas fa-${light ? 'sun' : 'moon'}`} aria-hidden="true" />
    </button>
  );
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);

      const sections = ['home', 'about', 'skills', 'projects', 'services', 'contact'];
      const scrollPos = window.scrollY + 140;
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="container nav-container mx-auto w-full max-w-7xl">
        <a href="#home" className="logo" onClick={() => setMenuOpen(false)}>
          <span className="logo-badge">&lt;/&gt;</span>
          <span>Sinan<span className="accent">.</span></span>
        </a>

        <ul className={`nav-links ${menuOpen ? 'mobile-open' : ''}`}>
          {portfolio.navLinks.map(([id, label]) => {
            if (id === 'contact') {
              return (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    className="nav-cta-btn"
                    onClick={() => setMenuOpen(false)}
                  >
                    <span>Let's Talk</span>
                    <i className="fas fa-arrow-right ms-1 text-xs" />
                  </a>
                </li>
              );
            }
            return (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className={`nav-link-item ${activeSection === id ? 'active' : ''}`}
                  onClick={() => setMenuOpen(false)}
                >
                  {label}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="nav-actions">
          <ThemeToggle />
          <button
            className={`hamburger ${menuOpen ? 'active' : ''}`}
            type="button"
            aria-label="Toggle navigation"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span className="bar" />
            <span className="bar" />
            <span className="bar" />
          </button>
        </div>
      </div>
    </nav>
  );
}

function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % portfolio.secondaryRoles.length);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="hero min-h-[clamp(680px,100vh,900px)] px-3 sm:px-5 lg:px-8" id="home">
      <div className="container hero-container mx-auto w-full max-w-7xl">
        <div className="row align-items-center w-100">
          <div className="col-lg-7 col-md-12 hero-content mb-5 mb-lg-0 text-center text-lg-start">
            <span className="greeting">Hello, I'm</span>
            <h1 className="name text-4xl xs:text-5xl sm:text-6xl lg:text-7xl">
              {portfolio.name}
            </h1>
            <h2 className="title text-2xl sm:text-3xl lg:text-4xl">
              {portfolio.primaryRole}
              <br />
              <span className="typing-text">{portfolio.secondaryRoles[roleIndex]}</span>
            </h2>
            <p className="bio mx-auto max-w-2xl text-base sm:text-lg lg:text-xl mx-lg-0">
              {portfolio.bio}
            </p>
            <div className="hero-btns d-flex flex-column flex-xs-row flex-sm-row justify-content-center justify-content-lg-start gap-3">
              <a href="#projects" className="btn-primary w-full text-center xs:w-auto">
                <i className="fas fa-layer-group me-2" /> View My Work
              </a>
              <a href="#contact" className="btn-secondary w-full text-center xs:w-auto">
                <i className="fas fa-paper-plane me-2" /> Let's Talk
              </a>
            </div>
            <div className="social-links d-flex justify-content-center justify-content-lg-start mt-4">
              {Object.entries(portfolio.social).map(([key, item]) => (
                <a
                  href={item.url}
                  target={key === 'email' ? '_self' : '_blank'}
                  rel="noreferrer"
                  key={key}
                  aria-label={item.label}
                  title={item.label}
                >
                  <i className={item.icon} />
                </a>
              ))}
            </div>
          </div>

          <div className="col-lg-5 col-md-12 hero-visual d-flex justify-content-center mt-4 mt-lg-0">
            <div className="profile-round-container">
              {/* Ambient Radial Aura Glow */}
              <div className="profile-ambient-glow" />

              {/* Rotating Glowing Conic Ring */}
              <div className="profile-spin-ring" />

              {/* High-Tech Counter-Rotating Dashed Orbit */}
              <div className="profile-tech-ring" />

              {/* Core Circular Glass Housing */}
              <div className={`profile-circle ${imgError ? 'has-error' : ''}`}>
                <img
                  src="/images/profile-pic.png?v=3"
                  alt={portfolio.name}
                  className="profile-img"
                  loading="eager"
                  onError={() => {
                    setImgError(true);
                  }}
                />
                {imgError && (
                  <div className="profile-fallback-avatar">
                    <i className="fas fa-user-astronaut" />
                  </div>
                )}
              </div>

              {/* Floating Badge 1: Code */}
              <div className="floating-badge badge-code" title="Code Excellence & Architecture">
                <i className="fas fa-code" />
              </div>

              {/* Floating Badge 2: Tech Lead */}
              <div className="floating-badge badge-lead" title="Lead Software Engineer">
                <i className="fas fa-terminal" />
              </div>

              {/* Floating Badge 3: Years of Experience */}
              <div className="floating-badge badge-exp" title="5+ Years of Industry Experience">
                <span className="exp-number">5+</span>
                <span className="exp-label">Years Exp</span>
              </div>

              {/* Floating Badge 4: Live Status */}
              <div className="floating-badge badge-status" title="Open to high-impact opportunities">
                <span className="status-ping" />
                <span className="status-label">Available for Work</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

function About() {
  return (
    <section id="about" className="section about px-3 sm:px-5 lg:px-8">
      <div className="container mx-auto w-full max-w-7xl">
        <h2 className="section-title text-center">About Me</h2>
        <div className="row align-items-center g-5 about-grid">
          <div className="col-lg-6">
            <div className="about-text glass p-4 p-md-5 h-100">
              <p>
                I am a <strong>Lead Software Engineer</strong> with extensive hands-on experience
                designing, building, and deploying modern web applications and microservices. My
                journey is fueled by deep curiosity, self-driven learning, and a commitment to
                clean, maintainable code.
              </p>
              <p>
                Beyond daily engineering, I am an active <strong>tech speaker</strong> and mentor,
                frequently sharing insights on software architecture, resilient system design, and
                developer growth.
              </p>
              <div className="stats d-flex flex-wrap gap-4 mt-4">
                {portfolio.stats.map((item, idx) => (
                  <div className="stat-item" key={idx}>
                    <span className="stat-num">{item.number}</span>
                    <span className="stat-desc">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="about-visual">
              <div className="code-block glass rounded-4 overflow-hidden shadow-lg">
                <div className="window-header d-flex align-items-center">
                  <span className="dot red" />
                  <span className="dot yellow" />
                  <span className="dot green" />
                  <span className="window-title">sinan.config.ts</span>
                </div>
                <pre className="m-0 p-4">
                  <code>{`export const developer = {
  name: "Muhammed Sinan",
  role: "Lead Software Engineer",
  focus: ["Distributed Systems", "Full-Stack Dev"],
  passions: [
    "Clean Architecture",
    "Public Tech Talks",
    "Open Source Contributions"
  ],
  status: "Available for high-impact challenges",
  buildFuture: () => ({
    scalable: true,
    performance: "100%",
    reliability: "Enterprise-grade"
  })
};`}</code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" className="section skills px-3 sm:px-5 lg:px-8">
      <div className="container mx-auto w-full max-w-7xl">
        <h2 className="section-title text-center">Expertise & Skills</h2>
        <div className="row g-4 skills-grid">
          {portfolio.skills.map((category) => (
            <div className="col-12 col-md-6 col-lg-4" key={category.category}>
              <div className="skill-category glass h-100 p-4">
                <h3>
                  <i className={`${category.icon} me-2`} /> {category.category}
                </h3>
                <ul className="skill-list d-flex flex-wrap gap-2 ps-0 mb-0 mt-3">
                  {category.items.map((skill) => (
                    <li key={skill}>{skill}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section id="projects" className="section projects px-3 sm:px-5 lg:px-8">
      <div className="container mx-auto w-full max-w-7xl">
        <h2 className="section-title text-center">Featured Projects</h2>
        <div className="row g-4 projects-grid">
          {portfolio.projects.map((proj) => (
            <div className="col-12 col-md-6 col-lg-6" key={proj.title}>
              <article className="project-card glass h-100 d-flex flex-column rounded-4 overflow-hidden">
                <div className="project-img position-relative" style={{ minHeight: '160px' }}>
                  <div
                    className="img-placeholder w-100 h-100 d-flex align-items-center justify-content-center text-white"
                    style={{ background: proj.gradient, padding: '2rem' }}
                  >
                    <i className="fas fa-laptop-code fa-3x opacity-50" />
                  </div>
                </div>
                <div className="project-info p-4 flex-grow-1 d-flex flex-column">
                  <h3 className="h4 mb-2">{proj.title}</h3>
                  <p className="flex-grow-1 text-muted mb-3">{proj.description}</p>
                  <div className="tech-stack d-flex flex-wrap gap-2 mb-4">
                    {proj.tech.map((item) => (
                      <span key={item} className="badge-pill">
                        {item}
                      </span>
                    ))}
                  </div>
                  <div className="d-flex gap-3 mt-auto">
                    <a
                      href={proj.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-secondary btn-sm m-0 d-inline-flex align-items-center gap-2"
                    >
                      <i className="fab fa-github" /> Code
                    </a>
                    <a
                      href="#contact"
                      className="btn-primary btn-sm d-inline-flex align-items-center gap-2"
                    >
                      <i className="fas fa-external-link-alt" /> Inquire
                    </a>
                  </div>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="services" className="section services px-3 sm:px-5 lg:px-8">
      <div className="container mx-auto w-full max-w-7xl">
        <h2 className="section-title text-center">My Services</h2>
        <div className="row g-4 services-grid">
          {portfolio.services.map((srv) => (
            <div className="col-12 col-md-6 col-lg-4" key={srv.title}>
              <div className="service-card glass h-100 p-4 text-center">
                <i className={`${srv.icon} service-icon mb-3`} />
                <h3>{srv.title}</h3>
                <p className="mb-0">{srv.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [status, setStatus] = useState(null);
  const [sending, setSending] = useState(false);

  const submit = async (event) => {
    event.preventDefault();
    setSending(true);
    setStatus(null);
    const form = new FormData(event.currentTarget);
    const payload = Object.fromEntries(form);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const result = await response.json();
      setStatus({
        type: result.success ? 'success' : 'error',
        message: result.message || 'Please check your inputs and try again.'
      });
      if (result.success) {
        event.target.reset();
      }
    } catch {
      setStatus({
        type: 'error',
        message: 'Could not connect to server. Please try again later or email directly.'
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="section contact px-3 sm:px-5 lg:px-8">
      <div className="container mx-auto w-full max-w-7xl">
        <h2 className="section-title text-center">Get In Touch</h2>
        <div className="row g-0 contact-wrapper glass overflow-hidden rounded-4">
          <div className="col-lg-5">
            <div className="contact-info h-100 p-4 p-md-5">
              <h3 className="mb-3">Let's Build Something Amazing</h3>
              <p className="mb-4 text-muted">
                Have an ambitious project, need a technical consultation, or looking for a speaker
                for your next tech meetup? Let's connect!
              </p>

              <div className="contact-info-item d-flex gap-3 mb-4">
                <i className="fas fa-envelope mt-1 text-info" />
                <div>
                  <strong className="d-block">Email</strong>
                  <a
                    href={`mailto:${portfolio.contact.email}`}
                    className="text-break text-muted hover-accent"
                  >
                    {portfolio.contact.email}
                  </a>
                </div>
              </div>

              <div className="contact-info-item d-flex gap-3 mb-4">
                <i className="fas fa-map-marker-alt mt-1 text-info" />
                <div>
                  <strong className="d-block">Location</strong>
                  <p className="mb-0 text-muted">{portfolio.contact.location}</p>
                </div>
              </div>

              <div className="contact-info-item d-flex gap-3">
                <i className="fas fa-clock mt-1 text-info" />
                <div>
                  <strong className="d-block">Availability</strong>
                  <p className="mb-0 text-muted">{portfolio.contact.responseTime}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-7">
            <form className="contact-form h-100 p-4 p-md-5 d-flex flex-column gap-3" onSubmit={submit}>
              <label>
                Full Name *
                <input type="text" name="name" placeholder="Muhammed Sinan" required minLength={2} />
              </label>

              <label>
                Email Address *
                <input type="email" name="email" placeholder="name@example.com" required />
              </label>

              <label>
                Phone Number
                <input type="tel" name="phone" placeholder="+1 (555) 000-0000" />
              </label>

              <label>
                Subject *
                <input type="text" name="subject" placeholder="Project Inquiry / Tech Talk" required minLength={3} />
              </label>

              <label>
                Message *
                <textarea
                  name="message"
                  placeholder="Tell me about your project goals, timelines, or questions..."
                  rows={5}
                  required
                  minLength={10}
                />
              </label>

              <button
                type="submit"
                className="btn-primary mt-3 w-full border-0 rounded-pill py-3 sm:w-auto"
                disabled={sending}
              >
                {sending ? (
                  <span>
                    <i className="fas fa-spinner fa-spin me-2" /> Sending...
                  </span>
                ) : (
                  <span>
                    <i className="fas fa-paper-plane me-2" /> Send Message
                  </span>
                )}
              </button>

              {status && (
                <div className={`form-message ${status.type} mt-3`}>
                  <i className={`fas fa-${status.type === 'success' ? 'check-circle' : 'exclamation-circle'} me-2`} />
                  {status.message}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer py-5">
      <div className="container mx-auto w-full max-w-7xl px-3 sm:px-5 lg:px-8 text-center">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-3 mb-4">
          <a href="#home" className="logo">
            Sinan<span className="accent">.</span>
          </a>

          <div className="d-flex gap-3">
            {Object.entries(portfolio.social).map(([key, item]) => (
              <a
                href={item.url}
                target={key === 'email' ? '_self' : '_blank'}
                rel="noreferrer"
                key={key}
                aria-label={item.label}
                className="social-icon"
              >
                <i className={item.icon} />
              </a>
            ))}
          </div>

          <button
            onClick={scrollToTop}
            className="btn-secondary btn-sm d-inline-flex align-items-center gap-2 m-0"
            type="button"
            title="Scroll to top"
          >
            <i className="fas fa-arrow-up" /> Back to Top
          </button>
        </div>

        <hr className="my-4 opacity-25" />

        <p className="text-muted small m-0">
          &copy; {new Date().getFullYear()} {portfolio.name}. All rights reserved. Built with Node.js, Express & React.
        </p>
      </div>
    </footer>
  );
}

export default function App() {
  useEffect(() => {
    const reveal = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal');
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.section').forEach((section) => reveal.observe(section));
    return () => reveal.disconnect();
  }, []);

  return (
    <>
      <CustomCursor />
      <div className="background-glob" />
      <div className="background-glob-2" />
      <Header />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Services />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
