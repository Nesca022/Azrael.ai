// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.classList.remove('scroll-up');
        return;
    }
    
    if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
        // Scroll Down
        navbar.classList.remove('scroll-up');
        navbar.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
        // Scroll Up
        navbar.classList.remove('scroll-down');
        navbar.classList.add('scroll-up');
    }
    lastScroll = currentScroll;
});

// Gallery image hover effect
const galleryItems = document.querySelectorAll('.gallery-item');

galleryItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.querySelector('.gallery-overlay').style.opacity = '1';
    });
    
    item.addEventListener('mouseleave', () => {
        item.querySelector('.gallery-overlay').style.opacity = '0';
    });
});

// Form submission handling
const contactForm = document.querySelector('.contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    // Here you would typically send the data to your backend
    console.log('Form submitted:', data);
    
    // Show success message
    alert('Thank you for your message! We will get back to you soon.');
    contactForm.reset();
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Add loading animation for images
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('load', () => {
        img.classList.add('loaded');
    });
});

// Mobile menu toggle
const createMobileMenu = () => {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelector('.nav-links');
    
    // Create hamburger button
    const hamburger = document.createElement('button');
    hamburger.className = 'hamburger';
    hamburger.innerHTML = '<i class="fas fa-bars"></i>';
    
    // Add hamburger to navbar
    navbar.insertBefore(hamburger, navLinks);
    
    // Toggle mobile menu
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
};

// Initialize mobile menu if screen width is small
if (window.innerWidth <= 768) {
    createMobileMenu();
}

// Handle window resize
window.addEventListener('resize', () => {
    if (window.innerWidth <= 768) {
        if (!document.querySelector('.hamburger')) {
            createMobileMenu();
        }
    } else {
        const hamburger = document.querySelector('.hamburger');
        if (hamburger) {
            hamburger.remove();
        }
        document.querySelector('.nav-links').classList.remove('active');
    }
});

// Image Enhancer Functionality
document.addEventListener('DOMContentLoaded', function() {
    const uploadArea = document.querySelector('.upload-area');
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.style.display = 'none';

    // Handle drag and drop
    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.style.borderColor = 'var(--accent-color)';
    });

    uploadArea.addEventListener('dragleave', () => {
        uploadArea.style.borderColor = 'var(--secondary-color)';
    });

    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.style.borderColor = 'var(--secondary-color)';
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) {
            handleImageUpload(file);
        }
    });

    // Handle click to upload
    uploadArea.addEventListener('click', () => {
        fileInput.click();
    });

    fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            handleImageUpload(file);
        }
    });

    // Handle image upload
    function handleImageUpload(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const originalPreview = document.querySelector('.preview-original img');
            originalPreview.src = e.target.result;
            originalPreview.style.display = 'block';
            
            // Show preview section
            document.querySelector('.enhancer-preview').style.display = 'block';
            
            // Enable enhance button
            const enhanceButton = document.querySelector('.enhance-button');
            enhanceButton.disabled = false;
            enhanceButton.style.opacity = '1';
        };
        reader.readAsDataURL(file);
    }

    // Handle enhance button click
    const enhanceButton = document.querySelector('.enhance-button');
    enhanceButton.addEventListener('click', async () => {
        const originalImage = document.querySelector('.preview-original img');
        const enhancedPreview = document.querySelector('.preview-enhanced img');
        
        // Show loading state
        enhanceButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enhancing...';
        enhanceButton.disabled = true;

        try {
            // Here you would typically make an API call to your image enhancement service
            // For now, we'll simulate the enhancement with a delay
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Simulate enhanced image (in reality, this would come from your API)
            enhancedPreview.src = originalImage.src;
            enhancedPreview.style.display = 'block';
            
            // Enable download and share buttons
            document.querySelector('.download-button').disabled = false;
            document.querySelector('.share-button').disabled = false;
        } catch (error) {
            console.error('Error enhancing image:', error);
            alert('Failed to enhance image. Please try again.');
        } finally {
            // Reset enhance button
            enhanceButton.innerHTML = '<i class="fas fa-magic"></i> Enhance Image';
            enhanceButton.disabled = false;
        }
    });

    // Handle download button click
    document.querySelector('.download-button').addEventListener('click', () => {
        const enhancedImage = document.querySelector('.preview-enhanced img');
        const link = document.createElement('a');
        link.download = 'enhanced-image.png';
        link.href = enhancedImage.src;
        link.click();
    });

    // Handle share button click
    document.querySelector('.share-button').addEventListener('click', async () => {
        const enhancedImage = document.querySelector('.preview-enhanced img');
        try {
            if (navigator.share) {
                await navigator.share({
                    title: 'Enhanced Image',
                    text: 'Check out this enhanced image!',
                    url: enhancedImage.src
                });
            } else {
                // Fallback for browsers that don't support Web Share API
                const link = document.createElement('a');
                link.href = enhancedImage.src;
                link.target = '_blank';
                link.click();
            }
        } catch (error) {
            console.error('Error sharing image:', error);
        }
    });
}); 