// ===== CUSTOM CURSOR =====
const cursor = document.querySelector('.cursor');
const cursor2 = document.querySelector('.cursor2');

document.addEventListener('mousemove', (e) => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
  cursor2.style.left = (e.clientX - 20) + 'px';
  cursor2.style.top = (e.clientY - 20) + 'px';
});

// Add hover effect to interactive elements
document.addEventListener('mouseover', (e) => {
  if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON' || e.target.closest('button')) {
    cursor.style.transform = 'scale(1.5)';
    cursor2.style.borderColor = 'rgba(0, 210, 255, 0.8)';
  }
});

document.addEventListener('mouseout', (e) => {
  if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON' || e.target.closest('button')) {
    cursor.style.transform = 'scale(1)';
    cursor2.style.borderColor = 'rgba(0, 210, 255, 0.5)';
  }
});

// ===== SOCIAL MEDIA LINK VALIDATION =====
document.addEventListener('click', (e) => {
  const socialLink = e.target.closest('.social-links a');
  if (socialLink) {
    const href = socialLink.getAttribute('href');
    
    // Prevent errors from # links
    if (!href || href === '#' || href === '') {
      e.preventDefault();
      console.warn('Social media link is not configured');
      return false;
    }
    
    // Ensure valid URLs
    if (!href.startsWith('http')) {
      e.preventDefault();
      console.warn('Invalid social media link: ' + href);
      return false;
    }
  }
});

// ===== SCROLL REVEAL ANIMATION =====
const revealElements = () => {
  const elements = document.querySelectorAll('.section');
  
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal');
      }
    });
  }, observerOptions);

  elements.forEach((element) => {
    observer.observe(element);
  });
};

document.addEventListener('DOMContentLoaded', revealElements);

// ===== SMOOTH SCROLL FOR NAVIGATION =====
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href !== '#') {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  });
});

// ===== MOBILE HAMBURGER MENU =====
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
  hamburger.addEventListener('click', () => {
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    hamburger.classList.toggle('active');
  });

  document.querySelectorAll('.nav-links a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.style.display = 'none';
      hamburger.classList.remove('active');
    });
  });
}

// ===== CONTACT FORM HANDLING =====
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
  const form = contactForm.closest('form') || document.querySelector('form');
  
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      // Get form data
      const formData = new FormData(form);
      const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone') || '',
        subject: formData.get('subject'),
        message: formData.get('message')
      };

      // Validate form
      if (!data.name || !data.email || !data.subject || !data.message) {
        showFormMessage('Please fill in all required fields', 'error');
        return;
      }

      // Add loading state
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.disabled = true;
      submitBtn.classList.add('form-loading');
      submitBtn.textContent = 'Sending...';

      try {
        // Send to backend
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data)
        });

        const result = await response.json();

        if (result.success) {
          showFormMessage(result.message, 'success');
          form.reset();
        } else {
          showFormMessage(result.message || 'Failed to send message', 'error');
        }
      } catch (error) {
        console.error('Error:', error);
        showFormMessage('An error occurred. Please try again later.', 'error');
      } finally {
        submitBtn.disabled = false;
        submitBtn.classList.remove('form-loading');
        submitBtn.textContent = originalText;
      }
    });
  }
}

// Show form message helper
function showFormMessage(message, type) {
  let messageEl = document.querySelector('.form-message');
  
  if (!messageEl && contactForm) {
    messageEl = document.createElement('div');
    messageEl.className = 'form-message';
    contactForm.appendChild(messageEl);
  }

  if (messageEl) {
    messageEl.textContent = message;
    messageEl.className = `form-message ${type}`;
    
    // Auto-hide success message after 5 seconds
    if (type === 'success') {
      setTimeout(() => {
        messageEl.style.display = 'none';
      }, 5000);
    }
  }
}

