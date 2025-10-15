// ===== FADE-IN ANIMATION SYSTEM =====
function initFadeInAnimations() {
    const fadeElements = document.querySelectorAll(`
        .hero-content, .hero-title, .hero-subtitle, .hero-buttons,
        .about-content, .about-visual, .section-tag, .section-title,
        .feature-item, .about-stats, .about-actions,
        .why-card, .why-icon, .why-list,
        .timeline-item, .timeline-date, .timeline-content,
        .team-member-card, .member-header, .member-content,
        .event-card, .event-image, .event-content,
        .footer-brand, .footer-links, .footer-contact,
        .role-card, .process-step, .application-form-container,
        .accordion-item, .feature-card, .survey-content, .survey-visual,
        .coming-soon-content, .project-status, .demo-container,
        .hero-visual, .floating-card,
        .image-grid, .main-image, .small-image,
        .section-header, .section-divider,
        .btn, .form-control, .form-label,
        .stat-item, .stat-number, .stat-label,
        .social-links, .social-link,
        .newsletter-form, .contact-item,
        .team-grid, .event-filters, .filter-btn,
        .eventi-cta, .development-team,
        .progress-bar, .milestone,
        .step-number, .step-content,
        .countdown-item, .newsletter-cta,
        .pet-actions, #pet-status, .img-fluid, .pet-container
    `);
    
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                fadeObserver.unobserve(entry.target);
            }
        });
    }, { 
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    fadeElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        fadeObserver.observe(element);
    });
}

// ===== NAVBAR & SMOOTH SCROLL =====
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.custom-navbar');
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const offsetTop = targetElement.offsetTop - 80;
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
            
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse.classList.contains('show')) {
                const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                bsCollapse.hide();
            }
        }
    });
});

