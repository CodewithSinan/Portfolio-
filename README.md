# Portfolio Website - Professional & Advanced

A modern, professional portfolio website built with Express.js, featuring glassmorphism design, smooth animations, and advanced backend functionality.

## 🚀 Features

### Professional UI/UX
- **Modern Dark Theme** with glassmorphism effects
- **Smooth Animations** - Fade-in, slide-in, glow, and float animations
- **Custom Cursor** - Interactive cursor with hover effects
- **Responsive Design** - Mobile-first approach, fully responsive
- **Typography** - Professional fonts with smooth transitions
- **Lazy Loading** - Optimized image loading with Intersection Observer

### Advanced Backend
- **Security** - Helmet.js for security headers
- **Rate Limiting** - Express rate-limit middleware (100 requests per 15 minutes)
- **Environment Variables** - dotenv for configuration management
- **Email Integration** - Nodemailer for contact form submissions
- **Form Validation** - Express-validator for server-side validation
- **API Endpoints** - RESTful endpoints for dynamic data

### Interactive Features
- **Typing Animation** - Animated text cycling through roles
- **Parallax Effect** - Smooth parallax scrolling
- **Form Validation** - Real-time client and server-side validation
- **Loading States** - Visual feedback during form submission
- **Success Messages** - User-friendly confirmation messages
- **Smooth Scrolling** - Anchor links with smooth scroll behavior
- **Mobile Menu** - Hamburger menu for mobile devices

### Performance
- **Optimized Assets** - Minified CSS and efficient JavaScript
- **CDN Fonts** - Google Fonts via CDN
- **Icon Library** - Font Awesome icons
- **Scroll Optimization** - Debounced scroll listeners
- **Performance Tracking** - Page load time logging

## 📦 Installation

### 1. Clone/Setup the Project
```bash
cd c:/Users/muham/OneDrive/Desktop/PORTFOLIO
```

### 2. Install Dependencies
```bash
npm install
```

This will install:
- **express** - Web framework
- **express-validator** - Form validation
- **express-rate-limit** - Rate limiting
- **helmet** - Security headers
- **nodemailer** - Email sending
- **dotenv** - Environment variables
- **morgan** - HTTP request logger
- **hbs** - Handlebars templating
- **cookie-parser** - Cookie parsing

### 3. Configure Environment Variables

Create a `.env` file in the root directory (copy from `.env.example`):

```env
# Email Configuration
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
EMAIL_TO=your-email@gmail.com
EMAIL_SERVICE=gmail

# Server Configuration
PORT=3000
NODE_ENV=development
```

**Important:** For Gmail:
1. Enable 2-Factor Authentication on your Google Account
2. Generate an App Password: https://myaccount.google.com/apppasswords
3. Use the generated password as `EMAIL_PASSWORD`

### 4. Start the Application

**Development Mode (with auto-reload):**
```bash
npm run dev
```

**Production Mode:**
```bash
npm start
```

The application will run on `http://localhost:3000`

## 🏗️ Project Structure

```
PORTFOLIO/
├── app.js                           # Express app setup
├── bin/
│   └── www                          # Server entry point
├── package.json                     # Dependencies
├── .env.example                     # Environment template
├── .env                             # Environment variables (create this)
├── routes/
│   ├── index.js                     # Home page & API endpoints
│   └── users.js                     # Additional routes
├── views/
│   ├── index.hbs                    # Home page template
│   ├── layout.hbs                   # Layout template
│   └── error.hbs                    # Error page
├── public/
│   ├── stylesheets/
│   │   └── style.css                # Professional CSS with animations
│   ├── javascripts/
│   │   └── script.js                # Advanced JavaScript interactions
│   └── images/
│       └── profile-pic.jpg          # Profile picture
└── utils/
    └── emailService.js              # Email functionality
```

## 🎨 Customization

### Update Personal Information
Edit `routes/index.js`:

```javascript
name: "Your Name",
primaryRole: "Your Role",
secondaryRole: "Your Specialty",
bio: "Your bio",
email: "your-email@example.com",
location: "Your Location",
// ... other details
```

### Add Profile Picture
1. Place your image in `public/images/profile-pic.jpg`
2. Update the filename in `views/index.hbs` if needed

### Modify Colors & Styling
Edit `public/stylesheets/style.css`:

```css
:root {
  --accent-color: #00d2ff;        /* Primary accent */
  --accent-secondary: #9d00ff;    /* Secondary accent */
  --bg-color: #0a0a0a;            /* Background */
  --text-color: #e0e0e0;          /* Text color */
}
```

### Customize Typing Animation
Edit `public/javascripts/script.js`:

```javascript
const words = [
  'Your Role 1',
  'Your Role 2',
  'Your Role 3'
];
```

## 🔐 Security Features

- **Helmet.js** - Sets various HTTP headers for security
- **Rate Limiting** - Prevents abuse (100 requests/15 minutes per IP)
- **Input Validation** - Express-validator checks all form inputs
- **HTML Sanitization** - Prevents XSS attacks
- **CORS Ready** - Can be configured for cross-origin requests

## 📧 Email Configuration

The contact form uses **Nodemailer** to send emails. Supports:
- Gmail
- Office 365
- Custom SMTP servers
- Other email services

### Email Templates
Customizable HTML email templates in `utils/emailService.js`:
- Admin notification email
- Auto-reply to visitor

## 🚀 API Endpoints

### Contact Form
**POST** `/api/contact`

Request body:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1 (555) 123-4567",
  "subject": "Project Inquiry",
  "message": "Your message here..."
}
```

### Portfolio Data
**GET** `/api/portfolio-data`

Returns portfolio metadata.

### Health Check
**GET** `/api/health`

Server status check.

## 🎯 Performance Optimization

- Lazy loading for images
- CSS animations using GPU acceleration
- Debounced scroll events
- Efficient JavaScript bundling
- Optimized media queries
- CDN-hosted fonts and icons

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🐛 Debugging

Enable debug logging:
```bash
DEBUG=* npm run dev
```

Check Morgan logs for HTTP requests in development mode.

## 📈 Future Enhancements

- [ ] Blog section with markdown support
- [ ] Project filtering and search
- [ ] Dark/Light theme toggle
- [ ] Newsletter subscription
- [ ] Analytics integration
- [ ] CMS integration
- [ ] Multi-language support
- [ ] Comments/testimonials system

## 📝 License

This project is open source and available for personal and commercial use.

## 🤝 Support

For issues or questions, check the code comments or create an issue.

---

**Built with ❤️ using Express.js, Handlebars, and modern web standards**
