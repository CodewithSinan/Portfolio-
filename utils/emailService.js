const nodemailer = require('nodemailer');

// Create a transporter for sending emails
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE || 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

// Function to send contact form emails
const sendContactEmail = async (data) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_TO,
      subject: `New Portfolio Contact: ${data.subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #00d2ff;">New Contact Form Submission</h2>
          <hr style="border: 1px solid #00d2ff;">
          <p><strong>Name:</strong> ${sanitizeHtml(data.name)}</p>
          <p><strong>Email:</strong> ${sanitizeHtml(data.email)}</p>
          <p><strong>Phone:</strong> ${sanitizeHtml(data.phone || 'Not provided')}</p>
          <p><strong>Subject:</strong> ${sanitizeHtml(data.subject)}</p>
          <hr>
          <h3>Message:</h3>
          <p>${sanitizeHtml(data.message).replace(/\n/g, '<br>')}</p>
          <hr style="border: 1px solid #00d2ff;">
          <p style="color: #a0a0a0; font-size: 12px;">Sent from: ${new Date().toLocaleString()}</p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    return { success: true, message: 'Email sent successfully' };
  } catch (error) {
    console.error('Email sending error:', error);
    return { success: false, message: 'Failed to send email', error: error.message };
  }
};

// Function to send auto-reply to visitor
const sendAutoReply = async (visitorEmail, visitorName) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: visitorEmail,
      subject: 'Thanks for reaching out! 🚀',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #00d2ff;">Thank you, ${sanitizeHtml(visitorName)}!</h2>
          <p>I've received your message and will get back to you as soon as possible.</p>
          <p>I appreciate your interest and look forward to connecting with you!</p>
          <hr>
          <p style="color: #a0a0a0; font-size: 12px;">Best regards,<br>Muhammed Sinan</p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Auto-reply error:', error);
  }
};

// Utility function to sanitize HTML
const sanitizeHtml = (str) => {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .substring(0, 1000); // Limit length
};

module.exports = {
  sendContactEmail,
  sendAutoReply,
  sanitizeHtml
};
