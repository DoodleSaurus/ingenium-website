document.addEventListener('DOMContentLoaded', function() {

    initImensaButtons();
    initCountdown();
    initNewsletter();
});

// ===== GESTIONE BOTTONI IMENSA =====
function initImensaButtons() {

    const demoButton = document.getElementById('scopri-imensa');
    if (demoButton) {
        demoButton.addEventListener('click', showImensaVideo);
    }

    const partecipaButtonHero = document.getElementById('partecipa-sondaggio');
    if (partecipaButtonHero) {
        partecipaButtonHero.addEventListener('click', showSurveyModal);
    }

    const partecipaButtonSurvey = document.getElementById('open-survey');
    if (partecipaButtonSurvey) {
        partecipaButtonSurvey.addEventListener('click', showSurveyModal);
    }

    console.log('Bottoni iMENSA inizializzati');
}

// ===== DEMO IMENSA =====
function showImensaVideo() {
    const modalHTML = `
        <div class="modal fade" id="imensaVideoModal" tabindex="-1">
            <div class="modal-dialog modal-dialog-centered modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Demo iMENSA - Concept e Prototipo</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <div class="alert alert-info">
                            <i class="fas fa-info-circle me-2"></i>
                            <strong>Progetto in Sviluppo</strong> - Questa è un'anteprima del concept iMENSA
                        </div>
                        <div class="ratio ratio-16x9 bg-light rounded d-flex align-items-center justify-content-center">
                            <div class="text-center p-4">
                                <i class="fas fa-tools text-warning mb-3" style="font-size: 3rem;"></i>
                                <h4>Demo Video in Preparazione</h4>
                                <p class="text-muted">Il video dimostrativo sarà disponibile a breve</p>
                                <div class="mt-4">
                                    <div class="spinner-border text-primary" role="status">
                                        <span class="visually-hidden">Loading...</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Chiudi</button>
                        <button type="button" class="btn btn-primary" id="join-development">
                            <i class="fas fa-code me-2"></i>Unisciti allo Sviluppo
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;

                        // <div class="video-features mt-4">
                        //     <h6>Funzionalità in Sviluppo:</h6>
                        //     <div class="row">
                        //         <div class="col-md-6">
                        //             <ul class="list-unstyled">
                        //                 <li><i class="fas fa-code text-warning me-2"></i> Registrazione e login</li>
                        //                 <li><i class="fas fa-code text-warning me-2"></i> Prenotazione pasti</li>
                        //                 <li><i class="fas fa-code text-warning me-2"></i> Gestione menu</li>
                        //             </ul>
                        //         </div>
                        //         <div class="col-md-6">
                        //             <ul class="list-unstyled">
                        //                 <li><i class="fas fa-code text-warning me-2"></i> Tracking nutrizionale</li>
                        //                 <li><i class="fas fa-code text-warning me-2"></i> Social features</li>
                        //                 <li><i class="fas fa-code text-warning me-2"></i> Notifiche intelligenti</li>
                        //             </ul>
                        //         </div>
                        //     </div>
                        // </div>
    
    const existingModal = document.getElementById('imensaVideoModal');
    if (existingModal) {
        existingModal.remove();
    }
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    const modalElement = document.getElementById('imensaVideoModal');
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
    
    const joinButton = document.getElementById('join-development');
    if (joinButton) {
        joinButton.addEventListener('click', function() {
            modal.hide();
            window.location.href = 'join.html';
        });
    }
    
    modalElement.addEventListener('hidden.bs.modal', function() {
        modalElement.remove();
    });
}

// ===== SONDAGGIO IMENSA =====
function showSurveyModal() {
    const modalHTML = `
        <div class="modal fade" id="surveyModal" tabindex="-1">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Sondaggio iMENSA</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <div class="text-center mb-4">
                            <i class="fas fa-clipboard-list text-primary" style="font-size: 3rem;"></i>
                            <h4 class="mt-3">Aiutaci a Migliorare iMENSA</h4>
                            <p class="text-muted">La tua opinione è fondamentale per sviluppare la piattaforma perfetta</p>
                        </div>
                        
                        <div class="survey-link">
                            <p><strong>Accedi al sondaggio:</strong></p>
                            <div class="input-group mb-2">
                                <input type="text" class="form-control" value="" readonly id="survey-link-input">
                                <button class="btn btn-primary" type="button" id="copySurveyLink">
                                    <i class="fas fa-copy"></i>
                                </button>
                            </div>
                            <small class="text-muted">Clicca il pulsante per copiare il link</small>
                        </div>
                        
                        <div class="survey-info mt-4">
                            <div class="row text-center">
                                <div class="col-6">
                                    <div class="info-item">
                                        <strong>N/A</strong>
                                        <span>Partecipanti</span>
                                    </div>
                                </div>
                                <div class="col-6">
                                    <div class="info-item">
                                        <strong>N/A</strong>
                                        <span>Giorni rimanenti</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Chiudi</button>
                        <a href="" target="_blank" class="btn btn-primary" id="open-survey-link">
                            <i class="fas fa-external-link-alt me-2"></i>Apri Sondaggio
                        </a>
                    </div>
                </div>
            </div>
        </div>
    `;

    const existingModal = document.getElementById('surveyModal');
    if (existingModal) {
        existingModal.remove();
    }
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    const modalElement = document.getElementById('surveyModal');
    const modal = new bootstrap.Modal(modalElement);
    modal.show();
    
    const copyButton = document.getElementById('copySurveyLink');
    if (copyButton) {
        copyButton.addEventListener('click', function() {
            const linkInput = document.getElementById('survey-link-input');
            linkInput.select();
            document.execCommand('copy');
            
            const originalHTML = this.innerHTML;
            this.innerHTML = '<i class="fas fa-check"></i>';
            this.classList.remove('btn-primary');
            this.classList.add('btn-success');
            
            setTimeout(() => {
                this.innerHTML = originalHTML;
                this.classList.remove('btn-success');
                this.classList.add('btn-primary');
            }, 2000);
        });
    }

    modalElement.addEventListener('hidden.bs.modal', function() {
        modalElement.remove();
    });
}

// ===== COUNTDOWN =====
function initCountdown() {
    const countdownElement = document.getElementById('countdown');
    if (!countdownElement) return;
    
    const launchDate = new Date('2025-01-01T00:00:00').getTime();
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = launchDate - now;
        
        if (distance < 0) {
            countdownElement.innerHTML = `
                <div class="countdown-item" style="min-width: 200px;">
                    <span class="countdown-number">🎉</span>
                    <span class="countdown-label">iMENSA sta arrivando!</span>
                </div>
            `;
            return;
        }

                // Replace with this, when the project has an actual date of launch:

                // <div class="countdown-item" style="min-width: 200px;">
                //     <span class="countdown-number">🎉</span>
                //     <span class="countdown-label">iMENSA è stato lanciato!</span>
                // </div>


        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        const milliseconds = Math.floor(distance % 1000);
        
        countdownElement.innerHTML = `
            <div class="countdown-item">
                <span class="countdown-number">${days}</span>
                <span class="countdown-label">Giorni</span>
            </div>
            <div class="countdown-item">
                <span class="countdown-number">${hours.toString().padStart(2, '0')}</span>
                <span class="countdown-label">Ore</span>
            </div>
            <div class="countdown-item">
                <span class="countdown-number">${minutes.toString().padStart(2, '0')}</span>
                <span class="countdown-label">Minuti</span>
            </div>
            <div class="countdown-item">
                <span class="countdown-number">${seconds.toString().padStart(2, '0')}</span>
                <span class="countdown-label">Secondi</span>
            </div>
            <div class="countdown-item">
                <span class="countdown-number" style="font-size: 2.5rem;">${milliseconds.toString().padStart(2, '0')}</span>
                <span class="countdown-label">Millisecondi</span>
            </div>
        `;
        
        const msElement = countdownElement.querySelector('.countdown-item:last-child .countdown-number');
        if (msElement) {
            msElement.style.transition = 'all 0.05s ease';
            msElement.style.transform = 'scale(1.1)';
            setTimeout(() => {
                msElement.style.transform = 'scale(1)';
            }, 50);
        }
    }
    
    updateCountdown();
    setInterval(updateCountdown, 10);
}

// ===== NEWSLETTER =====
function initNewsletter() {
    const newsletterForms = document.querySelectorAll('.newsletter-form');
    
    newsletterForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (validateEmail(email)) {
                simulateNewsletterSignup(email);
                showNewsletterSuccess(this);
                emailInput.value = '';
            } else {
                showNewsletterError(emailInput);
            }
        });
    });
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function simulateNewsletterSignup(email) {
    console.log('Iscrizione newsletter:', email);
}

function showNewsletterSuccess(form) {
    const originalContent = form.innerHTML;
    
    form.innerHTML = `
        <div class="success-message text-center">
            <i class="fas fa-check-circle text-success mb-2" style="font-size: 2rem;"></i>
            <p class="mb-0 text-white">Grazie per esserti iscritto!</p>
            <small class="text-white-50">Riceverai aggiornamenti su iMENSA</small>
        </div>
    `;
    
    setTimeout(() => {
        form.innerHTML = originalContent;
        initNewsletter(); 
    }, 5000);
}

function showNewsletterError(input) {
    input.classList.add('is-invalid');
    
    setTimeout(() => {
        input.classList.remove('is-invalid');
    }, 3000);
}

// ===== ANIMAZIONI IMENSA =====    
function initImensaAnimations() {
    const fadeElements = document.querySelectorAll(`
        .hero-content, .hero-visual, .project-status-section,
        .about-imensa-section, .features-section, .demo-section,
        .survey-section, .coming-soon-section
    `);
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
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
        observer.observe(element);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    initImensaButtons();
    initCountdown();
    initNewsletter();
    initImensaAnimations();
});