// ===== TYPING ANIMATION =====
const setupTypingAnimation = () => {
  const typingElement = document.querySelector('.typing-text');
  if (!typingElement) return;

  const words = ['Islamic Enthusiast', 'Full Stack Developer', 'Tech Leader'];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typingSpeed = 100;
  const deletingSpeed = 50;
  const delayBetweenWords = 2000;

  const type = () => {
    const currentWord = words[wordIndex];
    
    if (isDeleting) {
      typingElement.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typingElement.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
    }

    if (!isDeleting && charIndex === currentWord.length) {
      isDeleting = true;
      setTimeout(type, delayBetweenWords);
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      setTimeout(type, 500);
    } else {
      setTimeout(type, isDeleting ? deletingSpeed : typingSpeed);
    }
  };

  type();
};

document.addEventListener('DOMContentLoaded', setupTypingAnimation);

// ===== SMOOTH PARALLAX EFFECT =====
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const parallaxElements = document.querySelectorAll('[data-parallax]');
  
  parallaxElements.forEach((element) => {
    const speed = element.getAttribute('data-parallax') || 0.5;
    element.style.transform = `translateY(${scrollY * speed}px)`;
  });
});

// ===== NAVBAR HIDE ON SCROLL =====
let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const isLightTheme = document.body.classList.contains('light-theme');
  
  if (scrollTop > 100) {
    navbar.style.background = isLightTheme ? 'rgba(255, 255, 255, 0.96)' : 'rgba(10, 10, 10, 0.8)';
  } else {
    navbar.style.background = isLightTheme ? 'rgba(255, 255, 255, 0.88)' : 'rgba(10, 10, 10, 0.6)';
  }
  
  lastScrollTop = scrollTop;
});

// ===== LAZY LOAD IMAGES =====
if ('IntersectionObserver' in window) {
  const images = document.querySelectorAll('img[data-src]');
  
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.getAttribute('data-src');
        img.removeAttribute('data-src');
        imageObserver.unobserve(img);
      }
    });
  });

  images.forEach((img) => imageObserver.observe(img));
}

// ===== ACTIVE NAVIGATION LINK =====
window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-links a');

  let current = '';
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    if (window.scrollY >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove('active');
    if (link.getAttribute('href').slice(1) === current) {
      link.classList.add('active');
    }
  });
});

// ===== SMOOTH SCALE ON HOVER =====
document.querySelectorAll('.skill-list li, .tech-stack span').forEach((element) => {
  element.addEventListener('mouseenter', () => {
    element.style.transform = 'scale(1.1)';
  });
  
  element.addEventListener('mouseleave', () => {
    element.style.transform = 'scale(1)';
  });
});

// ===== LOG PAGE LOAD TIME =====
window.addEventListener('load', () => {
  const perfData = window.performance.timing;
  const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
  console.log('Page load time: ' + pageLoadTime + 'ms');
});
const themeToggleBtn = document.getElementById('theme-toggle-btn');
const body = document.body;

// 1. പേജ് ലോഡ് ചെയ്യുമ്പോൾ മുമ്പ് സേവ് ചെയ്ത തീം ഉണ്ടോ എന്ന് നോക്കുക
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
  body.classList.add('light-theme');
  themeToggleBtn.innerHTML = '<i class="fas fa-sun" aria-hidden="true"></i>';
  themeToggleBtn.setAttribute('aria-label', 'Switch to dark theme');
}

// 2. ബട്ടൺ ക്ലിക്ക് ചെയ്യുമ്പോൾ തീം മാറ്റുക
themeToggleBtn.addEventListener('click', () => {
  body.classList.toggle('light-theme');
  themeToggleBtn.innerHTML = body.classList.contains('light-theme')
    ? '<i class="fas fa-sun" aria-hidden="true"></i>'
    : '<i class="fas fa-moon" aria-hidden="true"></i>';
  themeToggleBtn.setAttribute('aria-label', body.classList.contains('light-theme') ? 'Switch to dark theme' : 'Switch to light theme');
  
  // 3. നിലവിലെ തീം ലോക്കൽ സ്റ്റോറേജിൽ സേവ് ചെയ്യുക
  if (body.classList.contains('light-theme')) {
    localStorage.setItem('theme', 'light');
  } else {
    localStorage.setItem('theme', 'dark');
  }
});