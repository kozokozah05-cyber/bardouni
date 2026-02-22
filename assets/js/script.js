// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    });
}

// Close mobile menu when a link is clicked
const navItems = document.querySelectorAll('.nav-links a');
navItems.forEach(item => {
    item.addEventListener('click', () => {
        navLinks.style.display = 'none';
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Form Submission with Better Feedback
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    const originalBtnText = 'Send Message';
    const submitBtn = contactForm.querySelector('.submit-btn');
    
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();
        
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const message = this.querySelector('textarea').value;
        
        // Validate form
        if (name.trim() === '' || email.trim() === '' || message.trim() === '') {
            showFormError('Please fill out all fields');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showFormError('Please enter a valid email address');
            return;
        }
        
        // Show loading state
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        
        // Simulate form submission
        setTimeout(() => {
            showFormSuccess('Thank you for your message! We will contact you soon.');
            contactForm.reset();
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnText;
        }, 1500);
    });
}

// Form Error Display
function showFormError(message) {
    const formContainer = document.querySelector('.contact-form');
    removeFormMessage();
    const errorDiv = document.createElement('div');
    errorDiv.className = 'form-message error-message';
    errorDiv.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${message}`;
    formContainer.insertBefore(errorDiv, formContainer.firstChild);
    
    setTimeout(() => {
        errorDiv.style.animation = 'slideOut 0.3s ease forwards';
        setTimeout(() => errorDiv.remove(), 300);
    }, 4000);
}

// Form Success Display
function showFormSuccess(message) {
    const formContainer = document.querySelector('.contact-form');
    removeFormMessage();
    const successDiv = document.createElement('div');
    successDiv.className = 'form-message success-message';
    successDiv.innerHTML = `<i class="fas fa-check-circle"></i> ${message}`;
    formContainer.insertBefore(successDiv, formContainer.firstChild);
    
    setTimeout(() => {
        successDiv.style.animation = 'slideOut 0.3s ease forwards';
        setTimeout(() => successDiv.remove(), 300);
    }, 4000);
}

function removeFormMessage() {
    const existing = document.querySelector('.form-message');
    if (existing) existing.remove();
}

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all service cards and contact info
document.querySelectorAll('.service-card, .contact-info, .info-box').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(element);
});

// Active navigation link highlighting
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section[id]');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    document.querySelectorAll('.nav-links > li > a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Lazy loading for images (if added)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Add active style for navigation
const style = document.createElement('style');
style.textContent = `
    .nav-links > li > a.active {
        color: #ff6b35;
        border-bottom: 2px solid #ff6b35;
        padding-bottom: 5px;
    }
`;
document.head.appendChild(style);
