var express = require('express');
var router = express.Router();
var path = require('path');
const { body, validationResult } = require('express-validator');
const { sendContactEmail, sendAutoReply } = require('../utils/emailService');
const Contact = require('../utils/contactModel');

// ============ HOME PAGE ============
router.get('/', function(req, res, next) {
  res.render('index', { 
    layout: false, 
    
    name: "Muhammed Sinan",
    primaryRole: "Lead Software Engineer",
    secondaryRole: "Islamic Enthusiast",
    bio: "Passionate self-taught developer, tech enthusiast, and public speaker using code to build scalable enterprise solutions.",
    
    social: {
      linkedin: "https://www.linkedin.com/in/sinan-code", 
      github: "https://github.com/sinanx692", 
      instagram: "https://www.instagram.com/sinanx_99",
      youtube: "#"
    },
    
    yearsOfExperience: "5",
    
    navLinks: [
      { url: "#about", label: "About" },
      { url: "#skills", label: "Skills" },
      { url: "#projects", label: "Projects" },
      { url: "#services", label: "Services" },
      { url: "#contact", class: "btn-primary", label: "Contact" }
    ],
    
    aboutText1: "I am a Lead Software Engineer with deep expertise in node.js full-stack development. My journey is defined by a relentless passion for technology and self-driven learning.",
    aboutText2: "Beyond the code, I am an active public speaker, sharing knowledge on tech trends, software architecture, and developer growth. I believe in building not just software, but scalable solutions that drive real value.",
    
    stats: [
      { number: "50", description: "Projects Completed" },
      { number: "20", description: "Tech Talks" }
    ],
    
    skillCategories: [
      {
        title: "Backend",
        icon: "fas fa-server",
        skills: ["Node.js", "Express", "RestApi", "PostgreSQL", "MongoDB", "Docker"]
      },
      {
        title: "Frontend",
        icon: "fas fa-laptop-code",
        skills: ["JavaScript (ES6+)", "React.js", "HTML5 & CSS3", "Bootsrap", "HTMX"]
      },
      {
        title: "Tools & Concepts",
        icon: "fas fa-tools",
        skills: ["Git & GitHub", "CI/CD Pipelines", "System Architecture", "Agile Leadership", "AWS / Cloud"]
      }
    ],
    
    projects: [
      {
        gridClass: "col-span-2",
        gradient: "linear-gradient(45deg, #2b5876, #4e4376)",
        title: "Enterprise ERP System",
        description: "A comprehensive scalable ERP solution built with Django and React, handling complex business logic and real-time data processing.",
        techStack: ["Django", "React", "PostgreSQL"],
        link: "#"
      },
      {
        gridClass: "",
        gradient: "linear-gradient(45deg, #cc2b5e, #753a88)",
        title: "AI-Powered Analytics Dashboard",
        description: "Data visualization platform integrating machine learning models for predictive analytics in real-time.",
        techStack: ["Python", "FastAPI", "D3.js"],
        link: "#"
      },
      {
        gridClass: "col-span-1 row-span-2",
        gradient: "linear-gradient(45deg, #11998e, #38ef7d)",
        title: "E-Commerce Microservices",
        description: "High-performance e-commerce backend architected with microservices for scalability and robustness.",
        techStack: ["Django", "Docker", "Kubernetes"],
        link: "#"
      },{
        gridClass: "col-span-1 row-span-2",
        gradient: "linear-gradient(45deg, #11998e, #38ef7d)",
        title: "E-Commerce Microservices",
        description: "High-performance e-commerce backend architected with microservices for scalability and robustness.",
        techStack: ["Django", "Docker", "Kubernetes"],
        link: "#"
      }
    ],
    
    services: [
      {
        icon: "fas fa-code",
        title: "Full Stack Development",
        description: "End-to-end web application development using Python, Django, and modern frontend frameworks."
      },
      {
        icon: "fas fa-network-wired",
        title: "System Architecture",
        description: "Designing scalable, secure, and efficient software architectures for enterprise needs."
      },
      {
        icon: "fas fa-users-cog",
        title: "Technical Leadership",
        description: "Leading dev teams, code reviews, and mentoring to ensure high-quality software delivery."
      }
    ],
    
    email: "hello@example.com", 
    location: "Remote / Worldwide"
  });
});

// ============ CONTACT FORM SUBMISSION ============
router.post('/api/contact', [
  // Validation middleware
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ min: 2, max: 100 }).withMessage('Name must be between 2 and 100 characters'),
  body('email')
    .trim()
    .isEmail().withMessage('Valid email is required')
    .normalizeEmail(),
  body('phone')
    .trim()
    .optional()
    .isMobilePhone().withMessage('Valid phone number required'),
  body('subject')
    .trim()
    .notEmpty().withMessage('Subject is required')
    .isLength({ min: 3, max: 200 }).withMessage('Subject must be between 3 and 200 characters'),
  body('message')
    .trim()
    .notEmpty().withMessage('Message is required')
    .isLength({ min: 10, max: 5000 }).withMessage('Message must be between 10 and 5000 characters')
], async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success: false, 
        errors: errors.array() 
      });
    }
    // 1. ഡാറ്റാബേസിലേക്ക് സേവ് ചെയ്യുക
const newContact = new Contact({
  name: req.body.name,
  email: req.body.email,
  phone: req.body.phone,
  subject: req.body.subject,
  message: req.body.message
});
await newContact.save();

    // Send email to admin
    const emailResult = await sendContactEmail(req.body);
    
    if (emailResult.success) {
      // Send auto-reply to visitor
      await sendAutoReply(req.body.email, req.body.name);
      
      return res.status(200).json({ 
        success: true, 
        message: 'Your message has been sent successfully! I\'ll get back to you soon.' 
      });
    } else {
      return res.status(500).json({ 
        success: false, 
        message: 'Failed to send email. Please try again later.' 
      });
    }
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'An error occurred. Please try again later.' 
    });
  }
});


// ============ API - GET PORTFOLIO DATA ============
router.get('/api/portfolio-data', (req, res) => {
  const portfolioData = {
    name: "Muhammed Sinan",
    title: "Lead Software Engineer",
    bio: "Passionate self-taught developer, tech enthusiast, and public speaker",
    experience: "5+",
    projectsCompleted: 50
  };
  res.json(portfolioData);
});

// ============ HEALTH CHECK ============
router.get('/api/health', (req, res) => {
  res.status(200).json({ 
    status: 'ok', 
    timestamp: new Date().toISOString() 
  });
});

module.exports = router;