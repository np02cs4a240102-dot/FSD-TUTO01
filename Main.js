// Main.js - JavaScript for Portfolio Website

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Step 1: Animated Skill Progress Bars
    function animateSkillBars() {
        const skillProgressElements = document.querySelectorAll('.skill-progress');
        
        // Create Intersection Observer to trigger animation when element is in view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progressBar = entry.target;
                    const width = progressBar.getAttribute('data-width');
                    progressBar.style.width = width + '%';
                    observer.unobserve(progressBar);
                }
            });
        }, { threshold: 0.5 });
        
        // Observe each skill progress bar
        skillProgressElements.forEach(bar => {
            observer.observe(bar);
        });
    }
    
    // Step 2: Contact Form Validation and Data Handling
    function setupContactForm() {
        const contactForm = document.getElementById('contactForm');
        const formMessage = document.getElementById('formMessage');
        
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            
            // Clear previous error messages
            clearErrorMessages();
            
            // Validate form
            let isValid = true;
            
            if (name === '') {
                showError('nameError', 'Name is required');
                isValid = false;
            } else if (name.length < 2) {
                showError('nameError', 'Name must be at least 2 characters long');
                isValid = false;
            }
            
            if (email === '') {
                showError('emailError', 'Email is required');
                isValid = false;
            } else if (!isValidEmail(email)) {
                showError('emailError', 'Please enter a valid email address');
                isValid = false;
            }
            
            if (message === '') {
                showError('messageError', 'Message is required');
                isValid = false;
            } else if (message.length < 10) {
                showError('messageError', 'Message must be at least 10 characters long');
                isValid = false;
            }
            
            // If form is valid, store data and redirect
            if (isValid) {
                // Store form data in localStorage
                const formData = {
                    name: name,
                    email: email,
                    message: message,
                    timestamp: new Date().toISOString()
                };
                
                localStorage.setItem('contactFormData', JSON.stringify(formData));
                
                // Show success message
                showFormMessage('Form submitted successfully! Redirecting...', 'success');
                
                // Clear form
                contactForm.reset();
                
                // Redirect to form details page after a short delay
                setTimeout(() => {
                    window.location.href = 'form-details.html';
                }, 2000);
            } else {
                showFormMessage('Please fix the errors above.', 'error');
            }
        });
        
        function clearErrorMessages() {
            const errorMessages = document.querySelectorAll('.error-message');
            errorMessages.forEach(error => {
                error.textContent = '';
            });
        }
        
        function showError(elementId, message) {
            const errorElement = document.getElementById(elementId);
            errorElement.textContent = message;
        }
        
        function isValidEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        }
        
        function showFormMessage(message, type) {
            formMessage.textContent = message;
            formMessage.className = 'form-message ' + type;
            formMessage.style.display = 'block';
            
            // Hide message after 5 seconds
            setTimeout(() => {
                formMessage.style.display = 'none';
            }, 5000);
        }
    }
    
    // Step 3: Open Portfolio Projects Using JavaScript (NO <a> TAG)
    function setupProjectCards() {
        const projectCards = document.querySelectorAll('.project-card');
        
        projectCards.forEach(card => {
            // Add keyboard accessibility
            card.setAttribute('tabindex', '0');
            card.setAttribute('role', 'button');
            
            card.addEventListener('click', function() {
                const projectUrl = this.getAttribute('data-url');
                if (projectUrl) {
                    window.open(projectUrl, '_blank');
                }
            });
            
            // Add keyboard support (Enter key)
            card.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    const projectUrl = this.getAttribute('data-url');
                    if (projectUrl) {
                        window.open(projectUrl, '_blank');
                    }
                }
            });
            
            // Add hover effects with JavaScript
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-5px)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
            });
        });
    }
    
    // Step 4: Canvas Drawing
    function setupCanvas() {
        const canvas = document.getElementById('myCanvas');
        if (canvas && canvas.getContext) {
            const ctx = canvas.getContext('2d');
            
            // Clear canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Draw a creative pattern
            // Background gradient
            const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
            gradient.addColorStop(0, '#0047ab');
            gradient.addColorStop(1, '#00a8ff');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            // Draw shapes
            ctx.fillStyle = '#ffdf5e';
            ctx.beginPath();
            ctx.arc(80, 60, 30, 0, Math.PI * 2);
            ctx.fill();
            
            ctx.fillStyle = '#e74c3c';
            ctx.fillRect(120, 30, 60, 60);
            
            ctx.fillStyle = '#2ecc71';
            ctx.beginPath();
            ctx.moveTo(200, 30);
            ctx.lineTo(230, 90);
            ctx.lineTo(170, 90);
            ctx.closePath();
            ctx.fill();
            
            // Add text
            ctx.fillStyle = 'white';
            ctx.font = 'bold 16px Arial';
            ctx.textAlign = 'center';
            ctx.fillText('Creative Canvas', canvas.width / 2, 150);
            
            ctx.font = '14px Arial';
            ctx.fillText('Interactive Portfolio', canvas.width / 2, 170);
        }
    }
    
    // Step 5: Enhanced Image Slider with Real Photos
    function setupImageSlider() {
        const slides = document.querySelectorAll('.slide');
        const dots = document.querySelectorAll('.dot');
        const prevBtn = document.querySelector('.prev-btn');
        const nextBtn = document.querySelector('.next-btn');
        let currentSlide = 0;
        let slideInterval;
        
        // Function to show a specific slide
        function showSlide(n) {
            // Hide all slides
            slides.forEach(slide => {
                slide.classList.remove('active');
            });
            
            // Remove active class from all dots
            dots.forEach(dot => {
                dot.classList.remove('active');
            });
            
            // Update current slide index
            currentSlide = (n + slides.length) % slides.length;
            
            // Show current slide and activate corresponding dot
            slides[currentSlide].classList.add('active');
            if (dots[currentSlide]) {
                dots[currentSlide].classList.add('active');
            }
            
            // Preload next image for smoother transitions
            preloadNextImage();
        }
        
        // Function to preload next image
        function preloadNextImage() {
            const nextIndex = (currentSlide + 1) % slides.length;
            const nextSlide = slides[nextIndex];
            const nextImage = nextSlide.querySelector('img');
            
            if (nextImage && !nextImage.complete) {
                const img = new Image();
                img.src = nextImage.src;
            }
        }
        
        // Function to start auto-sliding
        function startAutoSlide() {
            slideInterval = setInterval(() => {
                showSlide(currentSlide + 1);
            }, 5000);
        }
        
        // Function to stop auto-sliding
        function stopAutoSlide() {
            clearInterval(slideInterval);
        }
        
        // Event listeners for navigation buttons
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                stopAutoSlide();
                showSlide(currentSlide - 1);
                startAutoSlide();
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                stopAutoSlide();
                showSlide(currentSlide + 1);
                startAutoSlide();
            });
        }
        
        // Event listeners for dots
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                stopAutoSlide();
                showSlide(index);
                startAutoSlide();
            });
        });
        
        // Pause auto-slide when hovering over slider
        const sliderContainer = document.querySelector('.slider-container');
        if (sliderContainer) {
            sliderContainer.addEventListener('mouseenter', stopAutoSlide);
            sliderContainer.addEventListener('mouseleave', startAutoSlide);
            
            // Touch swipe support for mobile
            let startX = 0;
            let endX = 0;
            
            sliderContainer.addEventListener('touchstart', (e) => {
                startX = e.touches[0].clientX;
            });
            
            sliderContainer.addEventListener('touchend', (e) => {
                endX = e.changedTouches[0].clientX;
                handleSwipe();
            });
            
            function handleSwipe() {
                const swipeThreshold = 50;
                if (startX - endX > swipeThreshold) {
                    // Swipe left - next slide
                    stopAutoSlide();
                    showSlide(currentSlide + 1);
                    startAutoSlide();
                } else if (endX - startX > swipeThreshold) {
                    // Swipe right - previous slide
                    stopAutoSlide();
                    showSlide(currentSlide - 1);
                    startAutoSlide();
                }
            }
        }
        
        // Preload all images and start slider
        preloadAllImages().then(() => {
            startAutoSlide();
        });
        
        // Function to preload all images
        function preloadAllImages() {
            const promises = [];
            const images = document.querySelectorAll('.slide-image');
            
            images.forEach(img => {
                if (img.src && !img.complete) {
                    const promise = new Promise((resolve) => {
                        img.onload = resolve;
                        img.onerror = resolve; // Resolve even if image fails to load
                    });
                    promises.push(promise);
                }
            });
            
            return Promise.all(promises);
        }
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                stopAutoSlide();
                showSlide(currentSlide - 1);
                startAutoSlide();
            } else if (e.key === 'ArrowRight') {
                stopAutoSlide();
                showSlide(currentSlide + 1);
                startAutoSlide();
            }
        });
    }
    
    // Step 6: Dark / Light Mode Toggle
    function setupThemeToggle() {
        const themeToggle = document.getElementById('themeToggle');
        const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
        
        if (!themeToggle) return;
        
        // Check for saved theme preference or use OS preference
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark' || (!savedTheme && prefersDarkScheme.matches)) {
            document.body.classList.add('dark-mode');
            themeToggle.textContent = '☀️ Light Mode';
            themeToggle.setAttribute('aria-label', 'Switch to light mode');
        } else {
            themeToggle.setAttribute('aria-label', 'Switch to dark mode');
        }
        
        // Toggle theme on button click
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            
            // Update button text and save preference
            if (document.body.classList.contains('dark-mode')) {
                themeToggle.textContent = '☀️ Light Mode';
                themeToggle.setAttribute('aria-label', 'Switch to light mode');
                localStorage.setItem('theme', 'dark');
            } else {
                themeToggle.textContent = '🌙 Dark Mode';
                themeToggle.setAttribute('aria-label', 'Switch to dark mode');
                localStorage.setItem('theme', 'light');
            }
        });
        
        // Listen for system theme changes
        prefersDarkScheme.addEventListener('change', (e) => {
            if (!localStorage.getItem('theme')) {
                if (e.matches) {
                    document.body.classList.add('dark-mode');
                    themeToggle.textContent = '☀️ Light Mode';
                } else {
                    document.body.classList.remove('dark-mode');
                    themeToggle.textContent = '🌙 Dark Mode';
                }
            }
        });
    }
    
    // Step 7: Back-to-Top Button
    function setupBackToTop() {
        const backToTopBtn = document.getElementById('backToTop');
        
        if (!backToTopBtn) return;
        
        // Show/hide button based on scroll position
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopBtn.style.display = 'block';
                backToTopBtn.setAttribute('aria-hidden', 'false');
            } else {
                backToTopBtn.style.display = 'none';
                backToTopBtn.setAttribute('aria-hidden', 'true');
            }
        });
        
        // Scroll to top when clicked
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            
            // Focus management for accessibility
            setTimeout(() => {
                document.querySelector('h1').focus();
            }, 500);
        });
        
        // Keyboard support
        backToTopBtn.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
        });
    }
    
    // Additional: Smooth scrolling for anchor links
    function setupSmoothScrolling() {
        const anchorLinks = document.querySelectorAll('a[href^="#"]');
        
        anchorLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
    
    // Additional: Add loading animation
    function setupLoadingAnimation() {
        // Remove loading state when page is fully loaded
        window.addEventListener('load', () => {
            document.body.classList.add('loaded');
        });
    }
    
    // Initialize all functions
    function init() {
        animateSkillBars();
        setupContactForm();
        setupProjectCards();
        setupCanvas();
        setupImageSlider();
        setupThemeToggle();
        setupBackToTop();
        setupSmoothScrolling();
        setupLoadingAnimation();
    }
    
    // Call initialization function
    init();
});