// ===== LOADER =====
window.addEventListener('load', function() {
    const loader = document.createElement('div');
    loader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, var(--primary-color) 0%, #4aa0a6 100%);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        transition: opacity 0.5s ease;
    `;
    
    loader.innerHTML = `
        <div class="spinner-border text-light" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
    `;
    
    document.body.appendChild(loader);
    
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(loader);
        }, 500);
    }, 1000);
});

// ===== ABOUT SECTION =====
function initAboutSection() {
    initStatsCounter();
    initTimelineAnimation();
    initWhyCards();
}

function initStatsCounter() {
    const counters = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-count'));
                animateCounter(counter, target);
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
        observer.observe(counter);
    });
}

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 100;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + '+';
        }
    }, 20);
}

function initTimelineAnimation() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    const isMobile = window.innerWidth < 768;

    if (isMobile) {
        timelineItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'none';
            item.style.transition = 'opacity 0.6s ease ' + (index * 0.1) + 's';
        });

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                }
            });
        }, { threshold: 0.2 });

        timelineItems.forEach(item => observer.observe(item));
    } else {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }
            });
        }, { threshold: 0.3 });

        timelineItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(' + (index % 2 === 0 ? '-50px' : '50px') + ')';
            item.style.transition = 'all 0.6s ease ' + (index * 0.2) + 's';
            observer.observe(item);
        });
    }
}

function initWhyCards() {
    const whyCards = document.querySelectorAll('.why-card');
    
    whyCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

function initFeatureItemsAnimation() {
    const featureItems = document.querySelectorAll('.feature-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
            }
        });
    }, { threshold: 0.2 });
    
    featureItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-30px)';
        item.style.transition = 'all 0.6s ease ' + (index * 0.1) + 's';
        observer.observe(item);
    });
}

function initAboutParallax() {
    const aboutSection = document.querySelector('.about-section');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.3;
        
        if (aboutSection) {
            aboutSection.style.backgroundPositionY = rate + 'px';
        }
    });
}

// ===== EVENTS SECTION =====
function initEventiSection() {
    initEventFilters();
    initEventAnimations();
}

function initEventFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const eventCards = document.querySelectorAll('[data-category]');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            eventCards.forEach(card => {
                const categories = card.getAttribute('data-category').split(' ');
                
                if (filter === 'all' || categories.includes(filter)) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

function showRegistrationForm(eventTitle) {
    const formHTML = `
        <div class="modal fade" id="registrationModal" tabindex="-1">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Iscrizione a: ${eventTitle}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <form id="eventRegistrationForm">
                            <div class="mb-3">
                                <label for="userName" class="form-label">Nome Completo *</label>
                                <input type="text" class="form-control" id="userName" required>
                            </div>
                            <div class="mb-3">
                                <label for="userEmail" class="form-label">Email Universitaria *</label>
                                <input type="email" class="form-control" id="userEmail" required>
                            </div>
                            <div class="mb-3">
                                <label for="userPhone" class="form-label">Telefono</label>
                                <input type="tel" class="form-control" id="userPhone">
                            </div>
                            <div class="mb-3">
                                <label for="userCourse" class="form-label">Corso di Studio *</label>
                                <select class="form-select" id="userCourse" required>
                                    <option value="">Seleziona il tuo corso</option>
                                    <option value="ingegneria">Ingegneria Gestionale</option>
                                    <option value="informatica">Informatica</option>
                                    <option value="economia">Economia e Management</option>
                                    <option value="altro">Altro</option>
                                </select>
                            </div>
                            <div class="mb-3">
                                <label for="userMessage" class="form-label">Note o richieste particolari</label>
                                <textarea class="form-control" id="userMessage" rows="3"></textarea>
                            </div>
                            <div class="form-check mb-3">
                                <input class="form-check-input" type="checkbox" id="privacyCheck" required>
                                <label class="form-check-label" for="privacyCheck">
                                    Acconsento al trattamento dei dati personali *
                                </label>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Annulla</button>
                        <button type="button" class="btn btn-primary" id="submitRegistration">Conferma Iscrizione</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', formHTML);
    
    const modal = new bootstrap.Modal(document.getElementById('registrationModal'));
    modal.show();
    
    document.getElementById('submitRegistration').addEventListener('click', function() {
        const form = document.getElementById('eventRegistrationForm');
        if (form.checkValidity()) {
            simulateRegistration();
            modal.hide();
        } else {
            form.reportValidity();
        }
    });
}

function initEventAnimations() {
    const eventCards = document.querySelectorAll('.event-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, { threshold: 0.1 });
    
    eventCards.forEach(card => {
        observer.observe(card);
    });
}

function simulateRegistration() {
    showSuccessMessage('Iscrizione completata con successo! Riceverai una email di conferma.');
}

function showSuccessMessage(message) {
    const toastHTML = `
        <div class="toast align-items-center text-white bg-success border-0" role="alert">
            <div class="d-flex">
                <div class="toast-body">
                    <i class="fas fa-check-circle me-2"></i>
                    ${message}
                </div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
            </div>
        </div>
    `;
    
    const toastContainer = document.createElement('div');
    toastContainer.innerHTML = toastHTML;
    document.body.appendChild(toastContainer);
    
    const toast = new bootstrap.Toast(toastContainer.querySelector('.toast'));
    toast.show();
    
    toastContainer.querySelector('.toast').addEventListener('hidden.bs.toast', function() {
        toastContainer.remove();
    });
}

// ===== TEAM SECTION =====
function initTeamSection() {
    initTeamFilters();
    initTeamStats();
    initTeamHoverEffects();
    initTeamAnimations();
}

function initTeamFilters() {
    const filterButtons = document.querySelectorAll('.team-filter-btn');
    const teamCards = document.querySelectorAll('.team-member-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            teamCards.forEach(card => {
                const category = card.parentElement.getAttribute('data-category');
                
                if (filter === 'all' || filter === category) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeInUp 0.6s ease forwards';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

function initTeamStats() {
    const counters = document.querySelectorAll('.stat-card .stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-count'));
                animateTeamCounter(counter, target);
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
        observer.observe(counter);
    });
}

function animateTeamCounter(element, target) {
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + (target > 10 ? '+' : '');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + (current > 10 ? '+' : '');
        }
    }, 30);
}

function initTeamHoverEffects() {
    const teamCards = document.querySelectorAll('.team-member-card');
    
    teamCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

function initTeamAnimations() {
    const teamElements = document.querySelectorAll('.team-member-card, .stat-card, .team-cta');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, { threshold: 0.1 });
    
    teamElements.forEach(element => {
        observer.observe(element);
    });
}

function initTeamSocialLinks() {
    const socialLinks = document.querySelectorAll('.social-link');
    
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            this.style.transform = 'scale(0.9)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
}

function initTeamParallax() {
    const teamSection = document.querySelector('.team-section');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.1;
        
        if (teamSection) {
            teamSection.style.backgroundPositionY = rate + 'px';
        }
    });
}

// ===== FOOTER =====
function initFooter() {
    initBackToTop();
    initNewsletterForm();
    initFooterLinks();
    initFooterAnimations();
}

function initBackToTop() {
    const backToTopButton = document.getElementById('backToTop');
    
    if (backToTopButton) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        });
        
        backToTopButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

function initNewsletterForm() {
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (validateEmail(email)) {
                simulateNewsletterSubmission(email);
                emailInput.value = '';
                showNewsletterSuccess();
            } else {
                showNewsletterError('Per favore inserisci un indirizzo email valido.');
            }
        });
    }
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function simulateNewsletterSubmission(email) {
    console.log('Newsletter subscription:', email);
}

function showNewsletterSuccess() {
    const newsletterForm = document.querySelector('.newsletter-form');
    const originalHTML = newsletterForm.innerHTML;
    
    newsletterForm.innerHTML = `
        <div class="newsletter-success">
            <i class="fas fa-check-circle"></i>
            <p>Grazie per esserti iscritto!</p>
            <small>Riceverai presto le nostre ultime novità.</small>
        </div>
    `;
    
    setTimeout(() => {
        newsletterForm.innerHTML = originalHTML;
        initNewsletterForm();
    }, 5000);
}

