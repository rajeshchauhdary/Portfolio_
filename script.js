// Initialize EmailJS
(function() {
    emailjs.init("YOUR_PUBLIC_KEY"); // Replace with your EmailJS public key
})();

// Form handling with validation and EmailJS
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();

    // Get form elements
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerHTML;

    // Basic validation
    if (!nameInput.value.trim() || !emailInput.value.trim() || !messageInput.value.trim()) {
        showToast('Please fill in all fields', 'error');
        return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value.trim())) {
        showToast('Please enter a valid email address', 'error');
        return;
    }

    // Show loading state
    submitBtn.innerHTML = '<i class="bi bi-hourglass-split me-2"></i>Sending...';
    submitBtn.disabled = true;

    // Prepare template parameters
    const templateParams = {
        from_name: nameInput.value.trim(),
        from_email: emailInput.value.trim(),
        message: messageInput.value.trim(),
        to_email: 'rajeshchaaudhary74@gmail.com'
    };

    // Send email using EmailJS
    emailjs.send('service_id', 'template_id', templateParams) // Replace with your service and template IDs
        .then(function() {
            showToast('Message sent successfully!', 'success');
            submitBtn.innerHTML = '<i class="bi bi-check-circle me-2"></i>Sent!';
            e.target.reset();
            setTimeout(() => {
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
            }, 2000);
        })
        .catch(function(error) {
            console.error('Error:', error);
            showToast('Failed to send message. Please try again.', 'error');
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;
        });
});

// Toast notification function
function showToast(message, type = 'info') {
    const toastContainer = document.createElement('div');
    toastContainer.className = `toast-container position-fixed bottom-0 end-0 p-3`;
    toastContainer.style.zIndex = '1050';

    const toast = document.createElement('div');
    toast.className = `toast align-items-center text-white bg-${type === 'success' ? 'success' : type === 'error' ? 'danger' : 'info'} border-0`;
    toast.setAttribute('role', 'alert');
    toast.setAttribute('aria-live', 'assertive');
    toast.setAttribute('aria-atomic', 'true');

    toast.innerHTML = `
        <div class="d-flex">
            <div class="toast-body">
                <i class="bi bi-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'} me-2"></i>
                ${message}
            </div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
    `;

    toastContainer.appendChild(toast);
    document.body.appendChild(toastContainer);

    const bsToast = new bootstrap.Toast(toast);
    bsToast.show();

    toast.addEventListener('hidden.bs.toast', function () {
        document.body.removeChild(toastContainer);
    });
}

// Smooth scrolling for navigation links
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const section = document.querySelector(this.getAttribute('href'));
        section.scrollIntoView({ behavior: 'smooth' });
    });
});

// Create assets folder for resume
const createAssetsFolder = () => {
    // This is just a reminder - you'll need to manually create an 'assets' folder
    // and add your resume PDF file there
    console.log('Remember to create an assets folder and add your resume!');
};

// Add download handling for resume
const resumeLink = document.querySelector('.cta-buttons a[download]');
if (resumeLink) {
    resumeLink.addEventListener('click', function(e) {
        // You can add analytics or tracking here
        console.log('Resume downloaded');
    });
}