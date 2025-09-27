const nodemailer = require('nodemailer');
const config = require('../config');

// In a real application, you would save this to a database
// For now, we'll just send an email notification

// Create a transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com', // You would replace this with your SMTP server
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER || 'your-email@gmail.com', // Your email
    pass: process.env.EMAIL_PASS || 'your-app-password', // Your app password
  },
});

// Send contact form message
exports.sendContactMessage = async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;
    
    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({ 
        success: false, 
        message: 'Nama, email, dan pesan harus diisi' 
      });
    }
    
    // In a real application, you would save this to a database
    // For now, we'll just send an email notification
    const mailOptions = {
      from: email,
      to: process.env.CONTACT_EMAIL || 'info@morfotech.id', // Recipient email
      subject: `Pesan Kontak dari ${name}`,
      text: `
        Anda telah menerima pesan dari form kontak:
        
        Nama: ${name}
        Email: ${email}
        Telepon: ${phone || 'Tidak disediakan'}
        
        Pesan:
        ${message}
      `,
      html: `
        <h2>Pesan Kontak Baru</h2>
        <p><strong>Nama:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Telepon:</strong> ${phone || 'Tidak disediakan'}</p>
        <p><strong>Pesan:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `
    };
    
    // Send email (commented out for now since we don't have SMTP configured)
    // await transporter.sendMail(mailOptions);
    
    // For now, we'll just log the message and return success
    console.log('Contact form submission:', { name, email, phone, message });
    
    res.status(200).json({ 
      success: true, 
      message: 'Pesan Anda telah terkirim. Kami akan segera menghubungi Anda.' 
    });
  } catch (error) {
    console.error('Error sending contact message:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Gagal mengirim pesan. Silakan coba lagi nanti.' 
    });
  }
};