function showNewsletterError(message) {
    const emailInput = document.querySelector('.newsletter-form input[type="email"]');
    
    emailInput.classList.add('error');
    
    let errorElement = emailInput.parentNode.querySelector('.error-message');
    if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        emailInput.parentNode.appendChild(errorElement);
    }
    errorElement.textContent = message;
    errorElement.style.display = 'block';
    
    setTimeout(() => {
        emailInput.classList.remove('error');
        if (errorElement) {
            errorElement.style.display = 'none';
        }
    }, 3000);
}

function initFooterLinks() {
    const footerLinks = document.querySelectorAll('.footer-links a[href^="#"]');
    
    footerLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

function initFooterAnimations() {
    const footerSections = document.querySelectorAll('.footer-main > div');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, { threshold: 0.1 });
    
    footerSections.forEach(section => {
        observer.observe(section);
    });
}

function initSocialAnalytics() {
    const socialLinks = document.querySelectorAll('.footer-brand .social-link');
    
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const platform = this.querySelector('i').className.split(' ')[1];
            console.log(`Social link clicked: ${platform}`);
        });
    });
}

// ===== PET SYSTEM =====
const initPetSystem = () => {
    const petImage = document.getElementById('digital-pet');
    const feedBtn = document.getElementById('feed-pet-btn');
    const playBtn = document.getElementById('play-pet-btn');
    const hungerDisplay = document.getElementById('pet-hunger');
    const happinessDisplay = document.getElementById('pet-happiness');

    if (!petImage) {
        return;
    }

    let petState = JSON.parse(localStorage.getItem('digital_pet_state')) || {
        hunger: 20,
        happiness: 80,
        lastInteraction: Date.now()
    };

    const updatePetDisplay = () => {
        if (hungerDisplay) {
            hungerDisplay.textContent = `${Math.round(petState.hunger)}%`;
        }
        if (happinessDisplay) {
            happinessDisplay.textContent = `${Math.round(petState.happiness)}%`;
        }

        if (petImage) {
            if (petState.happiness < 30 || petState.hunger < 30) {
                petImage.src = 'assets/gif/pet-sad.gif';
            } else if (petState.happiness > 80 && petState.hunger > 80) {
                petImage.src = 'assets/gif/pet-play.gif';
            } else {
                petImage.src = 'assets/gif/pet-idle.gif';
            }
        }
    };

    const savePetState = () => {
        try {
            localStorage.setItem('digital_pet_state', JSON.stringify(petState));
        } catch (e) {
            console.warn('Could not save pet state to localStorage', e);
        }
    };

    const decayPetStats = () => {
        const now = Date.now();
        const timeElapsed = Math.max(0, (now - (petState.lastInteraction || now)) / 1000);

        const hungerDecayPerSecond = 0.02;
        const happinessDecayPerSecond = 0.01;

        petState.hunger = Math.max(0, petState.hunger - (hungerDecayPerSecond * timeElapsed));
        petState.happiness = Math.max(0, petState.happiness - (happinessDecayPerSecond * timeElapsed));
        petState.lastInteraction = now;

        updatePetDisplay();
        savePetState();
    };

    if (feedBtn) {
        feedBtn.addEventListener('click', () => {
            petState.hunger = Math.min(100, petState.hunger + 20);
            petState.happiness = Math.min(100, petState.happiness + 5);
            petState.lastInteraction = Date.now();
            petImage.classList.add('feeding');
            setTimeout(() => {
                petImage.classList.remove('feeding');
                updatePetDisplay();
                savePetState();
            }, 500);
        });
    }

    if (playBtn) {
        playBtn.addEventListener('click', () => {
            petState.happiness = Math.min(100, petState.happiness + 25);
            petState.hunger = Math.max(0, petState.hunger - 5);
            petState.lastInteraction = Date.now();
            petImage.classList.add('playing');
            setTimeout(() => {
                petImage.classList.remove('playing');
                updatePetDisplay();
                savePetState();
            }, 1000);
        });
    }

    decayPetStats();
    setInterval(decayPetStats, 10000);
    updatePetDisplay();
};

function initTypingAnimation() {
}

// ===== PARTICLE SYSTEM =====
function initParticleSystem() {
    const particleContainer = document.getElementById('particles-js');
    if (!particleContainer) return;

    if (typeof particleSystem !== 'undefined') {
        particleSystem.init();
    }
}

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    initFadeInAnimations(); 
    initAboutSection();
    initEventiSection();
    initTeamSection();
    initFooter();
    initPetSystem();
    initTypingAnimation();
    initParticleSystem();
    
    const isMobile = window.innerWidth < 768;
    if (!isMobile) {
        initAboutParallax();
        initTeamParallax();
    }
});