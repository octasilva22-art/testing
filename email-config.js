// email-config.js
const EMAILJS_CONFIG = {
    serviceID: 'service_your_service_id',      // Dapatkan dari EmailJS
    templateID: 'template_your_template_id',   // Dapatkan dari EmailJS
    userID: 'user_your_user_id'               // Dapatkan dari EmailJS
};

// Fungsi kirim email via EmailJS
async function sendVerificationEmail(email, name, token) {
    try {
        // Load EmailJS library (tambahkan di HTML)
        // <script src="https://cdn.emailjs.com/dist/email.min.js"></script>
        
        // Inisialisasi EmailJS
        emailjs.init(EMAILJS_CONFIG.userID);
        
        const verificationLink = `${window.location.origin}?verify=${token}`;
        
        const templateParams = {
            to_email: email,
            to_name: name,
            verification_link: verificationLink,
            from_name: 'SMK Diponegoro Cipari',
            reply_to: 'noreply@smkdiponegorocipari.sch.id'
        };
        
        await emailjs.send(
            EMAILJS_CONFIG.serviceID,
            EMAILJS_CONFIG.templateID,
            templateParams
        );
        
        console.log('Email verifikasi terkirim via EmailJS');
        return true;
    } catch (error) {
        console.error('Error sending email via EmailJS:', error);
        return false;
    }
}